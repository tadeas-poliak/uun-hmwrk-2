import { useEffect, useState } from "react";

//Props
import { Shopping_list_form_props } from "../../Props/ShoppingListForm.props";
import Loading_status_type from "../../Props/LoadingStatus.type";

//Components
import LoadingComponent from "../Visual/Loading.component";
import ErrorComponent from "../Visual/Error.component";
import ShoppingListFormComponent from "../Visual/ShoppingListForm.component";
import Shopping_list_card_props from "../../Props/ShoppingListCard.props";
import { Item_props } from "../../Props/Item.props";
import { Shopping_list_props } from "../../Props/ShoppingList.props";

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



const Shopping_list_form_data_component = (shopping_list_form: Shopping_list_form_props) => {
    const [loading_status, set_loading_status] = useState<Loading_status_type>("Loaded");
    const [shopping_list, set_shopping_list] = useState<Shopping_list_card_props>({ item_list: [], archived_user_list: [], member_list: [], name: "", owner: { id: "", name: "" } });
    const [all_items, set_all_items] = useState<Array<Item_props>>([]);

    const navigate = useNavigate();


    const fetch_data = () => {
        //Fetching data
        const get_list_data = async () => {

            //Editing list
            try {
                if (shopping_list_form.mode === "Edit") {
                    set_loading_status("Loading");

                    const data = (
                        await fetch("/api/shoppingList/get/" + shopping_list_form.shopping_list_id, { "method": "GET" })
                    );
                    let result = await data.json();
                    if (result) {
                        if (result.code !== 500) {

                            let shopping_list = result.data.result;

                            let shopping_list_card: Shopping_list_card_props = {
                                id: shopping_list.id,
                                name: shopping_list.name,
                                member_list: shopping_list.member_id_list,
                                owner: shopping_list.owner,
                                archived_user_list: shopping_list.archived_user_id_list,
                                item_list: []
                            };
                            //Getting items
                            for (let item_id in shopping_list.item_id_list) {
                                const item_data = await (
                                    await fetch(`/api/item/get/${shopping_list.item_id_list[item_id]}`, { "method": "GET" })
                                ).json();
                                if (item_data.code === 200) {
                                    shopping_list_card.item_list.push(item_data.data.result)
                                }
                            }
                            set_shopping_list(shopping_list_card);

                            set_loading_status("Loaded");
                        }
                        //Status 500
                        else {
                            set_loading_status("Error");
                            return;
                        }
                    }
                    //Status 500
                    else {

                        set_loading_status("Error");
                        return;
                    }
                }

                //Getting All Items...
                const items_data = await (
                    await fetch(`/api/item/getAll`, { "method": "GET" })
                ).json();
                console.log(items_data)
                if (items_data.code === 200) {
                    set_all_items(items_data.data.result);
                    set_loading_status("Loaded")
                }
            }
            catch (error) {
                set_loading_status("Error");
            }
        };
        get_list_data();
    }
    useEffect(() => {

        fetch_data();
    }, [shopping_list_form]);

    const submit_form_handler = async (new_shopping_list_form: Shopping_list_card_props) => {
        //Preparing shopping list to be send


        set_loading_status("Loading");
        try {
            let new_shopping_list: Shopping_list_props =
            {
                id: new_shopping_list_form.id,
                name: new_shopping_list_form.name,
                owner: (new_shopping_list_form.owner.id) ? new_shopping_list_form.owner.id : "",
                item_id_list: [],
                archived_user_id_list: [],
                member_id_list: []
            }
            for (let i in new_shopping_list_form.item_list)
                if (new_shopping_list_form.item_list[i].id)
                    new_shopping_list.item_id_list.push(new_shopping_list_form.item_list[i].id!);

            for (let i in new_shopping_list_form.archived_user_list)
                if (new_shopping_list_form.archived_user_list[i].id)
                    new_shopping_list.archived_user_id_list.push(new_shopping_list_form.archived_user_list[i].id!);

            for (let i in new_shopping_list_form.member_list)
                if (new_shopping_list_form.member_list[i].id)
                    new_shopping_list.member_id_list.push(new_shopping_list_form.member_list[i].id!);

            if (shopping_list_form.mode === "Edit") {
                const update_shopping_list = await (
                    await fetch("/api/shoppingList/update",
                        {
                            "method": "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(new_shopping_list)
                        })
                ).json();

                if (update_shopping_list.code === 200) {
                    set_loading_status("Loaded");
                    toast.success("Shopping List Updated", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                }
                else {
                    toast.error("Shopping List was not updated!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",

                    });
                }
            }
            else if (shopping_list_form.mode === "Create") {
                const create_shopping_list = await (
                    await fetch("/api/shoppingList/create",
                        {
                            "method": "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(new_shopping_list)
                        })
                ).json();

                if (create_shopping_list.code === 200) {
                    set_loading_status("Loaded");
                    toast("Shopping List Created", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                else {
                    toast.error("Shopping List was not created!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    set_loading_status("Error");
                }
            }
        }
        catch (error) {
            console.log(error)
            set_loading_status("Error");
        }
    }

    return (
        <>
            {
                (loading_status === "Loading") ? <LoadingComponent></LoadingComponent> :
                    ((loading_status === "Loaded") ? <ShoppingListFormComponent all_items={all_items} shopping_list={shopping_list!} submit_form_handler={submit_form_handler} refetch_data={fetch_data}></ShoppingListFormComponent>
                        : <ErrorComponent message="Something went wrong when managing shopping list"></ErrorComponent>)
            }
        </>
    );

};

export default Shopping_list_form_data_component;