import { Button_props } from "./Button.props"
import { Icon_props } from "./Icon.props"

interface Drop_down_button_props
{
    label:string,
    button_items:Array<Button_props | Drop_down_button_props>,
    icon_before?:Icon_props
}

export type{Drop_down_button_props}