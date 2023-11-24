const json_db = require("simple-json-db");
const path = require("path")

const db = new json_db(path.join(__dirname,"..","..","DB","Item.json"));

//Message Schema
const {get_response} = require("../Schemas/Response.schema");

class Item_DAO
{
    get_all_items = () =>
    {
        try
        {
            //Getting items
            let entries = db.JSON().data;
            if(entries === undefined || entries.length < 1)
                return get_response(200,"No data entries in DB exists!",entries);
            else
                return get_response(200,"Data obtained!", entries);

        }
        catch(error)
        {
            throw  get_response(500,"Could not get data from DB.",{})
        }
    }

    create_item = (Item) =>
    {
        try
        {
            let entries_response = this.get_all_items();
            if(entries_response.code === 200)
            {
                entries_response.data.result.push(Item);
                db.set("data",entries_response.data.result);
                return get_response(200,"Item created.",Item)
            }
            else
                return entries_response;
        }
        catch(error)
        {
            if(error)
                Item = error;
            throw get_response(500,"Cannot create item.",Item)
        }
    }
    
    
}

module.exports = Item_DAO;