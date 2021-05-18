/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  initiateSocket,
  disconnectSocket,
  receiveFromServer,
  createPost,
  deletePost,
} from "../socket/socketIO";

import { useStateValue } from "../context/StateProvider";
import { ACTION_TYPE } from "../reducer/reducer";

import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import {
  Avatar,
  CssBaseline,
  // Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
  // Typography,
} from "@material-ui/core";
import ViewDetail from "../components/ViewDetail";
import { blue, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "block",
  },
  grid: {
    paddingTop: 50,
    // maxWidth: 1200,
  },
  textField: {
    marginTop: 20,
  },
}));

function HomePage() {
  const [state, dispatch] = useStateValue();
  const classes = useStyles();
  const [userRole, setUserRole] = useState(true);
  const [post, setPost] = useState([]);
  const [fetch, setFetch] = useState(true);
  const role = localStorage.getItem("role");

  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [content, setContent] = useState("");

  const [newPost, setNewPost] = useState({
    name: "",
    phone: "",
    address: "",
    content: "",
    token: state.token,
  });
  useEffect(async () => {
    if (fetch) {
      const response = await axios.get("/allpost");
      console.log(response.data.posts);
      setPost(response.data.posts);
      setFetch(false);
    }
    const response = await axios.get("/allpost");
    setPost(response.data.posts);
    console.log(post);
  }, [fetch]);
  useEffect(async () => {
    console.log(role);
    if (role === "admin") {
      setUserRole(true);
    } else setUserRole(false);
  }, [role]);

  useEffect(() => {
    initiateSocket();
    receiveFromServer((error, newPost) => {
      console.log(post);
      setPost([newPost, ...post]);
      // alert(data);
      // setFetch(true);
      if (newPost === true) {
        //
        setFetch(true);
      }
    });
    return () => {
      disconnectSocket();
    };
  }, [post]);

  // const handleClickOpen = () => {
  //   setUserRole(false);
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewPost({
  //     ...newPost,
  //     [name]: value,
  //   });
  // };

  const handleNewPost = async (event) => {
    event.preventDefault();
    // console.log("Submit");
    // const respone = await axios.post("/createpost", newPost);
    // setFetch(true);
    // console.log(respone);
    createPost(newPost);
  };

  const handleDeletePost = async (_id) => {
    // console.log(_id);
    // const response = await axios.delete("/deletepost/" + _id);
    // console.log(response);
    // setFetch(true);
    deletePost(_id);
  };
  const [item, setItem] = useState({
    name: "",
    phone: "",
    address: "",
    content: "",
  });
  const [open, setOpen] = useState(false);
  const handleView = async (item) => {
    console.log(item);
    setItem(item);
    setOpen(true);
  };
  const handleViewClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ textAlign: "right", marginRight: "20px" }}>
        <button
          style={{ borderBlockStyle: "outset", fontSize: 15 }}
          onClick={async () => {
            localStorage.removeItem("accessToken");
            dispatch({ type: ACTION_TYPE.SIGN_OUT });
          }}
        >
          SignOut
        </button>
        {/* <button
          style={{ borderBlockStyle: "outset", fontSize: 15 }}
          onClick={async () => {
            setFetch(true);
          }}
        >
          Refresh
        </button> */}
      </div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={7} className={classes.grid}>
          <Grid item xs={6}>
            {userRole ? (
              <div>
                <form onSubmit={handleNewPost} className={classes.form}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    // onChange={handleInputChange}
                    fullWidth
                    onChange={(e) =>
                      setNewPost({ ...newPost, name: e.target.value })
                    }
                  />
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setNewPost({ ...newPost, phone: e.target.value })
                    }
                    // onChange={handleInputChange}
                    // value={newPost.phone}
                  />
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setNewPost({ ...newPost, address: e.target.value })
                    }
                    // onChange={handleInputChange}
                    // value={newPost.address}
                  />
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Content"
                    variant="outlined"
                    fullWidth
                    rows="5"
                    multiline
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    // onChange={handleInputChange}
                    // value={newPost.content}
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  >
                    Post
                  </Button>
                </form>
              </div>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={6}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Danh Sach Y Kien
                </ListSubheader>
              }
              className={classes.list}
            >
              {post.map((item) => (
                <ListItem
                  key={item._id}
                  button
                  onClick={() => {
                    handleView(item);
                  }}
                >
                  <ListItemAvatar>
                    {item.isChecked ? (
                      <Avatar>
                        {/* <CheckCircleOutlinedIcon /> */}
                        <CheckCircleOutlinedIcon style={{ color: blue[500] }} />
                      </Avatar>
                    ) : (
                      <Avatar>
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: red[500] }}
                        />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.content} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon
                        onClick={() => {
                          if (role === "admin") {
                            handleDeletePost(item._id);
                          } else {
                            alert("ban khong co quyen nay");
                          }
                        }}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <ViewDetail
              open={open}
              item={item}
              close={handleViewClose}
              setFetch={setFetch}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
