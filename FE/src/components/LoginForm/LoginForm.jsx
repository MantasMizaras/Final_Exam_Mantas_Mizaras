import css from './LoginForm.module.css';

import { useFormik } from 'formik';
import Button from '../UI/Button/Button';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log('values ===', values);
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input onChange={formik.handleChange} value={formik.values.email} type='email' id='email' name='email' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input onChange={formik.handleChange} value={formik.values.password} type='password' id='password' name='password' />
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
