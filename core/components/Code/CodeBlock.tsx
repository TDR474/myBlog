import { Card, styled } from '@maximeheckel/design-system';
import Highlight, { Prism, defaultProps } from 'prism-react-renderer';
import CopyToClipboardButton from '../Buttons/CopyToClipboardButton';
import { CodeBlockProps, HighlightedCodeTextProps } from './types';
import { calculateLinesToHighlight, hasTitle } from './utils';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

/**
 * This imports the syntax highlighting style for the Swift, GLSL, and Python languages
 */
require('prismjs/components/prism-swift');
require('prismjs/components/prism-glsl');
require('prismjs/components/prism-python');

export const HighlightedCodeText = (props: HighlightedCodeTextProps) => {
  const { codeString, language, highlightLine } = props;

  if (!codeString) return null;

  return (
    <Highlight
      {...defaultProps}
      theme={{ plain: {}, styles: [] }}
      code={codeString}
      // @ts-ignore let glsl be a valid language
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, index) => {
            const { className: lineClassName } = getLineProps({
              className:
                highlightLine && highlightLine(index) ? 'highlight-line' : '',
              key: index,
              line,
            });

            return (
              <Line
                data-testid={
                  highlightLine && highlightLine(index)
                    ? 'highlight-line'
                    : 'line'
                }
                key={index}
                className={lineClassName}
              >
                <LineNo data-testid="number-line">{index + 1}</LineNo>
                <LineContent>
                {line.map((token, key) => {
                const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                return (
                  <span
                    data-testid="content-line"
                    key={tokenKey}
                    {...tokenProps}
                  />
                );
              })}
                </LineContent>
              </Line>
            );
          })}
        </Pre>
      )}
    </Highlight>
  );
};

const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, language, metastring } = props;

  const highlightLineFn = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);

  return (
    <Card
      css={{
        // Fix the overflow issue when wrapped in text
        display: 'grid',
        background: 'unset',
        width: '100%',

        '@media(max-width: 750px)': {
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        },
      }}
    >
      {title ? (
        <Card.Header
          css={{
            padding: '0px 16px',
            backgroundColor: 'var(--code-snippet-background)',
          }}
        >
          <CodeSnippetTitle data-testid="codesnippet-title">
            {title}
          </CodeSnippetTitle>
          <CopyToClipboardButton title={title} text={codeString} />
        </Card.Header>
      ) : null}
      <HighlightedCodeText
        codeString={codeString}
        language={language}
        highlightLine={highlightLineFn}
      />
    </Card>
  );
};

export default CodeBlock;

const Pre = styled('pre', {
  marginTop: '0',
  marginBottom: '0',
  textAlign: 'left',
  padding: '8px 0px',
  overflow: 'auto',
  borderBottomLeftRadius: 'var(--border-radius-2)',
  borderBottomRightRadius: 'var(--border-radius-2)',
  backgroundColor: 'var(--code-snippet-background)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--font-size-1)',
  lineHeight: '26px',
  '.token.comment': {
    color: 'var(--token-comment)',
  },
  '.token.string-interpolation': {
    color: '#BD93F9', // Assign a color for string interpolation
  },
  '.token.interpolation': {
    color: '#BD93F9', // Assign a color for interpolation
  },
  '.token.format-spec': {
    color: '#BD93F9', // Assign a color for format specifiers
  },
  '.token.conversion-option': {
    color: '#BD93F9', // Assign a color for conversion options
  },
  '.token.triple-quoted-string': {
    color: '#BD93F9', // Assign a color for triple-quoted strings
  },
  '.token.string': {
    color: '#BD93F9', // Assign a color for strings
  },
  '.token.function': {
    color: '#FF79C6', // Pink for functions like torch.randn
  },
  '.token.class-name': {
    color: '#8BE9FD', // Cyan for class names
  },
  '.token.decorator': {
    color: '#FF79C6', // Pink for decorators
  },
  '.token.keyword': {
    color: '#FF79C6', // Pink for keywords
  },
  '.token.builtin': {
    color: '#FF79C6', // Pink for built-ins
  },
  '.token.boolean': {
    color: '#BD93F9', // Purple for booleans
  },
  '.token.number': {
    color: '#BD93F9', // Purple for numbers
  },
  '.token.operator': {
    color: '#FF79C6', // Pink for operators
  },
  '.token.punctuation': {
    color: 'var(--token-punctuation)', // Default color for punctuation
  },
});


const Line = styled('div', {
  display: 'table',
  borderCollapse: 'collapse',
  padding: '0px 14px',
  borderLeft: '3px solid transparent',

  '&.highlight-line': {
    background: 'var(--emphasis)',
    borderColor: 'var(--accent)',
  },

  '&:hover': {
    backgroundColor: 'var(--emphasis)',
  },
});

const LineNo = styled('div', {
  width: '45px',
  padding: '0 12px',
  userSelect: 'none',
  opacity: '1',
  color: 'var(--text-tertiary)',
});

const LineContent = styled('span', {
  display: 'table-cell',
  width: '100%',
});

const CodeSnippetTitle = styled('p', {
  marginBlockStart: '0px',
  fontSize: 'var(--font-size-1)',
  marginBottom: '0px',
  color: 'var(--text-secondary)',
  fontWeight: '500',
});
