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
import { Item_form_modal_props } from "../../Props/ItemFormModal.props";
import ItemFormModalComponent from "../Visual/ItemForm.modal.component";
import { toast } from "react-toastify";



const Item_form_modal_data_component = ({is_open,show_modal_handler,item}: Item_form_modal_props) => {
    const [loading_status, set_loading_status] = useState<Loading_status_type>("Loaded");
    const [form_item, set_form_item] = useState<Item_props>((item)?item:{name:""});
    const [is_modal_open, set_is_modal_open] = useState(is_open);

    useEffect(() => {
        set_is_modal_open(is_open);
        if (item)
            set_form_item(item);
    }, [item,is_open]);

    const submit_form_handler = (item:Item_props)=>
    {
        set_loading_status("Loading")
        const get_list_data = async () => {

            try {
                //creating item
                const items_data = await (
                    await fetch(`/item/create`,
                     {       "method": "POST",
                     headers: {
                         "Content-Type": "application/json",
                     },
                     body: JSON.stringify(item)
                    })
                ).json();
                console.log(items_data)
                if (items_data.code === 200) {
                    toast.success("Item Created", {
                        position: "top-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                    set_loading_status("Loaded")
                }
                else
                {
                    set_loading_status("Error")
                }
            }
            catch (error) {
                set_loading_status("Error");
            }
        };
        get_list_data();
    };

    return(
        (is_modal_open)?
        <div className="fixed bg-black bg-opacity-5 top-0 left-0 w-[100%] h-[100%]">
            {
                (loading_status === "Loading")?
                <LoadingComponent></LoadingComponent>:(loading_status === "Loaded")?
                <ItemFormModalComponent is_open={is_open} show_modal_handler={show_modal_handler} submit_form_handler={submit_form_handler} item={item}></ItemFormModalComponent>
                :<ErrorComponent message="Something went wrong when creating item. Please try again later"></ErrorComponent>
            }
        </div>
        :null
    );
};

export default Item_form_modal_data_component;