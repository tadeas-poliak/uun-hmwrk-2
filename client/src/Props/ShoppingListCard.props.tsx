import { Item_props } from "./Item.props";
import {User_props} from "./User.props";

interface Shopping_list_card_props
{
    id?:string,
    name:string,
    owner:User_props,
    member_list:Array<User_props>,
    archived_user_list:Array<User_props>,
    item_list:Array<Item_props>,
    remove_list_handler?:(shopping_list_card:Shopping_list_card_props)=>any,
    edit_list_handler?:()=>any
}

export default Shopping_list_card_props;