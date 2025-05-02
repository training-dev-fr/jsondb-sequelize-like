/**
 * @module DataTypes
 */
const Date = {
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
            return new Date()
        }
    }
}

export { Date };