import css from './Answer.module.css';
import Button from '../Button/Button';
import { useAuthCtx } from '../../../store/AuthContext';

function AnswerCard(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <div className={css.card}>
      <div className={['card-text']}></div>
      <h3 className={css['card-title']}>{props.user_id}</h3>
      <p className={css['card-content']}>{props.answer}</p>

      <div className={css['question-buttons']}>
        <div className={css['like-dislike']}>
          <Button>Like</Button>
          <Button>Dislike</Button>
        </div>
        <div className={css['del-edit']}>
          {+userId.userId === props.user_id && isUserLoggedIn && (
            <Button button primary onClick={() => props.onDelete(props.id)}>
              Delete
            </Button>
          )}
          <Button>Edit</Button>
        </div>
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
      </div>
    </div>
  );
}

export default AnswerCard;
