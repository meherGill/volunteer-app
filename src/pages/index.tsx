import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState , useEffect} from 'react'



const Home: NextPage = () => {

  const router = useRouter()
  const [userAuth , setuserAuth] = useState<boolean>(false);

  useEffect(() => {
    let auth_value : boolean = (localStorage.getItem("authenticated") === 'true')
    setuserAuth(auth_value)
    if (auth_value){
      router.push('/home')
    }
    else{
      router.push("/login")
    }
  }, [])
  
  return (
    <div>
      
    </div>
  )
}

export default Home
