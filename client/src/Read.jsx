import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read/" + id)
      .then((res) => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-secondary align-items-center justify-content-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="p-2">
          {" "}
          <h2>Student Detail</h2>
          <h2>ID: {student.id}</h2>
          <h2>Name: {student.name}</h2>
          <h2>Email: {student.email}</h2>
          <Link to="/" className="btn btn-primary me-2">
            Back
          </Link>
          <Link to={`/edit/${student.id}`} className="btn btn-primary">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
