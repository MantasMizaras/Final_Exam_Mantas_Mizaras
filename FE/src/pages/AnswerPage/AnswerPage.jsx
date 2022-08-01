import { useState, useEffect } from 'react';
import { baseUrl, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
import { useHistory, useParams } from 'react-router-dom';
import AnswerCard from '../../components/UI/Answer/Answer';
import css from '../AnswerPage/AnswerPage.module.css';
// import toast from 'react-hot-toast';

function AnswerPage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const { id, title, content } = useParams();
  if (!token) history.push('/login');
  const [answers, setAnswers] = useState([]);

  //   console.log('id, title, content  ===', id, title, content);

  const getAnswers = async (values) => {
    const fetchResult = await myFetchAuth(`${baseUrl}/api/question/${id}/answer`, 'GET', values);
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (answers.length !== 0) {
  return (
    <div className={css['container']}>
      <h1 className={css['title']}>
        All answers question title: ${title} , content: ${content}
      </h1>
      <div className={css['cards-display']}>
        {answers.length > 0 ? answers.map((sObj) => <AnswerCard key={sObj.id} {...sObj} />) : <p>No answers yet.</p>}
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

export default AnswerPage;
