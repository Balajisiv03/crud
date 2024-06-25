//for updating student records
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          name: res.data[0].name,
          email: res.data[0].email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="enter name"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={values.email}
              placeholder="enter email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
