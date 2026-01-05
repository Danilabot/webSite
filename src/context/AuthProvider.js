import { authPassword } from '../config/auth'
import { useState, useEffect } from 'react'
import { AuthContext } from './context'

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: localStorage.getItem('isAuth') === 'true',
    user: localStorage.getItem('user') || null,
    error: null,
    isLoading: false,
  })
  useEffect(() => {
    setAuthState((prev) => ({ ...prev, isLoading: false }))
  }, [])
  const login = (userName, password) => {
    console.log('Введенные данные:', { userName, password })
    console.log('Правильные данные:', authPassword)
    console.log('Сравнение логина:', userName === authPassword.userName)
    console.log('Сравнение пароля:', password === authPassword.password)
    if (
      userName === authPassword.userName &&
      password === authPassword.password
    ) {
      console.log('yes')
      const newAuthState = {
        isAuth: true,
        user: userName,
        error: null,
        isLoading: false,
      }
      setAuthState(newAuthState)
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', userName)
      return true
    } else {
      setAuthState((prev) => ({
        ...prev,
        error: alert('Неверный логин или пароль'),
      }))
      return false
    }
  }
  const logout = () => {
    setAuthState({
      isAuth: false,
      user: null,
      error: null,
      isLoading: false,
    })
    localStorage.removeItem('isAuth')
    localStorage.removeItem('user')
  }
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
