import Course from "../models/course.model.js";

// controllers/course.controller.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserLevel = async (req, res, next) => {
  try {
    const { username, courseName } = req.params; // Correctly extract params from request
    console.log("Username:", username, "CourseName:", courseName);
    const course = await prisma.courses.findFirst({
      where: { username, courseName }, // Ensure these are the correct field names in your database schema
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course or user not found" });
    }
    res.status(200).json(course.level); // Assuming 'level' is a field in the returned course object
  } catch (error) {
    console.error("Error in getUserLevel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkRegistration = async (req, res, next) => {
  const { username } = req.params;
  const courseName = "C Programming"; // This can be dynamic if you have multiple courses

  try {
    const { courseName, username, level, hasStarted } = req.body;

    // Check if the course registration already exists
    const existingCourse = await Course.findOne(username);
    if (existingCourse) {
      res.json({ hasStarted: true });
      return true;
    } else {
      res.json({ hasStarted: false });
      return false;
    }
  } catch (error) {
    next(error);
  }
};

export const registerCourse = async (req, res, next) => {
  try {
    const { courseName, username, level, hasStarted } = req.body;

    // Check if the course registration already exists
    const existingCourse = await Course.findOne({ courseName, username });
    if (existingCourse) {
      // If the registration exists, send a message and don't create a new one
      return res
        .status(409)
        .json({ message: "User is already registered for this course." });
    }

    // If no existing registration, create a new one
    const newCourse = new Course({ courseName, username, level, hasStarted });
    await newCourse.save();
    res.status(201).json({ message: "Course registered successfully!" });
  } catch (error) {
    next(error);
  }
};
