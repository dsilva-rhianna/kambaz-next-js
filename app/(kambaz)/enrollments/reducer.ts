import { createSlice } from "@reduxjs/toolkit";
import * as db from "../database";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enrollCourse: (state, { payload: { user, course } }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: user,
        course: course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollCourse: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === user && enrollment.course === course)
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;