import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import FileBase from "react-file-base64";
import { ILogin, useRegisterUser } from "../../services/login";
import { FileDrop } from "../FileUpload/FileUpload.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [postData, setPostData] = useState<ILogin>({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: 0,
    password: "",
    conf_password: "",
  });
  const { mutate: RegisterUser, isLoading, isSuccess } = useRegisterUser();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    RegisterUser(postData);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div style={{ margin: "10vh 30%" }}>
      <Paper className={classes.paper}>
        <form
          style={{ display: "flex", justifyContent: "flex-end" }}
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            name="first_name"
            variant="outlined"
            label="First Name"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.first_name}
            onChange={(e) =>
              setPostData({ ...postData, first_name: e.target.value })
            }
          />
          <TextField
            name="last_name"
            variant="outlined"
            label="last_name"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.last_name}
            onChange={(e) =>
              setPostData({ ...postData, last_name: e.target.value })
            }
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.email}
            onChange={(e) =>
              setPostData({ ...postData, email: e.target.value })
            }
          />
          <TextField
            name="phone_number"
            variant="outlined"
            type={"number"}
            label="Phone number"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.phone_number}
            onChange={(e) =>
              setPostData({
                ...postData,
                phone_number: e.target.value,
              })
            }
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type={"password"}
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.password}
            onChange={(e) =>
              setPostData({ ...postData, password: e.target.value })
            }
          />
          <TextField
            name="conf_password"
            variant="outlined"
            type={"password"}
            label="Confirm Password"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={postData.conf_password}
            onChange={(e) =>
              setPostData({ ...postData, conf_password: e.target.value })
            }
          />
          <Typography
            style={{
              margin: "10px 0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Aready have an account?
          </Typography>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
            fullWidth
          >
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
