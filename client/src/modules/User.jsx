import user from "../assets/images/user.webp";

export default function User() {
  return (
    <div className="user-info">
      <div className="avatar">
        <img src={user} alt="avatar" />
      </div>
      <div className="user-name">
        <p>Username</p>
      </div>
    </div>
  );
}
