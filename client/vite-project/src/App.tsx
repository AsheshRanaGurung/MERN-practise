import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import MERN from "./images/MERN.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles.js";
import { useState } from "react";

function App() {
  const [updateID, setUpdateId] = useState(null);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        {/* <Typography className={classes.heading} variant="h2" align="center">
          MERN
        </Typography> */}
        <img src={MERN} alt="MERN" height="50px" style={{ margin: "10px" }} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            style={{ marginTop: "auto" }}
          >
            <Grid item xs={12} md={7}>
              <Posts setUpdateId={setUpdateId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form updateID={updateID} setUpdateId={setUpdateId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
