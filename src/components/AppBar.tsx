import { useRouter } from "next/router"


const AppBar = () => {
    const router = useRouter()
    
    const handleSignOut = () => {
            if (typeof window !== undefined){
            localStorage.clear()
            router.push("/")
        }
    }
    return(
        <div className="flex fixed w-full h-16 bg-btn-500 justify-start p-2 z-10">
            <div className='grow-3'>
                <input className="rounded-sm w-full h-full p-0 m-0"></input>
            </div>
            <div className='ml-3 grow-1'>
                <span>
                    <p>profile</p>
                    <button onClick={handleSignOut}>sign out</button>
                </span>
            </div>
        </div>
    )
}

export default AppBar;
