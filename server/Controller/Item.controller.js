const item_abl = require("../ABL/Item.ABL")

exports.get_all = (req,res,next)=>
{
    res.send(item_abl.get_all_items());
}

exports.get_by_id = (req,res,next) =>
{
    if(req.paramas.id)
    {
        let items = item_abl.get_all_items();
        for(let i in items.data)
        {
            if(items[i].id === req.paramas.id)
            {
                items.data = items[i];
                return items;
            }
        }
    }
    
};

exports.add = (req,res)=>
{
    
}

exports.delete = (req,res)=>
{
    
}