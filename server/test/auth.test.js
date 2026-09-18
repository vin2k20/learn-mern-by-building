/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 server/test/auth.test.js · Phase 7 · Day 7 · ★ core (20 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  API tests for authentication with Mocha + Chai + Supertest (black-box: HTTP in, JSON out).
 *
 * 📝 TEST CASES (write one `it` per row)
 *   | # | Request                                        | Expect                                                   |
 *   |---|------------------------------------------------|----------------------------------------------------------|
 *   | 1 | POST /api/auth/login with the correct creds    | 200, data.token is a string, data.user.email, NO passwordHash |
 *   | 2 | POST /api/auth/login with a wrong password     | 401, error.code === 'UNAUTHENTICATED', generic message    |
 *   | 3 | POST /api/auth/login with an unknown email     | 401 with the SAME message as #2                          |
 *   | 4 | POST /api/auth/login with {}                   | 400, error.code === 'VALIDATION_ERROR', details has 'email' |
 *   | 5 | GET /api/auth/me without a token               | 401                                                      |
 *   | 6 | GET /api/auth/me with a valid token            | 200, data.id matches the user                            |
 *   | 7 | GET /api/auth/me with a tampered token         | 401                                                      |
 *   | 8 | ☆ GET /api/auth/me with an expired token       | 401 (sign one with expiresIn: '-1s')                     |
 *   | 9 | ☆ the 6th login attempt within a minute        | 429 + a Retry-After header                               |
 *
 * 📝 SHAPE
 *   import request from 'supertest'; import { expect } from 'chai';
 *   describe('Auth API', () => { let app; before(async () => { ({ createApp } = await import('../src/app.js')); app = createApp(); });
 *     it('logs in with valid credentials', async () => { … const res = await request(app).post('/api/auth/login').send({…}).expect(200); … }) })
 *
 * ✅ DONE WHEN  [ ] `npm test -w server` is green with all ★ cases
 * 🎤 INTERVIEW ANGLE  "How do you test an Express API?", "unit vs integration tests for the backend?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
