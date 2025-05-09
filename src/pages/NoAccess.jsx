import { Link } from "react-router";

function NoAccess() {
  return (
    <div>
      <h2>401 UNAUTHORIZED</h2>
      <Link to="/login">Please login first</Link>
    </div>
  );
}

export default NoAccess;
