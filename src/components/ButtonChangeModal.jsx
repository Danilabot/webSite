import { useState } from 'react'
import styles from './styles/Item.module.css'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { ChangeModal } from '../UI/modal/ChangeModal'

export const ButtonChangeModal = (props) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!props.post) return null
  const handleSave = (updatedPost) => {
    props.onChange(updatedPost)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }
  return (
    <>
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
    </>
  )
}
