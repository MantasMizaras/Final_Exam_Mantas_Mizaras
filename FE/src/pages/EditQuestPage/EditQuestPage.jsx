import { useFormik } from 'formik';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
// import { useAuthCtx } from '../../store/authContext';
// import { baseUrl, myEditAuth } from '../../utils';
import css from './EditQuestPage.module.css';
// import Button from '../../components/UI/Button/Button';
import { useEffect, useState } from 'react';
import { baseUrl, myEditAuth } from '../../utils';
import Button from '../../components/UI/Button/Button';
import { useAuthCtx } from '../../store/AuthContext';

function EditQuestPage() {
  const title = localStorage.getItem('title');
  const content = localStorage.getItem('content');

  const [updatedTitle, setUpdatedTitle] = useState({ title, content });

  useEffect(() => {
    setUpdatedTitle({ title, content });
  }, [title, content]);

  const history = useHistory();
  const { token } = useAuthCtx();
  console.log('token ===', token);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: updatedTitle,
    validationSchema: Yup.object({
      title: Yup.string().min(5, 'At least 5 characters').max(255, 'Maximum title length reached').required('Title required'),
      content: Yup.string()
        .min(5, 'At least 5 characters')
        .max(500, 'Maximum content length reached')
        .required('Content required'),
    }),

    onSubmit: async (values) => {
      myEditAuth(id);
      // const valueCopy = { ...values };

      const editResult = await myEditAuth(`${baseUrl}/api/question/${id}`, 'PATCH', token, values);

      if (editResult === 'Question succesfully updated!') {
        toast.success('Question was edited.');
        history.replace('/');
      }
      //   console.log('addResult ===', editResult);
      if (editResult === 'Question was not updated!') {
        toast.error('Question edit failed.');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Edit a question</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor='title'>Edit title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type='text'
            className={formik.touched.title && formik.errors.title ? css['invalid'] : ''}
            id='title'
            name='title'
          />
          {formik.touched.title && formik.errors.title && <p className={css['error-msg']}>{formik.errors.title}</p>}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='content'>Edit content</label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            type='content'
            className={formik.touched.content && formik.errors.content ? css['invalid'] : ''}
            id='content'
            name='content'
          ></textarea>
          {formik.touched.content && formik.errors.content && <p className={css['error-msg']}>{formik.errors.content}</p>}
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

export default EditQuestPage;
