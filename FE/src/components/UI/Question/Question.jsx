import css from './Question.module.css';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../../store/AuthContext';

function QueCard(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();
  console.log('userId ===', userId);
  console.log('isUserLoggedIn ===', isUserLoggedIn);

  return (
    <div className={css.card}>
      <div className={['card-text']}></div>
      <h3 className={css['card-title']}>{props.title}</h3>
      <p className={css['card-content']}>{props.content}</p>
      <NavLink to={`/${props.id}/answer`} className={css['see-answers']}>
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
          <Button>Edit</Button>
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
