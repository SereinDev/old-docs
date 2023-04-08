import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import GiscusComponent from '@site/src/components/GiscusComponent';
import BlogPostItem from '@theme-original/BlogPostItem';

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      <BlogPostItem {...props} />
      {(isBlogPostPage) && (
        <div className='giscus-container'>
        <GiscusComponent />
      </div>
      )}
    </>
  );
}