import { useState } from 'react'
import { MyButton } from '../UI/button/MyButton'
import { MyInput } from '../UI/input/MyInput'

export const PostForm = ({ addPost }) => {
  const [text, setText] = useState({ title: '', body: '' })

  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
      ...text,
      id: Date.now(),
    }
    addPost(newPost)
    setText({ title: '', body: '' })
  }

  return (
    <div>
      <form>
        <MyInput
          type="text"
          placeholder="Название"
          value={text.title}
          onChange={(e) => setText({ ...text, title: e.target.value })}
        />
        <MyInput
          type="text"
          placeholder="Описание"
          value={text.body}
          onChange={(e) => setText({ ...text, body: e.target.value })}
        />
      </form>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}
      >
        <MyButton disabled={!text.title} onClick={addNewPost}>
          Добавить пост
        </MyButton>
      </div>
    </div>
  )
}
