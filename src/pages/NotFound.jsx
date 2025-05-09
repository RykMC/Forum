import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h2>404 Not FOUND</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;
