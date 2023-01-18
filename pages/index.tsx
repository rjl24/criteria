import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Tab,
  Tabs,
  TabList,
} from '@chakra-ui/react';

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

function PostCard(post: Post) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {post.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  const [tabIndex, setTabIndex] = useState(0);

  const categories = ['', 'property', 'applicants', 'income'];

  return (
    <Container>
      <Box m={5}>
        <Tabs onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Property</Tab>
            <Tab>Applicants</Tab>
            <Tab>Income</Tab>
          </TabList>
        </Tabs>
      </Box>
      <Box m={5}>
        <Accordion defaultIndex={[0]} allowMultiple>
          {posts
            .filter(
              (post) => !tabIndex || post.category === categories[tabIndex]
            )
            .map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
        </Accordion>
      </Box>
    </Container>
  );
}
