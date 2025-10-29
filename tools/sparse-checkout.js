import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { join } from "path";

export const checkoutCourse = (selectedCourse, config) => {
  // Get a temporary directory to do a sparse checkout into:
  const tempDir = join(
    tmpdir(),
    `${config.repoName}-temp-checkout-course-${selectedCourse}`
  );

  console.log(`Cloning to ${tempDir}...`);

  // Clone the course repository without files into the temporary directory
  // git -C <path> clone --no-checkout <repo> <destination>
  execSync(`git -C ${tempDir} clone --no-checkout ${config.repo} ${tempDir}`, {
    stdio: "ignore",
  });

  // Initialize sparse checkout in the temporary directory
  // git -C <path> sparse-checkout init --cone
  execSync(`git -C ${tempDir} sparse-checkout init --cone`, {
    stdio: "ignore",
  });

  const coursePath = `${config.folder}/${selectedCourse}`;
  // Set the sparse checkout to the assignment folder
  // git -C <path> sparse-checkout set <path/in/repo/to/checkout>
  execSync(`git -C ${tempDir} sparse-checkout set ${coursePath}`, {
    stdio: "ignore",
  });

  // Make a new directory for the course in the current directory.
  mkdirSync(selectedCourse, { recursive: true });

  // Copy the course files into the new directory.
  execSync(`cp -r ${tempDir}/${coursePath} ${selectedCourse}`, {
    stdio: "ignore",
  });

  // Cleanup the temporary directory
  rmSync(tempDir, { recursive: true, force: true });
};
