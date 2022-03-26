import { IpcNetConnectOpts } from "net";

interface IProfilePicProps {
  imgLocation: string;
}
const ProfilePicture = ({ imgLocation }: IProfilePicProps) => {
  return (
    <div>
      <img src={imgLocation} className="h-44" />
    </div>
  );
};

export default ProfilePicture;
