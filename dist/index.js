var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  DataTypes: () => DataTypes,
  Jdb: () => Jdb,
  Op: () => Operator_default
});
module.exports = __toCommonJS(index_exports);

// src/DataTypes/Boolean.js
var Boolean = {
  /**
   * Boolean value, true or false
   */
  BOOLEAN: function() {
    return {
      type: "boolean"
    };
  }
};

// src/DataTypes/Date.js
var Date2 = {
  /**
   * Date and time 
   */
  DATE: {
    type: "date"
  },
  /**
    * Date
    */
  DATEONLY: {
    type: "date"
  },
  /**
    * Time
    */
  TIME: {
    type: "date"
  },
  /**
   * Generate a new Date() for default value on insert and update queries
   */
  NOW: {
    type: "Date.now",
    get: () => {
      return new Date2();
    }
  }
};

// src/DataTypes/Integer.js
var Integer = {
  /**
   * Tiny integer
   * @min -128
   * @max 127
   */
  TINYINT: {
    type: "number",
    special: "integer",
    min: -128,
    max: 127,
    /**
     * Tiny unsigned integer
     * @min 0
     * @max 255
     */
    UNSIGNED: {
      type: "number",
      special: "integer",
      min: 0,
      max: 255
    }
  },
  /**
   * Small integer
   * @min -32768
   * @max 32767
   */
  SMALLINT: function() {
    return {
      type: "number",
      special: "integer",
      min: -32768,
      max: 32767,
      /**
       * Small unsigned integer
       * @min 0
       * @max 65535
       */
      UNSIGNED: {
        type: "number",
        special: "integer",
        min: 0,
        max: 65535
      }
    };
  },
  /**
   * Medium integer
   * @min -8388608
   * @max 8388607
   */
  MEDIUMINT: function() {
    return {
      type: "number",
      special: "integer",
      min: -8388608,
      max: 8388607,
      /**
       * Medium unsigned integer
       * @min 0
       * @max 16777215
       */
      UNSIGNED: {
        type: "number",
        special: "integer",
        min: 0,
        max: 16777215
      }
    };
  },
  /**
   * Integer
   * @min -2147483648
   * @max 2147483647
   */
  INTEGER: function() {
    return {
      type: "number",
      special: "integer",
      min: -2147483648,
      max: 2147483647,
      /**
       * Unsigned integer
       * @min 0
       * @max 4294967295
       */
      UNSIGNED: {
        type: "number",
        special: "integer",
        min: 0,
        max: 4294967295
      }
    };
  },
  /**
   * Big integer
   * @min -2^63
   * @max -2^63-1
   */
  BIGINT: function() {
    return {
      type: "number",
      special: "integer",
      min: -2e63,
      max: 2e63 - 1,
      /**
       * Big unsigned integer
       * @min 0
       * @max 2e64 - 1
       */
      UNSIGNED: {
        type: "number",
        special: "integer",
        min: 0,
        max: 2e64 - 1
      }
    };
  }
};

// src/DataTypes/Number.js
var Number2 = {
  /**
   * Single precision floating point
   */
  FLOAT: function(precision = null, scale = null) {
    const base = {
      type: "number",
      special: "float",
      precision: 10,
      scale: 2
    };
    if (precision !== null) {
      base.precision = precision;
    }
    if (scale !== null) {
      base.scale = scale;
    }
    return base;
  },
  /**
   * Double precision floating point
   */
  Double: function(precision = null, scale = null) {
    const base = {
      type: "number",
      special: "double",
      precision: 10,
      scale: 2
    };
    if (precision !== null) {
      base.precision = precision;
    }
    if (scale !== null) {
      base.scale = scale;
    }
    return base;
  },
  /**
   * Decimal exact number
   */
  DECIMAL: function(precision = null, scale = null) {
    const base = {
      type: "number",
      special: "decimal",
      precision: 10,
      scale: 2
    };
    if (precision !== null) {
      base.precision = precision;
    }
    if (scale !== null) {
      base.scale = scale;
    }
    return base;
  }
};
Number2.FLOAT.UNSIGNED = function(precision = null, scale = null) {
  let base = Number2.FLOAT(precision, scale);
  base.min = 0;
  return base;
};
Number2.DOUBLE.UNSIGNED = function(precision = null, scale = null) {
  let base = Number2.DOUBLE(precision, scale);
  base.min = 0;
  return base;
};
Number2.DECIMAL.UNSIGNED = function(precision = null, scale = null) {
  let base = Number2.DECIMAL(precision, scale);
  base.min = 0;
  return base;
};

// src/DataTypes/String.js
var String = {
  /**
   * String, fixed max length, better for variable length
   * @param {number} [value=255] Max length of string
   */
  STRING: function(value) {
    let type = { type: "string", value: 255 };
    if (value) {
      type.max = value;
    }
    return type;
  },
  /**
   * Char, fixed max length, better for fix length
   * @param {number} [value=255] Max length of string
   */
  CHAR: function(value) {
    let type = { type: "string", value: 255 };
    if (value) {
      type.max = value;
    }
    return type;
  },
  /**
   * Text, variable length
   */
  TEXT: function() {
    return {
      type: "string"
    };
  }
};

// src/DataTypes/DataTypes.js
var DataTypes = {
  ...String,
  ...Integer,
  ...Boolean,
  ...Number2,
  ...Date2
};

// src/Model.js
var import_fs2 = __toESM(require("fs"), 1);

// src/DeepSave.js
var import_fs = __toESM(require("fs"), 1);
var DeepSave = class {
  constructor(logname, filename, model, namespace) {
    this.logname = logname;
    this.filename = filename;
    this.model = model;
    this.namespace = namespace;
    if (import_fs.default.existsSync("./" + this.namespace + "/history/" + this.model + ".old.txt")) {
      this.save(false);
    }
  }
  save(createOldHistory = true) {
    try {
      if (createOldHistory) {
        import_fs.default.renameSync("./" + this.namespace + "/history/" + this.logname, "./" + this.namespace + "/history/" + this.model + ".old.txt");
      }
      let content = import_fs.default.readFileSync("./" + this.namespace + "/history/" + this.model + ".old.txt", { encoding: "utf8" }).split("\n");
      content = content.filter((line) => line != "");
      this.data = JSON.parse(import_fs.default.readFileSync("./" + this.namespace + "/" + this.filename, { encoding: "utf8" }));
      for (let line of content) {
        this.addLine(line);
      }
      import_fs.default.writeFileSync("./" + this.namespace + "/" + this.filename, JSON.stringify(this.data));
      import_fs.default.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
      import_fs.default.rmSync("./" + this.namespace + "/history/" + this.model + ".old.txt");
    } catch (e) {
      console.error(e);
    }
  }
  addLine(line) {
    let [operation, data] = line.split(" ");
    data = JSON.parse(data);
    switch (operation) {
      case "add":
        this.data.push(data);
        break;
      case "update":
        let element2 = this.data.find((e) => e.id === data.id);
        element2 = data;
        break;
      case "delete":
        this.data.filter((element3) => element3.id !== data.id);
        break;
    }
  }
};

// src/Validator.js
var isString = (v) => typeof v === "string";
var isNumber = (v) => typeof v === "number";
var validateIs = (element2, value) => {
  return value.test(element2);
};
var validateNot = (element2, value) => {
  return !value.test(element2);
};
var validateIsEmail = (element2) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element2);
};
var validateIsUrl = (element2) => {
  try {
    new URL(element2);
    return true;
  } catch {
    return false;
  }
};
var validateIsIP = (element2) => {
  return validateIsIPv4(element2) || validateIsIPv6(element2);
};
var validateIsIPv4 = (element2) => {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(element2);
};
var validateIsIPv6 = (element2) => {
  return /^[\da-fA-F:]+$/.test(element2);
};
var validateIsAlpha = (element2) => {
  return /^[A-Za-z]+$/.test(element2);
};
var validateIsAlphanumeric = (element2) => {
  return /^[A-Za-z0-9]+$/.test(element2);
};
var validateIsNumeric = (element2) => {
  return /^-?\d+(\.\d+)?$/.test(element2);
};
var validateIsInt = (element2) => {
  return Number.isInteger(element2);
};
var validateIsFloat = (element2) => {
  return isNumber(element2) && !Number.isInteger(element2);
};
var validateIsDecimal = (element2) => {
  return validateIsFloat(element2);
};
var validateIsLowerCase = (element2) => {
  return isString(element2) && element2 === element2.toLowerCase();
};
var validateIsUpperCase = (element2) => {
  return isString(element2) && element2 === element2.toUpperCase();
};
var validateNotNull = (element2) => {
  return element2 !== null && element2 !== void 0;
};
var validateIsNull = (element2) => {
  return element2 === null || element2 === void 0;
};
var validateNotEmpty = (element2) => {
  return element2 !== "" && element2 !== null && element2 !== void 0;
};
var validateEquals = (element2, value) => {
  return element2 === value;
};
var validateContains = (element2, value) => {
  return isString(element2) && element2.includes(value);
};
var validateNotContains = (element2, value) => {
  return isString(element2) && !element2.includes(value);
};
var validateIsIn = (element2, value) => {
  return Array.isArray(value) && value.includes(element2);
};
var validateNotIn = (element2, value) => {
  return Array.isArray(value) && !value.includes(element2);
};
var validateLen = (element2, value) => {
  return isString(element2) && element2.length >= value[0] && element2.length <= value[1];
};
var validateIsUUID = (element2) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(element2);
};
var validateIsDate = (element2) => {
  return !isNaN(Date.parse(element2));
};
var validateIsAfter = (element2, value) => {
  return new Date(element2) > new Date(value);
};
var validateIsBefore = (element2, value) => {
  return new Date(element2) < new Date(value);
};
var validateMin = (element2, value) => {
  return isNumber(element2) && element2 >= value;
};
var validateMax = (element2, value) => {
  return isNumber(element2) && element2 <= value;
};
var validate = (element2, propertyName, validator) => {
  let errorStack = [];
  for (let [property, value] of Object.entries(validator)) {
    if (typeof value === "function") {
      try {
        value(element2);
      } catch (e) {
        errorStack.push(e);
      }
    } else {
      switch (property) {
        case "is":
          if (!validateIs(element2, value)) {
            errorStack.push(new Error(propertyName + " must match pattern : " + value));
          }
          break;
        case "not":
          if (!validateNot(element2, value)) {
            errorStack.push(new Error(propertyName + " must not match pattern : " + value));
          }
          break;
        case "isUrl":
          if (!validateIsUrl(element2)) {
            errorStack.push(new Error(propertyName + " must be url format"));
          }
          break;
        case "isEmail":
          if (!validateIsEmail(element2)) {
            errorStack.push(new Error(propertyName + " must be email format"));
          }
          break;
        case "isIP":
          if (!validateIsIP(element2)) {
            errorStack.push(new Error(propertyName + " must be IPv4 or IPv6 format"));
          }
          break;
        case "isIPv4":
          if (!validateIsIPv4(element2)) {
            errorStack.push(new Error(propertyName + " must be IPv4 format"));
          }
          break;
        case "isIPv6":
          if (!validateIsIPv6(element2)) {
            errorStack.push(new Error(propertyName + " must be IPv6 format"));
          }
          break;
        case "isAlpha":
          if (!validateIsAlpha(element2)) {
            errorStack.push(new Error(propertyName + " must contains only alpha chars"));
          }
          break;
        case "isAlphanumeric":
          if (!validateIsAlphanumeric(element2)) {
            errorStack.push(new Error(propertyName + " must contains only alpha and numeric chars"));
          }
          break;
        case "isNumeric":
          if (!validateIsNumeric(element2)) {
            errorStack.push(new Error(propertyName + " must contains only numeric chars"));
          }
          break;
        case "isInt":
          if (!validateIsInt(element2)) {
            errorStack.push(new Error(propertyName + " must be Integer"));
          }
          break;
        case "isFloat":
          if (!validateIsFloat(element2)) {
            errorStack.push(new Error(propertyName + " must be Decimal"));
          }
          break;
        case "isDecimal":
          if (!validateIsDecimal(element2)) {
            errorStack.push(new Error(propertyName + " must be Float"));
          }
          break;
        case "isLowerCase":
          if (!validateIsLowerCase(element2)) {
            errorStack.push(new Error(propertyName + " must be in lowerCase"));
          }
          break;
        case "isUpperCase":
          if (!validateIsUpperCase(element2)) {
            errorStack.push(new Error(propertyName + " must be in upperCase"));
          }
          break;
        case "notNull":
          if (!validateNotNull(element2)) {
            errorStack.push(new Error(propertyName + " must be not null"));
          }
          break;
        case "isNull":
          if (!validateIsNull(element2)) {
            errorStack.push(new Error(propertyName + " must be null"));
          }
          break;
        case "notEmpty":
          if (!validateNotEmpty(element2)) {
            errorStack.push(new Error(propertyName + " must be not empty"));
          }
          break;
        case "equals":
          if (!validateEquals(element2, value)) {
            errorStack.push(new Error(propertyName + " must be equals to " + value));
          }
          break;
        case "contains":
          if (!validateContains(element2, value)) {
            errorStack.push(new Error(propertyName + " must contains " + value));
          }
          break;
        case "notContains":
          if (!validateNotContains(element2, value)) {
            errorStack.push(new Error(propertyName + " must not contains " + value));
          }
          break;
        case "isIn":
          if (!validateIsIn(element2, value)) {
            errorStack.push(new Error(propertyName + " must be in " + JSON.stringify(value)));
          }
          break;
        case "notIn":
          if (!validateNotIn(element2, value)) {
            errorStack.push(new Error(propertyName + " must not be in " + JSON.stringify(value)));
          }
          break;
        case "len":
          if (!validateLen(element2, value)) {
            errorStack.push(new Error(propertyName + " must be " + value + " chars length max"));
          }
          break;
        case "isUUID":
          if (!validateIsUUID(element2)) {
            errorStack.push(new Error(propertyName + " must be UUID"));
          }
          break;
        case "isDate":
          if (!validateIsDate(element2)) {
            errorStack.push(new Error(propertyName + " must be a date"));
          }
          break;
        case "isAfter":
          if (!validateIsAfter(element2, value)) {
            errorStack.push(new Error(propertyName + " must be greater than " + value));
          }
          break;
        case "isBefore":
          if (!validateIsBefore(element2, value)) {
            errorStack.push(new Error(propertyName + " must be lower than " + value));
          }
          break;
        case "min":
          if (!validateMin(element2, value)) {
            errorStack.push(new Error(propertyName + " must be greater than " + value));
          }
          break;
        case "max":
          if (!validateMax(element2, value)) {
            errorStack.push(new Error(propertyName + " must be lower than " + value));
          }
          break;
        default:
          errorStack.push(new Error("validator " + propertyName + " is not implemented manage by jsondb tools"));
          break;
      }
    }
  }
  return errorStack;
};

// src/Operator.js
var Operator = {
  like: "like",
  in: "in",
  eq: "eq",
  ne: "ne",
  gte: "gte",
  gt: "gt",
  lte: "lte",
  lt: "lt",
  not: "not",
  notIn: "notIn",
  notLike: "notLike",
  between: "between",
  notBetween: "notBetween",
  is: "is"
};
var Operator_default = Operator;

// src/Model.js
var Model = class {
  /**
       * Model constructor, this class should not be instanciate directly, but called through jdb.define
       * @param {string} name the name of the data to store (table name)
       * @param {Object} schema the validation schema with table properties and options
       * @param {string} [namespace] the path to the folder where data should be stored (default /data)
       * @param {number} [deepSaveTiming] timing in milliseconds between two automatic deepSave (default 5 minutes)
  
       */
  constructor(name, schema, { namespace, deepSaveTiming = 1e3 * 60 * 5 }) {
    this.name = name;
    this.schema = schema;
    this.filename = name + ".json";
    this.logname = name + ".txt";
    this.namespace = namespace;
    this.deepSaveTiming = deepSaveTiming;
    this.deepSave = new DeepSave(this.logname, this.filename, this.name, this.namespace);
    if (!import_fs2.default.existsSync("./" + this.namespace + "/" + this.filename)) {
      this.data = [];
      import_fs2.default.writeFileSync("./" + this.namespace + "/" + this.filename, "[]", { flag: "a+" });
    } else {
      this.data = JSON.parse(import_fs2.default.readFileSync("./" + this.namespace + "/" + this.filename, { flag: "a+" }));
    }
    if (!import_fs2.default.existsSync("./" + this.namespace + "/history/" + this.logname)) {
      import_fs2.default.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
    }
    this.deepSaveLauncher();
    this.currentId = this.data.length > 0 ? Math.max(...this.data.map((u) => u.id)) : 0;
  }
  /**
   * Launch the deepSave function to store all history operation in json data file
   */
  flush() {
    this.deepSave.save();
  }
  /**
   * Add operation in history for storage
   * @param {string} operation type of crud operation to add in history
   * @param {*} data data related to the operation
   * @private
   */
  save(operation, data) {
    try {
      import_fs2.default.appendFileSync("./" + this.namespace + "/history/" + this.logname, operation + " " + JSON.stringify(data) + "\n");
    } catch (e) {
      throw new Error(e.message);
    }
  }
  /**
   * Method to launch auto-save of history into json files
   * @private
   */
  deepSaveLauncher() {
    setTimeout(() => {
      this.deepSave.save();
      this.deepSaveLauncher();
    }, this.deepSaveTiming);
  }
  /**
   * Read query to get all element of a model.
   * @param {Object} options various filtering options
   * @returns All elements matching filtering conditions
   */
  findAll(options) {
    if (this.data.length === 0) {
      return this.data;
    }
    let result = this.data;
    if (options.where) {
      result = result.filter((element2) => this.checkWhereClause(element2, options));
    }
    if (options.order) {
      result.sort((a, b) => {
        for (let [property, order] of options.order) {
          if (a[property] && !b[property]) {
            return 1;
          }
          if (!a[property] && b[property]) {
            return -1;
          }
          if (a[property] && b[property]) {
            if (order === "DESC") {
              if (a[property] !== b[property]) {
                return a[property] < b[property] ? 1 : -1;
              }
            }
            if (a[property] !== b[property]) {
              return a[property] > b[property] ? 1 : -1;
            }
          }
        }
      });
    }
    if (options.offset) {
      result = result.slice(options.offset);
    }
    if (options.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  }
  /**
   * Read query to get the first element of a model.
   * @param {Object} options various filtering options
   * @returns First element matching filtering conditions
   */
  findOne(options) {
    if (!options.where && this.data.length > 0) {
      return this.data[0];
    }
    return this.data.find((element2) => this.checkWhereClause(element2, options));
  }
  /**
   * Create query to insert an element into the database
   * @param {Object} element the element to store
   * @returns the element after created
   * @throws Error may be throw if the element does not pass all schema validation conditions
   */
  create(element2) {
    try {
      let errorStack = [];
      this.addDefaultValue(element2);
      errorStack = errorStack.concat(this.checkFieldExist(element2));
      errorStack = errorStack.concat(this.checkFormat(element2));
      errorStack = errorStack.concat(this.checkRequired(element2));
      errorStack = errorStack.concat(this.checkValidator(element2));
      if (errorStack.length > 0) {
        throw new Error("Validation failed", { cause: errorStack });
      }
    } catch (e) {
      throw e;
    }
    const newElement = {
      ...element2,
      id: this.currentId + 1
    };
    this.data.push(newElement);
    try {
      this.save("add", newElement);
      this.currentId++;
    } catch (e) {
      this.data.pop();
      throw new Error(e.message);
    }
    return newElement;
  }
  /**
   * Update query to update an element into the database
   * @param {Object} element the element to update
   * @param {Object} options various filtering options
   * @returns the element after update
   * @throws Error may be throw if the element does not pass all schema validation conditions
   */
  updateOne(element2, options) {
    let elementToUpdate = this.findOne(options);
    let copy = structuredClone(elementToUpdate);
    Object.assign(elementToUpdate, element2);
    try {
      let errorStack = [];
      errorStack = errorStack.concat(this.checkFieldExist(elementToUpdate));
      errorStack = errorStack.concat(this.checkFormat(elementToUpdate));
      errorStack = errorStack.concat(this.checkRequired(elementToUpdate));
      errorStack = errorStack.concat(this.checkValidator(elementToUpdate));
    } catch (e) {
      throw e;
    }
    try {
      this.save("update", elementToUpdate);
      return elementToUpdate;
    } catch (e) {
      elementToUpdate = copy;
      throw new Error(e.message);
    }
  }
  /**
   * Delete query to remove one or many elements from the database
   * @param {Object} options various filtering options
   * @returns number of deleted elements
   * @throws Error may be throw if the deletion failed
   */
  destroy(options) {
    if (!options.where && this.data.length > 0) {
      return 0;
    }
    let count = this.data.length;
    const dataToDelete = this.findOne(options);
    this.data = this.data.filter((user) => !checkWhereClause(user, options));
    try {
      this.save("delete", dataToDelete);
    } catch (e) {
      this.data.push(dataToDelete);
      throw new Error(e.message);
    }
    return count - this.data.length;
  }
  /**
   * Check all where query constraint on one element
   * @param {Object} element the element to check
   * @param {Object} options various filtering options
   * @returns true if the element passed all conditions, either false
   * @private
   */
  checkWhereClause(element2, options) {
    for (let [field2, value] of Object.entries(options.where)) {
      if (typeof value === "object") {
        if (!checkOperator({ type: Object.keys(value)[0], value }, element2[field2])) {
          return false;
        }
      } else if (element2[field2] !== value) {
        return false;
      }
    }
    return true;
  }
  /**
   * Check element match schema validation before insert and update queries
   * @param {Object} element the element to check
   * @returns {Error[]} an array of error, if empty, the element passed all check
   * @private
   */
  checkFormat(element2) {
    let errorStack = [];
    for (let [property, value] of Object.entries(element2)) {
      if (typeof value !== this.schema[property].type.type) {
        errorStack.push(new Error("Error : property " + property + " must be of type " + this.schema[property].type.type));
      }
      if (this.schema[property].type.min || this.schema[property].type.max) {
        errorStack = errorStack.concat(this.checkType(property, value));
      }
      if (this.schema[property].unique) {
        let result = this.checkUnique(property, value);
        if (!result) {
          errorStack.push(new Error("Error : property " + property + " must be unique"));
        }
      }
    }
    return errorStack;
  }
  checkType(property, value) {
    let errorStack = [];
    switch (this.schema[property].type) {
      case "string":
        if (this.schema[property].type.max && value.length > this.schema[property].type.max) {
          errorStack.push(new Error("Error : property " + property + " must have " + this.schema[property].type.max + " at most"));
        }
        break;
      case "number":
        if (this.schema[property].type.max && value > this.schema[property].type.max) {
          errorStack.push(new Error("Error : property " + property + " can not be greater than " + this.schema[property].type.max));
        }
        if (this.schema[property].type.min && value < this.schema[property].type.min) {
          errorStack.push(new Error("Error : property " + property + " can not be lower than " + this.schema[property].type.max));
        }
        if (this.schema[property].special && this.schema[property].special === "integer") {
          if (!Number.isInteger(value)) {
            errorStack.push(new Error("Error : property " + property + " must be an integer value"));
          }
        }
        if (this.schema[property].special && ["float", "double", "decimal"].includes(this.schema[property].special)) {
          if (Number(value) !== value) {
            errorStack.push(new Error("Error : property " + property + " must be an number value"));
          }
          if (this.schema[property].precision) {
            if (value.toString().replace(".", "").replace("-", "").length > this.schema[property].precision) {
              errorStack.push(new Error("Error : property " + property + " can not exceed " + this.schema[property].precision + " digits"));
            }
          }
          if (this.schema[property].scale) {
            let splitNumber = value.split(".");
            if (splitNumber.length > 1) {
              if (splitNumber[2].toString().length > this.schema[property].scale) {
                errorStack.push(new Error("Error : property " + property + " can not have more than " + this.schema[property].scale + " decimals digits"));
              }
            }
          }
        }
        break;
    }
    return errorStack;
  }
  /**
   * Check element match schema allowNull validation before insert and update queries
   * @param {Object} element the element to check
   * @returns {Error[]} an array of error, if empty, the element passed all allowNull check
   * @private
   */
  checkRequired(element2) {
    let errorStack = [];
    let required = Array.from(this.schema).filter((property) => property.required && property.required === true);
    for (let [property, options] of Object.entries(required)) {
      if (!element2[property]) {
        errorStack.push(new Error("Error : property " + property + " is required"));
      }
    }
    return errorStack;
  }
  /**
   * Check element match schema properties, and no other ones before insert and update queries
   * @param {Object} element the element to check
   * @returns {Error[]} an array of error, if empty, the element passed all allowNull check
   * @private
   */
  checkFieldExist(element2) {
    let errorStack = [];
    for (let property of Object.keys(element2)) {
      if (!this.schema[property]) {
        errorStack.push(new Error("Error : property " + property + " does not exist on " + this.name));
      }
    }
    return errorStack;
  }
  /**
   * Check element match schema unique validation before insert and update queries
   * @param {Object} element the element to check
   * @returns {boolean} true if element is unique, either false
   * @private
   */
  checkUnique(property, value) {
    let obj = {};
    obj[property] = value;
    let element2 = this.findOne({
      where: obj
    });
    if (element2) {
      return false;
    }
    return true;
  }
  /**
   * add defaultValue on empty element before insert and update queries
   * @param {Object} element the element to check for default values
   * @private
   */
  addDefaultValue(element2) {
    for (let [property, value] of Object.entries(this.schema)) {
      if (value.defaultValue && !element2[property]) {
        element2[property] = value.defaultValue;
        console.log(element2[property]);
      }
    }
  }
  /**
   * Check element match schema validators before insert and update queries
   * @param {Object} element the element to check
   * @returns {Error[]} an array of error, if empty, the element passed all validators check
   * @private
   */
  checkValidator(element2) {
    let errorStack = [];
    for (let [property, value] of Object.entries(this.schema)) {
      if (value.validate) {
        errorStack = errorStack.concat(validate(element2[property], property, value.validate));
      }
    }
    return errorStack;
  }
  checkOperator(operator, value) {
    switch (operator.type) {
      case "like":
        if (!this.checkLikeClause(element[field], operator.value)) {
          return false;
        }
        break;
      case "in":
        if (!this.checkInClause(element[field], operator.value)) {
          return false;
        }
        break;
      case "eq":
        if (!this.checkEqClause(element[field], operator.value)) {
          return false;
        }
        break;
      case "ne":
        break;
      case "gte":
        break;
      case "gt":
        break;
      case "lte":
        break;
      case "lt":
        break;
      case "not":
        break;
      case "notIn":
        if (this.checkInClause(element[field], value.in)) {
          return false;
        }
        break;
      case "notLike":
        if (this.checkLikeClause(element[field], operator.value)) {
          return false;
        }
        break;
      case "between":
        break;
      case "notBetween":
        break;
    }
  }
  /**
   * Transform like query to js regex, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {string} like the like constraint on query where options
   * @returns true if the regex match the value, either false
   * @private
   */
  checkLikeClause(field2, like) {
    if (typeof like !== "string") {
      throw new Error("Like operator required an string value");
    }
    let regex = new RegExp(like.replaceAll("%", ".*"));
    return regex.test(field2);
  }
  /**
   * Transform in query to js includes, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {string} array the list of accepted value
   * @returns true if the value is in the array, either false
   * @private
   */
  checkInClause(field2, array) {
    if (!Array.isArray(array)) {
      throw new Error("In operator required an array value");
    }
    return array.includes(field2);
  }
  /**
   * Transform in query to js includes, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {string} array the list of accepted value
   * @returns true if the value is in the array, either false
   * @private
   */
  checkInClause(field2, array) {
    if (!Array.isArray(array)) {
      throw new Error("In operator required an array value");
    }
    return array.includes(field2);
  }
};
var Model_default = Model;

// src/jdb.js
var import_fs3 = __toESM(require("fs"), 1);
var Jdb = class {
  /*!*
   * constructor to manage model definition and storage
   * @param {Object} [options]
   * @param {number} [options.deepSaveTiming=300000] timing in milliseconds between two automatic deepSave
   * @param {string} [options.namespace=data] the path to the folder where data should be stored
   */
  constructor({ namespace, deepSaveTiming } = { namespace: "data", deepSaveTiming: 1e3 * 60 * 5 }) {
    this.namespace = namespace;
    this.deepSaveTiming = deepSaveTiming;
    if (!import_fs3.default.existsSync("./" + this.namespace)) {
      import_fs3.default.mkdirSync("./" + this.namespace + "/history", { recursive: true });
    }
  }
  define(name, schema) {
    return new Model_default(name, schema, { namespace: this.namespace, deepSaveTiming: this.deepSaveTiming });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataTypes,
  Jdb,
  Op
});
