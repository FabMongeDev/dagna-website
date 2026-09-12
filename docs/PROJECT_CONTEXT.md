# Dagna Website - Project Context

> This document provides the architectural context, development philosophy, coding standards and current status of the project.
>
> Every developer (human or AI) joining the project should read this document before making changes.

---

# Project Overview

**Dagna Website** is a full-stack web application for a handmade fantasy crafts business located in Costa Rica.

The website is much more than a product catalog.

Long-term goals include:

- Product catalog
- Customer accounts
- Shopping cart
- Orders
- Payments
- Reviews
- Administration Panel
- Inventory
- Notifications
- Analytics

The project is intended to become production-ready.

---

# Core Principles

The project follows these principles:

## 1. Security First

Security is never sacrificed for convenience.

Examples:

- Prepared Statements
- Password Hashing
- Email Verification
- Rate Limiting
- Bot Protection
- Environment Variables
- Secure Sessions

---

## 2. Clean Architecture

Every component should have a single responsibility.

Avoid:

- Giant controllers
- Business logic inside endpoints
- Duplicate code

Prefer:

- Services
- Utilities
- Reusable components

---

## 3. Scalability

Every implementation should be designed to support future features without requiring major rewrites.

Example:

The Email Service was designed to support:

- Contact notifications
- Email verification
- Password recovery
- Order confirmations
- Newsletter

without modifying existing code.

---

## 4. Maintainability

Readable code is preferred over clever code.

Future developers should immediately understand the purpose of every class.

---

# Technology Stack

Frontend

- Vite
- TypeScript
- Vanilla CSS

Backend

- PHP 8.5
- MySQL
- PDO
- Composer
- PHPMailer
- PHP Dotenv

Development

- Ubuntu
- Git
- GitHub

---

# Coding Standards

## Language

Technical documentation:

English

Code comments:

English

Variable names:

English

Function names:

English

Classes:

English

User Interface:

Spanish

Administration Panel:

Spanish

---

# Backend Architecture

Current architecture:

```text
backend/

api/
  auth/
config/
repositories/
scripts/
services/
templates/
utils/

bootstrap.php
```

Important components:

- Validator
- ValidationReport
- Response
- Database
- Mailer
- BotKiller (bot/spam detection: honeypot fields + time trap)
- RateLimiter (throttles repeated actions per IP/email/session)
- TokenService (secure token generation and hashing)
- TokenRepository
- UserRepository

---

# Email System

Current implementation:

- PHPMailer
- SMTP
- HTML Templates
- Environment Variables

Credentials are NEVER stored inside the repository.

---

# Environment Variables

Sensitive information must always be stored in:

.env

Never commit:

- passwords
- API keys
- SMTP credentials
- tokens

Use:

.env.example

for documentation.

---

# Git Rules

Never commit:

- vendor/
- .env
- cache
- temporary files

Commit:

- composer.json
- composer.lock

---

# UI Philosophy

The application has a magical fantasy theme.

Internal references often use:

- Forest
- Gnomes
- Dragons
- Owls
- Fairies

System errors may contain fantasy flavor, but must always remain understandable.

Example:

❌ Bad

"The dragon burned everything."

✅ Good

"A dragon burned this page.
Please try again in a few minutes."

---

# Current Status

**Live at https://dagna.art** ✅ (launched with reduced scope while remaining features are built)

Completed

- Backend bootstrap
- Database layer
- Response helper
- Validation system
- Contact endpoint
- Contact frontend integration
- Email Service
- SMTP integration
- Environment configuration
- Rate Limiting (RateLimiter service, transactional, tested)
- Bot Protection on Contact (BotKiller: dual honeypot + time trap, wired end-to-end)
- Basic drag/right-click protection on product images
- Auth database migration (002_auth_v1.sql)
- Token infrastructure (TokenService, TokenRepository)
- User repository (UserRepository)
- Production deployment to Hostinger (see backend-plan.md → Deployment Strategy for the real folder layout and gotchas)
- Production database, SMTP, and .env fully configured and verified end-to-end
- Real product content live: 5 duendes (Augusto Sotavento, Evaristo Ramaseca, Fortunato Hojaverde, Tobías Matute, Wilfrido Gotadelluvia) with real photos, lore fields, and descriptions; real "Sobre Dagna" group photo
- Screenshot easter egg (PrintScreen-triggered forest guardian gnome, Windows-only, decorative not protective)
- Google Analytics (GA4) + Google Tag Manager, production-only (hostname-guarded, no dev pollution)
- Google Search Console verified (URL-prefix property, verified via Analytics) + sitemap.xml submitted
- Custom favicon + apple-touch-icon (replaced default Vite favicon)
- Image weight optimization: `leaves/` sprites resized from print-resolution (~10MB total) to actual display size (~0.25MB total)
- Social media section: lazy-loaded Facebook Page Plugin (IntersectionObserver-gated, only loads script when scrolled into view) + Instagram follow link; Facebook Page renamed from legacy `ciudadsafari` to `dagnacr`

Launch scope reductions (intentional, temporary)

- Login / Register / Cart hidden from navbar — not usable yet, UI only
- `login.php` blocked via `.htaccess` in production until it uses RateLimiter + UserRepository
- Reviews section stripped of placeholder cards; shows an invitation only, no submission form yet (submission requires Auth, per architecture decision, so it waits until Auth is complete)
- Instagram feed is a follow-link only, not a live embed — Meta has no free official widget for Instagram (unlike Facebook's Page Plugin); a live feed requires the Graph API + backend token refresh (tracked as future work, "Option C" in project discussions)

In Progress

- Authentication endpoints
  - login.php exists but does not yet use RateLimiter or UserRepository; needs rework before it meets project security standards
  - register, email verification, and password reset endpoints not yet built

Upcoming

- Secure login endpoint (rewritten to use UserRepository + RateLimiter)
- User Registration endpoint
- Email Verification flow
- Password Recovery flow
- Reviews submission form (stars 1-5, name, comment) — blocked on Auth being complete
- Image watermarking on product photos (deferred; not applied to current 5 duendes yet)
- Live Instagram feed via Graph API (requires Meta app review + backend token refresh — bigger effort than Facebook's Page Plugin)
- BotKiller on Reviews form once built
- Products API
- Admin Panel (see docs/admin-panel-plan.md for detailed requirements)
- Orders
- Payments

---

# Development Workflow

For significant changes:

1. Explain the architecture.
2. Explain the reasoning.
3. Wait for approval.
4. Implement.
5. Test.
6. Commit.

Avoid implementing large changes without discussion.

---

# Long-Term Vision

The goal is not simply to build a website.

The goal is to build a secure, maintainable and scalable platform capable of supporting the long-term growth of the Dagna brand.

Every design decision should move the project closer to that goal.# Architectural Decisions

## ADR-001

Use PHPMailer instead of PHP mail().

Reason:
Reliability, SMTP support and production readiness.

---

## ADR-002

Use .env for secrets.

Reason:
Prevent credentials from being committed to Git.

---

## ADR-003

Use services to encapsulate business logic.

Reason:
Reduce coupling between API endpoints and infrastructure.
