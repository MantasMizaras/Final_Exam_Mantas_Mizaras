import css from './RegisterForm.module.css';

import { useFormik } from 'formik';
import Button from '../UI/Button/Button';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log('values ===', values);
    },
  });

  return (
    <div className={css['form-container']}>
      <h1>Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input onChange={formik.handleChange} value={formik.values.email} type='email' id='email' name='email' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input onChange={formik.handleChange} value={formik.values.password} type='password' id='password' name='password' />
        </div>
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
          />
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
}

export default RegisterForm;
