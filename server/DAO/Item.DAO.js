const json_db = require("simple-json-db");
const path = require("path")

const db = new json_db(path.join(__dirname,"..","..","DB","Item.json"));

//Message Schema
const {get_response} = require("../Schemas/Response.schema");

class Item_DAO
{
    get_item_by_id = (id) =>
    {            
        try
        {
            //Getting items
            let entries = db.JSON().data;
            if(entries === undefined || entries.length < 1)
                return get_response(200,"No data entries in DB exists!",entries);
            else
            {
                for(let e in entries)
                {
                    if(entries[e].id === id)
                        return get_response(200,"Data obtained!", entries[e]);        
                }
                return get_response(201,`No entry with id: ${id} exists`,{});
            }

        }
        catch(error)
        {
            throw  get_response(500,"Could not get data from DB.",error)
        }
    }

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
            throw  get_response(500,"Could not get data from DB.",error)
        }
    }

    update_item = (item) =>
    {
        try
        {
            let entries_response = this.get_all_items();
            if(entries_response.code === 200)
            {
                entries_response.data = entries_response.data.result;
                for(let e in entries_response.data)
                {
                    if(entries_response.data[e].id === item.id)
                    {
                        entries_response.data[e] = item;
                        db.set("data",entries_response.data);
                        return get_response(200,"Data updated", entries_response.data[e]);        
                    }
                }
                return get_response(200,`Item with given id: ${item.id} was not found`,item)
            }
            else
                return entries_response;
        }
        catch(error)
        {
            throw get_response(500,"Cannot update item.",error)
        }
    }

    delete_item = (id) =>
    {            
        try
        {
            let entries_response = this.get_all_items();
            if(entries_response.code === 200)
            {
                entries_response.data = entries_response.data.result
                for(let e in entries_response.data)
                {
                    if(entries_response.data[e].id === id)
                    {
                        let item = entries_response.data[e]
                        entries_response.data.splice(e,1);
                        db.set("data",entries_response.data);
                        return get_response(200,"Data deleted", item);        
                    }
                }
                return get_response(200,`Item with given id: ${id} was not found`,{})
            }
            else
                return entries_response;
        }
        catch(error)
        {
            throw get_response(500,"Cannot delete item.",error)
        }
    }

    create_item = (item) =>
    {
        try
        {
            let entries_response = this.get_all_items();
            if(entries_response.code === 200)
            {
                entries_response.data.result.push(item);
                db.set("data",entries_response.data.result);
                return get_response(200,"Item created.",item)
            }
            else
                return entries_response;
        }
        catch(error)
        {
            throw get_response(500,"Cannot create item.",error)
        }
    }
    
    
}

module.exports = Item_DAO;