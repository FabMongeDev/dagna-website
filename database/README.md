# Dagna Database

## Files

- `schema.sql`: database structure only.
- `seeds.sql`: required initial data.
- `sample-data.sql`: development sample data only.

## Rebuild Local Database

```bash
mysql -u dagna_user -p dagna_db < database/schema.sql
mysql -u dagna_user -p dagna_db < database/seeds.sql
mysql -u dagna_user -p dagna_db < database/sample-data.sql

```

Production

Do not execute sample-data.sql in production. It contains development-only records.
