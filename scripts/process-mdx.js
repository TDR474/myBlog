const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { serialize } = require('next-mdx-remote/serialize');
const rehypeKatex = require('rehype-katex');
const remarkMath = require('remark-math');
import rehypeKatexSvelte from 'https://cdn.skypack.dev/rehype-katex-svelte';
import rehypeMathjax from 'rehype-mathjax';
const GPT3Tokenizer = require('gpt3-tokenizer');
const MAX_TOKEN = 100;

// Remove JSX syntax from a string
function removeJSX(str) {
  const regex = /<[^>]+>/g;
  return str.replace(regex, '');
}

// Extract the link text from a markdown link
function extractLink(text) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return text.replace(regex, (match, p1, p2) => p1);
}

// Replace newline characters with spaces within a string
function replaceNewlineWithSpace(str) {
  return str.replace(/\n/g, ' ');
}

function cleanMDXFile(mdxContent) {
  const lines = mdxContent.split('\n');
  const sections = {};
  let currentSection = '';
  let currentContent = '';
  let inCodeBlock = false;

  for (const line of lines) {
    // Toggle the inCodeBlock flag when encountering code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      console.log(line);
      // Extract the link text from the line, remove any JSX syntax, and append it to the current section content
      const processed = extractLink(removeJSX(line));
      currentContent += `${processed}\n`;
    } else {
      // Append the line to the current section content when inside a code block
      currentContent += `${line}\n`;
    }

    // Replace newline characters with spaces in the current section content
    currentContent = replaceNewlineWithSpace(currentContent);
  }

  return currentContent;
}

function splitIntoChunks(inputText) {
  const Tokenizer = GPT3Tokenizer.default;
  const chunks = [];
  let chunk = {
    tokens: [],
    start: 0,
    end: 0,
  };

  let start = 0;

  const tokenizer = new Tokenizer({ type: 'gpt3' });

  const { text } = tokenizer.encode(inputText);

  for (const word of text) {
    const newChunkTokens = [...chunk.tokens, word];
    if (newChunkTokens.length > MAX_TOKEN) {
      const text = chunk.tokens.join('');

      chunks.push({
        text,
        start,
        end: start + text.length,
      });

      start += text.length + 1;

      chunk = {
        tokens: [word],
        start,
        end: start,
      };
    } else {
      chunk = {
        ...chunk,
        tokens: newChunkTokens,
      };
    }
  }

  chunks.push({
    ...chunk,
    text: chunk.tokens.join(''),
  });

  return chunks;
}

// Process an MDX file and extract its sections
async function processMdxFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const parsedContent = matter(fileContent);

    const { data: metadata, content } = parsedContent;

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          [
            rehypeMathjax
          ],
        ],
      },
    });

    const text = cleanMDXFile(content);
    const chunks = splitIntoChunks(text);

    return { metadata, chunks, mdxSource };
  } catch (error) {
    throw new Error(`Error processing MDX file: ${error}`);
  }
}

module.exports = processMdxFile;
