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
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

import Fuse from 'fuse.js';

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

function PostCard(post) {
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
  const [searchString, setSearchString] = useState('');

  const categories = ['', 'property', 'applicants', 'income'];

  const options = {
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.8,
    keys: [
      {
        name: 'title',
        weight: 1,
      },
      {
        name: 'post.raw',
        weight: 0.5,
      },
    ],
  };

  // Create a new instance of Fuse
  const fuse = new Fuse(posts, options);

  // Now search for 'Man'
  const result = fuse.search(searchString);
  console.log(result);

  return (
    <Container>
      <Box m={5}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search"
            onChange={(event) => setSearchString(event.target.value)}
            value={searchString}
          />
        </InputGroup>
      </Box>
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
          {searchString
            ? result.map((res, idx) => <PostCard key={idx} {...res.item} />)
            : posts
                .filter(
                  (post) => !tabIndex || post.category === categories[tabIndex]
                )
                .map((post, idx) => <PostCard key={idx} {...post} />)}
        </Accordion>
      </Box>
    </Container>
  );
}
