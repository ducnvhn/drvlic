import React from 'react';
// import logo from './logo.svg';
import "antd/dist/antd.css"
import './App.css';
import AuthProvider from './context/AuthenticationContext';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import ProtectedRoute from './Utils/ProtectedRoute';
import Home from './components/Home'
import Login from './components/Login'

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
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
