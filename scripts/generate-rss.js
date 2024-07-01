/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

(async () => {
  console.info(chalk.cyan('info'), ` - Generating RSS feed`);

  const root = process.cwd();

  function getPosts() {
    const files = fs
      .readdirSync(path.join(root, 'content'))
      .filter((name) => name !== 'img');

    const posts = files.reduce((allPosts, postSlug) => {
      const source = fs.readFileSync(
        path.join(root, 'content', postSlug),
        'utf8'
      );
      const { data } = matter(source);

      return [
        {
          ...data,
          slug: postSlug.replace('.mdx', ''),
        },
        ...allPosts,
      ];
    }, []);

    return posts;
  }

  try {
    const feed = new RSS({
      title: "Frank's Blog",
      description:
        "Hi I'm Frank!",
      site_url: 'https://frankyywestside.up.railway.app/',
      feed_url: 'https://frankyywestside.up.railway.app/',
      image_url: 'https://frankyywestside.up.railway.app/',
      language: 'en',
    });

    const content = [...getPosts()].sort((post1, post2) =>
      post1.date > post2.date ? -1 : 1
    );

    content.forEach((post) => {
      const url = `https://frankyywestside.up.railway.app//posts/${post.slug}`;

      feed.item({
        title: post.title,
        description: post.subtitle,
        date: new Date(post.date),
        author: 'Frank Zhu',
        url,
        guid: url,
      });
    });

    const rss = feed.xml({ indent: true });
    fs.writeFileSync(path.join(__dirname, '../public/rss.xml'), rss);
  } catch (error) {
    console.error(
      chalk.red('error'),
      ` - An error occurred while generating the RSS feed`
    );
    console.error(error);
    process.exit(1);
  }
})();
