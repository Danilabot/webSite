import { useContext } from 'react'
import { MyButton } from '../UI/button/MyButton'
import { MyInput } from '../UI/input/MyInput'
import { AuthContext } from '../context/context'
import styles from './Login.module.css'

export const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const Login = (event) => {
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }
  return (
    <div className={styles.login}>
      <h1 className={styles.text_login}> Зарегистрироваться </h1>
      <form onSubmit={Login} className={styles.form}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton className={styles.button}>Войти</MyButton>
      </form>
    </div>
  )
}
