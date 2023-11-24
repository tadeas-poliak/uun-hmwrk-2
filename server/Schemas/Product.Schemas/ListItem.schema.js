const item_schema = require("./Item.schema")
const user_schema = require("../User.schema")


//AJV format
module.exports = {
    type:"object",
    properties:
    {
        id:{type:"string",minLength:32,maxLength:64},
        name:{type:"string",minLength:1,maxLength:256},
        owner:user_schema.properties.id,
        member_id_list:{type:"array","items":user_schema.properties.id},
        archived_user_id_list:{type:"array","items":user_schema.properties.id},
        item_id_list:{type:"array","items":item_schema.properties.id}
    },
    required:["id","name","owner","member_id_list","archived_user_id_list","item_id_list"]
};