import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import css from './HomePage.module.css';

function HomePage() {
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <div className={css['home-container']}>
      <h1>Welcome, to the forum.</h1>

      {!isUserLoggedIn && (
        <h3>
          In this Forum you can find questions about ARMY themes, answers. If you want ask something or know everything and want
          share some information with others, just create an account and enjoy it!
        </h3>
      )}
      <NavLink to={'/questions'} className={css['nav-link']}>
        Check questions!
      </NavLink>
    </div>
  );
}

export default HomePage;
