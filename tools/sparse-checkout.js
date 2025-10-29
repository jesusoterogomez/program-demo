import { execSync } from "child_process";
import { mkdirSync, mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export const checkoutCourse = (selectedCourse, config) => {
  // Get a temporary directory to do a sparse checkout into:
  const tempDir = mkdtempSync(join(tmpdir(), `${config.repoName}-checkout-`));

  // Clone the course repository without files into the temporary directory
  // git -C <path> clone --no-checkout <repo> . (dot means extract to that temp directory)
  execSync(`git -C ${tempDir} clone --no-checkout ${config.repo} .`, {
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

  // Checkout sparse files from specified branch
  execSync(`git -C ${tempDir} checkout ${config.ref}`, {
    stdio: "ignore",
  });

  // Make a new directory for the course in the current directory.
  mkdirSync(selectedCourse, { recursive: true });

  // Copy the course files into the new directory.
  execSync(`cp -r ${tempDir}/${coursePath} .`, {
    stdio: "ignore",
  });

  // Cleanup the temporary directory
  rmSync(tempDir, { recursive: true, force: true });
};
