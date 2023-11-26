
interface Shopping_list_props
{
    id:string,
    name:string,
    owner:string,
    member_id_list:Array<string>,
    archived_user_id_list:Array<string>,
    item_id_list:Array<string>
}

export type {Shopping_list_props}