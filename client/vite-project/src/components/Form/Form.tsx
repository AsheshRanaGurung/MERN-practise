import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import FileBase from "react-file-base64";
import {
  IPosts,
  useCreatePost,
  useGellAllPosts,
  useUpdatePosts,
} from "../../services/post.js";
import { FileDrop } from "../FileUpload/FileUpload.js";

const Form = ({
  updateID,
  setUpdateId,
}: {
  updateID: string;
  setUpdateId: (data: any) => void;
}) => {
  const [postData, setPostData] = useState<IPosts>({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: [],
  });
  const classes = useStyles();

  const { data: allPosts } = useGellAllPosts();
  const updateThisPost = allPosts?.find((post: any) => post?._id === updateID);
  const { mutate: CreatePost, isLoading, isSuccess } = useCreatePost();
  const {
    mutate: UpdatePost,
    isLoading: isUpdating,
    isSuccess: isUpdateSucess,
  } = useUpdatePosts();

  useEffect(() => {
    if (updateID) {
      setPostData(updateThisPost as IPosts);
    }
  }, [updateID]);

  useEffect(() => {
    if (isSuccess || isUpdateSucess) {
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: [],
      });
    }
  }, [isSuccess, isUpdateSucess]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData: any = new FormData();
    for (let data in postData) {
      const value = postData[data as keyof IPosts];
      if (value instanceof Array) {
        if (value.every((v) => v instanceof File)) {
          value.forEach((v, index) => {
            formData?.append(`${data}`, v);
          });
        }
      } else {
        formData?.append(
          data,
          value instanceof File
            ? value
            : value instanceof Object
            ? JSON.stringify(value)
            : value ?? ""
        );
      }
    }
    let executeFunc = CreatePost;
    if (updateID) {
      executeFunc = UpdatePost;
      formData.append("_id", updateID);
      executeFunc(formData);
    } else {
      executeFunc(formData);
    }

    setUpdateId(null);
  };
  const clear = () => {
    setUpdateId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: [],
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography variant="h6">
          {updateID ? "Updating" : "Creating "} a MERN Post
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileDrop
            files={postData.selectedFile}
            setFiles={(data) =>
              setPostData({ ...postData, selectedFile: data })
            }
            message="Click to upload image"
            multiple={false}
            // accept={{ 'image/png': ['.png', '.jgp', '.jpeg', '.gif'] }}
            preview={true}
          />
          {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ e }: any) =>
              setPostData({ ...postData, selectedFile: e })
            }
          /> */}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          fullWidth
        >
          {updateID
            ? isUpdating
              ? "Loading.."
              : "Update"
            : isLoading
            ? "Loading.."
            : "Submit"}
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="inherit"
          size="small"
          onClick={clear}
          fullWidth
        >
          Cancel
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
