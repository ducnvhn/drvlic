import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import {
  useAuth
} from '../context/AuthenticationContext'

interface IProps {
  path: string
}

const ProtectedRoute: React.FC<IProps> = ({ children, ...rest }) => {
  const { getToken } = useAuth()
  const token = getToken()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token && token!=='' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute