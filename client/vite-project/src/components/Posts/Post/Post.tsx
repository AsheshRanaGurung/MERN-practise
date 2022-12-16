import useStyles from "./styles.js";
import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDeletePost } from "../../../services/post.js";

const Post = ({
  post,
  setUpdateId,
}: {
  post: any;
  setUpdateId: (data: any) => void;
}) => {
  const classes = useStyles();
  const { mutate: DeletePost, isLoading: isDeleting } = useDeletePost();
  const deleteThisPost = (id: string) => {
    DeletePost(id);
  };
  const loggedINUser = JSON.parse(localStorage.getItem("auth") as any)?.id;

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFiles}
          title={post.title}
        ></CardMedia>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.created).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setUpdateId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag: string) => `#${tag}`)}
          </Typography>
        </div>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            color="textSecondary"
          >
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
            Like {post.likeCount}
          </Button>
          {loggedINUser == post?.status?.performedBy?._id ? (
            <Button
              size="small"
              color="primary"
              onClick={() => deleteThisPost(post._id)}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
