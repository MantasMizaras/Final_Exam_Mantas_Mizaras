import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AnswerPage from './pages/AnswerPage/AnswerPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import AskQuestPage from './pages/AskQuestPage';
import EditQuestPage from './pages/EditQuestPage/EditQuestPage';

function App() {
  return (
    <div className='App'>
      <Toaster />
      <Header />
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
        <Route path={'/editQuestion/:id'}>
          <EditQuestPage />
        </Route>
        <Route path={'/:id/answer'}>
          <AnswerPage />
        </Route>
        <Route path={'/add'}>
          <AskQuestPage />
        </Route>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
        <Route path={'*'}>
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
