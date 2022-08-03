import css from './Answer.module.css';
import Button from '../Button/Button';
import { useAuthCtx } from '../../../store/AuthContext';
import { NavLink } from 'react-router-dom';

function AnswerCard(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();

  function handleValues() {
    localStorage.setItem('answer', props.answer);
  }

  return (
    <div className={css.card}>
      {/* <div className={['card-text']}></div> */}
      <div className={css['card-title']}>
        <p>
          <strong>{props.answer}</strong>
        </p>
      </div>

      {/* <div className={css['answer-created']}>
        <div className={css['like-dislike']}>
          <Button>Like</Button>
          <Button>Dislike</Button>
        </div>
      </div> */}
      <div className={css['answer-created']}>
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
          <NavLink to={`/editAnswer/${props.id}`}>
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

export default AnswerCard;
