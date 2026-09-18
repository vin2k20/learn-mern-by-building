# Security policy

Kanvas is a learning project. The repo contains instructions, tests and sample data, not a deployed service.

- **Found a vulnerability in the material** (e.g. an instruction that teaches an insecure pattern, or a vulnerable pinned dependency in `labs/package-lock.json`)?
  Please report it privately via [GitHub security advisories](https://github.com/vin2k20/learn-mern-by-building/security/advisories/new).
  We aim to respond within 7 days.
- **Your own app built from this repo** is your responsibility. Never commit `.env` files or secrets, and rotate anything you leak.
  The [security primer](docs/concepts/web/security-xss-csrf-jwt.md) covers the basics.
- Keep your dependencies current: `npm audit`, plus Dependabot on your own copy.
