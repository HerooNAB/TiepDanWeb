import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

import backgroundImage from "../image/testImage.jpg";

import { useStateValue } from "../context/StateProvider";
import { ACTION_TYPE } from "../reducer/reducer";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const classes = useStyles();

  // state là các trạng thái nằm trong initialState trong file reducer. VD: state.isSignIn
  // dispatch dùng để gọi các action để thực hiện các hàm authReducer
  const [state, dispatch] = useStateValue();

  useEffect(() => {}, []);

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/signup", {
        phone: phone,
        password: password,
        name: name,
        email: email,
        role: "user",
      })
      .then((response) => {
        console.log(response);
        alert("Đăng ký thành công");
        dispatch({ type: ACTION_TYPE.SIGN_OUT });
      })

      .catch((error) => {
        console.log(error);
      });
    // try{
    // const response = await axios.post('/signin', {phone: phone, password: password})
    // console.log(response)
    // }catch(error){
    //     alert(error.message)
    // }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "100vh",
          filter: "blur(2px)",
        }}
      ></div>
      <Container
        component="main"
        maxWidth="md"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <form
          onSubmit={handleSubmit}
          style={{ display: "block", width: "50%" }}
        >
          {/* <label className="label">Phone</label>
          <input value={phone} onChange={handlePhoneChange}></input>
          <label>Password</label>
          <input value={password} onChange={handlePasswordChange}></input>
          <button type="submit">SignIn</button> */}
          <h1> TIẾP DÂN TRỰC TUYẾN </h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            value={name}
            label="name  "
            type="text"
            // autoComplete="email"
            autoFocus
            // onChange={e => setUser({ ...user, email: e.target.value })}
            onChange={handleNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            name="phone"
            value={phone}
            label="phone"
            type="text"
            // autoComplete="current-password"
            // onChange={e => setUser({ ...user, password: e.target.value })}
            onChange={handlePhoneChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            value={password}
            label="Password"
            type="password"
            // autoComplete="current-password"
            // onChange={e => setUser({ ...user, password: e.target.value })}
            onChange={handlePasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            value={email}
            label="email"
            type="text"
            // autoComplete="current-password"
            // onChange={e => setUser({ ...user, password: e.target.value })}
            onChange={handleEmailChange}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Login;
