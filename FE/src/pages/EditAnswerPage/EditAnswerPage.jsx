import { useFormik } from 'formik';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './EditAnswerPage.module.css';
import { useEffect, useState } from 'react';
// import { baseUrl, myEditAuth } from '../../utils';
import Button from '../../components/UI/Button/Button';
import { useAuthCtx } from '../../store/AuthContext';
import { baseUrl, myEditAuth } from '../../utils';

function EditAnswerPage() {
  const answer = localStorage.getItem('answer');

  const [updatedAnswer, setUpdatedAnswer] = useState({ answer });

  useEffect(() => {
    setUpdatedAnswer({ answer });
  }, [answer]);

  const history = useHistory();
  const { token } = useAuthCtx();
  console.log('token ===', token);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: updatedAnswer,
    validationSchema: Yup.object({
      answer: Yup.string().min(10, 'At least 10 symbols are required').max(555, 'Up to 555 symbols are allowed').required(),
    }),

    onSubmit: async (values) => {
      myEditAuth(id);
      const editResult = await myEditAuth(`${baseUrl}/api/answer/${id}`, 'PATCH', token, values);

      if (editResult === 'Answer succesfully updated!') {
        toast.success('Answer was edited.');
        history.goBack();
      }
      if (editResult === 'Answer was not updated!') {
        toast.error('Answer edit failed.');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Edit an answer</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor='answer'>Edit answer</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.answer}
            type='text'
            className={formik.touched.answer && formik.errors.answer ? css['invalid'] : ''}
            id='answer'
            name='answer'
          />
          {formik.touched.answer && formik.errors.answer && <p className={css['error-msg']}>{formik.errors.answer}</p>}
        </div>
        <Button submit primary>
          Update
        </Button>
        <NavLink to={'/'} className={css['nav-link']}>
          Back to questions
        </NavLink>
      </form>
    </div>
  );
}

export default EditAnswerPage;
