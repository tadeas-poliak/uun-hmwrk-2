import { useTranslation } from "react-i18next"
import { ChangeEvent, useEffect, useState } from "react";

import { List_input_props } from "../../Props/ListInput.props"
import { List_item_input_props } from "../../Props/ListInputItem.props";

import ButtonComponent from "./Button.component";
import TextInputComponent from "./TextInput.component";

const List_input_component = (list_input: List_input_props) => {

    const [items, set_items] = useState<Array<List_item_input_props>>(list_input.items);
    const [searched_string,set_searched_string] = useState("");

    const search_for_item_handler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        set_searched_string(e.currentTarget.value);
        filter_by_searched_string(e.currentTarget.value);
    };
    const filter_by_searched_string = (str:string) =>
    {
        set_items(list_input.items.filter((item) => {
            if (item.name.toLowerCase().includes(str.toLowerCase()))
                return item;
        }))
    };

    useEffect(() => {
        set_items(list_input.items);
        filter_by_searched_string(searched_string);
    }, [list_input])

    const { t } = useTranslation();


    return (
        <div>
            <div className="">
                <TextInputComponent on_change_event={(e) => { search_for_item_handler(e) }} placeHolder={t("input.list.search_for_component")} />
            </div>
            <div className="max-h-[350px] min-h-[150px] lg:w-[650px] overflow-y-scroll">
                <table className="p-4 mt-4 w-[100%] border-spacing-4 border-collapse">
                    <tr>
                        <th className="border-b-2 border-black">
                            {t("input.list.heading_1")}
                        </th>
                        <th className="border-b-2 border-black" colSpan={2}>
                            {t("input.list.heading_2")}
                        </th>
                    </tr>
                    {
                        (items.length > 0) ?
                            items.map((item) => {
                                return (

                                    <tr className="p-2   border-black">
                                        <td className="p-2">
                                            {item.name}
                                        </td>
                                        {
                                            (item.is_addable === true || item.is_addable === undefined) ?
                                                <td className="p-1">
                                                    <div className="lg:w-[75%]  flex justify-center">
                                                        <ButtonComponent label={t("button.add")} on_click_handler={() => { if (list_input.add_item_handler) list_input.add_item_handler(item) }} type="Submit"></ButtonComponent>
                                                    </div>
                                                </td> :
                                                <td className="">
                                                    <p className="font-bold text-center">{t("input.list.cant_add")}</p>
                                                </td>
                                        }
                                        {
                                            (item.is_removable === true || item.is_removable === undefined) ?
                                                <td className="">
                                                    <div className="lg:w-[75%] flex justify-center">
                                                        <ButtonComponent label={t("button.delete")} on_click_handler={() => { if (list_input.remove_item_handler) list_input.remove_item_handler(item) }} type="Delete" icon_before={undefined}></ButtonComponent>
                                                    </div>
                                                </td> :  
                                                <td className="">
                                                    <p className="font-bold text-center">{t("input.list.cant_remove")}</p>
                                                </td>
                                        }
                                    </tr>
                                );
                            }) : <tr><td colSpan={3} className="text-lg text-center" >{t("input.list.no_item")}</td></tr>
                    }
                </table>
            </div>
        </div >
    )
}

export default List_input_component