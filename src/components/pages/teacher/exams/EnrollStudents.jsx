import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findExamDetails } from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamDetails from "../../../common/exam/ExamDetails";

const textFieldStyles = {
  borderBottom: "none",
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    borderRadius: 0,
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderBottom: 0,
    },
  "& .MuiOutlinedInput-notchedOutline": {
    borderBottom: 0,
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderBottom: 0,
    },
};

function EnrollStudents() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState([
    { name: "abc", email: "abc@gmail.com", status: "Not Enrolled" },
  ]);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const handleKeyDown = (event) => {
    const newEmail = email.trim();
    if (!!newEmail) {
      if (event.key === "Enter" || event.key === "Tab" || event.key === " ") {
        setEmails([...emails, newEmail]);
        setEmail("");
      }
    }
  };

  const handleChipDelete = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const getExamDetails = async () => {
    try {
      showLoader();
      if (examId) {
        const res = await findExamDetails(examId);
        setExam(res.data);
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getExamDetails();
  }, []);

  return (
    <Box>
      <Grid container gap={2} sx={{ alignItems: "flex-start" }}>
        <Grid item md={7}>
          <ExamDetails exam={exam} />
          <Paper sx={{ marginTop: "1rem", padding: "1rem" }}>
            <Typography variant="subtitle1">Enrolled Students</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrolledStudents.map((student, idx) => {
                    return (
                      <TableRow key={student.email}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          {student.name ? student.name : "NA"}
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.status}</TableCell>
                        <TableCell>
                          <Button variant="contained" size="small">
                            Notify
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item md={4} component={Paper} sx={{ padding: "1rem" }}>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <TextField
              label="Enter Student emails"
              size="small"
              fullWidth
              sx={textFieldStyles}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              onKeyDown={handleKeyDown}
            />
            <Box
              sx={{
                display: "grid",
                gap: "0.25rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderTop: "none",
                padding: "0.5rem",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              {emails.map((email, index) => (
                <Tooltip title={email}>
                  <Chip
                    key={index}
                    label={email}
                    onDelete={() => handleChipDelete(index)}
                    contentEditable={false}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
          <Box sx={{ marginTop: "1rem", display: "flex", columnGap: "1rem" }}>
            <Button
              size="small"
              variant="contained"
              sx={{ paddingX: "1rem" }}
              onClick={() => setEmails([])}
            >
              Clear All
            </Button>
            <Button size="small" variant="contained" sx={{ paddingX: "1rem" }}>
              Upload
            </Button>
            <Button size="small" variant="contained" sx={{ paddingX: "1rem" }}>
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnrollStudents;
