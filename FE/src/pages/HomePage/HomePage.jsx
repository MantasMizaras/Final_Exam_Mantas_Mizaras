import { useState, useEffect } from 'react';
import { baseUrl, myDeleteAuth, myFetch } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
import css from '../HomePage/HomePage.module.css';
import QueCard from '../../components/UI/Question/Question';
import toast from 'react-hot-toast';
import Button from '../../components/UI/Button/Button';

function HomePage() {
  const { token } = useAuthCtx();
  const [questions, setQuestions] = useState([]);

  const getQuestions = async (values) => {
    const fetchResult = await myFetch(`${baseUrl}/api/question`, 'GET', values);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  async function deleteQuestion(id) {
    const fetchDelete = await myDeleteAuth(`${baseUrl}/api/question/${id}`, 'DELETE', token);

    if (fetchDelete === 'Question succesfully deleted!') {
      toast.success('Question succesfully deleted!');
      getQuestions();
    }
    if (fetchDelete === 'Question was not deleted!') {
      toast.error('Question was not deleted!');
    }
  }

  const getQuestASC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/questionasc`);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };
  const getQuestDESC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/questiondesc`);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css['container']}>
      <h1 className={css['title']}>QUESTIONS</h1>
      <div>
        <h3>Sort by creating time </h3>
        <Button onClick={getQuestASC}>Oldest</Button>
        <Button onClick={getQuestDESC}>Newest</Button>
      </div>
      <div className={css['cards-display']}>
        {questions.length > 0 ? (
          questions.map((sObj) => <QueCard key={sObj.id} {...sObj} onDelete={deleteQuestion} />)
        ) : (
          <p>No questions here.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
