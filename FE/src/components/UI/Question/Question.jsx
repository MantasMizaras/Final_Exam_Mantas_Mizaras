import css from './Question.module.css';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../../store/AuthContext';

function QueCard(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();
  console.log('userId ===', userId);
  console.log('isUserLoggedIn ===', isUserLoggedIn);

  function handleValues() {
    localStorage.setItem('title', props.title);
    localStorage.setItem('content', props.content);
  }

  return (
    <div className={css.card}>
      {/* <div className={['card-text']}></div> */}
      <div className={css['card-title']}>
        <p>
          <strong>{props.title}</strong>
        </p>
        {/* </div> */}
        {/* <div className={css['card-content']}> */}
        <p>
          <strong>{props.content}</strong>
        </p>
      </div>
      <NavLink onClick={handleValues} to={`/question/${props.id}/answer`} className={css['see-answers']}>
        See Answers
      </NavLink>

      <div className={css['question-buttons']}>
        <div className={css['edited-at']}>
          <p className={css['card-edit']}>
            {props.edited_at && <strong>Edited at: </strong>}
            {props.edited_at?.split('T').join(' ').split('.000Z')}
          </p>
          <p className={css['card-edit']}>
            <strong>Created at: </strong>
            {props.created_at.split('T').join(' ').split('.000Z')}
          </p>
        </div>
        <div className={css['del-edit']}>
          {/* <NavLink to={`/${props.id}/answer`} className={css['see-answers']}>
            See Answers
          </NavLink> */}
        </div>
        <div className={css['edited-at']}>
          {+userId.userId === props.user_id && isUserLoggedIn && (
            <Button button primary onClick={() => props.onDelete(props.id)}>
              Delete
            </Button>
          )}
          <NavLink to={`/editQuestion/${props.id}`}>
            {+userId.userId === props.user_id && isUserLoggedIn && (
              <Button button primary onClick={handleValues}>
                Edit
              </Button>
            )}
          </NavLink>

          {/* <p className={css['card-edit']}>
            <strong>Edited at: </strong>
            {props.edited_at?.split('T').join(' ').split('.000Z')}{' '}
          </p>
          <p className={css['card-edit']}>
            <strong>Created at: </strong>
            {props.created_at.split('T').join(' ').split('.000Z')}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default QueCard;
