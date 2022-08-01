import css from './AddQuestForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetchAuth } from '../../utils';
import toast from 'react-hot-toast';
import Button from '../UI/Button/Button';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';

const initValues = {
  title: '',
  content: '',
};
function AddQuestForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(5, 'At least 5 symbols are required').max(255, 'Up to 255 symbols are allowed').required(),
      content: Yup.string().min(20, 'At least 20 symbols are required').max(555, 'Up to 555 symbols are allowed').required(),
    }),
    onSubmit: async (values) => {
      const addFetch = await myFetchAuth(`${baseUrl}/api/question`, 'POST', token, values);
      if (addFetch === 'Question succesfully created!') {
        {
          toast.success('New question has been added!');
          history.replace('/');
        }
        if (addFetch === 'Question was not added!') {
          toast.error('Error while adding a question. Please try again.');
          return;
        }
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Ask question!</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='title'>Title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={formik.touched.title && formik.errors.title ? css['is-invalid'] : ''}
            type='title'
            id='title'
            name='title'
          />
          {formik.touched.title && formik.errors.title && <p className={css['invalid-feedback']}>{formik.errors.title}</p>}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='content'>Content</label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className={formik.touched.content && formik.errors.content ? css['is-invalid'] : ''}
            type='content'
            id='content'
            name='content'
          />
          {formik.touched.content && formik.errors.content && <p className={css['invalid-feedback']}>{formik.errors.content}</p>}
        </div>
        <Button>Add</Button>
      </form>
    </div>
  );
}

export default AddQuestForm;
