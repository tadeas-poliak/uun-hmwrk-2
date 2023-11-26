const item_abl = require("../ABL/Item.abl")

exports.get_all = (req,res,next)=>
{
    item_abl.get_all_items(req,res)
}

exports.get_by_id = (req,res,next) =>
{
    item_abl.get_item_by_id(req,res)
};

exports.create = (req,res,next) =>
{
    item_abl.create_item(req,res);
};

exports.delete = (req,res)=>
{
    item_abl.delete_item(req,res);
}

exports.update = (req,res) =>
{
    item_abl.update_item(req,res);
}