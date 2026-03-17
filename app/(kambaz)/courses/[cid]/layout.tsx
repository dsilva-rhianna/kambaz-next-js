"use client";

import { ReactNode, useState } from "react";
import { useParams, redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const courses = useSelector((state: RootState) => state.coursesReducer.courses) as any[];
  const course = courses.find((c: any) => c._id === cid);

  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  if (!currentUser) {
    redirect("/account/signin");
  }

  const isEnrolled = enrollments.some(
    (e: any) => e.user === (currentUser as any)._id && e.course === cid
  );
  if (!isEnrolled) {
    redirect("/kambaz/dashboard");
  }

  return (
    <div id="wd-courses">
      <div className="d-flex">
        <div className={`${showSidebar ? "d-block" : "d-none"} wd-course-navigation`}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <h2 className="text-danger">
            <FaAlignJustify
              className="me-4 fs-4 mb-1"
              onClick={toggleSidebar}
            />
            {course?.name}
          </h2>
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
}