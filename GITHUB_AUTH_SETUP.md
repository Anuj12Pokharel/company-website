# GitHub Authentication Setup

## Issue
Git is trying to use credentials for `DeveloperManohar1` but you need to push to `Manoharaya/codex-neural`.

## Solution: Use Personal Access Token (PAT)

### Step 1: Create a Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Or visit: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `codex-neural-push`
4. Select scopes:
   - ✅ **repo** (full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Push Using Token

Run this command (replace `YOUR_TOKEN` with the token you copied):

```bash
git push https://YOUR_TOKEN@github.com/Manoharaya/codex-neural.git main
```

**OR** update the remote URL:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Manoharaya/codex-neural.git
git push -u origin main
```

### Alternative: Use SSH (if you have SSH keys set up)

```bash
git remote set-url origin git@github.com:Manoharaya/codex-neural.git
git push -u origin main
```

### Alternative: Update Windows Credential Manager

1. Open **Windows Credential Manager**
2. Go to **Windows Credentials**
3. Find `git:https://github.com`
4. Edit or remove it
5. Try pushing again - Windows will prompt for new credentials

---

**Note:** Make sure the repository `codex-neural` exists at https://github.com/Manoharaya/codex-neural


