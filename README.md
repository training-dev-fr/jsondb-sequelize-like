# jsondb-sequelize-like – A lightweight JSON-based database with Sequelize-like syntax

⚠️ Note: This project is not affiliated with Sequelize. It’s simply inspired by its syntax and modeling philosophy to make transitions easier.

Documentation availables in <a href="https://training-dev-fr.github.io/jsondb-sequelize-like/" target="_blank">docs</a> folder

**jsondb-sequelize-like** is a minimalist, file-based JSON database engine inspired by Sequelize.  
It stores your data in flat `.json` files, supports typed schemas, append-only logs, validation, and a syntax similar to popular ORMs.  
Ideal for embedded systems, CLIs, quick prototyping, or educational use.

---

## 🚀 Features

- 💾 Flat-file JSON storage
- 🧠 In-memory cache with periodic snapshot
- ✍️ Append-only logging for safe writes
- 🔍 SQL-like querying: `where`, `like`, `is`, etc.
- 🧱 Schema definition with `DataTypes`, `unique`, `validation`, etc.
- 🎯 Auto-incrementing primary keys
- ✅ Inspired by <a href="https://sequelize.org" target="_blank">Sequelize</a> syntax
- 🔒 No external dependencies

Watch our <a href="./Sequelize_Compatibility.md" target="_blank">Sequelize Compatibility file</a> for more information or compatibiliy check

---

## 📦 Installation

```bash
npm install jsondb-sequelize-like
```

---

## 🛠️ Basic Usage

### 1. Define a model

```js
import Jdb, { DataTypes } from 'jsondb-sequelize-like';

const db = new Jdb();

const User = db.createModel('user', {
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    validate: /.*@.*/
  },
  password: {
    type: DataTypes.STRING(255)
  }
});
```

---

### 2. Create records

```js
User.create({
  email: 'john.doe@example.com',
  password: '123456'
});
```

---

### 3. Query data

```js
const allUsers = User.find(); // returns all users

const filtered = User.find({
  where: {
    email: { like: '%@example.com' }
  }
});
```

---

### 4. Validate types and uniqueness

```js
User.create({
  email: 'invalid-email', // fails regex validation
  password: 123456         // fails string type check
});
```

---

## 🧪 Schema options (current support)

- `type`: required — one of `DataTypes.STRING(length)`, `DataTypes.NUMBER()`
- `unique`: boolean — ensures uniqueness in the dataset
- `validate`: RegExp — validates the input on insert
- *(Planned)*: `required`, `default`, additional types (`BOOLEAN`, `DATE`, etc.)

---

## 💡 Philosophy

The goal of `jsondb-sequelize-like` is to offer a zero-dependency, file-based DB that mirrors the experience of Sequelize — so you can:
- prototype fast,
- ship lightweight apps (embedded, CLI, offline tools),
- and switch to Sequelize + Any SQL Database supported by sequelize later **without rewriting your models and queries at all**.

---

## 📁 Data Storage Structure

```
project/
├── data/
│   ├── table.json          ← snapshot (state)
│   └── history/
│       └── history.txt       ← append-only log
```

Snapshots are periodically written to disk and logs are replayed if needed.

---

## 🛣️ Roadmap (v1.x)

- [ ] Add support for `limit`, `offset`, `order` in `.find()`
- [ ] Add `required` and `default` fields in schema
- [ ] Support additional types: `BOOLEAN`, `DATE`, etc.
- [ ] Operator object: `Op.like`, `Op.gt`, etc.
- [ ] Optional case-insensitive matching and full-text
- [ ] Schema-based normalization before insert

---

## 📄 License

Custom : see <a href="./LICENSE.md" target="_blank">LICENSE.md</a>

---

## 🙌 Author

Aurélien Vaast – 
<a href="https://github.com/training-dev-fr/jsondb-sequelize-like" target="_blank">GitHub</a> -
<a href="https://training-dev.fr" target="_blank">trainingdev.fr</a> -
<a href="https://www.npmjs.com/package/jsondb-sequelize-like" target="_blank">npm</a> -
