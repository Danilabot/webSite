import styles from './styles/Item.module.css'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { ButtonChangeModal } from './ButtonChangeModal'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const PostItem = (props) => {
  const router = useNavigate()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.post.id,
      disabled: props.isSaved,
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className={props.isSaved ? styles.savedPost : styles.item}
      ref={setNodeRef}
      style={style}
      {...(!props.isSaved ? { ...attributes } : {})}
    >
      <div
        className={styles.post}
        {...(!props.isSaved ? { ...listeners } : {})}
      >
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
