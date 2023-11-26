import { useEffect, useState } from "react"

//Custom props and types
import Loading_status_type from "../../Props/LoadingStatus.type";
import Shopping_list_card_props from "../../Props/ShoppingListCard.props";

//Custom Components
import LoadingComponent from "../Visual/Loading.component";
import ErrorComponent from "../Visual/Error.component";
import ShoppingListGridCard from "../Visual/ShoppingListGridCards.component";

//Component for data preparation => getting all shopping lists
const Get_all_shopping_lists_data_component = () =>
{
    const [all_shopping_list_cards, set_all_shopping_list_cards] = useState<Array<Shopping_list_card_props>>([]);
    const [loading_status, set_loading_status] = useState<Loading_status_type>("Loading");

    useEffect(()=>
    {
        //Fetching data
        const get_all_lists_fetch = async () => {
            
            try
            {

                const data =  (
                await fetch("/shoppingList/getAll", { "method": "GET" })
                );
                let result = await data.json();
                if(result)
                {
                   if(result.code !== 500)
                   {
                        //Getting items
                        let shopping_lists = result.data.result;
                        let shopping_list_cards:Array<Shopping_list_card_props> = []
    
                        for(let list in shopping_lists)
                        {
                            let shopping_list_card:Shopping_list_card_props = {
                                id: shopping_lists[list].id,
                                name: shopping_lists[list].name,
                                member_list: shopping_lists[list].member_id_list,
                                owner: shopping_lists[list].owner,
                                archived_user_list:shopping_lists[list].archived_user_id_list,
                                item_list:[]
                            };
    
                            for(let item_id in shopping_lists[list].item_id_list)
                            {
                                const item_data = await (
                                    await fetch(`/item/get/${shopping_lists[list].item_id_list[item_id]}`, { "method": "GET" })
                                  ).json();
                                if(item_data.code === 200)
                                {
                                    shopping_list_card.item_list.push(item_data.data.result)
                                }
                            }    
                            shopping_list_cards.push(shopping_list_card)
                        }
                        
                        
                        set_all_shopping_list_cards(shopping_list_cards);
                        set_loading_status("Loaded")  
                   }
                   //Status 500
                   else
                        set_loading_status("Error");
                }
                 //Status 500
                 else
                    set_loading_status("Error");
            }
            catch(error)
            {
                set_loading_status("Error");
            }

           
          };
          get_all_lists_fetch();
    },[])

    return(
        <>
            {
                (loading_status === "Loading")? <LoadingComponent></LoadingComponent>:
                ((loading_status === "Loaded")? <ShoppingListGridCard cards={all_shopping_list_cards} cards_per_row={4}></ShoppingListGridCard>
                 : <ErrorComponent message="Could not load shopping lists"></ErrorComponent>)
            }
        </>
    )
}

export default Get_all_shopping_lists_data_component;