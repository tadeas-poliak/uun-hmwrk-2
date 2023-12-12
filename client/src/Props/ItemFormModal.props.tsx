import { Item_props } from "./Item.props";
import { Modal_props } from "./Modal.props";

interface Item_form_modal_props extends Modal_props
{
    item?:Item_props
}

export type {Item_form_modal_props}