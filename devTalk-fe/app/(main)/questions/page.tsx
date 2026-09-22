import QuestionsHeader from './_components/questions-header';
import QuestionsContainer from './_components/questions-container';

const QuestionsPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <QuestionsHeader />
      <QuestionsContainer />
    </div>
  );
};

export default QuestionsPage;
