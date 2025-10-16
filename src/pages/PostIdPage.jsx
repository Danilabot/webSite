import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import { Loader } from '../UI/Loader/Loader'

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
    <div>
      <h1>Posts Page with ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h5>{comment.email}</h5>
              <div> {comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
