import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import FileBase from "react-file-base64";
import { useLoginUser, IUSerLogin } from "../../services/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [postData, setPostData] = useState<IUSerLogin>({
    email: "",
    password: "",
  });
  const { mutate: LoginUser, isLoading, isSuccess } = useLoginUser();
  const classes = useStyles();
  const navigate = useNavigate();
  let token;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    LoginUser(postData);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      token = localStorage.getItem("auth");
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

          <Typography
            style={{
              margin: "10px 0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </Typography>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
            fullWidth
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
