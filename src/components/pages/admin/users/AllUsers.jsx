import { PersonAdd } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddTeacherDialog from "../../../dialog/add-teacher-dialog/AddTeacherDialog";

const AllUsers = () => {
  const [addTeacherDialogOpen, setAddTeacherDialogOpen] = useState(false);
  const closeAddTeacherDialog = () => {
    setAddTeacherDialogOpen(false);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">All Users</Typography>
      <Button
        variant="contained"
        startIcon={<PersonAdd />}
        onClick={() => setAddTeacherDialogOpen(true)}
      >
        Add Teacher
      </Button>
      <AddTeacherDialog
        open={addTeacherDialogOpen}
        handleClose={closeAddTeacherDialog}
      />
    </Box>
  );
};

export default AllUsers;
