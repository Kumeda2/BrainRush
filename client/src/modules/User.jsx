import { useSelector } from "react-redux";
import userIcon from "../assets/images/user.webp";

export default function User() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="user-info">
      <div className="avatar">
        <img src={userIcon} alt="avatar" />
      </div>
      <div className="user-name">
        <p>{user.username}</p>
      </div>
    </div>
  );
}
