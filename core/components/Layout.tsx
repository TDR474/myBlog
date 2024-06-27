import React, { useEffect, useState, ComponentType } from 'react';
import TeX from '@matejmazur/react-katex';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';

// @ts-ignore: Importing CSS
import 'katex/dist/katex.min.css';

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
  }, []);

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

Layout.displayName = 'Layout';

export default Layout;
