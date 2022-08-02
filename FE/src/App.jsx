import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import QuestionPage from './pages/QuestionPage/QuestionPage';
import AnswerPage from './pages/AnswerPage/AnswerPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import QuestionsPageBEHOME from './pages/QuestionsPageBEHOME';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import AskQuestPage from './pages/AskQuestPage';
import EditQuestPage from './pages/EditQuestPage/EditQuestPage';
import EditAnswerPage from './pages/EditAnswerPage/EditAnswerPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Toaster autoClose={4000} />
      <Header />
      <Switch>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <Route path={'/questions'}>
          <QuestionPage />
        </Route>
        <ProtectedRoute path={'/editQuestion/:id'}>
          <EditQuestPage />
        </ProtectedRoute>
        <ProtectedRoute path={'/editAnswer/:id'}>
          <EditAnswerPage />
        </ProtectedRoute>
        <Route path={'/question/:id/answer'}>
          <AnswerPage />
        </Route>
        <ProtectedRoute path={'/add'}>
          <AskQuestPage />
        </ProtectedRoute>
        {/* <Route exact path={'/'}>
          <HomePage />
        </Route> */}
        <Route path={'*'}>
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
