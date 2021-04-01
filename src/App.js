// import logo from './logo.svg';
import React ,{useState} from 'react';
import Poll from 'react-polls';
import './App.css';
import Sidebar from './Whatsapp-clone/Sidebar';
import Chat from './Whatsapp-clone/Chat'

import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Login from './Whatsapp-clone/Login';
import { useStateValue } from './StateProvider';
function App() {
  // Authentication
  // const [user, setuser] = useState(null);
  // lets pull the user from the reducer

  const [{user} , dispatch] = useStateValue();

  return (
    <div className="app">
      {
        !user ? (
          <Login></Login>
        ): (

      <div className="app_body">
        <Router>
          <Sidebar></Sidebar>
          <Switch>
          <Route path = '/rooms/:roomId'>
              <Chat></Chat>
          </Route>
          <Route path = '/'>
            <Chat></Chat>
          </Route>
          </Switch>
          <Poll></Poll>
        </Router>


      </div>
        )
      }
    </div>
  );
}

export default App;
