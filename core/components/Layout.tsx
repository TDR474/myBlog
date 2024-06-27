// components/Layout.tsx
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import TeX from '@matejmazur/react-katex';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { ComponentType } from 'react';

const MathDisplay = styled.div`
  margin-bottom: -10px; /* Adjust this value as needed */
`;

const components: Record<string, ComponentType<any>> = {
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Client-side code that ensures KaTeX CSS is applied correctly
    import('katex/dist/katex.min.css');
  }, []);

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default Layout;
