import { useContext, useState } from 'react'
import { MyButton } from '../UI/button/MyButton'
import { MyInput } from '../UI/input/MyInput'
import { AuthContext } from '../context/context'
import styles from './Login.module.css'

export const Login = () => {
  const { login, error } = useContext(AuthContext)
  const [formData, setFormData] = useState({ login: '', password: '' })

  const handleLogin = (event) => {
    event.preventDefault()
    const seccess = login(formData.userName, formData.password)
    if (seccess) {
      alert('Успешный вход')
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  return (
    <div className={styles.login}>
      <h1 className={styles.text_login}> Зарегистрироваться </h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <MyInput
          type="text"
          placeholder="Введите логин"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <MyInput
          type="password"
          placeholder="Введите пароль"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <div> {error}</div>}
        <MyButton className={styles.button} type="sybmit">
          Войти
        </MyButton>
      </form>
    </div>
  )
}
