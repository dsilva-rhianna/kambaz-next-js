"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";
import { setEnrollments, enrollCourse, unenrollCourse } from "../enrollments/reducer";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  if (!currentUser) {
    redirect("/account/signin");
  }
  const isFaculty = (currentUser as any).role === "FACULTY" || (currentUser as any).role === "ADMIN";
  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === (currentUser as any)._id && e.course === courseId);
  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error("Failed to fetch all courses", error);
    }
  };
  const fetchEnrollments = async () => {
    try {
      const data = await enrollmentsClient.findEnrollmentsForUser();
      dispatch(setEnrollments(data));
    } catch (error) {
      console.error("Failed to fetch enrollments", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchAllCourses();
      fetchEnrollments();
    }
  }, [currentUser]);

  const displayedCourses = showAllCourses ? allCourses : allCourses.filter((course) => isEnrolled(course._id));
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setAllCourses([...allCourses, newCourse]);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    const updatedAll = allCourses.map((c) => (c._id === course._id ? course : c));
    setAllCourses(updatedAll);
    dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
  };
  const handleEnroll = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollInCourse(courseId);
      dispatch(enrollCourse({ user: (currentUser as any)._id, course: courseId }));
    } catch (error) {
      console.error("Failed to enroll", error);
    }
  };
  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollFromCourse(courseId);
      dispatch(unenrollCourse({ user: (currentUser as any)._id, course: courseId }));
    } catch (error) {
      console.error("Failed to unenroll", error);
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>{" "}
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            rows={3}
            as="textarea"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />{" "}
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})
        </h2>
        <Button variant="primary" onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "Show Enrolled" : "Show All Courses"}
        </Button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName === "BUTTON") {
                      e.preventDefault();
                    }
                  }}
                >
                  <CardImg src={course.image} variant="top" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>

                    {isEnrolled(course._id) ? (
                      <Button variant="danger" size="sm" className="float-end ms-2"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnenroll(course._id);
                        }}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" size="sm" className="float-end ms-2"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnroll(course._id);
                        }}>
                        Enroll
                      </Button>
                    )}
                    {isFaculty && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}