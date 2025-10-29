import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { join } from "path";

export const checkoutCourse = (selectedCourse, config) => {
  // Create course directory in current folder
  mkdirSync(join(process.cwd(), selectedCourse));

  // Clone the course repository without files into the course directory
  // git -C to execute the command in the course directory without changing the current directory.
  execSync(
    `git -C ${join(process.cwd(), selectedCourse)} clone --no-checkout ${
      config.repo
    } ${join(process.cwd(), selectedCourse)}`,
    {
      stdio: "ignore",
    }
  );

  // Initialize sparse checkout in the course directory
  execSync(
    `git -C ${join(process.cwd(), selectedCourse)} sparse-checkout init --cone`,
    {
      stdio: "ignore",
    }
  );

  // Set the sparse checkout to the assignment folder
  execSync(
    `git -C ${join(process.cwd(), selectedCourse)} sparse-checkout set ${
      config.folder
    }/${selectedCourse}`,
    {
      stdio: "ignore",
    }
  );
};
