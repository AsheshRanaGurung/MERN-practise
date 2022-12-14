import { useGellAllPosts } from "../../services/post";
import Post from "./Post/Post";
import useStyles from "./styles.js";
import { Grid } from "@material-ui/core";

const Posts = ({ setUpdateId }: { setUpdateId: (data: any) => void }) => {
  const classes = useStyles();
  const { data: allPosts } = useGellAllPosts();

  return (
    <>
      {allPosts?.length ? (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {allPosts?.map((post, index) => (
            <Grid item xs={12} sm={6}>
              <Post post={post} setUpdateId={setUpdateId} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Posts;
