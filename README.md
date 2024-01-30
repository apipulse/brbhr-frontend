OPEN SOURCE PROJECT THAT PAYS ROYALTIES TO IT'S CONTRIBUTERS



Contributing to the original repository after you've made changes in your fork involves a few steps. Here's a detailed guide to help you through the process:

### 1. Sync Your Fork with the Original Repository

Before contributing, make sure your fork is up-to-date with the original repository to avoid merge conflicts.

1. **Add the original repository as a remote** (if not already done). This remote is typically named `upstream`:

    ```bash
    git remote add upstream https://github.com/apipulse/brbhr-frontend
    ```

2. **Fetch the latest changes from the original repository**:

    ```bash
    git fetch upstream
    ```

3. **Switch to your main branch** (assuming it's named `main` or `master`):

    ```bash
    git checkout main
    ```

4. **Merge the changes from the original repository's main branch into your fork**:

    ```bash
    git merge upstream/main
    ```

5. **Push the updates to your fork**:

    ```bash
    git push origin main
    ```

### 2. Create a Feature Branch

It's a good practice to create a new branch for each set of changes you plan to contribute.

1. **Create and switch to a new branch** (name it according to the feature or fix you're working on):

    ```bash
    git checkout -b feature-branch-name
    ```

### 3. Make Your Changes

1. Implement your changes, enhancements, or fixes in this branch.
2. Add and commit your changes:

    ```bash
    git add .
    git commit -m "Detailed commit message"
    ```

3. **Push the feature branch to your fork**:

    ```bash
    git push origin feature-branch-name
    ```

### 4. Create a Pull Request

1. Go to the original repository on GitHub.
2. You'll likely see a prompt to create a pull request for your new branch. If not, go to the "Pull requests" tab and click "New pull request".
3. Set the base repository as the original repository and the base branch to which you want to contribute (usually `main`).
4. Set the head repository as your fork and the compare branch as your feature branch.
5. Fill in the pull request details: give it a meaningful title, describe the changes, and mention any related issues.
6. Submit the pull request.

### 5. Follow Up

After submitting the pull request, the repository maintainers will review your changes. Be responsive to feedback:

- If requested, make additional changes and push them to your feature branch.
- Engage in discussions and answer any questions related to your pull request.

### 6. Cleanup (Optional)

After your pull request is merged, you can delete your feature branch:

1. **Switch to your main branch**:

    ```bash
    git checkout main
    ```

2. **Delete the feature branch locally**:

    ```bash
    git branch -d feature-branch-name
    ```

3. **Delete the feature branch from your fork**:

    ```bash
    git push origin --delete feature-branch-name
    ```

Remember, these steps are a general guideline. Some projects may have specific contributing guidelines, so always check the project's `README` or `CONTRIBUTING` files for any project-specific steps or requirements.
