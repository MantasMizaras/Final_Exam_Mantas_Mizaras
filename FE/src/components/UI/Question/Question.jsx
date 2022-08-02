import css from './Question.module.css';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../../store/AuthContext';

function QueCard(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();

  function handleValues() {
    localStorage.setItem('title', props.title);
    localStorage.setItem('content', props.content);
  }

  return (
    <div className={css.card}>
      <div className={css['card-title']}>
        <p>
          <strong>{props.title}</strong>
        </p>
        <p>
          <strong>{props.content}</strong>
        </p>
      </div>
      <NavLink onClick={handleValues} to={`/question/${props.id}/answer`} className={css['see-answers']}>
        Check answers
      </NavLink>

      <div className={css['question-created']}>
        <div>
          <p className={css['card-edit']}>
            {props.edited_at && <strong>Edited at: </strong>}
            {props.edited_at?.split('T').join(' ').split('.000Z')}
          </p>
          <p className={css['card-edit']}>
            <strong>Created at: </strong>
            {props.created_at.split('T').join(' ').split('.000Z')}
          </p>
        </div>
        {/* <div className={css['del-edit']}></div> */}
        {/* <div className={css['like-dislike']}>
          <Button>Like</Button>
          <Button>Dislike</Button>
        </div> */}
        <div className={css['edited-at']}>
          {+userId.userId === props.user_id && isUserLoggedIn && (
            <Button button secondary onClick={() => props.onDelete(props.id)}>
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
        </div>
      </div>
    </div>
  );
}

export default QueCard;
