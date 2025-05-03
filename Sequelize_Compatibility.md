
# Sequelize Compatibility – jsondb-sequelize-like

This document provides an overview of which Sequelize-like features are currently supported in `jsondb-sequelize-like`, organized by category.

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

| Method         | Supported | Notes                               | In Roadmap for v1 |
|----------------|-----------|-------------------------------------|-------------------|
| `create`       | ✅        | add item                           | ✅                |
| `updateOne`    | ✅        | update one item                    | ✅                |
| `destroy`      | ✅        | removes items                      | ✅                |
| `findAll`      | ✅        | get all items matching conditions  | ✅                |
| `findOne`      | ✅        | get first item matching conditions | ✅                |
| `findById`     | ❌        | get item by is id                  | ✅                |
| `updateById`   | ❌        | update item by is id               | ✅                |
| `destroyById`  | ❌        | remove item by is id               | ✅                |
| `count`        | ❌        | count items matching conditions    | ✅                |
| `exists`       | ❌        | Not implemented                    | ❌                |
| `bulkCreate`   | ❌        | Not implemented                    | ❌                |
| `bulkUpdate`   | ❌        | Not implemented                    | ❌                |
| `truncate`     | ❌        | Not implemented                    | ❌                |
| `reload`       | ❌        | Not implemented                    | ❌                |
| `flush`        | ❌        | Not implemented                    | ❌                |
| `import`       | ❌        | Not implemented                    | ❌                |
| `export`       | ❌        | Not implemented                    | ❌                |
| `sync`         | ❌        | Not implemented                    | ❌                |

---

## ⚙️ Query Options

| Option        | Supported   | Notes                                           | In Roadmap for v1           |
|---------------|-------------|-------------------------------------------------|-----------------------------|
| `where`        | ✅        | Condition filtering with key/value or operators  | ✅                         |
| `attributes`   | ❌        | Field selection (ex: `['id', 'name']`)           | ✅                         |
| `include`      | ❌        | Join related models (`hasMany`, `belongsTo`)     | 🔶 1 nested-level support  |
| `raw`          | ❌        | Return raw objects instead of instances          | ❌                         |
| `paranoid`     | ❌        | Ignore soft-deleted rows (`deletedAt`)           | ❌                         |
| `distinct`     | ❌        | Apply SQL `DISTINCT` keyword                     | ❌                         |
| `group`        | ❌        | SQL `GROUP BY` clause                            | ✅                         |
| `having`       | ❌        | SQL `HAVING` clause on grouped results           | ❌                         |
| `order`        | ✅        | Sort results (`[['name', 'DESC']]`)              | ✅                         |
| `limit`        | ✅        | Max number of records                            | ✅                         |
| `offset`       | ✅        | Number of records to skip (pagination)           | ✅                         |
| `subQuery`     | ❌        | Force subquery usage                             | ❌                         |
| `benchmark`    | ❌        | Enable query execution time logging              | ❌                         |
| `logging`      | ❌        | Enable/disable logging                           | ❌                         |

---

## 🔐 Validators

| Validator         | Supported | Notes                                            | In Roadmap for v1 |
|-------------------|-----------|--------------------------------------------------|-------------------|
| `is`              | ✅        | Regex matching                                   | ✅               |
| `not`             | ✅        | Negated regex                                    | ✅               |
| `isEmail`         | ✅        | Standard email format                            | ✅               |
| `isUrl`           | ✅        | Valid URL (via `URL()`)                          | ✅               |
| `isIP`            | ✅        | Matches IPv4 or IPv6                             | ✅               |
| `isIPv4`          | ✅        | Basic IPv4 check                                 | ✅               |
| `isIPv6`          | ✅        | Basic IPv6 check                                 | ✅               |
| `isAlpha`         | ✅        | A-Z only                                         | ✅               |
| `isAlphanumeric`  | ✅        | A-Z + 0-9                                        | ✅               |
| `isNumeric`       | ✅        | Digits with optional dot                         | ✅               |
| `isInt`           | ✅        | Integer only                                     | ✅               |
| `isFloat`         | ✅        | Decimal numbers                                  | ✅               |
| `isDecimal`       | ✅        | Same as float                                    | ✅               |
| `isLowerCase`     | ✅        | All lowercase                                    | ✅               |
| `isUpperCase`     | ✅        | All uppercase                                    | ✅               |
| `notNull`         | ✅        | Not null or undefined                            | ✅               |
| `isNull`          | ✅        | Only null/undefined                              | ✅               |
| `notEmpty`        | ✅        | Not '', null or undefined                        | ✅               |
| `equals`          | ✅        | Strict equality                                  | ✅               |
| `contains`        | ✅        | String contains value                            | ✅               |
| `notContains`     | ✅        | String does not contain                          | ✅               |
| `isIn`            | ✅        | In array                                         | ✅               |
| `notIn`           | ✅        | Not in array                                     | ✅               |
| `len`             | ✅        | String length range                              | ✅               |
| `isUUID`          | ✅        | Matches UUIDv4                                   | ✅               |
| `isDate`          | ✅        | Parses with `Date.parse`                         | ✅               |
| `isAfter`         | ✅        | Date > comparison                                | ✅               |
| `isBefore`        | ✅        | Date < comparison                                | ✅               |
| `min`             | ✅        | Number >= min                                    | ✅               |
| `max`             | ✅        | Number <= max                                    | ✅               |
| `isCreditCard`    | ❌        | Must be a valid credit card number               | ❌               |
| `isJson`          | ❌        | Must be a valid JSON string                      | ❌               |
| `isMobilePhone`   | ❌        | Must be a valid mobile number                    | ❌               |
| `isAscii`         | ❌        | Must contain ASCII characters only               | ❌               |
| `isBase64`        | ❌        | Must be a valid Base64 string                    | ❌               |
| `isPostalCode`    | ❌        | Must be a valid postal code (with locale)        | ❌               |
| `isSlug`          | ❌        | Must be a URL-friendly slug (e.g. `my-title`)    | ❌               |
| `isMimeType`      | ❌        | Must be a valid MIME type                        | ❌               |
| `isISBN`          | ❌        | Must be a valid ISBN-10 or ISBN-13               | ❌               |
       
---

## ⚒️ Operators (planned as `Op.*` syntax)

| Operator        | Supported | Description                                  | In Roadmap for v1 |
|-----------------|-----------|----------------------------------------------|-------------------|
| `Op.eq`            | ✅        | Equal to                                    | ✅                |
| `Op.ne`            | ✅        | Not equal                                   | ✅                |
| `Op.gte`           | ✅        | Greater than or equal                       | ✅                |
| `Op.gt`            | ✅        | Greater than                                | ✅                |
| `Op.lte`           | ✅        | Lower than or equal                         | ✅                |
| `Op.lt`            | ✅        | Lower than                                  | ✅                |
| `Op.in`            | ✅        | Value must be in an array                   | ✅                |
| `Op.notIn`         | ✅        | Value must not be in an array               | ✅                |
| `Op.like`          | 🔶        | String matches pattern (only '%' char)      | 🔶                |
| `Op.notLike`       | 🔶        | Does not match pattern  (only '%' char)     | 🔶                |
| `Op.iLike`         | 🔶        | Case-insensitive LIKE  (only '%' char)      | 🔶                |
| `Op.notILike`      | 🔶        | Case-insensitive NOT LIKE (only '%' char)   | 🔶                |
| `Op.between`       | ✅        | Between two values                          | ✅                |
| `Op.notBetween`    | ✅        | Not between two values                      | ✅                |
| `Op.is`            | ✅        | IS NULL or IS NOT NULL                      | ✅                |
| `Op.isNot`         | ✅        | IS NULL or IS NOT NULL                      | ✅                |
| `Op.col`           | ❌        | Compare to another column                   | ❌                |
| `Op.regexP`        | ❌        | regex compare                               | ❌                |
| `Op.notRegexP`     | ❌        | regex compare with not                      | ❌                |
| `Op.iregexP`       | ❌        | regex compare case insensitive              | ❌                |
| `Op.notIRegexP`    | ❌        | regex compare with not and case insensitive | ❌                |
| `Op.startsWith`    | ❌        | check if string starts with                 | ✅                |
| `Op.notStartsWith` | ❌        | check if string not starts with             | ✅                |
| `Op.endsWith`      | ❌        | check if string ends with                   | ✅                |
| `Op.notEndsWith`   | ❌        | check if string not ends with               | ✅                |

---

## 🧱 Schema Support

| Option           | Supported | Description                                  | In Roadmap for v1 |
|------------------|-----------|----------------------------------------------|-------------------|
| `type`           | ✅        | Field type (e.g. `STRING`, `INTEGER`, ...)   | ✅               |
| `unique`         | ✅        | Ensures uniqueness                           | ✅               |
| `required`       | ✅        | Equivalent of `allowNull: false`             | ✅               |
| `defaultValue`   | ✅        | Static value or function                     | ✅               |
| `validate`       | ✅        | Validators object                            | ✅               |
| `primaryKey`     | ❌        | Marks field as primary key                   | ❌               |
| `autoIncrement`  | ❌        | Automatically incrementing integer           | ❌               |
| `comment`        | ❌        | Optional field comment (ignored in storage)  | ❌               |
| `field`          | ❌        | Custom name for DB field (not relevant here) | ❌               |
| `get` / `set`    | ❌        | Custom getters/setters                       | ❌               |
| `values`         | ❌        | ENUM values list                             | ❌               |


---

## 🔗 Associations

| Association       | Supported | Description                                    | In Roadmap for v1 |
|-------------------|-----------|------------------------------------------------|-------------------|
| `hasOne`          | ❌        | One-to-one relationship                        | ✅               |
| `belongsTo`       | ❌        | Adds foreign key in the source model           | ✅               |
| `hasMany`         | ❌        | One-to-many relationship                       | ✅               |
| `belongsToMany`   | ❌        | Many-to-many via join table                    | ✅               |


---

## 🧬 Data Types Compatibility

| Sequelize Type       | Supported | Notes                                  | In Roadmap for v1 |
|----------------------|-----------|----------------------------------------|-------------------|
| `STRING`             | ✅        | Standard string                        | ✅               |
| `TEXT`               | ✅        | Similar to string with no size limit   | ✅               |
| `TINYINT`            | ✅        | tiny signed integer number             | ✅               |
| `SMALLINT`           | ✅        | small signed integer number            | ✅               |
| `MEDIUMINT`          | ✅        | medium signed integer number           | ✅               |
| `INTEGER`            | ✅        | integer signed number                  | ✅               |
| `BIGINT`             | ✅        | big integer signed number              | ✅               |
| `TINYINT.UNSIGNED`   | ✅        | tiny integer number                    | ✅               |
| `SMALLINT.UNSIGNED`  | ✅        | small integer number                   | ✅               |
| `MEDIUMINT.UNSIGNED` | ✅        | medium integer number                  | ✅               |
| `INTEGER.UNSIGNED`   | ✅        | integer number                         | ✅               |
| `BIGINT.UNSIGNED`    | ✅        | big integer number                     | ✅               |
| `FLOAT`              | ✅        | Float signed number (same as decimal)  | ✅               |
| `DOUBLE`             | ✅        | Double signed number (same as decimal) | ✅               |
| `DECIMAL`            | ✅        | Decimal signed number                  | ✅               |
| `FLOAT.UNSIGNED`     | ✅        | Float number (same as decimal)         | ✅               |
| `DOUBLE.UNSIGNED`    | ✅        | Double number (same as decimal)        | ✅               |
| `DECIMAL.UNSIGNED`   | ✅        | Decimal number                         | ✅               |
| `BOOLEAN`            | ✅        | True/false values                      | ✅               |
| `DATE`               | ✅        | Date and Time                          | ✅               |
| `DATEONLY`           | ✅        | Date                                   | ✅               |
| `TIME`               | ✅        | Time                                   | ✅               |
| `NOW`                | ✅        | generate new Date() on defaultValue    | ✅               |
| `UUID`               | ❌        | Validated via regex                    | ❌               |
| `ENUM`               | ❌        | Not yet supported                      | ❌               |
| `JSON`               | ❌        | No structure validation on object      | ❌               |
| `BLOB`               | ❌        | Not applicable (no binary handling)    | ❌               |
       

Remarks, FLOAT, DOUBLE, DECIMAL with or without UNSIGNED must be call as a function :
DataTypes.FLOAT() -- no precision
DataTypes.FLOAT(10,2) -- with precision
DataTypes.FLOAT.UNSIGNED() -- no precision
DataTypes.FLOAT.UNSIGNED(10,2) -- with precision

---

## ❌ Not Supported / Out of Scope

- Transactions
- Lifecycle Hooks
- Migrations
- Raw Queries
