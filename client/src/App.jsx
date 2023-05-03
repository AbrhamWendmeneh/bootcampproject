import { useState } from 'react'
import './App.css'
import HomePage from './HomePage' 
import ManageTask from './Manage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithAuth from './withAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="app">
     
      <Router>
        <ToastContainer/>
          <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          {/* <Route path='/manage' element={<ManageTask/>}/>  */}
          <Route exact path='/' element={<WithAuth/>}> 
            <Route path="/manage" element={<ManageTask/>} />

          </Route>
          
          </Routes>
      </Router>
     </div>
  )
}

export default App
