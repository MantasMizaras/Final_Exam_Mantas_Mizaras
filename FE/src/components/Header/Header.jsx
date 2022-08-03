import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import toast from 'react-hot-toast';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();
  return (
    <header>
      <nav className={css.header}>
        <NavLink to='/'>
          <img className={css.img} src='../img/skills.png' alt='logoNav' to={'/'} />
        </NavLink>
        <div className={css['nav-container']}>
          <NavLink className={css['nav-link']} to={'/questions'}>
            Questions
          </NavLink>
          {isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/add'}>
                Ask Question!
              </NavLink>
              <div className={css['nav-control-display']}></div>
              {<p className={css.email}>Logged in: {userEmail}</p>}
              <NavLink
                onClick={() => {
                  logout();
                  isUserLoggedIn ? toast.success('You are logged out.') : toast.error('Error in logout.');
                }}
                className={css['nav-link']}
                to={'/login'}
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
        {!isUserLoggedIn && (
          <>
            <div className={css['nav-control-display']}>
              <NavLink className={css['nav-link']} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={css['nav-link']} to={'/register'}>
                Register
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
