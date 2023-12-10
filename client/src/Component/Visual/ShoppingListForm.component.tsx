import { ChangeEvent, useEffect, useState } from "react";
//Props
import { Shopping_list_props } from "../../Props/ShoppingList.props";

//Import components
import TextInputComponent from "./TextInput.component";
import ListInputComponent from "./ListInput.component";

import { useTranslation } from "react-i18next";
import Shopping_list_card_props from "../../Props/ShoppingListCard.props";
import { List_item_input_props } from "../../Props/ListInputItem.props";
import { Item_props } from "../../Props/Item.props";
import ButtonComponent from "./Button.component";
import { Shopping_list_form_props } from "../../Props/ShoppingListForm.props";

const Shopping_list_form_component = ({shopping_list, all_items,submit_form_handler}:{shopping_list:Shopping_list_card_props,all_items:Array<Item_props>,submit_form_handler:(shopping_list_form:Shopping_list_card_props)=>void}) =>
{
    const [form_shopping_list, set_form_shopping_list] = useState<Shopping_list_card_props>(shopping_list);

    const [list_items,set_list_items] = useState<Array<List_item_input_props>>([]);


    const set_all_list_items = ()=>
    {
        //Adding items to list
        let items:Array<List_item_input_props> = [];

        for(let i in form_shopping_list.item_list)
            items.push({
                name:form_shopping_list.item_list[i].name,
                is_addable:false,
                is_removable:true,
                id:form_shopping_list.item_list[i].id})  


        for(let i in all_items)  
        {
            let was_found = false;
            for(let k in form_shopping_list.item_list)
            {
                if(form_shopping_list.item_list[k].id === all_items[i].id)
                    was_found = true;
            }
            if(!was_found)
                items.push({
                    name:all_items[i].name,
                    is_addable:true,
                    is_removable:false,
                    id:all_items[i].id})            
        }


        set_list_items(items);
    }

    useEffect(()=>
    {
        set_all_list_items();
    },[shopping_list, all_items]);
    
    //Translation
    const {t} = useTranslation();


    const add_item_handler = (item:Item_props)=>
    {
        form_shopping_list.item_list.push(item);
        set_form_shopping_list(form_shopping_list);
        set_all_list_items();
    }

    const remove_item_handler = (item:Item_props) =>
    {
      
        for(let i = 0; i<form_shopping_list.item_list.length;i++)
        {
            if(form_shopping_list.item_list[i].id === item.id)
            {
                form_shopping_list.item_list.splice(i,1);
            }
        }
        
        set_form_shopping_list(form_shopping_list);
        set_all_list_items();
    }


    const name_input_handler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        let current_list:Shopping_list_card_props = JSON.parse(JSON.stringify(form_shopping_list));
        current_list.name = e.currentTarget.value;
        set_form_shopping_list(current_list)
    }

    return (
        <div className="flex justify-center text-white  bg-body-darker-red lg:w-[75%] m-auto mt-0 mb-0 shadow-lg rounded-b-lg">
            <div className="grid grid-cols-1">
                <div className="p-4 flex justify-center">
                        <p className="font-bold p-4 drop-shadow-xl">{t("form.name")} :</p>
                        <TextInputComponent value={form_shopping_list?.name} on_change_event={name_input_handler}></TextInputComponent>
                    
                </div>
                <div className="lg:flex justify-center sm:grid grid-cols-1">
                    <p className="font-bold p-4 drop-shadow-xl">{t("form.items")} :</p>
                    <div className="lg:p-4 sm:p-1 dark:bg-gray-900 dark:text-white bg-paper-darker-yellow text-black rounded-md">
                        <ListInputComponent items={list_items} remove_item_handler={remove_item_handler} add_item_handler={add_item_handler} />
                    </div>
                </div>

                <div className="p-4  flex justify-center">
                    <ButtonComponent label={t("button.submit")} on_click_handler={()=>{submit_form_handler(form_shopping_list)}} type="Submit"/>
                </div>
                
            </div>
        </div>
    );
    
};

export default Shopping_list_form_component;