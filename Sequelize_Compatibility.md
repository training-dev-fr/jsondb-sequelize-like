
# Sequelize Compatibility – json-sequelize-like

This document provides an overview of which Sequelize-like features are currently supported in `json-sequelize-like`, organized by category.

If you are waiting for a functionnality in v1 Roadmap, check this file often,it is updated on every push

---

## 📖 Table of Contents

- [🧩 Query Methods](#-query-methods)
- [⚙️ Query Options](#-query-options)
- [🔐 Validators](#-validators)
- [⚒️ Operators (`Op.*`)](#️-operators-op)
- [🧱 Schema Field Options](#-schema-field-options)
- [🔗 Associations Compatibility](#-associations-compatibility)
- [🧬 Data Types Compatibility](#-data-types-compatibility)

---

## 🧩 Query Methods

| Method         | Supported | Notes                           | In Roadmap for v1 |
|----------------|-----------|----------------------------------|------------------|
| `create`       | ✅        | Fully supported                  |             |
| `updateOne`    | ✅        | Update based on `.where` clause |            |
| `destroy`      | ✅        | Removes item and logs operation |            |
| `findAll`      | ✅        | Done via `.find()`               |            |
| `findOne`      | ✅        | Use `.find(...)[0]`              |            |
| `findById`     | ❌        | Not implemented                  | ✅        |
| `updateById`   | ❌        | Not implemented                  | ✅        |
| `destroyById`  | ❌        | Not implemented                  | ✅        |
| `count`        | ❌        | Not implemented                  | ✅        |
| `exists`       | ❌        | Not implemented                  | ❌        |
| `bulkCreate`   | ❌        | Not implemented                  | ❌        |
| `bulkUpdate`   | ❌        | Not implemented                  | ❌        |
| `truncate`     | ❌        | Not implemented                  | ❌        |
| `reload`       | ❌        | Not implemented                  | ❌        |
| `flush`        | ❌        | Not implemented                  | ❌        |
| `import`       | ❌        | Not implemented                  | ❌        |
| `export`       | ❌        | Not implemented                  | ❌        |
| `sync`         | ❌        | Not implemented                  | ❌        |

---

## ⚙️ Query Options

| Option        | Supported | Notes                           | In Roadmap for v1 |
|---------------|-----------|----------------------------------|------------------|
| `where`        | ✅        | Condition filtering with key/value or operators |             |
| `attributes`   | ❌        | Field selection (ex: `['id', 'name']`)          | ✅        |
| `include`      | ❌        | Join related models (`hasMany`, `belongsTo`)    | 🔶 1 nested-level support        |
| `raw`          | ❌        | Return raw objects instead of instances         | ❌        |
| `paranoid`     | ❌        | Ignore soft-deleted rows (`deletedAt`)          | ❌        |
| `distinct`     | ❌        | Apply SQL `DISTINCT` keyword                    | ❌        |
| `group`        | ❌        | SQL `GROUP BY` clause                           |  ✅        |
| `having`       | ❌        | SQL `HAVING` clause on grouped results          | ❌        |
| `order`        | ✅        | Sort results (`[['name', 'DESC']]`)            |  ✅        |
| `limit`        | ✅        | Max number of records                           |  ✅        |
| `offset`       | ✅        | Number of records to skip (pagination)         |  ✅        |
| `subQuery`     | ❌        | Force subquery usage                            | ❌        |
| `benchmark`    | ❌        | Enable query execution time logging             | ❌        |
| `logging`      | ❌        | Enable/disable logging                          | ❌        |

---

## 🔐 Validators

| Validator         | Supported | Notes                       | In Roadmap for v1 |
|-------------------|-----------|------------------------------|------------------|
| `is`              | ✅        | Regex matching              |                   |
| `not`             | ✅        | Negated regex               |                  |
| `isEmail`         | ✅        | Standard email format       |                  |
| `isUrl`           | ✅        | Valid URL (via `URL()`)     |                  |
| `isIP`            | ✅        | Matches IPv4 or IPv6        |                  |
| `isIPv4`          | ✅        | Basic IPv4 check            |                  |
| `isIPv6`          | ✅        | Basic IPv6 check            |                  |
| `isAlpha`         | ✅        | A-Z only                    |                  |
| `isAlphanumeric`  | ✅        | A-Z + 0-9                   |                  |
| `isNumeric`       | ✅        | Digits with optional dot    |                  |
| `isInt`           | ✅        | Integer only                |                  |
| `isFloat`         | ✅        | Decimal numbers             |                  |
| `isDecimal`       | ✅        | Same as float               |                  |
| `isLowerCase`     | ✅        | All lowercase               |                  |
| `isUpperCase`     | ✅        | All uppercase               |                  |
| `notNull`         | ✅        | Not null or undefined       |                  |
| `isNull`          | ✅        | Only null/undefined         |                  |
| `notEmpty`        | ✅        | Not '', null or undefined   |                  |
| `equals`          | ✅        | Strict equality             |                  |
| `contains`        | ✅        | String contains value       |                  |
| `notContains`     | ✅        | String does not contain     |                  |
| `isIn`            | ✅        | In array                    |                  |
| `notIn`           | ✅        | Not in array                |                  |
| `len`             | ✅        | String length range         |                  |
| `isUUID`          | ✅        | Matches UUIDv4              |                  |
| `isDate`          | ✅        | Parses with `Date.parse`    |                  |
| `isAfter`         | ✅        | Date > comparison           |                  |
| `isBefore`        | ✅        | Date < comparison           |                  |
| `min`             | ✅        | Number >= min               |                  |
| `max`             | ✅        | Number <= max               |                  |
| `isCreditCard`   | ❌        | Must be a valid credit card number                | ✅        |
| `isJson`         | ❌        | Must be a valid JSON string                       | ✅        |
| `isMobilePhone`  | ❌        | Must be a valid mobile number                     | ✅        |
| `isAscii`        | ❌        | Must contain ASCII characters only                | ✅        |
| `isBase64`       | ❌        | Must be a valid Base64 string                     | ✅        |
| `isPostalCode`   | ❌        | Must be a valid postal code (with locale)         | ✅        |
| `isSlug`         | ❌        | Must be a URL-friendly slug (e.g. `my-title`)     | ✅        |
| `isMimeType`     | ❌        | Must be a valid MIME type                         | ❌        |
| `isISBN`         | ❌        | Must be a valid ISBN-10 or ISBN-13                | ❌        |

---

## ⚒️ Operators (planned as `Op.*` syntax)

| Operator     | Supported | Description                                  | In Roadmap for v1 |
|--------------|-----------|----------------------------------------------|------------------|
| `Op.eq`      | ❌        | Equal to                                     | ✅        |
| `Op.ne`      | ❌        | Not equal                                    | ✅        |
| `Op.gte`     | ❌        | Greater than or equal                        | ✅        |
| `Op.gt`      | ❌        | Greater than                                 | ✅        |
| `Op.lte`     | ❌        | Less than or equal                           | ✅        |
| `Op.lt`      | ❌        | Less than                                    | ✅        |
| `Op.not`     | ❌        | Negation (`NOT`)                             | ✅        |
| `Op.in`      | ✅        | Value must be in an array                    |           |
| `Op.notIn`   | ❌        | Value must not be in an array                | ✅        |
| `Op.like`    | 🔶        | String matches pattern (only '%' char)       | 🔶        |
| `Op.notLike` | ❌        | Does not match pattern                       | 🔶        |
| `Op.iLike`   | ❌        | Case-insensitive LIKE (PostgreSQL only)      | ❌        |
| `Op.notILike`| ❌        | Case-insensitive NOT LIKE                    | ❌        |
| `Op.between` | ❌        | Between two values                           | ✅        |
| `Op.notBetween`| ❌      | Not between two values                       | ✅        |
| `Op.is`      | ❌        | IS NULL or IS NOT NULL                       | ✅        |
| `Op.col`     | ❌        | Compare to another column                    | ❌        |

---

## 🧱 Schema Support

| Option           | Supported | Description                                  | In Roadmap for v1 |
|------------------|-----------|----------------------------------------------|------------------|
| `type`           | ✅        | Field type (e.g. `STRING`, `INTEGER`, ...)   |           |
| `unique`         | ✅        | Ensures uniqueness                          |           |
| `required`       | ✅        | Equivalent of `allowNull: false`             |           |
| `defaultValue`   | ✅        | Static value or function                     |           |
| `validate`       | ✅        | Validators object                            |           |
| `primaryKey`     | ❌        | Marks field as primary key                   | ❌        |
| `autoIncrement`  | ❌        | Automatically incrementing integer           | ❌        |
| `comment`        | ❌        | Optional field comment (ignored in storage)  | ❌        |
| `field`          | ❌        | Custom name for DB field (not relevant here) | ❌        |
| `get` / `set`    | ❌        | Custom getters/setters                       | ❌        |
| `values`         | ❌        | ENUM values list                             | ❌        |


---

## 🔗 Associations

| Association       | Supported | Description                                    | In Roadmap for v1 |
|-------------------|-----------|------------------------------------------------|------------------|
| `hasOne`          | ❌        | One-to-one relationship                        | ✅        |
| `belongsTo`       | ❌        | Adds foreign key in the source model           | ✅        |
| `hasMany`         | ❌        | One-to-many relationship                       | ✅        |
| `belongsToMany`   | ❌        | Many-to-many via join table                    | ✅        |


---

## 🧬 Data Types Compatibility

| Sequelize Type | Supported | Notes                                  | In Roadmap for v1 |
|----------------|-----------|----------------------------------------|------------------|
| `STRING`       | ✅        | Standard string                        | ❌        |
| `TEXT`         | ❌        | Similar to string with no size limit   | ✅        |
| `INTEGER`      | ❌        | Standard number                        | ✅        |
| `BIGINT`       | ❌        | Not distinguished from `INTEGER`       | ✅        |
| `FLOAT`        | ❌        | Float handling                         | ✅        |
| `DOUBLE`       | ❌        | Not explicitly handled                 | ✅        |
| `DECIMAL`      | ❌        | Same as float in practice              | ✅        |
| `BOOLEAN`      | ❌        | True/false values                      | ✅        |
| `DATE`         | ❌        | Handled via `Date.parse()`             | ✅        |
| `DATEONLY`     | ❌        | No time part stripped                  | ✅        |
| `UUID`         | ❌        | Validated via regex                    | ✅        |
| `ENUM`         | ❌        | Not yet supported                      | ❌        |
| `JSON`         | ❌        | No structure validation on object      | ✅        |
| `BLOB`         | ❌        | Not applicable (no binary handling)    | ❌        |
| `TIME`         | ❌        | Not handled separately                 | ✅        |
| `NOW`          | ❌        | No auto-timestamp                      | ❌        |
---

## ❌ Not Supported / Out of Scope

- Transactions
- Lifecycle Hooks
- Migrations
- Raw Queries
