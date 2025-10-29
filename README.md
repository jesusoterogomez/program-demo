## Proof of concept - CLI tool to clone specific assignments from a study program:

Try it out yourself with:

```sh
npx program-demo-cli
```

### Demo

_Example of using a CLI tool to get modules from the list of courses._

https://github.com/user-attachments/assets/b2c58302-94d6-43a3-ae83-0850f318dbc1

---

So... I have a completely different idea on how to get trainees to start assignments without dealing with Forks.

It's probably insane, but I had couple of hours to kill and tried to figure out if it was even possible:

What about instead of forking a repo, trainees:

- Start the course by creating a blank repository for their assignments (probably too late for this)
- Use a CLI tool to start assignments:
  - This tool clones the required files for the specific assignment
    (Clones instructions + assets + boilerplate code from the HYF assignments repo)

This is a simple tool created with an idea I had to use _shallow clones and sparse checkouts_ to grab the files that trainees would need to start an assignment.

Assumptions:

- If trainees only copy the assignment of the current week, it's unlikely they will need to update the source files. So copying before starting an assignment could make more sense that keeping a template in sync for the entire duration of the education.

This is based on:

# Cloning without getting files

git clone --filter=blob:none --no-checkout https://github.com/jesusoterogomez/program-demo.git /dir

# Reading the file structure from the courses directory, with ls-tree to display list of course modules

git -C temp-directory ls-tree origin/main course/
