import { Item_props } from "./Item.props"
import { List_item_input_props } from "./ListInputItem.props"

interface List_input_props
{
    placeHolder?:string,
    items:Array<List_item_input_props>
    add_item_handler?:(item:Item_props)=>any,
    remove_item_handler?:(item:Item_props)=>any,
    search_item_handler?:()=>any
}

export type{List_input_props}