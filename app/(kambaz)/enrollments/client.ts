import axios from "axios";

const axiosWithCredentials = axios.create({ 
  withCredentials: true 
});
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`
  );
  return response.data;
};
export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
  return response.data;
};
export const findEnrollmentsForUser = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
  return response.data;
};
export const enrollUserInCourse = async (courseId: string, userId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};