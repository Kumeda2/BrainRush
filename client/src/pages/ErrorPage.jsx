import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">
        Go back to the <span>main</span> page
      </Link>
    </div>
  );
}
