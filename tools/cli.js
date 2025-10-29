#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { listCourses } from "./list-courses.js";
import { checkoutCourse } from "./sparse-checkout.js";

const config = {
  org: "jesusoterogomez",
  repoName: "program-demo",
  ref: "origin/main",
  folder: `course`,
};

const repo = `https://github.com/${config.org}/${config.repoName}.git`;

// Hacky :)
config.repo = repo;

// Do a git clone of the repo but only clone the course folder and ONLY get the folders inside the course folder, in a performant way
try {
  const courses = listCourses(config);

  const selectedCourse = await select({
    name: "course",
    message: "Which course do you want to start?",
    choices: courses,
  });

  // Clone the selected course (WITH FILES) into the course directory
  checkoutCourse(selectedCourse, repo);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
