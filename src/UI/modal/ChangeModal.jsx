import { MyInput } from '../input/MyInput'
import { MyModal } from './MyModal'
import { MyButton } from '../button/MyButton'
import { useEffect, useState } from 'react'

export const ChangeModal = ({ isOpen, post, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(post.title)
  const [editedBody, setEditedBody] = useState(post.body)

  useEffect(() => {
    if (isOpen) {
      setEditedTitle(post.title)
      setEditedBody(post.body)
    }
  }, [isOpen, post.title, post.body])

  const handleSave = () => {
    onSave({
      ...post,
      title: editedTitle,
      body: editedBody,
    })
  }

  if (!isOpen) return null

  return (
    <MyModal visible={isOpen} setVisible={onCancel}>
      <h2>Редактирование поста</h2>

      <div>
        <label key="title-label">Заголовок:</label>
        <MyInput
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Введите заголовок"
        />

        <label key="body-label">Описание:</label>
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          placeholder="Введите описание"
          rows={4}
        />

        <div>
          <MyButton onClick={handleSave}>Сохранить</MyButton>
          <MyButton onClick={onCancel}>Отмена</MyButton>
        </div>
      </div>
    </MyModal>
  )
}
