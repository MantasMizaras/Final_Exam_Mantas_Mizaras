import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../utils';
import { useAuthCtx } from '../store/AuthContext';
import { useHistory } from 'react-router-dom';
import Question from '../components/UI/Question/Question';
import css from '../pages/HomePage.module.css';
import toast from 'react-hot-toast';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [questions, setQuestions] = useState([]);

  const getQuestions = async (values) => {
    const fetchResult = await myFetchAuth(`${baseUrl}/api/question`, 'GET', token, values);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (questions.length !== 0) {
  return (
    <div className={css['container']}>
      <h1 className={css['title']}>All questions</h1>
      <div className={css['cards-display']}>
        {questions.length > 0 ? questions.map((sObj) => <Question key={sObj.id} {...sObj} />) : toast.loading('Waiting...')}
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
