import { arrayMove } from '@dnd-kit/sortable'

export const handleDragEnd = (
  event,
  posts,
  setPosts,
  savePosts,
  setSavePosts
) => {
  const { active, over } = event
  if (over?.data?.current?.type === 'dropzone') {
    const postId = active.id

    const draggedPost = posts.find((post) => post.id === postId)

    if (draggedPost) {
      setPosts(posts.filter((post) => post.id !== postId))
      setSavePosts([...savePosts, draggedPost])
    }
  } else if (active && over && active.id !== over.id) {
    const draggedFromIndex = posts.findIndex((post) => post.id === active.id)
    const draggedToIndex = posts.findIndex((post) => post.id === over.id)
    const newPosts = arrayMove(posts, draggedFromIndex, draggedToIndex)
    setPosts(newPosts)
  }
}
