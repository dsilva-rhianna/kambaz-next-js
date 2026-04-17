import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
  return data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
};

export const deleteQuiz = async (quizId: string) => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

export const publishQuiz = async (quizId: string) => {
  await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/publish`);
};

export const unpublishQuiz = async (quizId: string) => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/publish`);
};

export const getLastAttempt = async (userId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/users/${userId}/quizzes/${quizId}/lastAttempt`
  );
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const getAttemptsForQuiz = async (userId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/users/${userId}/quizzes/${quizId}/attempts`
  );
  return data;
};

export const createQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/questions`, question
  );
  return data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  await axiosWithCredentials.put(
    `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/questions/${questionId}`, question
  );
};

export const deleteQuestion = async (questionId: string) => {
  await axiosWithCredentials.delete(
    `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/questions/${questionId}`
  );
};