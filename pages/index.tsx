//@ts-nocheck
import { styled, Flex, Grid, H2, Text } from '@maximeheckel/design-system';
import Link from 'next/link';
import Layout from '@core/layout';
import { getAllFilesFrontMatter } from 'lib/mdx';
import { Post } from 'types/post';

interface Props {
  posts: Post[];
}

const IndexPage = ({ posts }: Props) => (
  <Layout footer header headerProps={{ offsetHeight: 256 }}>
    <Grid gapX={4} gapY={12}>
      <Flex alignItems="start" direction="column" gap="5">
        <H2>
          Hey 👋🏻 I'm Frank, and this is my blog.
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

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();
  return { props: { posts } };
}

export default IndexPage;
