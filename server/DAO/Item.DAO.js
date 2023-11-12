const json_db = require("simple-json-db");
const uuid = require("uuid");
const db = new json_db("../../DB/Item.json");

//Message Schema
const response = require("../Schemas/Response.schema");

class Item_DAO
{
    get_all_items = () =>
    {
        try
        {
            //Filling response
            response.description = "Items read successfuly!";
            response.response_code = 200;

            //Getting items
            let entries = db.JSON().data;
            response.data = entries;
            if(entries === undefined || entries.length < 1)
            {
                response.response_code = 204;
                response.description = "No data entries in DB exists!";
            }
                

            return response;
        }
        catch(error)
        {
            response.data = error;
            response.description = "Cannot get items";
            response.response_code = 500;
            return response
        }
    }

    create_item = (Item) =>
    {
        try
        {
            //Filling response
            response.description = "Item created successfuly!";
            response.response_code = 200;

            //creating item
            if(this.is_id_in_db(Item.id) === false)
            {
                let entries = this.get_all_items();
                if(entries.response_code === 200)
                {
                    entries.data.push(Item);
                    db.set("data",entries.data);
                }
            }
            else
                response.description = "Item already exists in DB!";

            return response;
        }
        catch(error)
        {
            response.data = error;
            response.description = "Cannot create item";
            response.response_code = 500;
            return response
        }
    }
    is_id_in_db = (id) =>
    {
        let items = this.get_all_items();
        response.data = false;
        if(items.response_code === 200)
        {
            for(let i in items.data)
            {
                if(items.data[i].id === id)
                {
                    response.data = true;
                    return response;
                }
                    
            }
            return response;
        }
    }
    
}

module.exports = Item_DAO;