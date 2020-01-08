import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import FrontPage from './Containers/FrontPage/';
import TasksPage from './Containers/TasksPage/';
import {
  setInStorage,
  getFromStorage,
} from './utils/storage';
import { API_ROOT } from './Api/api'

const App = () => {
  const [token, setToken] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  const tryGetAuthToken = () => {
    const obj = getFromStorage('the_main_app');
    console.log('obj: ', obj)
    if (obj && obj.token) {
      const { token } = obj;
      fetch(`${API_ROOT}/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(token)
            setAuthenticated(true);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  } 

  useEffect(()=>{
    tryGetAuthToken()
  }, [])

  return (
    <div className="App">
      <Router>
        <Link to={'/'}>
          <div>Front-page</div>
        </Link>
        <Link to={'/tasks'}>
          <div>Tasks</div>
        </Link>
        <Switch>
          <Route path={'/tasks'}>
            <TasksPage/>
          </Route>
          <Route
              exact path={'/'}
              render={(props) => 
              <FrontPage
                {...props}  
                token={token} 
                loading={loading}
                setAuthenticated={setAuthenticated} 
                setLoading={setLoading}
              />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
