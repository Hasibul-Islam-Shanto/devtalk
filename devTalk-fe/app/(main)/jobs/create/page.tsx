import JobForm from './_components/job-form';

const JobCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <header className="mb-6">
        <h1 className="text-foreground text-3xl font-bold">Post a Job</h1>
        <p className="text-muted-foreground mt-1">
          Find talented developers for your team
        </p>
      </header>
      <JobForm />
    </div>
  );
};

export default JobCreatePage;
