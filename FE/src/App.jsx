import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className='App'>
      <h1>Hello world</h1>
      <Switch>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <Route path={'/questions'}>
          <QuestionsPage />
        </Route>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
        <Route path={'*'}>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
