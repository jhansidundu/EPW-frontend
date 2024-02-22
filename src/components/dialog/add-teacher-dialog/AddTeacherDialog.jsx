import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  styled,
} from "@mui/material";
import { useContext, useState } from "react";
import { addTeacher } from "../../../services/api/endpoints/admin.api";
import AppContext from "../../../store/AppContext";

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

const AddTeacherDialog = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const addTeacherEmail = async () => {
    try {
      showLoader();
      await addTeacher({ email });
      handleClose();
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ minWidth: "400px" }}>
        <div>Add Teacher</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form>
          <StyledTextField
            type="email"
            label="Email"
            size="small"
            name="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </DialogContent>

      <Divider />
      <DialogActions>
        <Button variant="contained" type="button" onClick={addTeacherEmail}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeacherDialog;
