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
config/
middleware/
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

In Progress

- Backend improvements
- Authentication planning

Upcoming

- User Registration
- Login
- Email Verification
- Password Recovery
- BotKiller
- Rate Limiting
- Products API
- Admin Panel
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
