import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [docs, setDocs] = useState(null);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="App">
      <form>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => {
            setForm({
              ...form,
              name: e.target.value,
            });
          }}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => {
            setForm({
              ...form,
              email: e.target.value,
            });
          }}
        />
        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) => {
            setForm({
              ...form,
              password: e.target.value,
            });
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            fetch("http://localhost:4000/users", {
              method: "POST",
              body: JSON.stringify(form),
              headers: {
                "Content-Type": "application/json",
              },
            }) //api for the get request
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}
        >
          Create
        </button>
      </form>

      <div>
        <button
          onClick={(e) => {
            e.preventDefault();

            fetch("http://localhost:4000/users", {
              method: "GET",
            }) //api for the get request
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setDocs(data.result);
              });
          }}
        >
          Get Data
        </button>

        {docs &&
          docs.map((doc, index) => {
            return (
              <div key={index}>
                <h1>Name: {doc.name}</h1>
                <p>Email: {doc.email}</p>
                <p>Password: {doc.password}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
