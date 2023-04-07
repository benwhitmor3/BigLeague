### PR Guide

#### Motivation for Code Reviews

- Primary focus to make sure that the **overall code health improves over time**
- A reviewer has **collective code ownership and responsibility** over the code they are reviewing
- Ensure codebase stays consistent and maintainable
- Learning and sharing knowledge — about the code base but also programming in general

#### Speed of Reviews

- Fast reviews are important
  - Slow reviews discourage code cleanup, refactoring, and further improvements
- If you are not in the middle of a focused task—you should do a review shortly after it comes in
  - One business day is the maximum time it should take to respond to a code review request
- Keep PRs small: they should have a singular focus and do it well
- Shift-left code reviews — code reviews before 100%
- Keep reviewer consistent for each story
- 2 team members are required to approve PROD-impacting changes
- If you are too busy to do a full review note when you will get to it, suggest other reviewer, or provide initial broad comments.
- PR practices: https://google.github.io/eng-practices/review/reviewer/navigate.html


#### New PR Template
1. Performed a self-review of my PR
2. I have commented on every non-trivial change in my PR: how it worked before, how it works now, and why we changed it
3. I have updated existing names, comments and docstrings where applicable
4. No new warnings generated
5. I have added tests for the change
6. Added JIRA Ticket / Changed branch name


#### Miscellaneous
1. Branches should be pruned if become inactive
2. 
