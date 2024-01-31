
# 🌟 World's First Open Source Project That Pays Royalties to Its Contributors 🌟

## 💰 Royalty Pool & Contributor Compensation

### 🏦 About the Royalty Pool
Our project has established a Royalty Pool, a dedicated fund to financially compensate contributors. This pool is sustained through various sources:

- **🎁 Donations**: Received from individuals or organizations.
- **🏆 Grants**: Acquired from entities supporting open-source initiatives.
- **💼 Revenue**: Generated from services related to our project.
- **🤝 Sponsorships**: Obtained from companies or individuals benefiting from our project.

### 📊 Distribution Model
Compensation is based on a fair and transparent Royalty Points System:

- **💻 Contribution Evaluation**: Contributions (coding, documentation, etc.) are assigned points based on their impact and complexity.
- **💵 Monetary Value**: Points have a set monetary value, periodically adjusted to reflect the pool's status.

### 🗓️ Payment Schedule
Payments are distributed following a regular schedule:

- **🔄 Frequency**: Payments are made annually.
- **💳 Methods**: We offer various payment methods, including bank transfer, PayPal, and cryptocurrencies.

### 🌐 Transparency and Reporting
We are committed to transparency:

- **📝 Reporting**: Regular reports detail fund inflows, outflows, and distribution.
- **🔍 Public Records**: A ledger records points earned by each contributor.
- **📢 Feedback**: Contributors can provide feedback or raise concerns regarding the distribution process.

## 🤝 Contributing Guidelines

### 1️⃣ Sync Your Fork with the Original Repository

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

### 2️⃣ Create a Feature Branch

It's a good practice to create a new branch for each set of changes you plan to contribute.

1. **Create and switch to a new branch** (name it according to the feature or fix you're working on):
    ```bash
    git checkout -b feature-branch-name
    ```

### 3️⃣ Make Your Changes

Implement your changes, enhancements, or fixes in this branch, then add and commit your changes:

1. **Add your changes**:
    ```bash
    git add .
    ```
2. **Commit your changes**:
    ```bash
    git commit -m "Detailed commit message"
    ```
3. **Push the feature branch to your fork**:
    ```bash
    git push origin feature-branch-name
    ```

### 4️⃣ Create a Pull Request

After pushing your changes, create a pull request in the original repository:

1. Go to the original repository on GitHub.
2. Click "New pull request".
3. Set the base repository to the original repository and the base branch (usually `main`).
4. Set the head repository as your fork and the compare branch as your feature branch.
5. Fill in the pull request details and submit.

### 5️⃣ Follow Up

Be responsive to feedback after submitting your pull request:

- Make additional changes if requested.
- Engage in discussions and answer any questions.

### 6️⃣ Cleanup (Optional)

After your pull request is merged:

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

> **Note**: These steps are general guidelines. Always check the project's specific guidelines if available.
