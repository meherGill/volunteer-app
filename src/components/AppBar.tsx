import { useRouter } from 'next/router'
import ProfilePicture from './ProfilePicture'
import { SearchIcon } from '@heroicons/react/solid'

const AppBar = () => {
  const router = useRouter()

  const handleSignOut = () => {
    if (typeof window !== undefined) {
      localStorage.clear()
      router.push('/')
    }
  }
  return (
    <>
      <div>
        <div className="relative h-56 p-2 z-10">
          <div className="absolute top-3 right-2">
            <ProfilePicture imgLocation="/profilePic.jpeg"></ProfilePicture>
            <button className="absolute p-2 text-red-500 z-10 text-sm" onClick={handleSignOut}>
              SIGN OUT
            </button>
          </div>
          <div className="absolute bottom-0 w-full">
            <h1 className="font-sans text-3xl">Explore</h1>
            <h2 className="mt-2 font-sans text-gray-400">Give Support or Get Help</h2>
            <div className="mt-10 w-full flex justify-center">
              <div className="w-full flex p-2 justify-between bg-orange-100 relative rounded-lg">
                <input
                  type="text"
                  placeholder="Search Organisation or campaign"
                  className="input input-ghost input-sm w-full p-1 bg-orange-100 focus:outline-none active:outline-none mr-2"
                />
                <button className="btn btn-square btn-sm p-1 bg-teal-600 text-white rounded-none">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppBar
