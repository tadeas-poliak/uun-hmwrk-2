const ajv = require("ajv");
const uuid = require("uuid");
const item_schema = require("../Schemas/Product.Schemas/Item.schema");

const json_validator = new ajv();

const response = require("../Schemas/Response.schema")
//DAO
const itemdao = require("../DAO/Item.DAO");
const item_dao = new itemdao();

module.exports = 
{
    create_item: (Item) =>
    {
        let incoming_data = Item;
        incoming_data.id = uuid.v4();

        //checking if json has corresponding schema...
        if(json_validator.compile(item_schema).validate(incoming_data))
        {
            //Calling DAO method
            return item_dao.create_item(incoming_data);
        }
        response.description= "Item did not have corrent JSON schema."
        response.response_code = 501
        return response;
    },
    get_all_items: () =>
    {
        return item_dao.get_all_items();
    }
}