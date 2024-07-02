import { Flex, Grid, H2, Text } from '@maximeheckel/design-system';
import { motion } from 'framer-motion';
import Layout from '@core/layout';

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
      </Flex>
    </Grid>
  </Layout>
);

export default IndexPage;
