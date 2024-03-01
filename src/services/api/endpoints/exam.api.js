import api from "../axios/axios.service";

export const createExam = async (payload) => {
  const response = await api.post("exam/add", payload);
  return response.data;
};

export const updateExam = async (examId, payload) => {
  const response = await api.post(`exam/${examId}/update`, payload);
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

export const enrollStudents = async (payload) => {
  const response = await api.post("enroll/students", payload);
  return response.data;
};

export const findEnrollments = async (examId) => {
  const response = await api.get(`exam/${examId}/enrollments`);
  return response.data;
};

export const completeStudentAutoEnrollment = async (payload) => {
  const response = await api.post(`student/auto-enroll`, payload);
  return response.data;
};

export const completeStudentEnrollment = async (payload) => {
  const response = await api.post(`student/enroll`, payload);
  return response.data;
};

export const findStudentEnrollments = async () => {
  const response = await api.get(`student/exams`);
  return response.data;
};

export const checkIfExamIsActive = async (examId) => {
  const response = await api.get(`exam/${examId}/active`);
  return response.data;
};

export const findExamQuestionsForStudent = async (examId) => {
  const response = await api.get(`student/exam/${examId}/questions`);
  return response.data;
};

export const saveAnswer = async (payload) => {
  const response = await api.post(`/student/exam/question/answer`, payload);
  return response.data;
};

export const finishExam = async (examId, payload) => {
  const response = await api.post(`/student/exam/${examId}/finish`, payload);
  return response.data;
};

export const startExam = async (examId) => {
  const response = await api.get(`student/exam/${examId}/start`);
  return response.data;
};
