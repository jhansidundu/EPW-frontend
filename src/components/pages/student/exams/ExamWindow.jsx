import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  findExamDetails,
  findExamQuestionsForStudent,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamQuestionCard from "../../../common/question/ExamQuestionCard";

const ExamWindow = () => {
  const { examId } = useParams();
  const [examStarted, setExamStarted] = useState(false);
  const [exam, setExam] = useState(null);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

  const getQuestions = async () => {
    try {
      showLoader();
      const res = await findExamQuestionsForStudent(examId);
      setQuestions(
        res.data.map((q) => {
          return { ...q, answerOption: "" };
        })
      );
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };
  const startExam = async () => {
    try {
      showLoader();
      setExamStarted(true);
      getQuestions();
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getExamDetails();
  }, []);
  console.log(questions.at(currentQuestion));
  return (
    <Box>
      {examStarted && questions.length > 0 && (
        <Box>
          <Grid container gap={2}>
            <Grid item md={7}>
              <ExamQuestionCard
                ques={questions.at(currentQuestion)}
                serialNum={currentQuestion}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "4rem",
                  marginTop: "4rem",
                }}
              >
                <Button variant="contained" size="small">
                  Previous
                </Button>
                <Button variant="contained" size="small">
                  Next
                </Button>
              </Box>
            </Grid>

            <Grid item md={4}>
              <Paper sx={{ padding: "1rem" }}>
                <Typography variant="subtitle2">Question Navigator</Typography>
                <Grid container sx={{ marginTop: "1rem" }}>
                  {questions.map((question, idx) => (
                    <Grid item md={3} key={question}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setCurrentQuestion(idx)}
                      >
                        {idx + 1}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      {!examStarted && exam && (
        <Box
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">{exam.name}</Typography>
            <Button size="small" variant="contained" onClick={startExam}>
              Start Now
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExamWindow;
