import Button from "./Button.component"
import { useNavigate } from "react-router"
const Header_component = () =>
{
    const navigate = useNavigate();
    return (
        <div className="bg-dark-red p-10 flex justify-between">
            <h1 className="text-white font-bold text-2xl drop-shadow-md">Shopping List Manager</h1>
            <Button label="Add new shopping list" on_click_handler={()=>{navigate("/shoppingList/create")}} type="Default"></Button>
        </div>
    )
}

export default Header_component