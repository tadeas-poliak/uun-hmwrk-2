const item_abl = require("../ABL/Item.abl")

exports.get_all = (req,res,next)=>
{
    item_abl.get_all_items(req,res)
}

exports.get_by_id = (req,res,next) =>
{
    
};

exports.create = (req,res,next) =>
{
    item_abl.create_item(req,res);
};

exports.delete = (req,res)=>
{
    
}