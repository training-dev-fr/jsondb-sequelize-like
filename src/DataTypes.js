const DataTypes = {
    STRING: function(value){
        let type = {type: "string"}
        if(value){
            type.max = value;
        }
        return type;
    },
    NUMBER: function(){
        return {
            type: "number"
        }
    }
}

export default DataTypes;