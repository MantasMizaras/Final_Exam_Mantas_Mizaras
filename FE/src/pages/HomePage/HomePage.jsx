import { useState, useEffect } from 'react';
import { baseUrl, myFetch, myFetchAuth } from '../../utils';
// import { useAuthCtx } from '../../store/AuthContext';
import { useHistory } from 'react-router-dom';
// import Question from '../../components/UI/Question/Question';
import css from '../HomePage/HomePage.module.css';
import QueCard from '../../components/UI/Question/Question';
// import toast from 'react-hot-toast';

function HomePage() {
  // const history = useHistory();
  // const { token } = useAuthCtx();
  // if (!token) history.push('/login');
  const [questions, setQuestions] = useState([]);

  const getQuestions = async (values) => {
    const fetchResult = await myFetch(`${baseUrl}/api/question`, 'GET', values);
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
      <div className={css['cards-display']}>
        {questions.length > 0 ? questions.map((sObj) => <QueCard key={sObj.id} {...sObj} />) : <p>Waiting for questions</p>}
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
