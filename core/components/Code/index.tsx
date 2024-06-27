import dynamic from 'next/dynamic';
import React from 'react';
import { PrePropsType } from './types';
import { preToCodeBlock } from './utils';
import TeX from "@matejmazur/react-katex";
import { MDXProvider } from "@mdx-js/react";

const CodeBlock = dynamic(() => import('./CodeBlock'));

const Code = (preProps: PrePropsType) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  }

  return null;
};

export default Code;
