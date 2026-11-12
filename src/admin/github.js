// Publishes edited content by committing to the repository's master branch.
// GitHub Actions (GitHub Pages) and Vercel both rebuild the site on that push.
const API = 'https://api.github.com';
export const OWNER = 'serdevir91';
export const REPO = 'soner-portfolio';
export const BRANCH = 'master';
export const DATA_PATH = 'src/data/portfolio.json';
export const AVATAR_PATH = 'public/profile.jpeg';
export const TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';

export const cleanToken = raw => (typeof raw === 'string' ? raw.trim().replace(/^["']|["']$/g, '').replace(/^Bearer\s+/i, '').trim() : '');

async function gh(path, token, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${cleanToken(token)}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const code = { 401: 'invalid_token', 403: 'missing_permission', 404: 'not_found', 409: 'conflict', 422: 'invalid_request' }[res.status] || 'github_error';
    const err = new Error(code);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

// Checks that the token can write to the repository.
export async function verifyToken(token) {
  if (!cleanToken(token)) throw new Error('invalid_token');
  const repo = await gh(`/repos/${OWNER}/${REPO}`, token);
  // Fine-grained tokens report permissions on the repository object.
  if (repo?.permissions && !repo.permissions.push) throw new Error('missing_permission');
  return true;
}

const toBase64 = text => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
};

async function putFile(token, path, base64, message) {
  let sha;
  try {
    const current = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, token);
    sha = current?.sha;
  } catch (err) {
    if (err.status !== 404) throw err;
  }
  return gh(`/repos/${OWNER}/${REPO}/contents/${path}`, token, {
    method: 'PUT',
    body: JSON.stringify({ message, content: base64, branch: BRANCH, ...(sha ? { sha } : {}) }),
  });
}

export async function publish(token, data) {
  await verifyToken(token);
  let next = data;
  const avatar = data.profile?.avatar || '';
  if (avatar.startsWith('data:image/')) {
    await putFile(token, AVATAR_PATH, avatar.split(',')[1], 'content: update profile photo');
    // The query string makes browsers fetch the new photo instead of a cached one.
    next = { ...data, profile: { ...data.profile, avatar: `profile.jpeg?v=${Date.now()}` } };
  }
  const result = await putFile(token, DATA_PATH, toBase64(`${JSON.stringify(next, null, 2)}\n`), 'content: update portfolio data');
  return { data: next, commitUrl: result?.commit?.html_url };
}
