import React, {useState} from "react";
import axios from 'axios';

const initialValues = {
  username: "",
  password: ""
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [account, setAccount] = useState(initialValues);

  const handleChange = e => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", account)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-pages")
      })
      .catch(err => {
        console.log(`There was an error: ${err}`)
      })
      setAccount(initialValues);
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input 
            type="text"
            name="username"
            value={account.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>Password:
          <input 
          // keeping this as 'text' to verify password on entry
            type="text"
            name="password"
            value={account.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
