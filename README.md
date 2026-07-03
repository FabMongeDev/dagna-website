# Dagna Website

Dagna es una tienda artesanal inspirada en la naturaleza, la fantasía y la magia del bosque.

El proyecto presenta una experiencia inmersiva con una identidad visual inspirada en bosques encantados, criaturas mágicas y artesanías hechas a mano.

## Current Status

Frontend V1 Complete ✅

Backend in progress:

- Contact endpoint (validation, bot protection, email notifications) ✅
- Rate limiting service ✅
- Auth database schema and token infrastructure ✅
- Authentication endpoints (login, register, email verification, password reset) 🚧

## Features

### Navigation

- Responsive navigation bar
- Compact logo for smaller screens
- Mobile hamburger menu

### Hero Section

- Animated forest atmosphere
- Organic fireflies system
- Falling leaves effect
- Call-to-action buttons

### Featured Products

- Collectible-style product cards
- Hover interactions
- Animated magical wisps
- Product reveal animations

### About Dagna

- Brand story section
- Nature-inspired presentation

### Reviews

- Customer testimonials
- Fantasy-themed review cards

### Contact

- Functional contact form with backend integration
- Server-side validation (name, email, message)
- Bot/spam protection (dual honeypot fields + time trap)
- Email notifications via SMTP
- Social media links
- Custom order call-to-action

### Footer

- Dynamic copyright year

## Technology Stack

### Frontend

- TypeScript
- HTML5
- CSS3
- Vite

### Backend

- PHP 8+
- MySQL
- Composer
- SMTP Email Integration (PHPMailer)

## Planned Features

### Phase 2

- User Authentication
- User Profiles

### Phase 3

- Shopping Cart

### Phase 4

- Payment Integration

### Phase 5

- Administration Panel

## Hosting

Planned Hosting Environment:

- Hostinger Premium Hosting
- Custom Domain: dagna.art (planned)

## Development

### Frontend

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

### Backend

Install dependencies:

```bash
composer install
```

Copy `.env.example` to `.env` and fill in your local database and SMTP credentials.

Run the PHP development server (from the project root):

```bash
php -S 127.0.0.1:8000 -t backend
```

## License

Private Project

## Planned Domain

dagna.art

## Hosting

Planned Hosting Environment:

- Hostinger Premium Hosting
- Static frontend deployment
- PHP support
- MySQL support
- SMTP support

## Future Architecture

### Backend

- PHP 8+
- MySQL
- SMTP Email Integration

### Planned Modules

- Authentication
- User Profiles
- Shopping Cart
- Order Management
- Administration Panel

## Frontend V1 Milestone

Completed:

- Responsive Navigation
- Mobile Menu
- Hero Section
- Fireflies System
- Falling Leaves System
- Product Showcase
- Interactive Wisp Effects
- About Section
- Reviews Section
- Contact Section
- Dynamic Footer
