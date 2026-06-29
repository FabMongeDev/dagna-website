# Dagna Website - Backend Architecture

Version: 1.0
Status: Active

---

## Related Documentation

- backend-plan.md → Project roadmap and implementation phases.

# Purpose

The Dagna backend provides all server-side functionality required by the
application.

Its responsibilities include:

- Authentication
- Authorization
- Product management
- Orders
- Contact requests
- Database access
- Business rules
- Security

The backend is designed to be modular, maintainable, secure and easy to
extend.

---

# Design Principles

The backend follows these principles:

- Security by Default
- Single Responsibility Principle (SRP)
- DRY (Don't Repeat Yourself)
- Separation of Concerns
- Fail Securely
- Consistent API Responses
- Clear Documentation
- Small, Focused Classes

Every architectural decision should support these principles.

---

# Project Structure

backend/

api/
Public API endpoints.

config/
Application configuration.

middleware/
Authentication, authorization and request protection.

services/
Business logic.

models/
Application models.

utils/
Shared helper classes.

exceptions/
Custom exception classes.

scripts/
Maintenance and administrative scripts.

bootstrap.php
Application bootstrap file.

---

# Request Flow

Every request follows the same flow.

Client

↓

Endpoint

↓

bootstrap.php

↓

Middleware

↓

Service

↓

Database

↓

JSON Response

Business logic should never be implemented directly inside API endpoints.

---

# Security Principles

Security is a core architectural component.

The backend will implement:

- password_hash()
- password_verify()
- Prepared Statements (PDO)
- Session ID regeneration
- CSRF protection
- Secure cookies
- Rate limiting
- Role-based authorization
- Server-side validation
- XSS prevention
- Secure error handling

Sensitive information must never be exposed to clients.

---

# Payment Policy

Dagna will never store:

- Credit card numbers
- CVV
- Expiration dates

Payments will eventually be processed using a trusted third-party payment
provider.

Only transaction references and payment status will be stored.

---

# Coding Standards

Source code language:
English

Comments:
English

Technical documentation:
English

Functional documentation:
Spanish when appropriate.

Naming conventions:

Classes:
PascalCase

Methods:
camelCase

Variables:
camelCase

Constants:
UPPER_CASE

Database:

snake_case

---

# Documentation Standards

Every public class should include:

- PHPDoc
- Purpose
- Responsibilities

Every public method should include:

- Description
- Parameters
- Return value

Comments should explain WHY, not WHAT.

---

# Git Workflow

The main branch must always remain stable.

Every commit should:

- Compile
- Execute correctly
- Preserve existing functionality

Small commits are preferred over large commits.

---

# Long-Term Goals

The backend should be:

- Secure
- Maintainable
- Modular
- Testable
- Scalable

The architecture should allow future migration to Composer, PSR-4
autoloading and automated testing without requiring major refactoring.

---

# Project Motto

Security is not a feature.

Security is part of the architecture.

## Development Philosophy

Dagna is developed as a professional portfolio project.

The goal is not only to build a functional application, but also to
demonstrate software engineering best practices.

Every feature should improve the project without compromising:

- Security
- Maintainability
- Readability
- Documentation
- Architecture

Code should be written for humans first and computers second.
