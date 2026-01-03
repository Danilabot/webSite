import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { MyButton } from '../button/MyButton'
import { useContext } from 'react'
import { AuthContext } from '../../context/context'
export const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <div className={styles.navbar}>
      <MyButton onClick={logout}>Выйти</MyButton>
      <div className={styles.navbar__links}>
        <Link className={styles.post} to="/Posts">
          {' '}
          Посты{' '}
        </Link>
        <Link className={styles.about} to="/About">
          О сайте{' '}
        </Link>
      </div>
    </div>
  )
}
