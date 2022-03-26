import type { NextPage } from 'next'
import Palette from '../../public/Colors'

const Login : NextPage = () => {
	{console.log("login")}
   return (
	   <div className='h-screen w-screen bg-bg1-500 flex justify-center items-center'>
		   <div className='flex flex-col justify-around items-center rounded-md drop-shadow-xl w-150 h-64 bg-bg2-500'>
			   <h1 className="h-5 text-2xl tracking-wider font-bold text-pFont-500">LOGIN</h1>
			   <div className='text-sFont'>
					<div className='w-full flex justify-end mb-2'>
						<label htmlFor="email" className='mr-4'>Email</label>
						<input type="email" name="email" className="bg-btn-500 rounded-md text-lFont-500"></input>
					</div>
					<div className='w-full flex justify-end'>
						<label htmlFor="password" className='mr-4'>Password</label>
						<input type="password" name="password" className="bg-btn-500 rounded-md text-lFont-500"></input>
					</div>
				</div>
				<div className="flex">
				   <button className='bg-btn-500 w-36 h-8 mr-8 rounded-sm'>Register</button>
				   <button className='bg-btn-500 w-36 h-8 ml-8 rounded-sm'>Login</button>
				</div>
			</div>
	   </div>
   ) 
}

export default Login