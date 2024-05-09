import './App.css'
import { Routes,Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import EmployeeList from '../src/pages/EmployeeList/EmployeeList'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './components/context/AuthContext'


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='top-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/employeelist' element={<EmployeeList />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
