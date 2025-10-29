#!/usr/bin/env node

// Do not blame me for how ugly this is, it's a quick and dirty proof of concept.

import { execSync } from "child_process";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const org = "jesusoterogomez";
const repoName = "program-demo";
const ref = "origin/main";
const repo = `https://github.com/${org}/${repoName}.git`;
const folder = `course`;

// Do a git clone of the repo but only clone the course folder and ONLY get the folders inside the course folder, in a performant way
try {
  // Create a temporary working directory
  const targetDir = mkdtempSync(join(tmpdir(), `${repoName}-temp-clone-`));
  // console.log(`Cloning to ${targetDir}...`);

  // Shallow clone without checking out files
  execSync(`git clone --filter=blob:none --no-checkout ${repo} ${targetDir}`, {
    stdio: "ignore",
  });

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
    .filter((name) => Boolean(name));

  for (const name of folderNames) {
    console.log(name);
  }

  // Cleanup temporary directory
  rmSync(targetDir, { recursive: true, force: true });
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
