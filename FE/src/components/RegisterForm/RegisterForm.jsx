import css from './RegisterForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { myFetch, baseUrl } from '../../utils';
import Button from '../UI/Button/Button';
import toast from 'react-hot-toast';

const initValues = {
  nickname: '',
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      nickname: Yup.string().min(3, 'At least 3 characters').required('Nickname required'),
      email: Yup.string().email('Please check your email').required('E-mail required'),
      password: Yup.string()
        .min(5, 'At least 5 characters')
        .max(20, 'Up to 20 symbols are allowed')
        .required('Password required'),
      repeatPassword: Yup.string()
        .required('Please repeat password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),
    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      const registerResult = await myFetch(`${baseUrl}/api/register`, 'POST', valuesCopy);

      if (registerResult === 'User successfully created!') {
        toast.success(`Success! Account: ${values.email} created!`);
        history.replace('/login');
      }
      if (registerResult === 'User not created.') {
        toast.error(`New user wasn't created`);
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='nickname'>Nickname</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nickname}
            type='text'
            id='nickname'
            name='nickname'
            className={formik.touched.nickname && formik.errors.nickname ? css['is-invalid'] : ''}
          />
          {formik.touched.nickname && formik.errors.nickname && (
            <p className={css['invalid-feedback']}>{formik.errors.nickname}</p>
          )}
        </div>
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
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
            className={formik.touched.repeatPassword && formik.errors.repeatPassword ? css['is-invalid'] : ''}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className={css['invalid-feedback']}>{formik.errors.repeatPassword}</p>
          )}
        </div>
        <Button submit>Register</Button>
      </form>
    </div>
  );
}

export default RegisterForm;
