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
import {
  enrollStudents,
  findEnrollments,
  findExamDetails,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamDetails from "../../../common/exam/ExamDetails";
import { Notifications } from "@mui/icons-material";

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
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

  const handleKeyDown = (event) => {
    const newEmail = email.trim();
    if (!!newEmail) {
      if (event.key === "Enter" || event.key === "Tab" || event.key === " ") {
        if (emails.includes(newEmail)) {
          setEmail("");
          return;
        }
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

  const handleAddStudents = async () => {
    try {
      showLoader();
      const response = await enrollStudents({
        emails,
        examId,
      });
      setEmails([]);
      getExamEnrollments();
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
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

  const getExamEnrollments = async () => {
    try {
      showLoader();
      if (examId) {
        const res = await findEnrollments(examId);
        setEnrolledStudents(res.data);
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getExamDetails();
    getExamEnrollments();
  }, []);

  return (
    <Box>
      <Grid container gap={2} sx={{ alignItems: "flex-start" }}>
        <Grid item md={7}>
          <ExamDetails exam={exam} />
          <Paper sx={{ marginTop: "1rem", padding: "1rem" }}>
            <Typography variant="subtitle1">Enrolled Students</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                    {/* <TableCell sx={{ textAlign: "center" }}>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrolledStudents.map((student, idx) => {
                    return (
                      <TableRow key={student.email}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          {student.username ? student.username : "NA"}
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Chip color="warning" label={student.status} />
                        </TableCell>
                        {/* <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<Notifications />}
                          >
                            Notify
                          </Button>
                        </TableCell> */}
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
                <Tooltip title={email} key={index}>
                  <Chip
                    label={email}
                    onDelete={() => handleChipDelete(index)}
                    contentEditable={false}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
          <Box sx={{ marginTop: "1rem", display: "flex", columnGap: "1rem" }}>
            <Tooltip title="Clear all emails">
              <Button
                size="small"
                variant="contained"
                sx={{ paddingX: "1rem" }}
                onClick={() => setEmails([])}
              >
                Clear All
              </Button>
            </Tooltip>
            {/* <Tooltip title="Upload from file">
              <Button
                size="small"
                variant="contained"
                sx={{ paddingX: "1rem" }}
              >
                Upload
              </Button>
            </Tooltip> */}
            <Tooltip title="Enroll">
              <Button
                size="small"
                variant="contained"
                sx={{ paddingX: "1rem" }}
                onClick={handleAddStudents}
              >
                Enroll
              </Button>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnrollStudents;
