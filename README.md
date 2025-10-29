So,

I have a completely different idea on how to get trainees to start assignments.

It's probably insane, but I had an hour+ to kill and tried to figure out if it was possible:

What about instead of forking a repo, trainees:

- Create a blank repository for their assignments (too late for this)
- Use a CLI tool to start assignments:
  - This tool clones the required files for the specific assignment
  - Clones instructions + assets + boilerplate code from the HYF assignments repo.

I thought we can use shallow checkouts and sparse clones/checkouts to grab only what the trainees need to start an assignment.

# Clone only structure, don't get files.

git clone --filter=blob:none --no-checkout https://github.com/jesusoterogomez/program-demo.git /temp-directory

# Get the file structure from the courses directory that was just cloned. (i.e. latest), running ls-tree inside the temp-dir..

git -C temp-directory ls-tree origin/main course/

# What am I trying to do:

- To get a quick demo with an npx package that trainees can use to get the files needed to start an assignment.
