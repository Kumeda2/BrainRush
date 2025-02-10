import { useSelector } from "react-redux";

export default function User() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="user-info">
      <div className="user-name">
        <p>Hi {user.username}!</p>
      </div>
    </div>
  );
}
