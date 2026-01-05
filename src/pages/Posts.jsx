import { useEffect, useState, useRef } from 'react'
import { PostForm } from '../components/PostForm'
import { PostFilter } from '../components/PostFilter'
import { MyModal } from '../UI/modal/MyModal'
import { MyButton } from '../UI/button/MyButton'
import { usePosts } from '../hooks/usePost'
import PostService from '../API/PostService'
import { Loader } from '../UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'
import { getPageCount } from '../components/utils/pages'
import { Pagination } from '../UI/pagination/Pagination'
import { useSavePosts } from '../hooks/useSavePost'
import { handleDragEnd } from '../components/utils/dragHandlers'
import { PostsDndContainer } from '../components/PostsDndContainer'
import { PiPhoneDisconnect } from 'react-icons/pi'
import styles from './Posts.module.css'


function Posts() {
  const [posts, setPosts] = useState([])
  const [savePosts, setSavePosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const sortedAndSearchedSavePosts = useSavePosts(
    savePosts,
    filter.sort,
    filter.query
  )
  const lastElement = useRef()
  const observer = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    if (isPostsLoading) return
    if (observer.current) observer.current.disconnect()
    let callback = function (entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(page + 1)
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElement.current)
  }, [isPostsLoading])

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const addPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const changePost = (nextPost) => {
    setPosts(
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
    setPosts(posts.filter((d) => d.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }
  const postSaveDelete = (post) => {
    setSavePosts(savePosts.filter((d) => d.id !== post.id))
  }

  const changeSavePost = (nextPost) => {
    setSavePosts(
      savePosts.map((savePost) => {
        if (savePost.id === nextPost.id) {
          return nextPost
        } else {
          return savePost
        }
      })
    )
  }

  const onDragEnd = (event) => {
    handleDragEnd(event, posts, setPosts, savePosts, setSavePosts)
  }

  return (
    <div className={styles.app}>
      <MyButton className={styles.buttonPost} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm addPost={addPost} />
      </MyModal>
      <hr style={{ margin: '10px 0px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError} </h1>}
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      )}

      <div className={styles.containerList}>
        <PostsDndContainer
          onDragEnd={onDragEnd}
          sortedAndSearchedPosts={sortedAndSearchedPosts}
          sortedAndSearchedSavePosts={sortedAndSearchedSavePosts}
          addPost={addPost}
          postDelete={postDelete}
          changePost={changePost}
          postSaveDelete={postSaveDelete}
          changeSavePost={changeSavePost}
          savePosts={savePosts}
        />
      </div>
      <div
        ref={lastElement}
        style={{ height: '20px', background: 'white' }}
      ></div>
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  )
}

export default Posts
