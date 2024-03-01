import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  findExamDetails,
  findTeacherExams,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamAccordian from "../../../common/exam/ExamAccordian";
import ExamSettings from "./ExamSettings";

const TeacherExams = () => {
  const [expanded, setExpanded] = useState(false);
  const [exams, setExams] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const navigate = useNavigate();
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

  const handleChange = (examId) => {
    setExpanded((prev) => {
      return prev === examId ? false : examId;
    });
  };

  const goToAddExam = () => {
    navigate("/teacher/exams/add");
  };

  const getExams = async () => {
    try {
      showLoader();
      const res = await findTeacherExams();
      setExams(res.data);
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  const getExamDetails = async () => {
    try {
      showLoader();
      if (typeof expanded === "number") {
        const res = await findExamDetails(expanded);
        setExamDetails(res.data);
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {
    if (expanded) {
      getExamDetails();
    } else {
      setExamDetails(null);
    }
  }, [expanded]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Exams</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={goToAddExam}>
          Add Exam
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Box sx={{ marginTop: "1rem" }}>
            {(!exams || exams.length == 0) && (
              <Typography variant="body2">No Exams</Typography>
            )}
            {exams.map((exam) => (
              <ExamAccordian
                key={exam.id}
                expanded={expanded === exam.id}
                onToggle={handleChange}
                exam={exam}
                examDetails={examDetails}
              />
            ))}
          </Box>
        </Grid>
        <Grid item md={4}>
          <ExamSettings examDetails={examDetails} refresh={getExamDetails} />
        </Grid>
      </Grid>
    </>
  );
};
export default TeacherExams;
