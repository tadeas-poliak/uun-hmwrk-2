const Ajv = require("ajv");
const uuid = require("uuid");

const list_schema = require("../Schemas/Product.Schemas/ListItem.schema");
const item_schema = require("../Schemas/Product.Schemas/Item.schema");
const user_schema = require("../Schemas/User.schema");

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

            //Setting user
            //if(!req.user)
                //return res.send(get_response(400,"User is not authenticated",{}))

            item_list.owner = "";//(req.user.id)?req.user.id:"";
            //checking if json has corresponding schema...
            if(ajv.validate(list_schema,item_list) === true)
            {
                //Calling DAO method
                let response = list_item_dao.create_list(item_list);
                res.status(response.code);
                res.send(response);
            }
            else
            {
                let response = get_response(500,"Schema of List is not valid",{});
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
    get_list_item_by_id: (req,res) =>
    {
        if(req.params.id === undefined || typeof req.params.id !== "string")
            res.send(get_response(500,"ID is invalid",req.params.id));

        
        try
        {
            let response = list_item_dao.get_list_by_id(req.params.id);
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

    update_list: (req,res) =>
    {
        const list = req.body;

        try
        {
            //checking if json has corresponding schema...
            if(ajv.validate(list_schema,list))
            {
                //Calling DAO method
                let response = list_item_dao.update_list(list) 
                res.status(response.code)
                res.send(response);
            }
            else
            {
                let response = get_response(500,"Schema of list is not valid",{});
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

    delete_list: (req,res) =>
    {
        if(req.params.id === undefined || typeof req.params.id !== "string")
            res.send(get_response(500,"ID is invalid",req.params.id));

        try
        {
            let response = list_item_dao.delete_list(req.params.id);
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

    get_all_list_items: (req,res) =>
    {
        try
        {
            let response = list_item_dao.get_all_lists();
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
    },

    add_item: (req,res) =>
    {
    
        if(!ajv.validate(item_schema.properties.id,req.params.item_id))
        {
            res.status(500)
            res.send(get_response(500,"Item ID is invalid",req.params.item_id));
        }
        
        if(!ajv.validate(list_schema.properties.id,req.params.list_id))
        {
            res.status(500)
            res.send(get_response(500,"List ID is invalid",req.params.list_id));
        }

        try
        {
            let response = list_item_dao.add_item(req.params.list_id,req.params.item_id);
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

    remove_item: (req,res) =>
    {
        if(!ajv.validate(item_schema.properties.id,req.params.item_id))
        {
            res.status(500)
            res.send(get_response(500,"Item ID is invalid",req.params.item_id));
        }
        
        if(!ajv.validate(list_schema.properties.id,req.params.list_id))
        {
            res.status(500)
            res.send(get_response(500,"List ID is invalid",req.params.list_id));
        }

        try
        {
            let response = list_item_dao.remove_item(req.params.list_id,req.params.item_id);
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

    is_logged_user_owner : (res,req,owner) =>
    {
        //Getting logged user
        let user = req.user;
        if(user)
        {
            return get_response(200,"User is owner", (user.id === owner)?true:false);
        }
        return get_response(500,"User is not logged in", {});
        
    },

    add_member: (req,res) =>
    {
        if(!ajv.validate(user_schema.properties.id, req.params.user_id))
        {
            res.status(500);
            res.send(get_response(500,"User ID is invalid",req.params.user_id));
        }
    
        if(!ajv.validate(list_schema.properties.id, req.params.list_id))
        {
            res.status(500);
            res.send(get_response(500,"List ID is invalid",req.params.list_id));
        }
   
        try
        {
            //User can NOT be member and owner
            let list_response = list_item_dao.get_list_by_id(req.params.list_id);
            if(list_response.code === 200)
            {
                if(list_response.data.result.owner !== req.params.user_id)
                {
                    let response = list_item_dao.add_member(req.params.list_id, req.params.user_id);
                    res.status(response.code)
                    res.send(response);
                }
                else res.send(get_response(500,"Given user ID cannot be same as owner",req.params.user_id));
            }
            else res.send(list_response);
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

    remove_member: (req,res) =>
    {
        if(!ajv.validate(user_schema.properties.id, req.params.user_id))
        {
            res.status(500);
            res.send(get_response(500,"User ID is invalid",req.params.user_id));
        }
    
        if(!ajv.validate(list_schema.properties.id, req.params.list_id))
        {
            res.status(500);
            res.send(get_response(500,"List ID is invalid",req.params.list_id));
        }

        try
        {
            let response = list_item_dao.remove_member(req.params.list_id,req.params.user_id);
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

    get_list_item_by_user: (req,res) =>
    {

    }
}