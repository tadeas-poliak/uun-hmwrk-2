import Shopping_list_card_props from "./ShoppingListCard.props"
interface Shopping_list_grid_cards_props
{
    cards_per_row:number,
    cards: Array<Shopping_list_card_props>,
    remove_card_handler?:(shopping_list:Shopping_list_card_props)=>any
}

export type {Shopping_list_grid_cards_props}