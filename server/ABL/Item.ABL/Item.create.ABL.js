const ajv = require("ajv");
const item_schema = require("../../Schemas/Product.Schemas/Item.schema");

const json_validator = new ajv();

module.exports = (req, res) =>
{
    let incoming_data = req.body;

    //checking if json has corresponding schema...
    if(json_validator.compile(item_schema).validate(incoming_data))
    {
        //Calling DAO method
        
    } 
};