import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={css['not-found-container']}>
      <h1>Page not found</h1>
      <p className={css['message']}>Sorry, the page you are looking for does not exist.</p>
      <NavLink className={css['nav-link']} to={'/login'}>
        Go to login page
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
