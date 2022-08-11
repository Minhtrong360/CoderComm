import { configureStore } from "@reduxjs/toolkit";
import commentslice from "../features/comment/commentSlice";
import friendSlice from "../features/friend/friendSlice";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

const rootReducer = {
  comment: commentslice,
  friend: friendSlice,
  post: postSlice,
  user: userSlice,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
