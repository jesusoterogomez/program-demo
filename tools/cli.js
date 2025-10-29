#!/usr/bin/env node

// Do not blame me for how ugly this is, it's a quick and dirty proof of concept.

import { listCourses } from "./list-courses.js";

const config = {
  org: "jesusoterogomez",
  repoName: "program-demo",
  ref: "origin/main",
  folder: `course`,
};

const repo = `https://github.com/${config.org}/${config.repoName}.git`;

// Do a git clone of the repo but only clone the course folder and ONLY get the folders inside the course folder, in a performant way
try {
  listCourses(config, repo);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
