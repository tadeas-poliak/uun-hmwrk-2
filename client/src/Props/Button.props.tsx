import { Icon_props } from "./Icon.props"

interface Button_props
{
    label:string,
    on_click_handler:() => any,
    type:"Edit"| "Delete" | "Default" | "Submit",
    icon_before?:Icon_props
}

export type{Button_props}