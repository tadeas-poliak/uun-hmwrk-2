import { ChangeEvent } from "react";

interface Text_input_props
{
    placeHolder?:string,
    value?:string,
    on_change_event:(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any,
    multiple_line?:boolean
}

export type{Text_input_props}