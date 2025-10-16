import { Route, Routes, Navigate, Link } from 'react-router-dom'
import { About } from '../pages/About'
import Posts from '../pages/Posts'
import { PostIdPage } from '../pages/PostIdPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/about" element={<About />} />
      <Route exact path="/posts" element={<Posts />} />
      <Route exact path="/posts/:id" element={<PostIdPage />} />

      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  )
}
