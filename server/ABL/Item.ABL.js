const Ajv = require("ajv");
const uuid = require("uuid");
const item_schema = require("../Schemas/Product.Schemas/item.schema");

const ajv = new Ajv();

const {get_response} = require("../Schemas/Response.schema")
//DAO
const itemdao = require("../DAO/item.dao");
const item_dao = new itemdao();

module.exports = 
{
    create_item: (req,res) =>
    {
        const item = req.body;

        try
        {
            if(!item.id)
                item.id = uuid.v4();

            //checking if json has corresponding schema...
            if(ajv.validate(item_schema,item))
            {
                //Calling DAO method
                let response = item_dao.create_item(item) 
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
        catch(dao_error_response)
        {
            if(dao_error_response.code)
            {
                res.status(dao_error_response.code)
                res.send(dao_error_response)
            }
            //Error out of DAO
            else
            {
                let response = get_response(500,"Unexpected error",dao_error_response.message)
                res.status(500)
                res.send(response)    
            }
        }
    },

    get_item_by_id: (req,res) =>
    {
        if(req.params.id === undefined || typeof req.params.id !== "string")
            return get_response(500,"ID is invalid",req.params.id);

        try
        {
            let response = item_dao.get_item_by_id(req.params.id);
            res.status(response.code)
            res.send(response);
        }
        catch(dao_error_response)
        {
            if(dao_error_response.code)
            {
                res.status(dao_error_response.code)
                res.send(dao_error_response)
            }
            //Error out of DAO
            else
            {
                let response = get_response(500,"Unexpected error",dao_error_response.message)
                res.status(500)
                res.send(response)    
            }
        }
    },

    update_item: (req,res) =>
    {
        const item = req.body;
        try
        {
            //checking if json has corresponding schema...
            if(ajv.validate(item_schema,item))
            {
                //Calling DAO method
                let response = item_dao.update_item(item) 
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
        catch(dao_error_response)
        {
            if(dao_error_response.code)
            {
                res.status(dao_error_response.code)
                res.send(dao_error_response)
            }
            //Error out of DAO
            else
            {
                let response = get_response(500,"Unexpected error",dao_error_response.message)
                res.status(500)
                res.send(response)    
            }
        }
    },

    delete_item: (req,res) =>
    {
        if(req.params.id === undefined || typeof req.params.id !== "string")
            return get_response(500,"ID is invalid",req.params.id);

        try
        {
            let response = item_dao.delete_item(req.params.id);
            res.status(response.code)
            res.send(response);
        }
        catch(dao_error_response)
        {
            if(dao_error_response.code)
            {
                res.status(dao_error_response.code)
                res.send(dao_error_response)
            }
            //Error out of DAO
            else
            {
                let response = get_response(500,"Unexpected error",dao_error_response.message)
                res.status(500)
                res.send(response)    
            }
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
        catch(dao_error_response)
        {
            if(dao_error_response.code)
            {
                res.status(dao_error_response.code)
                res.send(dao_error_response)
            }
            //Error out of DAO
            else
            {
                let response = get_response(500,"Unexpected error",dao_error_response.message)
                res.status(500)
                res.send(response)    
            }
        }
    }
}