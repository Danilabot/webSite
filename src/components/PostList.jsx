import { PostItem } from './PostItem'
import styles from './styles/List.module.css'
import { SortableContext } from '@dnd-kit/sortable'

export const PostList = ({ posts, postDelete, changePost, addPost }) => {
  return (
    <div className={styles.list}>
      <SortableContext items={posts.map((todo) => todo.id)}>
        <h1 className={styles.spisok}>Список постов</h1>
        {!posts.length && <h1 className={styles.text}>Постов нет</h1>}
        {posts.map((post, index) => (
          <PostItem
            key={post.id}
            number={index + 1}
            post={post}
            postDelete={postDelete}
            onChange={changePost}
            addPost={addPost}
          />
        ))}
      </SortableContext>
    </div>
  )
}
