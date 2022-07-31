import css from './Question.module.css';
import Button from '../Button/Button';

function QueCard(props) {
  return (
    <div className={css.card}>
      <div className={['card-text']}></div>
      <h3 className={css['card-title']}>{props.title}</h3>
      <p className={css['card-content']}>{props.content}</p>

      <div className={css['question-buttons']}>
        <div className={css['like-dislike']}>
          <Button>Like</Button>
          <Button>Dislike</Button>
        </div>
        <div className={css['del-edit']}>
          {/* <Button>Delete</Button>
          <Button>Edit</Button> */}
        </div>
        <div className={css['edited-at']}>
          <p className={css['card-edit']}>
            <strong>Edited at: </strong>
            {props.edited_at.split('T').join(' ').split('.000Z')}{' '}
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

export default QueCard;
