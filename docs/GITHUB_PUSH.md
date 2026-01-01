# Codex Neural: GitHub Push Instructions

## Prerequisites
- **GitHub Account**: You must have a GitHub account.
- **Git Installed**: Verified on your local machine.

## Step 1: Create Repository
1.  Log in to [GitHub](https://github.com).
2.  Click the **+** icon (top right) -> **New repository**.
3.  Name it: `codex-neural`.
4.  **Important**: Do NOT check "Initialize with README" (we already have one).
5.  Click **Create repository**.

## Step 2: Push Code
Run the following commands in your terminal (VS Code):

```bash
# 1. Link your local repo to GitHub
git remote add origin https://github.com/<YOUR-USERNAME>/codex-neural.git

# 2. Push the code (Master/Main branch)
git branch -M main
git push -u origin main
```

## Step 3: Verification
1.  Refresh your GitHub repository page.
2.  Verify you see folders: `src`, `public`, `docs`, etc.
3.  Verify `node_modules` and `.env` are MISSING (Security Check).

## Troubleshooting
- **"Permission Denied"**: You may need to log in. Run `git credential-manager github login` or set up SSH keys.
- **"Remote already exists"**: Run `git remote set-url origin https://github.com/<YOUR-USERNAME>/codex-neural.git`.
