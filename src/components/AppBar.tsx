import { useRouter } from "next/router"
import ProfilePicture from "./ProfilePicture"
import { SearchIcon } from "@heroicons/react/solid"

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
        <div>
            <div className="relative h-56 p-2 z-10">
                <div className="absolute top-3 right-2">
                    <ProfilePicture imgLocation="/profilePic.jpeg"></ProfilePicture>
                    <button className="absolute p-2 text-red-500 z-10" onClick={handleSignOut}>SIGN OUT</button>
                </div>
                <div className="absolute bottom-0 w-full">
                    <h1 className="font-sans text-3xl">Explore</h1>
                    <h2 className="mt-2 font-sans text-gray-400">Give Support or Get Help</h2>
                    <div className="mt-10 w-full flex justify-center">
                        <div className="flex w-full p-2 items-center pr-4">
                            <input type="text" placeholder="Search Organisation or campaign" 
                                className="w-full p-1 bg-orange-100"></input>
                            <button className="relative right-8 w-8 h-8 rounded-sm bg-green-300"><SearchIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AppBar;
