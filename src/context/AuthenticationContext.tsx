import React, { createContext, useContext } from 'react'

export enum roles {OWNER = 'OWNER', AGENT='AGENT'}

export interface User {
  email: string
  expDate: String | null
  name: String
  profile: {
    avatar: string
  },
  role: string
  _id: string
}

type TAuthContext = {
  setUser:(user: User) => void,
  getUser: () => User,
  setToken: (token:string) => void,
  logout: () => void,
  getToken: () => string,
  // setToken: 
}

const contextDefaultValue: TAuthContext = { } as TAuthContext

const authContext = createContext(contextDefaultValue)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setCurrentUser] = React.useState({} as User)
  const setToken = (token: string) => localStorage.setItem('ACCESS_TOKEN', token)
  const getToken = () => localStorage.getItem('ACCESS_TOKEN') || ''
  const setUser = (u: User) => setCurrentUser(u)
  const getUser = () => user
  const logout = () => localStorage.setItem('ACCESS_TOKEN', '')
  return (
    <authContext.Provider value={{ setToken, setUser, getUser, logout, getToken}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
export const useAuth = () => useContext(authContext)