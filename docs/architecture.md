# Architecture

## Overview

Dagna Website follows a traditional client-server architecture.

## Frontend

- TypeScript
- Vite
- Modular CSS
- Responsive design

frontend/
├── public/
│ └── leaves/
│
├── src/
│ ├── animations/
│ ├── assets/
│ ├── components/
│ │ ├── AboutSection.ts
│ │ ├── Fireflies.ts
│ │ ├── Footer.ts
│ │ ├── Hero.ts
│ │ ├── LeafRain.ts
│ │ ├── Navbar.ts
│ │ ├── ProductCard.ts
│ │ ├── ProductEffects.ts
│ │ └── ProductGrid.ts
| | └── Reviews.ts
│ │
│ ├── pages/
│ ├── styles/
│ │ ├── animations.css
│ │ ├── components.css
│ │ ├── layout.css
│ │ └── variables.css
│ │
│ └── main.ts

## Visual Systems

Forest Background

Animated gradients simulating a living mystical forest.

Fireflies

Independent particle system with natural movement and glow cycles.

Leaf System

Ambient leaves with sporadic falling behavior and wind gust events.

Wisp System

Interactive magical entity attached to product cards.
The Wisp reacts to cursor proximity and behaves as a living magical creature.

## Planned Backend

- PHP 8+
- REST API
- Session-based authentication
- SMTP email integration

## Future Backend

PHP API
↓
MySQL Database
↓
Authentication
↓
Orders
↓
Payments
↓
Admin Panel

## Database

MySQL

Main entities:

- Users
- Products
- Categories
- Orders
- Reviews

## Hosting

Hostinger Premium Hosting

Planned Domain:

- dagna.art

## Future Enhancements

- Payment gateway integration
- Admin dashboard
- Inventory management
- Analytics

## Deployment

Development:

- GitHub
- Vite Development Server

Production:

- npm run build
- Upload dist/ contents to public_html/

## Current Status

Frontend V1 Complete ✅

Completed:

- Responsive Navigation
- Hero Section
- Fireflies System
- Leaf System
- Product Showcase
- Interactive Wisp System
- About Section
- Reviews Section
- Contact Section
- Footer

Product Cards

Collectible-style fantasy cards inspired by trading card games with animated magical effects.
