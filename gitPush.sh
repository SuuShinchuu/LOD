#!/bin/bash

# Check if a comment is provided as a parameter
if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  echo "Usage: ./git_push.sh \"Your commit message\""
  exit 1
fi

# Assign the first parameter to the comment variable
COMMENT="$1"

# Add all changes to the staging area
git add .

# Commit the changes with the provided comment
git commit -m "$COMMENT"

# Push the changes to the remote repository
git push

