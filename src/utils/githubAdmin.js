const api = 'https://api.github.com';
const owner = 'serdevir91';
const repo = 'soner-portfolio';

export function sanitizeToken(rawToken) {
  if (typeof rawToken !== 'string') return '';
  return rawToken
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/^Bearer\s+/i, '')
    .trim();
}

async function githubRequest(path, token, options = {}) {
  const cleanToken = sanitizeToken(token);
  const response = await fetch(`${api}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${cleanToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorCode = 'github_error';
    if (response.status === 401) {
      errorCode = 'invalid_token';
    } else if (response.status === 403) {
      errorCode = 'missing_permission';
    } else if (response.status === 404) {
      errorCode = 'not_found';
    }
    const error = new Error(errorCode);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function verifyAdminToken(rawToken) {
  const token = sanitizeToken(rawToken);
  if (!token) throw new Error('invalid_token');

  // 1. Verify access and push permissions on the repository
  let repository;
  try {
    repository = await githubRequest(`/repos/${owner}/${repo}`, token);
  } catch (err) {
    if (err.status === 401) throw new Error('invalid_token');
    if (err.status === 403 || err.status === 404) throw new Error('missing_permission');
    throw err;
  }

  if (repository?.permissions?.push !== true) {
    throw new Error('missing_permission');
  }

  // 2. If the token allows reading /user (e.g. classic PAT or fine-grained with profile scope),
  // ensure it belongs to the repository owner
  try {
    const user = await githubRequest('/user', token);
    if (user?.login && user.login.toLowerCase() !== owner.toLowerCase()) {
      throw new Error('wrong_account');
    }
  } catch (err) {
    if (err.message === 'wrong_account') throw err;
    // 403 is expected for fine-grained PATs scoped only to the repository without account/profile scope.
    // Push permission to this specific repository is already verified above.
  }

  return { owner, repo, permissions: repository.permissions };
}

function encodeContent(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value, null, 2) + '\n');
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary);
}

async function updateFile(token, branch, path, data) {
  const cleanToken = sanitizeToken(token);
  const endpoint = `/repos/${owner}/${repo}/contents/${path}`;
  
  let currentSha = null;
  try {
    const current = await githubRequest(`${endpoint}?ref=${branch}`, cleanToken);
    currentSha = current?.sha;
  } catch (err) {
    if (err.status !== 404 && err.message !== 'not_found') {
      throw err;
    }
  }

  const payload = {
    message: `Update portfolio content (${branch})`,
    content: encodeContent(data),
    branch,
  };
  if (currentSha) {
    payload.sha = currentSha;
  }

  await githubRequest(endpoint, cleanToken, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function publishPortfolio(token, data) {
  await verifyAdminToken(token);
  await updateFile(token, 'master', 'public/portfolio-data.json', data);
  try {
    await updateFile(token, 'gh-pages', 'portfolio-data.json', data);
  } catch (err) {
    console.error('Failed to update gh-pages branch:', err);
    throw new Error('live_publish_failed');
  }
}
