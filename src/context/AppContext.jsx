import { createContext, useContext, useState, useCallback } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

// Safely parse stored user
const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('khoj_user') || 'null') }
  catch { return null }
}

export function AppContext({ children }) {
  const [user,  setUser]  = useState(getStoredUser)
  const [token, setToken] = useState(() => localStorage.getItem('khoj_token') || null)

  const isAuthenticated = !!token

  // Called after login or register succeeds
  const login = useCallback(({ user, token }) => {
    localStorage.setItem('khoj_token', token)
    localStorage.setItem('khoj_user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }, [])

  // Called on logout
  const logout = useCallback(() => {
    localStorage.removeItem('khoj_token')
    localStorage.removeItem('khoj_user')
    setToken(null)
    setUser(null)
  }, [])

  // Refresh user from backend
  const refreshUser = useCallback(async () => {
    try {
      const res = await authAPI.getMe()
      const updated = res.data
      localStorage.setItem('khoj_user', JSON.stringify(updated))
      setUser(updated)
    } catch {
      logout()
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook for consuming auth anywhere
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AppContext')
  return ctx
}

export default AppContext