
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import  {login,logout} from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom' 


function App() {
  
  //making a loading state so that we can do conditional rendering because it takes some time to fetch data from ither networks databases and servers
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  //when site gets load ask to service of ur are loged in or not
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }         
    })
    .finally(()=>setLoading(false))
  },[])

    return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className='w-full block'>
          <Header/>
          <main>  
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    ): null
}

export default App
