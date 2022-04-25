import { IpcNetConnectOpts } from 'net'

interface IProfilePicProps {
  imgLocation: string
}
const ProfilePicture = ({ imgLocation }: IProfilePicProps) => {
  return (
    <div>
      <img src={imgLocation} className="rounded-full h-14 w-14 shadow-lg object-cover" />
    </div>
  )
}

export default ProfilePicture
