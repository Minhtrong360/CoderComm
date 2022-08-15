import React, { useRef } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useDispatch } from "react-redux";
import { deletePost, editPost } from "./postSlice";

function PostCard({ post, userId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();

  const edit = useRef();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);

    dispatch(deletePost({ postId: post._id, userId }));
  };
  const handleEdit = () => {
    setAnchorEl(null);

    console.log("mai nghỉ", edit);
    dispatch(editPost({ postId: post._id, userId }));
  };

  // const e = (editing) => {
  //   if (editing) {
  //     <Input value={1}></Input>;
  //   } else {
  //     <Typography ref={edit}>{post.content}</Typography>;
  //   }
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEdit} sx={{ mx: 1 }}>
        Edit
      </MenuItem>

      <MenuItem onClick={handleDelete} sx={{ mx: 1 }}>
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <Box>
            <IconButton aria-label="Example" onClick={handleProfileMenuOpen}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            {renderMenu}
          </Box>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* {e(editing)} */}
        <Typography ref={edit}>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
