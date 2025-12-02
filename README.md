# Devlink — GitHub Finder

frontend project that looks up GitHub user profiles and top repositories.

**Local Files**
- `index.html`: Minimal UI and search input.
- `script.js`: JavaScript logic — performs API requests and renders results.
- `style.css`: Styles for the UI.

**What it does**
- Searches for a GitHub user by username and displays profile information and the top 5 repositories (sorted by stars).

**External API Endpoints Used (GitHub REST API)**

- **GET :** `https://api.github.com/users/{username}`
  - Description: Fetches the public profile for the specified user.
  - Path param: `username` — GitHub username to look up.
  - Fields used by this app: `avatar_url`, `name`, `login`, `bio`, `followers`, `following`, `public_repos`.
  - Example curl:
    ```bash
    curl -s "https://api.github.com/users/octocat"
    ```

- **GET :** `https://api.github.com/users/{username}/repos?sort=stars&per_page=5`
  - Description: Lists public repos for the user. Query params used in the app: `sort=stars` and `per_page=5` to show the top 5 repos by star count.
  - Fields used by this app (per repo): `html_url`, `name`, `stargazers_count`.
  - Example curl:
    ```bash
    curl -s "https://api.github.com/users/octocat/repos?sort=stars&per_page=5"
    ```

Notes about usage:
- The app performs unauthenticated requests by default. Unauthenticated requests to the GitHub API are rate-limited to 60 requests per hour per IP. If you expect heavier usage or want higher limits, provide a personal access token and include it in requests using the `Authorization: token <YOUR_TOKEN>` header.

Example authenticated curl (replace `<TOKEN>`):
```bash
curl -H "Authorization: token <TOKEN>" "https://api.github.com/users/octocat"
```

How to run locally
- Open `index.html` in your browser (no build step required). Example in PowerShell:
  ```powershell
  start .\index.html
  ```

Implementation note (where endpoints are called)
- The fetch calls are in `script.js`:
  - `fetch(`https://api.github.com/users/${username}`)`
  - `fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`)

Troubleshooting
- If requests return `403` or you see errors about rate limiting, add an Authorization header with a token or wait until rate limits reset.

License & Attribution
- This project uses the public GitHub REST API (https://docs.github.com/en/rest).
