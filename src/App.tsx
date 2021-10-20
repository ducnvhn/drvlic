import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthProvider from './context/AuthenticationContext';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {
  ThemeProvider
} from '@material-ui/styles'
import { theme } from './Utils/MUTheme'
import ProtectedRoute from './Utils/ProtectedRoute';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

export interface AState {
  people: {
    name: String,
    age: number,
    url: string,
    note: string
  }[]
}
function App() {
  // const [people, setPeople] = React.useState<AState['people']>([])
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
