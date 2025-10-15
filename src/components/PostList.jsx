import { PostItem } from './PostItem'
import styles from './styles/List.module.css'

export const PostList = ({ posts, postDelete, changePost, addPost }) => {
  return (
    <div className={styles.list}>
      <h1 className="spisok">Список постов</h1>
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
    </div>
  )
}
