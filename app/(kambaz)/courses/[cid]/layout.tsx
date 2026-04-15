"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import * as client from "../client";
import { setEnrollments } from "../../enrollments/reducer";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const courses = useSelector((state: RootState) => state.coursesReducer.courses) as any[];
  const course = courses.find((c: any) => c._id === cid);

  const [showSidebar, setShowSidebar] = useState(true);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!currentUser) {
        router.replace("/account/signin");
        return;
      }

      try {
        const myCourses = await client.findMyCourses();

        const freshEnrollments = myCourses
          .filter((course: any) => course && course._id)
          .map((course: any) => ({
            user: (currentUser as any)._id,
            course: course._id,
          }));

        dispatch(setEnrollments(freshEnrollments));

        const enrolled = freshEnrollments.some(
          (e: any) => e.user === (currentUser as any)._id && e.course === cid
        );

        if (!enrolled) {
          router.replace("/dashboard");
          return;
        }

        setIsCheckingEnrollment(false);
      } catch (error) {
        console.error("Failed to check enrollment", error);
        router.replace("/dashboard");
      }
    };

    checkEnrollment();
  }, [cid, currentUser, dispatch, router]);

  if (isCheckingEnrollment) {
    return <div className="p-3">Loading...</div>;
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