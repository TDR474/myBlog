// components/MdxLayout.tsx
import React from 'react';
import TeX from '@matejmazur/react-katex';
import { MDXProvider } from '@mdx-js/react';
import 'katex/dist/katex.min.css';

const components = {
  div: (props: any) => {
    if (props.className?.includes('math-display')) {
      return <TeX block math={props.children as string} />;
    }
    return <div {...props} />;
  },
  span: (props: any) => {
    if (props.className?.includes('math-inline')) {
      return <TeX math={props.children as string} />;
    }
    return <span {...props} />;
  },
};

const Layout: React.FC = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default Layout;
