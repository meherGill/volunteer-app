import type { NextPage } from 'next'
import AppBar from '../components/AppBar'
import MainUser from '@components/VolunteerMain'
const Home : NextPage = () => {
    {console.log("home")}
   return (
       <div className='w-screen h-screen'>
           <AppBar/>
           <MainUser />
       </div>
   ) 
}

export default Home