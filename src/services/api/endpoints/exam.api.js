import api from "../axios/axios.service";

export const createExam = async (payload) => {
  const response = await api.post("exam/add", payload);
  return response.data;
};

export const findTeacherExams = async () => {
  const response = await api.get("exam/teacher");
  return response.data;
};

export const findExamDetails = async (examId) => {
  const response = await api.get(`exam/details/${examId}`);
  return response.data;
};

export const findExamStatusList = async () => {
  const response = await api.get("exam/status");
  return response.data;
};

export const updateExamSettings = async (payload) => {
  const response = await api.post("exam/update/settings", payload);
  return response.data;
};

export const findExamQuestions = async (examId) => {
  const response = await api.get(`exam/${examId}/questions`);
  return response.data;
};

export const createQuestion = async (payload) => {
  const response = await api.post("question/add", payload);
  return response.data;
};

export const updateQuestion = async (payload) => {
  const response = await api.post("question/update", payload);
  return response.data;
};

export const findQuestion = async (questionId) => {
  const response = await api.get(`question/${questionId}`);
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await api.delete(`question/${questionId}`);
  return response.data;
};
