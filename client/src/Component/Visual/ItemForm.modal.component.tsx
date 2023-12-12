import { ChangeEvent, useEffect, useState } from "react";

//Import components
import TextInputComponent from "./TextInput.component";


import { useTranslation } from "react-i18next";

import { Item_form_modal_props } from "../../Props/ItemFormModal.props";
import { Item_props } from "../../Props/Item.props";
import ButtonComponent from "./Button.component";

interface Item_form_modal_type extends Item_form_modal_props { submit_form_handler: (item: Item_props) => void }
const Item_form_modal_component = ({ is_open, item, show_modal_handler, submit_form_handler }: Item_form_modal_type) => {

    const [form_item, set_form_item] = useState<Item_props>(item ? item : { name: "" });
    const [is_modal_open, set_is_modal_open] = useState(is_open);

    const { t } = useTranslation();

    useEffect(() => {
        set_is_modal_open(is_open);
        if (item)
            set_form_item(item);
    }, [item, is_open]);


    const name_input_handler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let current_item: Item_props = JSON.parse(JSON.stringify(form_item));
        current_item.name = e.currentTarget.value;
        set_form_item(current_item)
    }

    return (
        <>
            {(is_modal_open === true) ?
                <>
                    <div className="fixed top-0 left-0 w-[100%] h-[100%]">
                        <button className="fixed top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-80 z-[-2]"
                            onClick={() => show_modal_handler(false)}></button>
                        <div className="flex justify-center mt-[200px] relative bg-dark-red p-4 rounded m-2">
                            <div className="absolute right-2 top-2">
                                <ButtonComponent on_click_handler={()=>show_modal_handler(false)} label={t("form.close")} type="Delete"></ButtonComponent>
                            </div>
                            <div className="grid grid-cols-1 mt-10">
                                <div>
                                    <p>{t("form.name")}:</p>
                                    <TextInputComponent on_change_event={name_input_handler}></TextInputComponent>
                                </div>
                                <div className="p-4  flex justify-center">
                                    <ButtonComponent on_click_handler={() => submit_form_handler(form_item)} label={t("button.submit")} type="Submit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : null
            }
        </>
    );
};

export default Item_form_modal_component;