/**
 * @module DataTypes
 */
const Integer = {
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
            max: 255,
        }
    },
    /**
     * Small integer
     * @min -32768
     * @max 32767
     */
    SMALLINT: function () {
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
        }
    },
    /**
     * Medium integer
     * @min -8388608
     * @max 8388607
     */
    MEDIUMINT: function () {
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
        }
    },
    /**
     * Integer
     * @min -2147483648
     * @max 2147483647
     */
    INTEGER: function () {
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
        }
    },
    /**
     * Big integer
     * @min -2^63
     * @max -2^63-1
     */
    BIGINT: function () {
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
        }
    }
}

export { Integer };