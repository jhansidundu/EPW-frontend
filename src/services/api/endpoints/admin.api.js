import api from "../axios/axios.service";

export const addTeacher = async (payload) => {
  const response = await api.post("admin/teacher/add", payload);
  return response.data;
};
