---
category: os
loadingTypogram: true
---

Ubuntu (based on Linux) is an operating system that is popular for strong programmability and cost-free availability. It has many variants such as manjaro, ubuntu,... for users to select.

Author: the Linux kernel v0.01 was created by Linus Torvalds in 1991, about 6 years after the first version of window was launched by Microsoft in 1985. Since then, various Linux distributions have emerged, leading to some confusion about the concepts of the Linux operating system:

- Debian was created by Ian Murdock in 1993 ( Debian is combined by his girlfriend's name, Debra, and his own name, Ian).

- Arch Linux was created by Judd Vinet in 2002. Vinet, a Canadian software engineer, developed Arch with the goal of providing a simple, lightweight, and flexible Linux distribution.

- Ubuntu was created by Mark Shuttleworth and his company Canonical Ltd. in 2004. The name "Ubuntu" comes from a Southern African philosophy meaning "humanity to others" or "I am because we are".

- Manjaro is a Linux distribution based on Arch Linux. It was created by a team of developers led by Philip Müller in 2011.

Thank goodness! Bash (Bourne Again Shell) is the default shell for many Linux distributions, providing users with a regular way to interact with the operating system using text-based commands.


This post is to show some regular Bash commands:

1. <b>ls </b>: list of files in current dir
    - <b>ls -l </b>: more details about authorization and ownership.<br><br>

2. <b>cd Dirname</b>: change current directory.
    - <b>cd .. </b>: back to the mother directory.

3. <b>pwd </b>: print the current directory path.

4. <b>which appName </b>: print the application directory path.

5. <b>touch newfileName </b>: create an empty file.

6. <b>mkdir newDirName </b>: create an empty folder.

7. <b>rm fileName </b>: remove a file.
    - <b>rm -rf dirName </b>: delete a folder recursively (warning: cannot be undone).<br><br>

8. <b>find </b>: search for a file or directory.
    - <b>find . -name "*.txt" </b>: search all files .txt" in current dir.
    - <b>find . -iname "*.TXt" </b>: search files ".txt" in current dir, ignoring case-senstive.
    - <b>find . -maxdepth 1 -name "*.txt" </b>: search all files .txt" in current dir but only one layer (excluding sub-folders).
    - <b>find ./folderName -iname "*.TXt" </b>: search files ".txt" in a folder.<br><br>

9. <b>grep </b>: search lines within a file content.
    - <b>grep -i "=" file.txt </b>: search any lines has '=' in a file.
    - <b>grep -in "=" file.txt </b>: any lines has '=' and show line numbers.
    - <b>grep -i "category" ./_dirName/* </b>: any lines has 'category' in all files of a folder.

10. <b>clear </b>: wipe out the screen.

11. <b>cat fileName </b>: show content of a file.

12. <b>nano fileName </b>: open a file (create the file if it is not existing).

13. <b>top </b>: displays real-time system processes, including memory and CPU usage...
    - <b>top | grep -in "sql" </b>: only running filenames that has 'sql' at its name.
    - <b>ps aux </b>: show a snapshot of all current running process, including PID, CPU and memory usage, user...
    - <b>ps aux | grep -in "sql" </b>: only running filenames that has 'sql' at its name.

14. <b>kill processID </b>: stops a process by its PID (process ID).

15. <b>tail </b>: show some specific content of a file from the end.
    - <b>tail -n 3 fileName </b>: show the last 3 lines.
    - <b>tail -f fileName </b>: show the last appended data and keep tracking new updating.<br><br>


16. <b>chmod </b>: change modes or permissions of a file.
    - <b>chmod 755 filename </b>: read & execute for everyone and plus write access for the owner. This mode is seen very commonly.
    - <b>chmod 744 filename </b>: read for everyone and plus write & execute permission for the owner.
    - <i>Binary Rule : it's better to read the permission pattern from right to left (ex: drwxr-xr-x = 755).</i>
        - rwx = "read-write-execute" = 111 = 2^2 + 2^1 + 2^0 = 7 (grant all permissions).
        - r--x = "read-0-execute" = 101 = 2^2 + 0^1 + 2^0 = 5 (execute & read).
        - rw-- = "read-write-0" = 110 = 2^2 + 2^1 + 0^0 = 6.
        - r-- -- = "read-0-0" = 100 = 2^2 + 0^1 + 0^0 = 4.
        <p>"755" refers to 3 types of user: owner, group and others.</p>
        <script type="text/typogram">
            
                  755
                 / | \
        Owner <-+  v  +-> Other
                 Group 

        </script>
    - Common types of linux users:
        1. Admin user (with "sudo"): uses through "sudo" commands as root when necessary.
        2. Root user: a superuser has the highest level of access on the system: install software, manage user accounts.
        3. Owners: typically the creator of a file.
        4. Group: a collection of users, each shares similar permissions to a file.
        5. Regular users: like an individual user, who can install programs in their own home space. But they are restricted from accessing system files and performing administrative tasks.
        6. System users: users created for intalled specific programs like mysql, postgres...
        <p><i>(Hint: right-click on a file, select "properties", we can check some user types in tab "permission".)</i></p>

17. <b>chown </b>: changes file owner and group.
    - <b>chown userName:groupName filename </b>: assigns file ownership to new user and new group.<br><br>

18. <b>wget url.com/file.zip </b>: downloads file from an url (GET http method).
    - <b>curl -O url.com/file.zip </b>: downloads file and save it with its original name.
    - <b>tar -xzvf file.tar.gz </b>: extract a compressed .tar.gz file.<br><br>

19. <b>printenv </b>: print out all global variables.
    - <b>printenv | grep -in user </b>: print out all global variables including the text "user" in their names.<br><br>

20. <b>echo </b>: print out, over-write or append lines into a file.
    - <b>echo HOME </b>: print out a global variable "HOME".
    - <b>echo "(pwd)" </b>: print out a result of a command "pwd".
    - <b>echo "line for overwriting" > filename.txt </b>: creating or overwriting the file.
    - <b>echo "line for appending" >\> filename.txt </b>: appending a line into the file.<br>

21. <b>man cd </b>: show manual of command "cd".

22. <b>who </b>: show current logged-in user.

23. <b>sudo pacman -Syu </b> (for manjaro OS): update the system and upgrade all installed packages using the default package manager pacman, excluding personal applications (chrome, code,...).

<br>

<b>Afterword: (Lời bạt)</b>

- <i>Bash was written by Brian Fox in 1987 as a part of GNU Project. GNU was started by Richard Stallman in 1983 with the goal of creating a free and open-source OS. The term "GNU" stands for "GNU's Not Unix", reflecting its Unix-like nature but free from "proprietary restrictions" (Hạn chế quyền sở hữu)<a href="https://www.gnu.org/gnu/gnu.html">.</a></i>

- <i>The GNU Project includes essential components for an OS, such as compilers (GCC), text editors (Emacs). However, GNU was not until Linux (1991) came along that a complete free OS was created, often referred to as GNU/Linux.</i><br>

- <i>GNU always curates a concept of "Software Freedom" that users should have control over the software they use.</i>