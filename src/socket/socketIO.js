import io from "socket.io-client";
let socket;
// const ENDPOINT = "http://localhost:1010";
const ENDPOINT = "https://tiepdan.herokuapp.com/";

export const initiateSocket = (room) => {
  socket = io.connect(ENDPOINT, { reconnection: true });
  console.log(`Connecting socket... ${socket}`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const receiveFromServer = (cb) => {
  if (!socket) return true;

  // Get message from the socket
  socket.on("new-post-done", (post) => {
    return cb(null, post);
  });

  socket.on("delete-post-done", () => {
    return cb(null, true);
  });
  socket.on("reply-post-done", () => {
    return cb(null, true);
  });
  socket.on("refresh-done", () => {
    return cb(null, true);
  });
};
export const createPost = (newpost) => {
  if (socket) socket.emit("create-post", newpost);
};

export const deletePost = (postId) => {
  if (socket) socket.emit("delete-post", postId);
};

export const replyPostIO = (replyPost) => {
  if (socket) socket.emit("reply-post", replyPost);
};

export const refeshIO = () => {
  if (socket) socket.emit("refresh");
};

export const fetch = () => {};
