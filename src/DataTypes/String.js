/**
 * @module DataTypes
 */
const String = {
    /**
     * String, fixed max length, better for variable length
     * @param {number} [value=255] Max length of string
     */
    STRING: function(value){
        let type = {type: "string", value: 255}
        if(value){
            type.max = value;
        }
        return type;
    },
    /**
     * Char, fixed max length, better for fix length
     * @param {number} [value=255] Max length of string
     */
    CHAR: function(value){
        let type = {type: "string", value: 255}
        if(value){
            type.max = value;
        }
        return type;
    },
    /**
     * Text, variable length
     */
    TEXT: function(){
        return {
            type: "string"
        }
    },
}

export {String};