import css from './LoginForm.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { myFetch, baseUrl } from '../../utils';
import { useAuthCtx } from '../../store/AuthContext';
import Button from '../UI/Button/Button';
import toast from 'react-hot-toast';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your e-mail').required('E-mail required'),
      password: Yup.string()
        .min(5, 'At least 5 symbols are required')
        .max(20, 'Up to 20 symbols are allowed')
        .required('Password required'),
    }),
    onSubmit: async (values) => {
      const fetchLoginResult = await myFetch(`${baseUrl}/api/login`, 'POST', values);
      console.log('fetchLoginResult ===', fetchLoginResult);
      console.log('values ===', values);

      if (fetchLoginResult.success === true) {
        toast.success(`Successfully logged in: ${values.email}`);
        ctx.login(fetchLoginResult.token, values.email);
        history.replace('/');
      }

      if (!fetchLoginResult.token) {
        toast.error('Login unsuccessful!');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            id='email'
            name='email'
            className={formik.touched.email && formik.errors.email ? css['is-invalid'] : ''}
          />
          {formik.touched.email && formik.errors.email && <p className={css['invalid-feedback']}>{formik.errors.email}</p>}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            id='password'
            name='password'
            className={formik.touched.password && formik.errors.password ? css['is-invalid'] : ''}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={css['invalid-feedback']}>{formik.errors.password}</p>
          )}
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
