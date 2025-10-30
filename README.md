## (Proof of concept) CLI tool to clone specific assignments from a study program:

This is a simple tool created with an idea I had to use _shallow clones and sparse checkouts_ to grab the files that trainees would need to start an assignment.

Try it out yourself with:

```sh
npx program-demo-cli
```

### Demo

_Example of using a CLI tool to get modules from the list of courses._

_Repo showing the program assignments on the left, usage of command line in the center, editor on the right to showcase folders being updated_

https://github.com/user-attachments/assets/b2c58302-94d6-43a3-ae83-0850f318dbc1

---

So... I have a completely different idea on how to get trainees to start assignments without dealing with Forks.

It's probably insane, but I had couple of hours to kill and thought I'd try to figure out if it was even possible:

My idea is that, instead of forking a repo, trainees:
- Start an assignment by creating a blank repository for their assignments (probably too late for this for the current teams)
- Use a CLI tool to start assignments:
  - This tool clones the required files for the specific assignment (assets, boilerplate, instructions, etc)

Assumptions (probably wrong):

- Mentors might prompt trainees to update their forks if future assignments have been updated.
- If trainees get only the latest version of an assignment, just before starting to work on it, it's unlikely they will need to update the source files. So copying before starting an assignment could make more sense that keeping a template in sync for the entire duration of the education.

Downsides:
- Maintenance
- No git history for the assignment that was just cloned
- [Insert your own]
- Requires using command line, and being aware of the directory you're in before cloning

---

This is based on ideas I had when playing with these commands:

- Cloning without getting files

```sh
git clone --filter=blob:none --no-checkout https://github.com/jesusoterogomez/program-demo.git /dir
```

- Reading the file structure from the courses directory, with ls-tree to display list of course modules (works without actually checking out files)

```sh
git ls-tree origin/main course/
```

- Selectively checking out files from a repo (To avoid downloading the entire repo every single time)
```sh
git sparse-checkout init / set
```
