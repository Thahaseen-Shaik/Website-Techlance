/* global process, Buffer */
import { createServer } from 'node:http';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

const PORT = Number(process.env.PORT || 3001);

const usersByEmail = new Map();
const sessions = new Map();

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Session-Token',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, jsonHeaders);
  res.end(JSON.stringify(payload));
};

const readBody = async (req) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const createPasswordHash = (password, salt = randomBytes(16).toString('hex')) => {
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password, stored) => {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) {
    return false;
  }

  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === derived.length && timingSafeEqual(expected, derived);
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

const getToken = (req) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  const sessionToken = req.headers['x-session-token'];
  return typeof sessionToken === 'string' ? sessionToken : '';
};

const createSession = (user) => {
  const token = randomUUID();
  sessions.set(token, user.email);
  return token;
};

const handleAuthError = (res, message, statusCode = 401) => {
  sendJson(res, statusCode, { ok: false, message });
};

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, jsonHeaders);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (url.pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, service: 'Techlance backend', database: null });
    return;
  }

  if (url.pathname === '/api/register' && req.method === 'POST') {
    const body = await readBody(req);
    if (!body || typeof body !== 'object') {
      handleAuthError(res, 'Invalid request body.', 400);
      return;
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!name) {
      handleAuthError(res, 'Please enter your name.', 400);
      return;
    }

    if (!email) {
      handleAuthError(res, 'Please enter your email.', 400);
      return;
    }

    if (password.length < 6) {
      handleAuthError(res, 'Password must be at least 6 characters.', 400);
      return;
    }

    if (usersByEmail.has(email)) {
      handleAuthError(res, 'An account with this email already exists.', 409);
      return;
    }

    const user = {
      id: randomUUID(),
      name,
      email,
      passwordHash: createPasswordHash(password),
      createdAt: new Date().toISOString(),
    };

    usersByEmail.set(email, user);
    const token = createSession(user);

    sendJson(res, 201, {
      ok: true,
      token,
      user: sanitizeUser(user),
    });
    return;
  }

  if (url.pathname === '/api/login' && req.method === 'POST') {
    const body = await readBody(req);
    if (!body || typeof body !== 'object') {
      handleAuthError(res, 'Invalid request body.', 400);
      return;
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const user = usersByEmail.get(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      handleAuthError(res, 'Invalid email or password.', 401);
      return;
    }

    const token = createSession(user);
    sendJson(res, 200, {
      ok: true,
      token,
      user: sanitizeUser(user),
    });
    return;
  }

  if (url.pathname === '/api/me' && req.method === 'GET') {
    const token = getToken(req);
    const email = sessions.get(token);

    if (!email) {
      handleAuthError(res, 'Unauthorized.', 401);
      return;
    }

    const user = usersByEmail.get(email);
    if (!user) {
      sessions.delete(token);
      handleAuthError(res, 'Unauthorized.', 401);
      return;
    }

    sendJson(res, 200, { ok: true, user: sanitizeUser(user) });
    return;
  }

  if (url.pathname === '/api/logout' && req.method === 'POST') {
    const token = getToken(req);
    if (token) {
      sessions.delete(token);
    }

    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { ok: false, message: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`Techlance backend listening on http://localhost:${PORT}`);
});
