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
    <>
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
      <MyButton disabled={!text.title} onClick={addNewPost}>
        Добавить пост
      </MyButton>
    </>
  )
}
