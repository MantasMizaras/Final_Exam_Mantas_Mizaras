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

  const { isUserLoggedIn } = useAuthCtx();
  const { token } = useAuthCtx();
  const { id } = useParams();
  const [answers, setAnswers] = useState('');

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
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };
  const getAnswertDESC = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/answerdesc`);
    if (Array.isArray(fetchResult)) {
      setAnswers(fetchResult);
    }
  };

  const [updatedTitle, setUpdatedTitle] = useState({ title, content });

  useEffect(() => {
    setUpdatedTitle({ title, content });
  }, [title, content]);

  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (answers.length !== 0) {
  return (
    <div className={css['container']}>
      <h2 className={css['title']}>Question - {updatedTitle.title}</h2>
      <h3 className={css['content']}>{updatedTitle.content}</h3>

      {answers.length > 1 && (
        <>
          <div>
            <h3>Sort by creating time</h3>
            <Button onClick={getAnswerASC}>Newest</Button>
            <Button onClick={getAnswertDESC}>Oldest</Button>
          </div>
        </>
      )}
      <div className={css['cards-display']}>
        {answers.length > 0 ? (
          answers.map((sObj) => <AnswerCard key={sObj.id} {...sObj} onDelete={deleteAnswer} />)
        ) : (
          <h4 className={css['noAnswerMsg']}>NO ANSWERS YET.</h4>
        )}
      </div>
      {/* <AddAnswerForm onSubmit={getAnswers} /> */}
      {isUserLoggedIn && (
        <div className={css['form-container']}>
          <h3 className={css['form-title']}>Know answer? Post it!</h3>

          <form onSubmit={formik.handleSubmit} className={css['add-form']}>
            <div className={css['form-group']}>
              <label htmlFor='answer'></label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.answer}
                type='text'
                className={formik.touched.answer && formik.errors.answer ? css['is-invalid'] : ''}
                id='answer'
                name='answer'
              />
              {formik.touched.answer && formik.errors.answer && <p className={css['invalid-feedback']}>{formik.errors.answer}</p>}
            </div>
            <Button submit>Add</Button>
          </form>
          <NavLink to={'/questions'} className={css['nav-link']}>
            Back to Questions
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default AnswerPage;
