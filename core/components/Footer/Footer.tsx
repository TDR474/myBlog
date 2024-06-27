import { styled, Grid, Text, EM, Flex } from '@maximeheckel/design-system';
// import Logo from '@core/components/Logo';
// import Link from 'next/link';
import React from 'react';
import { templateColumnsMedium } from 'styles/grid';

const FooterBlock = styled('footer', {
  background: 'var(--background)',
  transition: '0.5s',
  width: '100%',
  borderTop: '1px solid var(--border-color)',
});

const FooterContent = styled(Flex, {
  height: 'var(--space-8)',
  width: '100%',
});

// TODO: Make more modular
const Footer = () => (
  <FooterBlock data-testid="footer">
    <Grid gapX={4} templateColumns={templateColumnsMedium}>
      <FooterContent alignItems="center" justifyContent="space-between">
        <Text as="p" css={{ margin: 0 }} size="1" variant="primary" weight="3">
          © {new Date().getFullYear()} Frank Zhu —— <EM size="1">New York</EM>
        </Text>
        {/* <Logo alt="Maxime Heckel's logo" size={35} /> */}
      </FooterContent>
    </Grid>
  </FooterBlock>
);

export default Footer;
