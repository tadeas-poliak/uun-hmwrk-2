import { Item_props } from "./Item.props" 
interface List_item_input_props extends Item_props  {
    is_addable:boolean,
    is_removable:boolean
}

export type {List_item_input_props}