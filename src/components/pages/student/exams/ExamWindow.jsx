import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  findExamDetails,
  findExamQuestionsForStudent,
  finishExam,
  saveAnswer,
  startExam,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamQuestionCard from "../../../common/question/ExamQuestionCard";
import ExamWindowHeader from "../../../common/exam/ExamWindowHeader";

const ValueChip = ({ text }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        paddingX: "1rem",
        paddingY: "0.25rem",
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};

const ExamWindow = () => {
  const { examId } = useParams();
  const [examStarted, setExamStarted] = useState(false);
  const [exam, setExam] = useState(null);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [examTimeOver, setExamTimeOver] = useState(false);
  const [finishTime, setFinishTime] = useState(10);
  const navigate = useNavigate();
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

  const markExamStart = async () => {
    try {
      showLoader();
      await startExam(examId);
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
      if (res.success) {
        setQuestions(res.data);
      } else {
        alert(res.message);
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  const handleStartExam = async () => {
    try {
      showLoader();
      setExamStarted(true);
      markExamStart();
      getQuestions();
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleExamFinish = async () => {
    try {
      showLoader();
      const payload = questions.map((q) => ({
        questionId: q.id,
        answer: q.answer,
      }));
      const { success, message } = await finishExam(examId, payload);
      if (success) {
        navigate("/student/dashboard");
      } else {
        alert(message);
      }
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleExamAutoFinish = async () => {
    setShowFinish(true);
    setExamTimeOver(true);
  };

  const handleAnswerSelect = (answerOption, questionId) => {
    const tempQuestions = [...questions];
    const question = tempQuestions.find((q) => q.id === questionId);
    question.answer = answerOption;
    setQuestions([...tempQuestions]);
  };

  const handleClearAnswer = (questionId) => {
    const tempQuestions = [...questions];
    const question = tempQuestions.find((q) => q.id === questionId);
    question.answer = "";
    setQuestions([...tempQuestions]);
  };

  const handleSaveAnswer = async (questionId) => {
    try {
      const question = questions.find((q) => (q.id = questionId));
      const payload = {
        examId,
        questionId,
        answerOption: question.answer,
      };

      showLoader();
      await saveAnswer(payload);
      return res.json({ success: true });
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleGoToPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleGoToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowFinish(true);
    }
  };

  useEffect(() => {
    getExamDetails();
  }, []);

  useEffect(() => {
    let examFinishTimeout;
    if (examTimeOver) {
      examFinishTimeout = setTimeout(() => {
        handleExamFinish();
      }, 10000);
    }

    return () => {
      if (examFinishTimeout) {
        clearTimeout(examFinishTimeout);
      }
    };
  }, [examTimeOver]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (finishTime > 0) {
        setFinishTime((prev) => prev - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [finishTime, examTimeOver]);

  return (
    <Box>
      {examStarted && questions.length > 0 && (
        <Box>
          <ExamWindowHeader exam={exam} onFinish={handleExamAutoFinish} />
          {showFinish && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
                }}
              >
                <Paper sx={{ padding: "2rem 1rem", minWidth: "30%" }}>
                  <Grid container spacing={2}>
                    <Grid item md={7} sx={{ textAlign: "right" }}>
                      <Typography variant="body1">
                        Questions Attempted
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <ValueChip text={10} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: "-8px" }}>
                    <Grid item md={7} sx={{ textAlign: "right" }}>
                      <Typography variant="body1">Total Questions</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <ValueChip text={10} />
                    </Grid>
                  </Grid>
                  {examTimeOver && (
                    <Box sx={{ marginTop: "1rem" }}>
                      <Typography variant="body2">
                        Exam will be submitted in {finishTime} seconds.
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    {!examTimeOver && (
                      <Button
                        variant="contained"
                        size="small"
                        color="inherit"
                        onClick={() => setShowFinish(false)}
                      >
                        Go Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleExamFinish}
                    >
                      Finish
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
          {!showFinish && (
            <Grid container gap={2} sx={{ marginTop: "1rem" }}>
              <Grid item md={7}>
                <ExamQuestionCard
                  ques={questions.at(currentQuestion)}
                  serialNum={currentQuestion}
                  onAnswerSelect={handleAnswerSelect}
                  onClear={handleClearAnswer}
                  onSave={handleSaveAnswer}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "4rem",
                    marginTop: "4rem",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleGoToPreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleGoToNextQuestion}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>

              <Grid item md={4}>
                <Paper sx={{ padding: "1rem" }}>
                  <Typography variant="subtitle2">
                    Question Navigator
                  </Typography>
                  <Grid container sx={{ marginTop: "1rem" }}>
                    {questions.map((question, idx) => (
                      <Grid item md={3} key={question.id}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setCurrentQuestion(idx)}
                          color={
                            currentQuestion === idx ? "primary" : "inherit"
                          }
                        >
                          {idx + 1}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ marginTop: "1rem", textAlign: "right" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setShowFinish(true)}
                    >
                      Finish
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
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
            <Button size="small" variant="contained" onClick={handleStartExam}>
              Start Now
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExamWindow;
