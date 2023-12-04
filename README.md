# Contribution Guide
Thank you for your interest in contributing to project. Your help in invaluable.

## Basic Steps to Contribute

1. Fork the Repository
Click the "Fork" button at the top right of the repository page to create a copy of the project on your Github account.

2. Clone Your Forked Repository
Clone the repositoru to your local machine using the following command in your terminal:

```bash
git clone [HERE_URL]
```
3. Create a Branch
Create a branch for your contribution. The branch name should be descriptive, for example:

```bash
git checkout -b [HERE_BRANCHNAME]
```
Or 

```bash
git switch -d
```
4. Make Your Changes
Make the modifications and improvements you want to contribute to the project. Ensure you follow the project's style guides and recommendations.

5. Commit Your Changes
Commit your changes with a descriptive message:

```bash
git add .
git commit -m "feature: #XXX"
```
6. Sync with the Original Repository
Before submitting your contribution, make sure you hace the latest version of the original repo. You can add the original as a remote and sync your local branch:

```bash
git remote add upstream [URL]
git fetch upstream
git rebase upstream/main
```
7. Submit Your PR
Push your changes to yout Github repo and then open a PR from your branch to the main branch original repository.

### Contribution Guidelines
 * Keep your changes focused and atomic.
 * Follow the project's naming and style conventions.
 * Include documentation for new changes if necessary.
 * If your contribution resolves an existing issue, mention the issue number in your commit msg or PR.