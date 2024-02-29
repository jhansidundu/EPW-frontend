import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import {
  createQuestion,
  deleteQuestion,
  findExamDetails,
  findExamQuestions,
  findQuestion,
  updateQuestion,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import QuestionCard from "../../../common/question/QuestionCard";
import QuestionEditor from "../../../common/question/QuestionEditor";
const Questions = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const [editMode, setEditMode] = useState([]);
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        examId,
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        marks: "0",
        hasNegative: 0,
        negativePercentage: "",
      },
    ]);
    setEditMode([...editMode, true]);
  };

  const handleQuestionTextChange = (idx, text) => {
    const tempQuestions = [...questions];
    const q = questions.at(idx);
    q.question = text;
    setQuestions([...tempQuestions]);
  };

  const handleSelectAnswer = (idx, answer) => {
    const tempQuestions = [...questions];
    const q = tempQuestions.at(idx);
    if (q.answer === answer) {
      q.answer = "";
    } else {
      q.answer = answer;
    }
    setQuestions([...tempQuestions]);
  };

  const handleOptionTextChange = (e, idx, id) => {
    const text = e.target.value;
    const tempQuestions = [...questions];
    const q = tempQuestions.at(idx);
    switch (id) {
      case "A":
        q.optionA = text;
        break;
      case "B":
        q.optionB = text;
        break;
      case "C":
        q.optionC = text;
        break;
      case "D":
        q.optionD = text;
        break;
    }
    setQuestions([...tempQuestions]);
  };

  const handleDeleteQuestion = async (idx) => {
    try {
      const tempQuestions = [...questions];
      const q = tempQuestions.at(idx);
      if (!!q.id) {
        showLoader();
        await deleteQuestion(q.id);
      }
      tempQuestions.splice(idx, 1);
      const tempEditMode = [...editMode];
      tempEditMode.splice(idx, 1);
      setQuestions([...tempQuestions]);
      setEditMode([...tempEditMode]);
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleSaveQuestion = async (idx) => {
    try {
      showLoader();
      const tempQuestions = [...questions];
      const payload = tempQuestions.at(idx);
      const { questionId } = await createQuestion(payload);
      toggleEditMode(idx);
      payload["id"] = questionId;
      setQuestions([...tempQuestions]);
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const toggleEditMode = (idx) => {
    const temp = [...editMode];
    temp[idx] = !temp[idx];
    setEditMode([...temp]);
  };

  const handleUpdateQuestion = async (idx) => {
    try {
      showLoader();
      const payload = questions.at(idx);
      await updateQuestion(payload);
      toggleEditMode(idx);
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleCancelEdit = async (idx) => {
    try {
      const tempQuestions = [...questions];
      const q = tempQuestions.at(idx);
      showLoader();
      const res = await findQuestion(q.id);
      const originalQuestion = res.data;
      tempQuestions[idx] = originalQuestion;
      setQuestions([...tempQuestions]);
      toggleEditMode(idx);
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  const handleSecondaryInputsChange = (e, idx) => {
    const { name, value } = e.target;
    const tempQuestions = [...questions];
    const q = tempQuestions.at(idx);
    q[name] = value;
    setQuestions([...tempQuestions]);
  };

  const handleSwitchToEditMode = (idx) => {
    toggleEditMode(idx);
  };

  const getExamDetails = async () => {
    try {
      showLoader();
      if (examId) {
        const res = await findExamDetails(examId);
        setExamDetails(res.data);
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
      const res = await findExamQuestions(examId);
      setQuestions(res.data);
      setEditMode(res.data.map((_) => false));
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    getExamDetails();
    getQuestions();
  }, []);
  return (
    <Box>
      <Typography variant="h6">{examDetails?.name}</Typography>

      {questions.length > 0 &&
        questions.map((q, idx) =>
          editMode.at(idx) ? (
            <QuestionEditor
              key={idx}
              ques={q}
              serialNum={idx}
              onEditorChange={handleQuestionTextChange}
              onAnsSelect={handleSelectAnswer}
              onOptionChange={handleOptionTextChange}
              onDelete={handleDeleteQuestion}
              onCancel={handleCancelEdit}
              onSave={handleSaveQuestion}
              onUpdate={handleUpdateQuestion}
              onSecondaryInputsChange={handleSecondaryInputsChange}
            />
          ) : (
            <QuestionCard
              ques={q}
              key={idx}
              serialNum={idx}
              onSwithToEdit={handleSwitchToEditMode}
              onDelete={handleDeleteQuestion}
            />
          )
        )}
      {questions.length === 0 && (
        <Typography variant="subtitle1">Questions are not added</Typography>
      )}
      {examDetails && (
        <Button
          startIcon={<AddCircleOutline />}
          disabled={questions.length === examDetails.totalQuestions}
          onClick={handleAddQuestion}
        >
          <Typography variant="subtitle2">Add new question</Typography>
        </Button>
      )}
    </Box>
  );
};

export default Questions;
