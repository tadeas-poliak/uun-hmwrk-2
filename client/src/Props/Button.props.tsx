interface Button_props
{
    label:string,
    on_click_handler:() => any,
    type:"Edit"| "Delete" | "Default"
}

export type{Button_props}