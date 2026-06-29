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

Endpoint:

POST /api/contact

Status:

Planned

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

Future

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

Production:

1. Build frontend using Vite
2. Upload frontend dist files to public_html
3. Deploy PHP API under public_html/api
4. Store sensitive configuration files outside public_html

---

## Current Phase

Phase 2 Started ✅

Next Step:

Database Design
