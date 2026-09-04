# Backend Plan

## Objective

Build a lightweight backend for Dagna using PHP and MySQL.

The backend should support the current frontend and allow future growth into a complete e-commerce platform.

---

## Related Documentation

- backend-architecture.md → Architecture, coding standards and security principles.

## Technology Stack

### Backend

- PHP 8+
- REST-style API
- JSON responses

### Database

- MySQL

### Email

- SMTP
- Hostinger Email

### Hosting

- Hostinger Premium Hosting

### Domain

- dagna.art

---

## Development Philosophy

Build only what is needed.

Avoid overengineering.

The backend should remain simple, maintainable, and compatible with Hostinger shared hosting.

---

## Implementation Roadmap

### Phase 2.1

Contact Form

Purpose:

- Receive contact requests
- Validate form data
- Send emails through SMTP
- Protect against bots and spam (BotKiller: honeypot fields + time trap)

Endpoint:

POST /api/contact

Status:

Completed

---

### Phase 2.2

Product Catalog

Purpose:

- Replace frontend placeholders
- Store real artisan products

Endpoints:

GET /api/products

GET /api/products/{id}

GET /api/categories

Status:

Planned

---

### Phase 2.3

Reviews

Purpose:

- Replace placeholder reviews
- Display real customer feedback

Endpoints:

GET /api/reviews

POST /api/reviews

Status:

Planned

---

### Phase 2.4

Authentication

Purpose:

- User registration
- Login
- Session management

Endpoints:

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Status:

In Progress

Notes:

- Database migration applied (002_auth_v1.sql)
- Token infrastructure built (TokenService, TokenRepository)
- User data layer built (UserRepository)
- Rate limiting service built (RateLimiter)
- POST /api/auth/login exists but is not yet using RateLimiter or UserRepository; needs rework
- Remaining endpoints (register, logout, me, email verification, password reset) not yet built

---

### Phase 2.5

Orders

Purpose:

- Store customer purchases
- Track order status

Status:

Future

---

### Phase 2.6

Shopping Cart

Purpose:

- Add products to cart
- Modify quantities
- Checkout preparation

Status:

Future

---

### Phase 2.7

Administration Panel

Purpose:

- Manage products
- Manage categories
- Manage reviews
- Manage orders

See docs/admin-panel-plan.md for detailed requirements (roles, reservation flow, moderation).

Status:

Future

---

## Initial Database Tables

Planned tables:

- users
- products
- categories
- reviews
- contact_messages
- orders
- order_items

---

## Security Requirements

- Use prepared statements
- Validate all user input
- Escape output when needed
- Hash passwords using password_hash()
- Store sensitive credentials outside public_html
- Never expose database credentials

---

## Deployment Strategy

Development:

GitHub

Production (Hostinger):

Actual folder layout used (confirmed working):

```text
/home/[account]/domains/dagna.art/
├── public_html/              ← Apache-served, public
│   ├── index.html + assets/  ← Vite build output (npm run build → dist/)
│   └── api/
│       ├── contact.php       ← one-line bridge file, requires the real file in dagna-core
│       └── auth/
│           ├── login.php     ← one-line bridge file
│           └── .htaccess     ← Require all denied (until login is production-ready)
└── dagna-core/                ← NOT web-accessible, sibling to public_html
    ├── backend/                ← exact mirror of the repo's backend/ folder
    ├── vendor/                 ← composer install output
    ├── composer.json / .lock
    └── .env                    ← production values, never committed, created directly on server
```

Bridge files work with zero code changes because PHP's `__DIR__` always resolves to the file's own real location — a one-line `require __DIR__ . '/../../dagna-core/backend/api/contact.php';` is enough; the real file's own relative requires (e.g. `require __DIR__ . '/../bootstrap.php'`) keep working unmodified.

Known gotchas (Hostinger + this account specifically):

1. **PHP CLI vs web version mismatch.** `php` on SSH defaults to 7.2 (too old for this codebase's syntax). The site itself runs the version selected in hPanel (PHP Configuration → currently 8.3). For any CLI testing/debugging, use the versioned binary directly: `/opt/alt/php83/usr/bin/php` (CloudLinux path; confirm with `find /opt/alt -maxdepth 1 -iname "php*"` if the version changes).
2. **SMTP host: use `smtp.titan.email`, not `smtp.hostinger.com`.** This account's email is Titan-powered; `smtp.hostinger.com` returns `535 authentication failed` even with the correct password, despite being Hostinger's officially documented host. `smtp.titan.email` works.
3. **`.env` values need double quotes if they contain special characters** (`#` especially — phpdotenv treats an unquoted `#` as a comment and truncates the rest of the value). Always quote passwords: `DB_PASSWORD="..."`.
4. **`schema.sql` and migration files must not include `CREATE DATABASE`/`USE` statements** when importing via phpMyAdmin — the import already runs inside the correct database context, and Hostinger's prefixed database names (e.g. `u123_dagna_db`) don't match a literal `dagna_db` reference anyway. These lines are commented out in the repo now, with a note to uncomment for local use.
5. **`display_errors` is conditional on `APP_ENV`.** Production `.env` has `APP_ENV=production`, which silences detailed PHP errors from visitors (logged instead). For CLI debugging in production, override per-command: `APP_ENV=development /opt/alt/php83/usr/bin/php ...`.

Deploy steps for a frontend-only change:

```bash
cd frontend
npm run build
rsync -avz -e "ssh -p [port]" dist/ [user]@[host]:/home/[account]/domains/dagna.art/public_html/
```

Deploy steps for a backend change:

```bash
rsync -avz -e "ssh -p [port]" backend/ [user]@[host]:/home/[account]/domains/dagna.art/dagna-core/backend/
```

---

## Current Phase

Phase 2 In Progress 🚧 — **Site live at dagna.art with reduced launch scope**

Completed:

- Contact Form (Phase 2.1), including production deployment and verified email delivery
- Auth database design and migration
- Token and rate limiting infrastructure
- Production deployment (Hostinger, see Deployment Strategy above)

Next Step:

Rework login endpoint to use RateLimiter and UserRepository, then build the remaining auth endpoints (register, email verification, password reset) — this unblocks the Reviews submission form, which is intentionally on hold until Auth is real.
