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
        <>
            <div className="flex fixed w-full h-16 bg-cyan-500 justify-start p-2 z-10">
                <div className='grow-3'>
                    <input className="rounded-sm w-full h-full p-0 m-0"></input>
                </div>
                <div className='ml-3 grow-1'>
                    <div className="flex flex-row justify-around items-center">
                        <p>profile</p>
                        <button className="p-2 bg-red-700 rounded-md text-sky-50" onClick={handleSignOut}>sign out</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-16'></div>
        </>
    )
}

export default AppBar;
