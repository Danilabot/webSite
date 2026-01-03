import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import { Loader } from '../UI/Loader/Loader'
import styles from './PostIdPage.module.css'

export const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })

  const [fetchComments, isCommentsLoading, errorComments] = useFetching(
    async () => {
      const response = await PostService.getCommentsByPostId(params.id)
      setComments(response.data)
    }
  )
  useEffect(() => {
    fetchPostById()
    fetchComments()
  }, [params.id])
  return (
    <div className={styles.page}>
      <h1>Posts Page with ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1 style={{ marginBottom: '20px', marginTop: '10px' }}>Комментарии</h1>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.email}</h3>
              <div style={{ marginBottom: '20px' }}> {comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
