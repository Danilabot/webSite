import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
export const Navbar = () => {
  return (
    <div className={styles.navbar}>
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
