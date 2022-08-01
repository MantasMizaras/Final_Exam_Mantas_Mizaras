import { useState, useEffect } from 'react';
import { baseUrl, myDeleteAuth, myFetch, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
import { useHistory, useParams } from 'react-router-dom';
import AnswerCard from '../../components/UI/Answer/Answer';
import css from '../AnswerPage/AnswerPage.module.css';
import AddAnswerForm from '../../components/AddAnswerForm/AddAnswerForm';
import toast from 'react-hot-toast';
import Button from '../../components/UI/Button/Button';

function AnswerPage() {
  //   const history = useHistory();
  const { token } = useAuthCtx();
  const { id, title, content } = useParams();
  //   if (!token) history.push('/login');
  const [answers, setAnswers] = useState([]);

  //   console.log('id, title, content  ===', id, title, content);

  const questTitle = title;

  const getAnswers = async (values) => {
    const fetchResult = await myFetch(`${baseUrl}/api/question/${id}/answer`, 'GET', values);
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };

  async function deleteAnswer(id) {
    const fetchDelete = await myDeleteAuth(`${baseUrl}/api/answer/${id}`, 'DELETE', token);
    console.log('fetchDelete===', fetchDelete);
    if (fetchDelete === 'Answer succesfully deleted!') {
      toast.success('Answer succesfully deleted!');
      getAnswers();
    }
    if (fetchDelete === 'Answer was not deleted!') {
      toast.error('Answer was not deleted!');
    }
  }

  const getAnswerASC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/answerasc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };
  const getAnswertDESC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/answerdesc`);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };

  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (answers.length !== 0) {
  return (
    <div className={css['container']}>
      <h1 className={css['title']}>
        (`All answers question title: ${questTitle} , content: ${content}`)
      </h1>
      <div>
        <h3>Sort by creating time </h3>
        <Button onClick={getAnswerASC}>ASC</Button>
        <Button onClick={getAnswertDESC}>DESC</Button>
      </div>
      <div className={css['cards-display']}>
        {answers.length > 0 ? (
          answers.map((sObj) => <AnswerCard key={sObj.id} {...sObj} onDelete={deleteAnswer} />)
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
      <AddAnswerForm />
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
