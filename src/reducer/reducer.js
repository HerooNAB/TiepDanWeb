/* eslint-disable default-case */
// Mục đích để tránh gõ sai tên các action
export const ACTION_TYPE = {
  SET_USER: "USER",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  START_LOADING: "START_LOADING",
  FINISH_LOADING: "FINISH_LOADING",
};

// Các trạng thái của web
export const initialState = {
  isSignIn: false,
  token: "",
};

// Hàm để cập nhập lại các trạng thái
// VD
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SIGN_IN:
      return {
        ...state,
        isSignIn: "homepage",
        token: action.payload,
      };
    case ACTION_TYPE.SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
      };
    case ACTION_TYPE.SIGN_UP:
      return {
        ...state,
        isSignIn: "signup",
      };
  }
};

export default authReducer;
