import { execSync } from "child_process";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export function listCourses(config) {
  const { repoName, ref, folder } = config;
  // Create a temporary working directory
  const targetDir = mkdtempSync(join(tmpdir(), `${repoName}-temp-clone-`));
  // console.log(`Cloning to ${targetDir}...`);

  // Shallow clone without checking out files
  execSync(
    `git clone --filter=blob:none --no-checkout ${config.repo} ${targetDir}`,
    {
      stdio: "ignore",
    }
  );

  // List the folders inside the course directory
  const lsTreeOutput = execSync(
    `git -C ${targetDir} ls-tree ${ref} ${folder}/` // Trailing slash is mucho importante to get the folders inside the course folder. Beat my head over it for a bit.
  )
    .toString()
    .trim();

  if (!lsTreeOutput) {
    process.exit(0);
  }

  const folderNames = lsTreeOutput
    .split("\n")
    // Directory entries are mode 040000 with type 'tree'
    .filter((line) => line.startsWith("040000 tree "))
    .map((line) => {
      const name = line.split("\t").pop() ?? "";
      // Remove folder name from the path
      return name.replace(new RegExp(`^${folder}/`), "");
    })
    .filter(Boolean);

  // Cleanup temporary directory
  rmSync(targetDir, { recursive: true, force: true });

  return folderNames;
}
