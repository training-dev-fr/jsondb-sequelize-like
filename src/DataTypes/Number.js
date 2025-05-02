/**
 * @module DataTypes
 */
const Number = {
    /**
     * Single precision floating point
     */
    FLOAT: function (precision = null, scale = null) {
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
    Double: function (precision = null, scale = null) {
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
    DECIMAL: function (precision = null, scale = null) {
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
    },
}
/**
 * Single precision unsigned floating point
 */
Number.FLOAT.UNSIGNED = function (precision = null, scale = null) {
    let base = Number.FLOAT(precision, scale);
    base.min = 0;
    return base;
}

/**
 * Single precision unsigned floating point
 */
Number.DOUBLE.UNSIGNED = function (precision = null, scale = null) {
    let base = Number.DOUBLE(precision, scale);
    base.min = 0;
    return base;
}

/**
 * Single precision unsigned floating point
 */
Number.DECIMAL.UNSIGNED = function (precision = null, scale = null) {
    let base = Number.DECIMAL(precision, scale);
    base.min = 0;
    return base;
}


export { Number };