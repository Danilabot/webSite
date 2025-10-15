import { ChangeModal } from '../UI/modal/ChangeModal'
import styles from './styles/Item.module.css'
import { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { LiaExchangeAltSolid } from 'react-icons/lia'

export const PostItem = (props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (updatedPost) => {
    props.onChange(updatedPost)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className={styles.item}>
      <div className={styles.post}>
        <h3 className={styles.title}>
          <h2 className={styles.numberPost}>{props.post.id}</h2>{' '}
          {props.post.title}
        </h3>

        <div className={styles.body}>{props.post.body || 'Нет описания'}</div>
      </div>
      <LiaExchangeAltSolid
        className={styles.buttonChange}
        onClick={() => setIsEditing(true)}
      />
      <ChangeModal
        post={props.post}
        isOpen={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <RiDeleteBin2Line
        className={styles.deletePost}
        onClick={() => props.postDelete(props.post)}
      />
    </div>
  )
}
