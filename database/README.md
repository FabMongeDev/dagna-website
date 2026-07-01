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

## Database setup order

Run the database files in this order:

```bash
mysql -u dagna_user -p < database/schema.sql
mysql -u dagna_user -p dagna_db < database/migrations/002_auth_v1.sql
mysql -u dagna_user -p dagna_db < database/seeds.sql
```

For local development only, you may also load sample data:

mysql -u dagna_user -p dagna_db < database/sample-data.sql
