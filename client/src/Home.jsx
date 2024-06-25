import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Axios.delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        // setData(res.data);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-5">
        <h2>Student List</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table>
          <thead>
            <tr className="p-5">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {data.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link
                      to={`/read/${student.id}`}
                      className="btn btn-sm btn-info"
                    >
                      Read
                    </Link>

                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-sm btn-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
