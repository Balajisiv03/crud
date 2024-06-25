import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@2023",
  database: "crud",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log("error in database connection", err);
  } else {
    console.log("database connection success");
  }
});

app.get("/", (req, res) => {
  const sql = "select * from student";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Message: "server error" });
    }
    return res.json(result);
  });
});

app.post("/create", (req, res) => {
  const sql = "insert into student(`name`,`email`) values(?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "select * from student where id=?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "error inside server" });
    }
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const sql = "update student set `name`=? ,`email`=? where id=?";

  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) {
      return res.json({ Message: "error inside server" });
    }
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "delete from student where id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "error insider server" });
    }
    return res.json(result);
  });
});

app.listen(3001, () => {
  console.log("server is running ");
});
