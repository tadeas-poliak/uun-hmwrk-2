import { toast } from "react-toastify"
import { Shopping_list_grid_cards_props } from "../../Props/ShoppingListGridCards.props"

import ShoppingListCard from "./ShoppingListCard.component"
import { Shopping_list_props } from "../../Props/ShoppingList.props"
import Shopping_list_card_props from "../../Props/ShoppingListCard.props"
import { useEffect, useState } from "react"

const Shopping_list_grid_cards_component = (shopping_list_grid_card: Shopping_list_grid_cards_props) => {
    const [shopping_list_grid,set_shopping_list_grid] = useState<Shopping_list_grid_cards_props>(shopping_list_grid_card);

    useEffect(()=>
    {
        set_shopping_list_grid(shopping_list_grid_card);
    },[shopping_list_grid_card])

   

    return (
        <div className={"grid lg:grid-cols-3 xs:grid-cols-1"}>
            {shopping_list_grid_card.cards.map((card) => {
                return (
                    <div className="p-3">
                        <ShoppingListCard id={card.id}
                            name={card.name}
                            item_list={card.item_list}
                            member_list={card.member_list}
                            archived_user_list={card.archived_user_list}
                            owner={card.owner}
                            remove_list_handler={shopping_list_grid_card.remove_card_handler}></ShoppingListCard>
                    </div>
                )
            })}
        </div>
    )
}

export default Shopping_list_grid_cards_component