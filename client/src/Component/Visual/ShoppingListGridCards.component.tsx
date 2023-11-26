import { Shopping_list_grid_cards_props } from "../../Props/ShoppingListGridCards.props"

import ShoppingListCard from "./ShoppingListCard.component"

const Shopping_list_grid_cards_component = (shopping_list_grid_card:Shopping_list_grid_cards_props) =>
{
    return (
        <div className={"grid grid-cols-3"}>
            {shopping_list_grid_card.cards.map((card)=>
            {
                return (
                    <div className="p-3">
                        <ShoppingListCard id={card.id} 
                        name={card.name}
                        item_list={card.item_list}
                        member_list={card.member_list}
                        archived_user_list={card.archived_user_list}
                        owner={card.owner}></ShoppingListCard>
                    </div>
                )
            })}
        </div>
    )
}

export default Shopping_list_grid_cards_component