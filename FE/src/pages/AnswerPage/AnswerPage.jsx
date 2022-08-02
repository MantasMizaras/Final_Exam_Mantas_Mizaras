import { useState, useEffect } from 'react';
import { baseUrl, myDeleteAuth, myFetch, myFetchAuth } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
import { NavLink, useParams } from 'react-router-dom';
import AnswerCard from '../../components/UI/Answer/Answer';
import css from '../AnswerPage/AnswerPage.module.css';
import toast from 'react-hot-toast';
import Button from '../../components/UI/Button/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function AnswerPage() {
  const initValues = {
    answer: '',
  };

  const title = localStorage.getItem('title');
  const content = localStorage.getItem('content');

  // const [updatedTitle, setUpdatedTitle] = useState({ title, content });

  // useEffect(() => {
  //   setUpdatedTitle({ title, content });
  // }, [title, content]);

  // const initValues = {
  //   title: title,
  //   content: content,
  // };

  // const [input, setIinput] = useState('');
  // const [updatedTitleAndContent, setUpdatedTitleAndContent] = useState({ title, content });
  // localStorage.removeItem('content');

  // const [updatedTitle, setUpdatedTitle] = useState({ title, content });

  // useEffect(() => {
  //   setUpdatedTitle({ title, content });
  // }, [title, content]);

  // const history = useHistory();
  const { token } = useAuthCtx();
  const { id } = useParams();
  //   if (!token) history.push('/login');
  const [answers, setAnswers] = useState('');

  console.log('title ===', title);
  console.log('content ===', content);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(10, 'At least 10 symbols are required').max(555, 'Up to 555 symbols are allowed').required(),
    }),
    onSubmit: async (values, actions) => {
      const addFetch = await myFetchAuth(`${baseUrl}/api/question/${id}/answer`, 'POST', token, values);
      if (addFetch === 'Answer succesfully added!') {
        toast.success('Your answer has been added!');
        getAnswers();
        actions.resetForm();
      }
      if (addFetch === 'Answer was not added!') {
        toast.error('Error while adding an answer. Please try again.');
        return;
      }
    },
  });

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

  const [updatedTitle, setUpdatedTitle] = useState({ title, content });

  useEffect(() => {
    setUpdatedTitle({ title, content });
  }, [title, content]);

  // useEffect(() => {
  //   // setUpdatedTitleAndContent({ title: localStorage.getItem('title', 'content') });
  //   setUpdatedTitleAndContent({ title, content });
  // }, [title, content]);

  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (answers.length !== 0) {
  return (
    <div className={css['container']}>
      <h3 className={css['title']}>Question:{updatedTitle.title}</h3>
      <p>Content: {updatedTitle.content}</p>

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
      {/* <AddAnswerForm onSubmit={getAnswers} /> */}
      <div className={css['form-container']}>
        <h1>Answer</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className={css['form-group']}>
            <label htmlFor='answer'>Answer</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
              className={formik.touched.answer && formik.errors.answer ? css['is-invalid'] : ''}
              type='answer'
              id='answer'
              name='answer'
            />
            {formik.touched.answer && formik.errors.answer && <p className={css['invalid-feedback']}>{formik.errors.answer}</p>}
          </div>
          <Button submit>Add</Button>
          <NavLink to={'/'} className={css['nav-link']}>
            Back to Questions
          </NavLink>
        </form>
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
