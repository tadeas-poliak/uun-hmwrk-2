import { useLocation } from "react-router-dom";


//Importing components
import Header from "../Component/Visual/Header.component"
import ShoppingListFormDataComponent from "../Component/Data/ShoppingListForm.datacomponent";

const Shopping_list_manager_page = () =>
{
    //URL parameters
    const {state} = useLocation();
    

    return (
        <>
            <Header></Header>
            <div className="bg-body-red">
                {
                    (state)?<ShoppingListFormDataComponent mode="Edit" shopping_list_id={state.id}/>:
                    <ShoppingListFormDataComponent mode="Create" />
                }
                
            </div>
        </>
    )
}

export default Shopping_list_manager_page