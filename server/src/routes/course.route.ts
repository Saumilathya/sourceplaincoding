import express from "express";
import {
  deleteCourse,
  // editCourse,
  getAdminAllCourses,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.get("/get_courses", getAllCourses);

courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

// courseRouter.put(
//   "/edit-course/:id",
//   isAutheticated,
//   authorizeRoles("admin"),
//   editCourse
// );

courseRouter.get(
  "/get-admin-courses",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);
courseRouter.delete(
  "/delete-course/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
