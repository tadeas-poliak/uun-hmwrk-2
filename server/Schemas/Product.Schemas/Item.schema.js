module.exports =
{
    id: String, //generated unique code,
    name: String, // item name - mandatory; length is limited to 1-255 characters
    listItemIdList: Array, // array of item list ids where the item is listed in
    "system_variables": { 
        "creared_on": String, // creation timestamp 
        "modified_on": String, // creation timestamp
        "rev": 0 //revision number 
      },
};