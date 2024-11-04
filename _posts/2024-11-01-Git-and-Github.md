---
category: tool
---
Git (based on C) is a powerful, open-source version control tool that allows developers to track changes, collaborate, and manage project history efficiently. While GitHub (based on ruby-on-rails) is the popular platform for hosting Git repositories.

Author: Git was created by Linus Torvalds in 2005, who also developed Linux in 1991. Github was built by Tom Preston-Werner, Chris Wanstrath, PJ Hyett, and Scott Chacon. Microsoft acquired GitHub in 2018.

These are some common helpful commands of git: 
<br><i>(Warning: we should use a new branch named "dev" to develop or code, which allows us to do the code review before merging.)</i>

1. <b>git pull </b> (git pull origin Branchname): updates your current local branch by fetching the latest changes from the corresponding remote branch and merging those changes into your local branch.

2. <b>git clone GithubURL </b>: clone a github repository down to local machine.

3. <b>git remote &#8211;v </b>: show the github link.
    - git remote add origin Github_Url: set a remote origin for local directory.<br><br>

4. <b>git add . </b> (git add Filename): stage or track all changes at current time before committing and pushing.
    - git add &#8211;&#8211;all : will include deleted files also.<br><br>

5. <b>git commit &#8211;m "messages"</b> : add a short title to all the changes (added by the latest command "git add") before pushing.
    - git commit --amend : modify the most recent commit.

6. <b>git push </b>(git push origin Branchname): push all the changes (committed by all commands "git commit") to the remote repository at Github.
    <br><i>Note: We should use a new branch named "dev" to develop new features, which allows us to do the code review later.</i>

7. <b>git init </b>: Add "git" for current directory. (a .git file & log files is added to it).

8. <b>git status </b>: show the staged files or other info of working directory.
    - git show commitID : show the information or changes of a commit.<br><br>

9. <b>git checkout BrName </b>: switch to another branch named "BrName".
    - git checkout -b BrName: create, copy, then switch to a new branch named "BrName" from current branch.
    - git checkout -b BrName main: create, copy, then switch to a new branch named "BrName" from "main" branch.

10. <b>git branch -d BrName </b>: delete a branch.

11. <b>git merge </b>: merge a specific branch to current Branch.
    - git checkout targetBranch : enter the target_branch
    - git merge featureBranch : merge feature_branch to the target_branch.<br><br>

12. <b>git log </b>: display a list of commits in an order.
    - git log --oneline --reverse: display only the first line in reversed order.<br><br>

13. <b>git branch -a </b>: show all local and remote branches.
    - git branch -r : show only remote branches. (remote branch starts with "origin/").<br><br>

14. <b>git fetch </b>: fetch all remote branches to local machine without auto merging like "git pull". This requires some following commands:
    - git fetch origin remoteBranch : fetch only one specific remote branch. This requires us to know the name of the remote branch (use: <i>git branch -r</i>).
    <br>-> git checkout remoteBranch : switch to the remoteBranch.
    - <b>git merge origin/main</b> : After fetching, we have to do merging ourselves.
    <br><i>Shorter alternative :</i>
    - git checkout -b newBranch origin/remoteBr : create, then copy a remote branch into a new branch. This is useful to do the review code at local.<br><br>

15. <b>git diff </b>: display the difference between local unstaged changes and the lasted cloned or fetched version.
    - git diff main origin/main : difference between local main and remote main after fetching.<br>

16. <b>git blame Filename </b>: report which users changed which parts of a file.

17. <b>git bisect </b>: use binary search to find the closest commit that introduced a bug. The process is below:
    1. git bisect start : start the searching.
    2. git bisect bad : set current version is bad.
    3. git bisect good v2.6.13-rc2 : v2.6.13-rc2 is known to be good (use "git log" to display list of commit IDs).
    4. git bisect bad : this command will <b>"check out"</b> back one step to the previous version, then we could inspect whether the bug issue is still existing or not. 
    5. If the bug is still there, "git bisect bad" again to "check out" back another step to the more previous version, inspect the bug issue again. Continue until we find the closest version that the bug issue does not happen. Now we know the commit after this version is a place where the bug issue happened for the first time. Use "git show commitID" to check the changes inside it.
    6. git bisect reset: cancel the searching session, <a href="https://www.loom.com/share/441b848fe2524f50aae31712657fa3d4?sid=b06cfda5-662f-4c15-a08e-82b4d0544cc3" target="_blank">then fix the bug.</a><br><br>

18. <b>git rebase </b>: keep commit history clean and clear by allowing to combine several commits into one by "squashing" technique, then force pushing again. <i>(Note: should not use for a group branch)</i>.
    - git rebase -i HEAD~5 : tell git that we want to rebase the last five commits. A window editor will appear, replace the word "pick" with "squash" on the commit we want to squash into one commit.
    - Edit a new commit message for the commit that will replaces all the combined commits.
    - git push origin featureBranch --force : push to change the commit history at Github.
    







