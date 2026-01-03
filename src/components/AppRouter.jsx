import { Route, Routes, Navigate, Link } from 'react-router-dom'
import { privateRoutes, publicRoutes, routes } from '../router/routes'
import { useContext } from 'react'
import { AuthContext } from '../context/context'
import { Loader } from '../UI/Loader/Loader'

export const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          Component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}

      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          Component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
