import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUpdatePosts } from "../../services/post";
import { Typography } from "@mui/material";

interface IModal {
  openForgetPasswordModal: boolean;
  id: string | null;
  handleClose: () => void;
}

const ConfirmModal = ({ openForgetPasswordModal, id, handleClose }: IModal) => {
  const { mutateAsync, isLoading } = useUpdatePosts();

  const submitHandler = async (id: any) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };
  //   return null;
  return (
    <>
      <Dialog
        open={openForgetPasswordModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Forget Password"}</DialogTitle>
        <DialogContent>
          <Typography> Are you sure you want to Delete This post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            cancel
          </Button>

          <Button type="submit" variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
