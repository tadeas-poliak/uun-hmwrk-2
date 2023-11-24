const Ajv = require("ajv");
const uuid = require("uuid");
const item_schema = require("../Schemas/Product.Schemas/Item.schema");

const ajv = new Ajv();

const {get_response} = require("../Schemas/Response.schema")
//DAO
const itemdao = require("../DAO/Item.dao");
const item_dao = new itemdao();

module.exports = 
{
    create_item: (req,res) =>
    {
        const Item = req.body;

        try
        {
            if(!Item.id)
                Item.id = uuid.v4();
            //checking if json has corresponding schema...
            if(ajv.validate(item_schema,Item))
            {
                //Calling DAO method
                let response = item_dao.create_item(Item) 
                res.status(response.code)
                res.send(response);
            }
            else
            {
                let response = get_response(500,"Schema of item is not valid",{});
                res.status(response.code);
                res.send(response)
            }
        }
        catch(error)
        {
            if(error.code)
                res.status(error.code)
            res.send(error)
        }
    },
    get_all_items: (req,res) =>
    {
        try
        {
            let response = item_dao.get_all_items();
            res.status(response.code);
            res.send(response);
        }
        catch(error)
        {
            if(error.code)
                res.status(error.code);
            res.send(error);
        }
    }
}