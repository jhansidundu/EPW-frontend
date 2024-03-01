import { Box, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../../../store/AppContext";
import {
  findExamDetails,
  findExamResultForStudent,
} from "../../../../services/api/endpoints/exam.api";

const ExamResult = () => {
  const { examId } = useParams();
  const [result, setResult] = useState(null);
  const [exam, setExam] = useState(null);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

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

  const getExamResult = async () => {
    try {
      showLoader();
      if (examId) {
        const res = await findExamResultForStudent(examId);
        setResult(res.data);
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getExamDetails();
    getExamResult();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      {result === null && (
        <Typography variant="subtitle1">
          Results are not available, Check out later
        </Typography>
      )}
      {result && exam && (
        <Paper sx={{ padding: "2rem 1rem", minWidth: "30%" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {exam.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Score: {result.results}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};
export default ExamResult;
