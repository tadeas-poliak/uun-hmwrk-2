const Ajv = require("ajv");
const uuid = require("uuid");
const list_item_schema = require("../Schemas/Product.Schemas/ListItem.schema");

const ajv = new Ajv();

const {get_response} = require("../Schemas/Response.schema")
//DAO
const listitemdao = require("../DAO/ListItem.dao");
const list_item_dao = new listitemdao();

module.exports = 
{
    create_list: (req,res) =>
    {
        const item_list = req.body;
        console.log(req.body)
        try
        {
            if(!item_list.id)
                item_list.id = uuid.v4();

            if(!item_list.member_id_list)
                item_list.member_id_list = [];

            if(!item_list.archived_user_id_list)
                item_list.archived_user_id_list = []

            if(!item_list.item_id_list)
                item_list.item_id_list = []
            
            console.log(ajv.validate(list_item_schema,item_list))
            console.log(item_list)
            //checking if json has corresponding schema...
            if(ajv.validate(list_item_schema,item_list) === true)
            {
                //Calling DAO method
                let response = list_item_dao.create_list(item_list);
                res.status(response.code);
                res.send(response);
            }
            else
            {
                console.log("hello")
                let response = get_response(500,"Schema of List is not valid",{});
                res.status(response.code);
                console.log(response)
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
    get_all_list_items: (req,res) =>
    {
        try
        {
            let response = list_item_dao.get_all_lists();
            res.status(response.code);
            res.send(response);
        }
        catch(error)
        {
            if(error.code)
                res.status(error.code)
            res.send(error)
        }
    },
    get_list_item_by_user: (req,res) =>
    {

    }
}