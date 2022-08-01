import { useState, useEffect } from 'react';
import { baseUrl, myDeleteAuth, myFetch, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
// import { useHistory } from 'react-router-dom';
import css from '../HomePage/HomePage.module.css';
import QueCard from '../../components/UI/Question/Question';
import toast from 'react-hot-toast';
import Button from '../../components/UI/Button/Button';

function HomePage() {
  // const history = useHistory();
  const { token } = useAuthCtx();
  // if (!token) history.push('/login');
  const [questions, setQuestions] = useState([]);

  const getQuestions = async (values) => {
    const fetchResult = await myFetch(`${baseUrl}/api/question`, 'GET', values);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  async function deleteQuestion(id) {
    const fetchDelete = await myDeleteAuth(`${baseUrl}/api/question/${id}`, 'DELETE', token);
    console.log('fetchDelete===', fetchDelete);
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
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };
  const getQuestDESC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/questiondesc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (questions.length !== 0) {
  return (
    <div className={css['container']}>
      <h1 className={css['title']}>All questions</h1>
      <div>
        <h3>Sort by creating time </h3>
        <Button onClick={getQuestASC}>ASC</Button>
        <Button onClick={getQuestDESC}>DESC</Button>
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
  // } else {
  //   return (
  //     <div>
  //       <h1 className={css['title']}>Your questions</h1>
  //       <div className={css['container']}>
  //         <h3 className={css['empty-page-text']}>You don't have any questions added.</h3>
  //       </div>
  //     </div>
  //   );
}

export default HomePage;
