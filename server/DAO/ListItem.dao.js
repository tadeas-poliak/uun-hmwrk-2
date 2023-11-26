const json_db = require("simple-json-db");
const path = require("path")

const db = new json_db(path.join(__dirname, "..", "..", "DB", "ShoppingList.json"));
const itemdao = require("./Item.dao");
const item_dao = new itemdao();

//Message Schema
const { get_response } = require("../Schemas/Response.schema");

class List_list_DAO {
    get_list_by_id = (id) => {
        try {
            //Getting lists
            let entries = db.JSON().data;
            if (entries === undefined || entries.length < 1)
                return get_response(200, "No data entries in DB exists!", entries);
            else {
                for (let e in entries) {
                    if (entries[e].id === id)
                        return get_response(200, "Data obtained!", entries[e]);
                }
                return get_response(201, `No entry with id: ${id} exists`, {});
            }

        }
        catch (error) {
            throw get_response(500, "Could not get data from DB.", error)
        }
    }

    get_all_lists = () => {
        try {
            //Getting lists
            let entries = db.JSON().data;
            if (entries === undefined || entries.length < 1)
                return get_response(200, "No data entries in DB exists!", entries);
            else
                return get_response(200, "Data obtained!", entries);

        }
        catch (error) {
            throw get_response(500, "Could not get data from DB.", error)
        }
    }

    update_list = (list) => {
        try {
            let entries_response = this.get_all_lists();
            if (entries_response.code === 200) {
                entries_response.data = entries_response.data.result;
                for (let e in entries_response.data) {
                    if (entries_response.data[e].id === list.id) {
                        entries_response.data[e] = list;
                        db.set("data", entries_response.data);
                        return get_response(200, "Data updated", entries_response.data[e]);
                    }
                }
                return get_response(200, `list with given id: ${list.id} was not found`, list)
            }
            else
                return entries_response;
        }
        catch (error) {
            throw get_response(500, "Cannot update list.", error)
        }
    }

    delete_list = (id) => {
        try {
            let entries_response = this.get_all_lists();
            if (entries_response.code === 200) {
                entries_response.data = entries_response.data.result
                for (let e in entries_response.data) {
                    if (entries_response.data[e].id === id) {
                        let list = entries_response.data[e]
                        entries_response.data.splice(e, 1);
                        db.set("data", entries_response.data);
                        return get_response(200, "Data deleted", list);
                    }
                }
                return get_response(200, `list with given id: ${id} was not found`, {})
            }
            else
                return entries_response;
        }
        catch (error) {
            throw get_response(500, "Cannot delete list.", error)
        }
    }

    create_list = (list) => {
        try {
            let entries_response = this.get_all_lists();
            console.log("creating")
            console.log(list)
            if (entries_response.code === 200) {
                entries_response.data.result.push(list);
                db.set("data", entries_response.data.result);
                return get_response(200, "List was created.", list)
            }
            else
                return entries_response;
        }
        catch (error) {
            throw get_response(500, "Cannot create list.", error)
        }
    }

    add_item = (list_id, item_id) => {
        try {
            let list_response = this.get_list_by_id(list_id);
            let item_response = item_dao.get_item_by_id(item_id);

            if (item_response.code !== 200)
                return item_response;

            if (list_response.code === 200) {
                list_response.data.result.item_id_list.push(item_response.data.result.id);
                return this.update_list(list_response.data.result);
            }
            else
                return list_response;
        }
        catch (error) {
            throw get_response(500, "Cannot add item.", error)
        }
    }

    remove_item = (list_id, item_id) => {
        try {
            let list_response = this.get_list_by_id(list_id);

            if (list_response.code === 200) {
                for (let item in list_response.data.result.item_id_list) {
                    let current_item_id = list_response.data.result.item_id_list[item];
                    //ID found
                    if (current_item_id === item_id) {
                        list_response.data.result.item_id_list.splice(item, 1);
                        return this.update_list(list_response.data.result);
                    }
                }
                return get_response(500,"Item ID was not found in list",{});
            }
            else
                return list_response;
        }

        catch (error) {
            throw get_response(500, "Cannot remove item.", error)
        }
    }

    add_member = (list_id,user_id) =>
    {
        try {
            let list_response = this.get_list_by_id(list_id);

            if (list_response.code === 200) {
                list_response.data.result.member_id_list.push(user_id);
                return this.update_list(list_response.data.result);
            }
            else
                return list_response;
        }
        catch (error) {
            throw get_response(500, "Cannot add member.", error)
        }
    }

    remove_member = (list_id,user_id) =>
    {
        try {
            let list_response = this.get_list_by_id(list_id);

            if (list_response.code === 200) {
                for (let member in list_response.data.result.member_id_list) {
                    let current_member_id = list_response.data.result.member_id_list[member];
                    //ID found
                    if (current_member_id === user_id) {
                        list_response.data.result.member_id_list.splice(member, 1);
                        return this.update_list(list_response.data.result);
                    }
                }
                return get_response(500,"Member ID was not found in list",{});
            }
            else
                return list_response;
        }

        catch (error) {
            throw get_response(500, "Cannot remove member.", error)
        }
    }


}

module.exports = List_list_DAO;