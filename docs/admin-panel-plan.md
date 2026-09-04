# Admin Panel — Planning Notes

> Status: **Planning only. Nothing here is built yet.**
> This document exists to capture requirements as they come up, before implementation starts.
> Related: Phase 2.7 in `backend-plan.md`. Depends entirely on Auth being complete first (see `PROJECT_CONTEXT.md` → Current Status).

---

## Roles and permission hierarchy

Four roles, ordered from least to most privileged:

```text
customer < moderator < admin < superuser
```

- **Modeled as a single `role` ENUM column** on `users` (not a separate boolean flag) — matches the project's "avoid overengineering" principle. `role ENUM('customer', 'moderator', 'admin', 'superuser')`.
- **Hierarchy is enforced in PHP code, not relied upon from ENUM ordering** (MySQL ENUM order is fragile and easy to break silently). A `ROLE_HIERARCHY` map with numeric weights backs all permission checks.
- **Permissions are cumulative by rank, not exclusive per role.** Each action has a *minimum required rank* (e.g. "ban requires moderator or higher"). Higher roles inherit everything lower roles can do, plus their own additional powers. This is what makes "superuser has absolute power" actually true — otherwise a superuser could end up with *less* power than an admin in some specific action, which contradicts the original intent. **This is an assumption made while consolidating notes — confirm or correct if exclusive-per-role was actually intended.**
- **`admin` and `superuser` accounts are never created through a public endpoint.** `register.php` can only ever create `customer` accounts, regardless of what the request payload contains. `admin` and `superuser` accounts are created either via CLI script (extending `create-admin.php` to accept a `--role` flag) or, later, by an authenticated actor with sufficient rank through the panel itself.
- **`superuser` accounts specifically should only ever be created via CLI, never through any web interface**, even once the panel exists — it's the highest-risk account type.
- This requires a **new migration** (e.g. `003_superuser_role.sql`) — `002_auth_v1.sql` is already applied in both local and production and should not be edited retroactively.
- Business note (non-technical): since this is real client work, Dagna (the business owner) should know a superuser account exists and who controls it — standard professional practice when managing someone else's infrastructure, not a trust issue.

### Permission matrix (minimum rank required)

| Action | Min. rank required |
|---|---|
| Browse products, reserve ("Apartar") | Customer |
| Manage products (create/edit/availability) | Moderator |
| Manage reviews (approve/hide) | Moderator |
| Ban users (by email or username) | Moderator |
| Edit user details (name, email, role up to moderator) | Admin |
| Manage moderator accounts | Admin |
| Delete users | Superuser |
| Manage admin accounts | Superuser |

---

## Product management

Admin/moderator must be able to, **without touching code**:

- Create and edit a product
- Upload a photo
- Set name, description, availability status

**Current state:** products are 100% hardcoded placeholder data in `frontend/src/components/ProductGrid.ts` (Lorem ipsum text, "Imagen pendiente" instead of real images). No `GET/POST/PUT /api/products` endpoints exist yet (`backend-plan.md` Phase 2.2 was never built). The `products` table already exists in `schema.sql` with `stock`, `is_active`, `is_featured`, `is_custom_order` — the gap is entirely in the API layer and the admin UI, not the database design.

**Future state:** the storefront reads from the real `products` table via a real API, not hardcoded data.

### Reservation / sold flow

Dagna does not process real payments (no card/bank data handled, at least for now). "Comprar" is **not a checkout** — it's a **reservation**. Payment is arranged directly between the customer and the artisan, off-platform (WhatsApp, bank transfer, etc.).

**Product status — 3 states:**

```text
Disponible  →  Apartado  →  Vendido
(available)    (reserved)    (sold)
```

- **Disponible → Apartado:** a registered customer clicks the reservation action (button copy TBD — "Apartar" reads more accurately than "Comprar" given this flow).
- **Apartado → Vendido:** happens **only when admin manually confirms it**, once payment has been finalized directly with the artisan. Deliberate manual step, not automatic.
- **Apartado → Disponible:** needed for when a reservation falls through — see open questions.
- **Once Vendido:** admin chooses either:
  - A number of days to keep the sold product visible (labeled "Vendido") before auto-hiding, so people interested in something similar can see it and request a custom/reproduced version (most pieces are one-of-a-kind, some are reproducible) — **or**
  - Remove it from the catalog immediately, manually.

**Schema gap identified** — a future migration will need something like:

```sql
status ENUM('available', 'reserved', 'sold') NOT NULL DEFAULT 'available'
sold_at TIMESTAMP NULL
sold_visibility_days INT NULL
```

`stock` (already in the schema) may still matter separately for reproducible products — how `stock` and `status` interact for that case is open (see open questions).

---

## Reviews moderation

**"Comentarios" and "reseñas" are the same feature** — no separate `comments` table/feature needed. Everything maps to the existing `reviews` table.

- Moderator and up can approve/hide reviews.
- The `reviews` table already has `is_approved BOOLEAN DEFAULT FALSE` — maps directly to "reviews require approval before showing publicly." The data model already anticipated this.
- **Gap:** `reviews` currently only stores `customer_name` as free text — no `user_id` foreign key to a real account. Once authenticated review submission is built (Reviews requires login, per earlier architecture decision), this needs to change. Ties into the user-deletion question below.

---

## User management

Each action has its own minimum rank (cumulative, see matrix above):

- **Ban** (moderator+) — reversible, lowest risk. By email or username.
- **Edit user details** (admin+) — not destructive, but sensitive (can include changing a user's role up to moderator; only superuser can touch admin/superuser accounts).
- **Delete** (superuser only) — destructive, hard to reverse. Reserved for storage/cleanup reasons, not routine moderation.

---

## General UX principle

The panel must be usable by a non-technical admin — no code editing required for day-to-day catalog/content management. This is the core reason the panel needs to exist at all, instead of continuing to hardcode content in the frontend.

---

## Open questions (not yet decided)

1. **Cumulative vs. exclusive permissions** — confirm the interpretation used above (higher ranks inherit lower ranks' powers) matches intent.
2. **What happens to an "Apartado" (reserved) product if the reservation never completes?** Automatic timeout after N days, purely manual release by admin, or both — not yet decided.
3. **For reproducible products, how do `stock` and `status` interact?** Can a product have multiple units each moving through Disponible → Apartado → Vendido independently, or does `status` apply at the product level only (implying reproducible products need separate rows/listings)?
4. **Final button/label copy** for the reservation action ("Apartar" vs. something else) — minor, but affects API naming too (e.g. `POST /api/products/{id}/reserve` reads cleaner if the UI says "Apartar").
5. **Hard delete vs. soft delete for users.** Does deleting a user remove their historical reviews/reservations too, or should those persist (anonymized) for Dagna's business records? Affects the schema design for the eventual `reviews.user_id` foreign key.

---

## Sequencing note

This entire panel depends on Auth being real first (login with actual sessions, role-based access control). Auth work has not started yet — this document exists purely to capture requirements ahead of time, refined incrementally, before implementation begins.
