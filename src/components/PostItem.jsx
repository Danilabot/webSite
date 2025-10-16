import styles from './styles/Item.module.css'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { ButtonChangeModal } from './ButtonChangeModal'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const PostItem = (props) => {
  const router = useNavigate()
  return (
    <div className={styles.item}>
      <div className={styles.post}>
        <h3 className={styles.title}>
          <h2 className={styles.numberPost}>{props.post.id}</h2>{' '}
          {props.post.title}
        </h3>

        <div className={styles.body}>{props.post.body || 'Нет описания'}</div>
      </div>
      <HiMiniMagnifyingGlass
        className={styles.OpenPost}
        onClick={() => router(`/posts/${props.post.id}`)}
      />
      <ButtonChangeModal post={props.post} onChange={props.onChange} />
      <RiDeleteBin2Line
        className={styles.deletePost}
        onClick={() => props.postDelete(props.post)}
      />
    </div>
  )
}
