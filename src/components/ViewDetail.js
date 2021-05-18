import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import { refeshIO } from "../socket/socketIO";

const useStyles = makeStyles((theme) => ({
  paper: {
    fontSize: 20,
    padding: theme.spacing(2),
    margin: "30px 30px 10px 30px",
    // marginBottom: theme.spacing(1),
    // display: "inline-block",
    // flexDirection: "column",
    // textAlign: "center",
    // alignItems: "center",
    // width: 520,
    // width: "100%",
    // height: ,
  },
  btn: {
    margin: "5px 30px 5px 30px",
  },
  divTotal: {
    width: "100%",
    display: "flex",
  },
  divRight: {
    width: "40%",
  },
  divLeft: {
    width: "60%",
  },
}));

export default function ViewDetail(props) {
  const role = localStorage.getItem("role");
  const [userRole, setUserRole] = useState(true);

  useEffect(async () => {
    console.log(role);
    if (role === "admin") {
      setUserRole(true);
    } else setUserRole(false);
  }, [role]);

  // const [load, setLoad] = useState(true);
  //const [post, setPost] = useState([]);

  // useEffect(async () => {
  //   if (load) {
  //     console.log(props.item._id);
  //     const id = props.item._id;

  //     console.log(response);
  //     setLoad(false);
  //     setPost(response);
  //     // setFetch(false);
  //   }
  // }, [load]);

  const [reply, setReply] = useState();
  //const [temp, setTemp] = useState(false);
  const classes = useStyles();

  const [replyPost, setReplyPost] = useState({
    id: "",
    isChecked: true,
    reply: "",
  });

  const handleSavePost = async (_id) => {
    // setReplyPost({ id: _id, reply: reply, isChecked: true });
    // replyPostIO(replyPost);
    if (reply != null && reply !== "") {
      axios
        .put("/checkpost/" + _id, { reply: reply, isChecked: true })
        .then((response) => {
          refeshIO();
          // props.setFetch(true);
          print(response);
        })

        .catch((error) => {
          console.log(error);
        });
      alert("RepLy Thành Công");
      props.close();
    } else alert("Vui lòng điền đầy đủ thông tin");
    props.close();

    // props.setFetch(true);
  };

  const print = async (_id) => {};

  return (
    <div>
      <Dialog
        //fullScreen
        maxWidth="lg"
        fullWidth
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CssBaseline />
        {/* <div style={{ textAlign: "center", fontSize: 20}}>Chi tiet y kien</div> */}
        <Paper fullWidth className={classes.paper}>
          <div className={classes.divTotal}>
            <div className={classes.divRight}>
              Họ và Tên: <br />
              Số Điện Thoại: <br />
              Địa Chỉ: <br />
              Nội Dung: <br />
              Reply: <br />
            </div>
            <div className={classes.divLeft}>
              {props.item.name} <br />
              {props.item.phone} <br />
              {props.item.address} <br />
              {props.item.content} <br />
              {props.item.reply} <br />
            </div>
          </div>
        </Paper>
        {userRole ? (
          <div></div>
        ) : (
          <div style={{ padding: "0px 30px 0px 30px" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Reply"
              type="text"
              multiline
              fullWidth
              defaultValue=""
              //onChange={handleReplyChange}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
        )}

        <Button
          onClick={() => {
            handleSavePost(props.item._id);
          }}
          className={classes.btn}
          color="secondary"
          variant="outlined"
        >
          SAVE
        </Button>
        {userRole ? (
          <Button
            onClick={() => {
              print(props.item._id);
            }}
            className={classes.btn}
            color="secondary"
            variant="outlined"
          >
            PRINT
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={props.close}
          // onClick={() => {
          //   getPostById(props.item._id);
          // }}
          className={classes.btn}
          color="secondary"
          variant="outlined"
        >
          Exit
        </Button>
      </Dialog>
    </div>
  );
}
