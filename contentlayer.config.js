// @ts-nocheck
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
