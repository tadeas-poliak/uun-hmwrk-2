const json_db = require("simple-json-db");
const path = require("path")

const db = new json_db(path.join(__dirname,"..","..","DB","ShoppingList.json"));

//Message Schema
const {get_response} = require("../Schemas/Response.schema");

class List_item_DAO
{
    get_all_lists = () =>
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

    create_list = (list) =>
    {
        try
        {
            let entries_response = this.get_all_lists();
            console.log("creating")
            console.log(list)
            if(entries_response.code === 200)
            {
                entries_response.data.result.push(list);
                db.set("data",entries_response.data.result);
                return get_response(200,"List was created.",list)
            }
            else
                return entries_response;
        }
        catch(error)
        {
            if(error)
                list = error;
            throw get_response(500,"Cannot create list.",list)
        }
    }
    
    
}

module.exports = List_item_DAO;