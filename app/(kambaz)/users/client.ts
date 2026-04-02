import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findUsersInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data;
};
export const updateUser = async (userId: string, user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${userId}`, user);
  return response.data;
};
export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};