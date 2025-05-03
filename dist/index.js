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
  DOUBLE: function(precision = null, scale = null) {
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
        let element = this.data.find((e) => e.id === data.id);
        element = data;
        break;
      case "delete":
        this.data.filter((element2) => element2.id !== data.id);
        break;
    }
  }
};

// src/Validator.js
var isString = (v) => typeof v === "string";
var isNumber = (v) => typeof v === "number";
var validateIs = (element, value) => {
  return value.test(element);
};
var validateNot = (element, value) => {
  return !value.test(element);
};
var validateIsEmail = (element) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element);
};
var validateIsUrl = (element) => {
  try {
    new URL(element);
    return true;
  } catch {
    return false;
  }
};
var validateIsIP = (element) => {
  return validateIsIPv4(element) || validateIsIPv6(element);
};
var validateIsIPv4 = (element) => {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(element);
};
var validateIsIPv6 = (element) => {
  return /^[\da-fA-F:]+$/.test(element);
};
var validateIsAlpha = (element) => {
  return /^[A-Za-z]+$/.test(element);
};
var validateIsAlphanumeric = (element) => {
  return /^[A-Za-z0-9]+$/.test(element);
};
var validateIsNumeric = (element) => {
  return /^-?\d+(\.\d+)?$/.test(element);
};
var validateIsInt = (element) => {
  return Number.isInteger(element);
};
var validateIsFloat = (element) => {
  return isNumber(element) && !Number.isInteger(element);
};
var validateIsDecimal = (element) => {
  return validateIsFloat(element);
};
var validateIsLowerCase = (element) => {
  return isString(element) && element === element.toLowerCase();
};
var validateIsUpperCase = (element) => {
  return isString(element) && element === element.toUpperCase();
};
var validateNotNull = (element) => {
  return element !== null && element !== void 0;
};
var validateIsNull = (element) => {
  return element === null || element === void 0;
};
var validateNotEmpty = (element) => {
  return element !== "" && element !== null && element !== void 0;
};
var validateEquals = (element, value) => {
  return element === value;
};
var validateContains = (element, value) => {
  return isString(element) && element.includes(value);
};
var validateNotContains = (element, value) => {
  return isString(element) && !element.includes(value);
};
var validateIsIn = (element, value) => {
  return Array.isArray(value) && value.includes(element);
};
var validateNotIn = (element, value) => {
  return Array.isArray(value) && !value.includes(element);
};
var validateLen = (element, value) => {
  return isString(element) && element.length >= value[0] && element.length <= value[1];
};
var validateIsUUID = (element) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(element);
};
var validateIsDate = (element) => {
  return !isNaN(Date.parse(element));
};
var validateIsAfter = (element, value) => {
  return new Date(element) > new Date(value);
};
var validateIsBefore = (element, value) => {
  return new Date(element) < new Date(value);
};
var validateMin = (element, value) => {
  return isNumber(element) && element >= value;
};
var validateMax = (element, value) => {
  return isNumber(element) && element <= value;
};
var validate = (element, propertyName, validator) => {
  let errorStack = [];
  for (let [property, value] of Object.entries(validator)) {
    if (typeof value === "function") {
      try {
        value(element);
      } catch (e) {
        errorStack.push(e);
      }
    } else {
      switch (property) {
        case "is":
          if (!validateIs(element, value)) {
            errorStack.push(new Error(propertyName + " must match pattern : " + value));
          }
          break;
        case "not":
          if (!validateNot(element, value)) {
            errorStack.push(new Error(propertyName + " must not match pattern : " + value));
          }
          break;
        case "isUrl":
          if (!validateIsUrl(element)) {
            errorStack.push(new Error(propertyName + " must be url format"));
          }
          break;
        case "isEmail":
          if (!validateIsEmail(element)) {
            errorStack.push(new Error(propertyName + " must be email format"));
          }
          break;
        case "isIP":
          if (!validateIsIP(element)) {
            errorStack.push(new Error(propertyName + " must be IPv4 or IPv6 format"));
          }
          break;
        case "isIPv4":
          if (!validateIsIPv4(element)) {
            errorStack.push(new Error(propertyName + " must be IPv4 format"));
          }
          break;
        case "isIPv6":
          if (!validateIsIPv6(element)) {
            errorStack.push(new Error(propertyName + " must be IPv6 format"));
          }
          break;
        case "isAlpha":
          if (!validateIsAlpha(element)) {
            errorStack.push(new Error(propertyName + " must contains only alpha chars"));
          }
          break;
        case "isAlphanumeric":
          if (!validateIsAlphanumeric(element)) {
            errorStack.push(new Error(propertyName + " must contains only alpha and numeric chars"));
          }
          break;
        case "isNumeric":
          if (!validateIsNumeric(element)) {
            errorStack.push(new Error(propertyName + " must contains only numeric chars"));
          }
          break;
        case "isInt":
          if (!validateIsInt(element)) {
            errorStack.push(new Error(propertyName + " must be Integer"));
          }
          break;
        case "isFloat":
          if (!validateIsFloat(element)) {
            errorStack.push(new Error(propertyName + " must be Decimal"));
          }
          break;
        case "isDecimal":
          if (!validateIsDecimal(element)) {
            errorStack.push(new Error(propertyName + " must be Float"));
          }
          break;
        case "isLowerCase":
          if (!validateIsLowerCase(element)) {
            errorStack.push(new Error(propertyName + " must be in lowerCase"));
          }
          break;
        case "isUpperCase":
          if (!validateIsUpperCase(element)) {
            errorStack.push(new Error(propertyName + " must be in upperCase"));
          }
          break;
        case "notNull":
          if (!validateNotNull(element)) {
            errorStack.push(new Error(propertyName + " must be not null"));
          }
          break;
        case "isNull":
          if (!validateIsNull(element)) {
            errorStack.push(new Error(propertyName + " must be null"));
          }
          break;
        case "notEmpty":
          if (!validateNotEmpty(element)) {
            errorStack.push(new Error(propertyName + " must be not empty"));
          }
          break;
        case "equals":
          if (!validateEquals(element, value)) {
            errorStack.push(new Error(propertyName + " must be equals to " + value));
          }
          break;
        case "contains":
          if (!validateContains(element, value)) {
            errorStack.push(new Error(propertyName + " must contains " + value));
          }
          break;
        case "notContains":
          if (!validateNotContains(element, value)) {
            errorStack.push(new Error(propertyName + " must not contains " + value));
          }
          break;
        case "isIn":
          if (!validateIsIn(element, value)) {
            errorStack.push(new Error(propertyName + " must be in " + JSON.stringify(value)));
          }
          break;
        case "notIn":
          if (!validateNotIn(element, value)) {
            errorStack.push(new Error(propertyName + " must not be in " + JSON.stringify(value)));
          }
          break;
        case "len":
          if (!validateLen(element, value)) {
            errorStack.push(new Error(propertyName + " must be " + value + " chars length max"));
          }
          break;
        case "isUUID":
          if (!validateIsUUID(element)) {
            errorStack.push(new Error(propertyName + " must be UUID"));
          }
          break;
        case "isDate":
          if (!validateIsDate(element)) {
            errorStack.push(new Error(propertyName + " must be a date"));
          }
          break;
        case "isAfter":
          if (!validateIsAfter(element, value)) {
            errorStack.push(new Error(propertyName + " must be greater than " + value));
          }
          break;
        case "isBefore":
          if (!validateIsBefore(element, value)) {
            errorStack.push(new Error(propertyName + " must be lower than " + value));
          }
          break;
        case "min":
          if (!validateMin(element, value)) {
            errorStack.push(new Error(propertyName + " must be greater than " + value));
          }
          break;
        case "max":
          if (!validateMax(element, value)) {
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
    if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.createdAt || this.schema.createdAt !== false)) {
      this.schema.createdAt = {
        type: Date
      };
    }
    if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
      this.schema.updatedAt = {
        type: Date
      };
    }
    this.filename = name + ".json";
    this.logname = name + ".txt";
    this.namespace = namespace;
    this.deepSaveTiming = deepSaveTiming;
    this.deepSave = new DeepSave(this.logname, this.filename, this.name, this.namespace);
    if (!import_fs2.default.existsSync("./" + this.namespace + "/history/" + this.logname)) {
      import_fs2.default.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
    } else {
      this.deepSave.save();
    }
    if (!import_fs2.default.existsSync("./" + this.namespace + "/" + this.filename)) {
      this.data = [];
      import_fs2.default.writeFileSync("./" + this.namespace + "/" + this.filename, "[]", { flag: "a+" });
    } else {
      this.data = JSON.parse(import_fs2.default.readFileSync("./" + this.namespace + "/" + this.filename, { flag: "a+" }));
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
   * Read query to get all elements of a model.
   * @param {Object} options various filtering options
   * @returns All elements matching filtering conditions
   */
  findAll(options) {
    try {
      if (this.data.length === 0) {
        return this.data;
      }
      let result = this.data;
      if (options.where) {
        result = result.filter((element) => this.checkWhereClause(element, options));
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
      if (options.attributes) {
        return this.mapAttributes(result, options);
      }
      return result;
    } catch (e) {
      throw e;
    }
  }
  mapAttributes(result, options) {
    if (!Array.isArray(options.attributes)) {
      throw new Error("Attributes must be an array of string");
    }
    let newResult = [];
    for (let element of result) {
      let newElement = {};
      for (let attribute of options.attributes) {
        if (typeof attribute !== "string") {
          throw new Error("Attributes must be an array of string");
        }
        if (typeof element[attributes] === "undefined") {
          throw new Error("Attributes must correspond to data column name");
        }
        newElement = element[attribute];
      }
      newResult.push(newElement);
    }
    return newResult;
  }
  /**
   * Read query to get the first element of a model.
   * @param {Object} options various filtering options
   * @returns First element matching filtering conditions
   */
  findOne(options) {
    try {
      let result = null;
      if (!options.where && this.data.length > 0) {
        result = this.data[0];
      }
      result = this.data.find((element) => this.checkWhereClause(element, options));
      if (options.attributes) {
        result = this.mapAttributes([result], options);
        if (!Array.isArray(result) || result.length !== 1) {
          throw new Error("Error while trying to map attributes");
        }
        return result[0];
      }
    } catch (e) {
      throw e;
    }
  }
  /**
   * Read query to get the first element of a model by its id
   * @param {int} id id to look for
   * @returns First element with id
   */
  findByPk(id, options = {}) {
    try {
      options.where = {
        id
      };
      return this.data.findOne(options);
    } catch (e) {
      throw e;
    }
  }
  /**
   * Combo query to get the first element of a model corresponding to a condition, or create it, if it does not exist
   * @param {Object} options various filtering options
   * @returns First element matching filtering conditions
   */
  findOrCreate(options) {
    try {
      let element = this.findOne(options);
      if (element) {
        return element;
      }
      return this.create(options.defaults);
    } catch (e) {
      throw e;
    }
  }
  /**
   * Read query to count elements of a model.
   * @param {Object} options various filtering options
   * @returns All elements matching filtering conditions
   */
  count(options) {
    try {
      let result = this.findAll(options);
      if (result) {
        return result.length;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Create query to insert an element into the database
   * @param {Object} element the element to store
   * @returns the element after created
   * @throws Error may be throw if the element does not pass all schema validation conditions
   */
  create(element) {
    try {
      let errorStack = [];
      this.addDefaultValue(element);
      errorStack = errorStack.concat(this.checkFieldExist(element));
      errorStack = errorStack.concat(this.checkFormat(element));
      errorStack = errorStack.concat(this.checkAllowNull(element));
      errorStack = errorStack.concat(this.checkValidator(element));
      if (errorStack.length > 0) {
        throw new Error("Validation failed", { cause: errorStack });
      }
    } catch (e) {
      throw e;
    }
    const newElement = {
      ...element,
      id: this.currentId + 1
    };
    if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.createdAt || this.schema.createdAt !== false)) {
      newElement.createdAt = Date.now();
    }
    if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
      elementToUpdate.updatedAt = Date.now();
    }
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
  updateOne(element, options) {
    let elementToUpdate2 = this.findOne(options);
    let copy = structuredClone(elementToUpdate2);
    Object.assign(elementToUpdate2, element);
    try {
      let errorStack = [];
      errorStack = errorStack.concat(this.checkFieldExist(elementToUpdate2));
      errorStack = errorStack.concat(this.checkFormat(elementToUpdate2));
      errorStack = errorStack.concat(this.checkAllowNull(elementToUpdate2));
      errorStack = errorStack.concat(this.checkValidator(elementToUpdate2));
    } catch (e) {
      throw e;
    }
    try {
      if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
        elementToUpdate2.updatedAt = Date.now();
      }
      this.save("update", elementToUpdate2);
      return elementToUpdate2;
    } catch (e) {
      elementToUpdate2 = copy;
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
  checkWhereClause(element, options) {
    for (let [field, value] of Object.entries(options.where)) {
      if (typeof value === "object") {
        if (this.checkOperator({ type: Object.keys(value)[0], value }, element[field]) === false) {
          return false;
        }
      } else if (element[field] !== value) {
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
  checkFormat(element) {
    let errorStack = [];
    for (let [property, value] of Object.entries(element)) {
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
  checkAllowNull(element) {
    let errorStack = [];
    for (let [property, options] of Object.entries(this.schema)) {
      if (!element[property]) {
        if (property.allowNull && property.allowNull === false) {
          errorStack.push(new Error("Error : property " + property + " is required"));
        } else {
          element[property] = null;
        }
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
  checkFieldExist(element) {
    let errorStack = [];
    for (let property of Object.keys(element)) {
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
    let element = this.findOne({
      where: obj
    });
    if (element) {
      return false;
    }
    return true;
  }
  /**
   * add defaultValue on empty element before insert and update queries
   * @param {Object} element the element to check for default values
   * @private
   */
  addDefaultValue(element) {
    for (let [property, value] of Object.entries(this.schema)) {
      if (value.defaultValue && !element[property]) {
        element[property] = value.defaultValue;
        console.log(element[property]);
      }
    }
  }
  /**
   * Check element match schema validators before insert and update queries
   * @param {Object} element the element to check
   * @returns {Error[]} an array of error, if empty, the element passed all validators check
   * @private
   */
  checkValidator(element) {
    let errorStack = [];
    for (let [property, value] of Object.entries(this.schema)) {
      if (value.validate) {
        errorStack = errorStack.concat(validate(element[property], property, value.validate));
      }
    }
    return errorStack;
  }
  checkOperator(operator, value) {
    switch (operator.type) {
      case Operator_default.like:
        if (!this.checkLikeClause(value, operator.value.like)) {
          return false;
        }
        break;
      case Operator_default.ilike:
        if (!this.checkLikeClause(value, operator.value.ilike, true)) {
          return false;
        }
        break;
      case Operator_default.in:
        if (!this.checkInClause(value, operator.value.in)) {
          return false;
        }
        break;
      case Operator_default.eq:
        if (!this.checkEqClause(value, operator.value.eq)) {
          return false;
        }
        break;
      case Operator_default.ne:
        if (this.checkEqClause(value, operator.value.ne)) {
          return false;
        }
        break;
      case Operator_default.gte:
        if (!this.checkGtClause(value, operator.value.gte) && !this.checkEqClause(value, operator.value.gte)) {
          return false;
        }
        break;
      case Operator_default.gt:
        if (!this.checkGtClause(value, operator.value.gt)) {
          return false;
        }
        break;
      case Operator_default.lte:
        if (this.checkGtClause(value, operator.value.lte)) {
          return false;
        }
        break;
      case Operator_default.lt:
        if (this.checkGtClause(value, operator.value.lt) || this.checkEqClause(value, operator.value.lt)) {
          return false;
        }
        break;
      case Operator_default.notIn:
        if (this.checkInClause(value, operator.value.notIn)) {
          return false;
        }
        break;
      case Operator_default.notLike:
        if (this.checkLikeClause(value, operator.value.notLike)) {
          return false;
        }
        break;
      case Operator_default.notiLike:
        if (this.checkLikeClause(value, operator.value.notLike, true)) {
          return false;
        }
        break;
      case Operator_default.between:
        if (!this.checkBetweenClause(value, operator.value.between)) {
          return false;
        }
        break;
      case Operator_default.notBetween:
        if (this.checkBetweenClause(value, operator.value.notBetween)) {
          return false;
        }
        break;
      case Operator_default.is:
        if (!this.checkIsClause(value, operator.value.is)) {
          return false;
        }
        break;
      case Operator_default.isNot:
        if (this.checkIsClause(value, operator.value.isNot)) {
          return false;
        }
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
  checkLikeClause(field, like, insensitive = false) {
    if (typeof like !== "string") {
      throw new Error("Like operator required an string value");
    }
    let regex = new RegExp(like.replaceAll("%", ".*"), insensitive ? "i" : "");
    return regex.test(field);
  }
  /**
   * Transform in query to js includes, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {array} array the list of accepted value
   * @returns true if the value is in the array, either false
   * @private
   */
  checkInClause(field, array) {
    if (!Array.isArray(array)) {
      throw new Error("In operator required an array value");
    }
    return array.includes(field);
  }
  /**
   * Transform eq query to js strict equal or value compare if type is complex (Object,Array), and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {*} value the value to compare
   * @returns true if the value is equel, either false
   * @private
   */
  checkEqClause(field, value) {
    if (Array.isArray(field)) {
      for (let index in field) {
        if (field[index] !== value[index]) {
          return false;
        }
      }
      return true;
    }
    if (typeof field === "object") {
      for (let [property, propertyValue] of Object.entries(field)) {
        if (!value[property] || value[property] !== propertyValue) {
          return false;
        }
      }
      return true;
    }
    return field === value;
  }
  /**
   * Transform gt query to js compare, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {number} value the value to compare
   * @returns true if the value is in the array, either false
   * @private
   */
  checkGtClause(field, value) {
    if (Number.parseFloat(value) !== value) {
      throw new Error("Eq operator required a number value");
    }
    return field > value;
  }
  /**
   * Transform is query to js compare, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {boolean} value the value to compare
   * @returns true if the value is in the array, either false
   * @private
   */
  checkIsClause(field, value) {
    if (value !== true && value !== false && value !== null) {
      throw new Error("Is operator required a boolean or null value");
    }
    return field === value;
  }
  /**
   * Transform between query to js compare, and check if the corresponding element field check the constraint
   * @param {string} field the value to check on the element
   * @param {array[]} value the value to compare 
   * @returns true if the value is in the array, either false
   * @private
   */
  checkBetweenClause(field, value) {
    if (!Array.isArray(value) || value.length !== 2) {
      throw new Error("Between operator required a array with two value");
    }
    return field >= value[0] && field <= value[1];
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
