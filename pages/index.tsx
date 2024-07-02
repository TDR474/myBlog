import { Flex, Grid, H2, Text, Button, Icon, VisuallyHidden } from '@maximeheckel/design-system';
import { motion } from 'framer-motion';
import Layout from '@core/layout';
// import Link from 'next/link';

const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
    👋🏻
  </motion.div>
);

const IndexPage = () => (
  <Layout footer header headerProps={{ offsetHeight: 256 }}>
    <Grid gapX={4} gapY={12}>
      <Flex alignItems="start" direction="column" gap="5">
        <H2>
          Hey <WavingHand /> I'm Frank, and this is my blog.
          <Text
            css={{
              fontFamily: '"Times New Roman", serif',
              fontWeight: 300,
              lineHeight: 'unset',
              letterSpacing: '-0.5px',
            }}
            variant="secondary"
            size="6"
            weight="4"
          >
            I'm a masters student in Computer Science @UPenn SEAS with a
            concentration in Artificial Intelligence.
          </Text>
        </H2>
        <Flex
              gap={4}
              css={{
                marginLeft: '-var(--space-3)',
                marginRight: '-var(--space-3)',
              }}
            >
              <a
                href="https://www.linkedin.com/in/frank-zhu-55474914b/"
                style={{ textDecoration: 'none' }}
                tabIndex={-1}
              >
                <Button
                  variant="secondary"
                  endIcon={<Icon.External size="4" />}
                >
                  About me
                </Button>
                <VisuallyHidden as="p">
                  Link redirects to my LinkedIn Profile.
                </VisuallyHidden>
              </a>
              <a
                href="https://github.com/TDR474"
                style={{ textDecoration: 'none' }}
                tabIndex={-1}
              >
                <Button variant="secondary" endIcon={<Icon.Github size="4" />}>
                  @TDR474
                </Button>
                <VisuallyHidden as="p">
                  Link redirects to my Github profile page
                </VisuallyHidden>
              </a>
              <a
                href="https://lucidity-demo-production.up.railway.app/"
                style={{ textDecoration: 'none' }}
                tabIndex={-1}
              >
                <Button
                  variant="secondary"
                  endIcon={<Icon.Portfolio size="4" />}
                >
                  Crypto30Index
                </Button>
                <VisuallyHidden as="p">
                  Link redirects to my Github profile page
                </VisuallyHidden>
              </a>
            </Flex>
          </Flex>
    </Grid>
  </Layout>
);

export default IndexPage;
