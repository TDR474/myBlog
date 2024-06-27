//@ts-nocheck
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import TeX from '@matejmazur/react-katex';
import styled from 'styled-components';

const MathDisplay = styled.div`
  margin-bottom: -10px; /* Adjust this value as needed */
`;

const components = {
  div: (props) => {
    if (props.className?.includes('math-display')) {
      return (
        <MathDisplay>
          <TeX block math={props.children as string} />
        </MathDisplay>
      );
    }
    return <div {...props} />;
  },
  span: (props) => {
    if (props.className?.includes('math-inline')) {
      return (
        <span className="math-inline">
          <TeX math={props.children as string} />
        </span>
      );
    }
    return <span {...props} />;
  },
};

const MdxLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
};

MdxLayout.displayName = 'MdxLayout';

export default MdxLayout;
