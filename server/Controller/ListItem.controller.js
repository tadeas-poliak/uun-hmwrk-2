const list_item_abl = require("../ABL/ListItem.abl")

exports.get_all = (req,res,next)=>
{
    list_item_abl.get_all_list_items(req,res)
}

exports.get_by_id = (req,res,next) =>
{
    list_item_abl.get_list_item_by_id(req,res)
};

exports.create = (req,res,next) =>
{
    list_item_abl.create_list(req,res);
};

exports.delete = (req,res)=>
{
    list_item_abl.delete_list(req,res);
}

exports.update = (req,res) =>
{

    list_item_abl.update_list(req,res);
}

exports.add_item = (req,res) =>
{
    list_item_abl.add_item(req,res);
}

exports.remove_item = (req,res) =>
{
    list_item_abl.remove_item(req,res);
}

exports.add_member = (req,res) =>
{
    list_item_abl.add_member(req,res);
}

exports.remove_member = (req,res) =>
{
    list_item_abl.remove_member(req,res);
}