import { useEffect, useState } from 'react'
import './App.css'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import { PostFilter } from './components/PostFilter'
import { MyModal } from './UI/modal/MyModal'
import { MyButton } from './UI/button/MyButton'
import { usePosts } from './hooks/usePost'
import PostService from './API/PostService'
import { Loader } from './UI/Loader/Loader'
import { useFetching } from './hooks/useFetching'
import { getPageCount } from './components/utils/pages'
import { Pagination } from './UI/pagination/Pagination'
function App() {
  const [posts, setPost] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPost(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

  const addPost = (newPost) => {
    setPost([...posts, newPost])
    setModal(false)
  }

  const changePost = (nextPost) => {
    setPost(
      posts.map((post) => {
        if (post.id === nextPost.id) {
          return nextPost
        } else {
          return post
        }
      })
    )
  }

  const postDelete = (post) => {
    setPost(posts.filter((d) => d.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: '30px', height: '40px', width: '130px' }}
        onClick={() => setModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm addPost={addPost} />
      </MyModal>

      <hr style={{ margin: '10px 0px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError} </h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          addPost={addPost}
          posts={sortedAndSearchedPosts}
          postDelete={postDelete}
          changePost={changePost}
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  )
}

export default App
