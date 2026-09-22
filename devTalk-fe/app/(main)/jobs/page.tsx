import JobsHeader from './_components/jobs-header';
import JobsContainer from './_components/jobs-container';

const JobsPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <JobsHeader />
      <JobsContainer />
    </div>
  );
};

export default JobsPage;
