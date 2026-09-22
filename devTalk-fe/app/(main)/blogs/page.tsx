import BlogsHeader from './_components/blogs-header';
import BlogsContainer from './_components/blogs-container';

const BlogsPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <BlogsHeader />
      <BlogsContainer />
    </div>
  );
};

export default BlogsPage;
