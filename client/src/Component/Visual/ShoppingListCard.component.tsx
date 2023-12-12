import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Shopping_list_card_props from "../../Props/ShoppingListCard.props";

import Button from "./Button.component";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Shopping_list_props } from "../../Props/ShoppingList.props";

const Shopping_list_card_component = (shopping_list_card:Shopping_list_card_props) =>
{
    const [shopping_list,set_shopping_list] = useState<Shopping_list_card_props>(shopping_list_card);

    const navigate = useNavigate();
    //Translation 
    const {t} = useTranslation();
    useEffect(()=>
    {
        set_shopping_list(shopping_list_card);
    },[shopping_list_card])

   

    return (
        <div className="dark:bg-paper-darker-yellow dark:text-white bg-paper-yellow grid grid-cols-1 rounded p-2 shadow-lg">
            <div className="flex justify-center">
                <h3 className="font-bold">{shopping_list.name}</h3>
            </div>
            <div className="flex justify-center pb-5">
                <ul className="list-inside list-disc">
                    {shopping_list.item_list.slice(0,4).map((item) => {
                        return(
                            <li className="pt-2">{item.name}</li>
                        )
                    }) }
                    {(shopping_list.item_list.length > 4)?<li className="pt-2 tracking-wider font-bold">. . .</li>:<></>}
                </ul>
            </div>
            <div className="flex justify-evenly pt-2 border-t-2 border-black">
                <Button label={t("button.edit")} on_click_handler={()=> { navigate("/shoppingList/update/"+shopping_list.id,{state:{id:shopping_list.id}}) } } type="Edit"></Button>
                <Button label={t("button.delete")}  on_click_handler={()=>(shopping_list.remove_list_handler)?shopping_list.remove_list_handler(shopping_list):null } type="Delete"></Button>
            </div>
        </div>
    )
}

export default Shopping_list_card_component