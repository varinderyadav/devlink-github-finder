
const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('usernameInput');
const profileSection = document.getElementById('profile');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error');
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const bioEl = document.getElementById('bio');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');
const publicReposEl = document.getElementById('publicRepos');
const repoList = document.getElementById('repoList');

searchBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (!username) return;

  profileSection.classList.add('hidden');
  errorMsg.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const resProfile = await fetch(`https://api.github.com/users/${username}`);
    if (!resProfile.ok) throw new Error('User not found');
    const data = await resProfile.json();

    const resRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
    const repos = await resRepos.json();

    avatar.src = data.avatar_url;
    nameEl.textContent = data.name || data.login;
    bioEl.textContent = data.bio || 'No bio available';
    followersEl.textContent = `Followers: ${data.followers}`;
    followingEl.textContent = `Following: ${data.following}`;
    publicReposEl.textContent = `Public Repos: ${data.public_repos}`;

    repoList.innerHTML = '';
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `<a href='${repo.html_url}' target='_blank'>${repo.name}</a> ⭐ ${repo.stargazers_count}`;
      repoList.appendChild(li);
    });

    profileSection.classList.remove('hidden');
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});
