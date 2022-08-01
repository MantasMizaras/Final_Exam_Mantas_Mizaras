import css from './AddAnswerForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl, myFetchAuth } from '../../utils';
import toast from 'react-hot-toast';
import Button from '../UI/Button/Button';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
// import { getAnswers } from '../../../../src/controllers/answerController';

const initValues = {
  answer: '',
};

function AddAnswerForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const { id } = useParams();
  // const [answers, setAnswers] = useState([]);

  // const getAnswers = async (values) => {
  //   const fetchResult = await myFetch(`${baseUrl}/api/question/${id}/answer`, 'GET', values);
  //   if (Array.isArray(fetchResult)) {
  //     setAnswers(fetchResult);
  //   }
  // };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string().min(10, 'At least 10 symbols are required').max(555, 'Up to 555 symbols are allowed').required(),
    }),
    onSubmit: async (values) => {
      const addFetch = await myFetchAuth(`${baseUrl}/api/question/${id}/answer`, 'POST', token, values);
      if (addFetch === 'Answer succesfully added!') {
        toast.success('Your answer has been added!');
        history.go(0);
      }
      if (addFetch === 'Answer was not added!') {
        toast.error('Error while adding an answer. Please try again.');
        return;
      }
    },
  });

  return (
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
  );
}

export default AddAnswerForm;
