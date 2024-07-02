import {
  styled,
  Anchor,
  Grid,
  Text,
  EM,
  Flex,
} from '@maximeheckel/design-system';
import Logo from '@core/components/Logo';
import Link from 'next/link';
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
      <Flex
        as={Grid.Item}
        col={2}
        css={{
          padding: 'var(--space-5) 0px',
        }}
        direction="column"
        justifyContent="space-evenly"
        gap={6}
      >
        <Grid css={{ width: '100%' }} templateColumns="repeat(3, 1fr)">
          <Grid.Item>
            <Text size={1}>
              <Grid>
                <Link href="/" legacyBehavior passHref>
                  <Anchor discreet>Home</Anchor>
                </Link>
              </Grid>
            </Text>
          </Grid.Item>
          <Grid.Item>
            <Text size={1}>
              <Grid>
                <Anchor
                  discreet
                  href="https://github.com/TDR474"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Anchor>
              </Grid>
            </Text>
          </Grid.Item>
        </Grid>
        <FooterContent alignItems="center" justifyContent="space-between">
          <Text
            as="p"
            css={{ margin: 0 }}
            size="1"
            variant="primary"
            weight="3"
          >
            © 2024 Frank Zhu ——{' '}
            <EM size="1">New York</EM>
          </Text>
          <Logo alt="Frank's logo" size={35} />
        </FooterContent>
      </Flex>
    </Grid>
  </FooterBlock>
);

export default Footer;