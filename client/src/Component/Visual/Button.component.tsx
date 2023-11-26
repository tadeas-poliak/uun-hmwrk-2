import { Button_props } from "../../Props/Button.props"
const Button_component = (button:Button_props) =>
{
    const color = (button.type === "Default")? "bg-button-default" :
                ((button.type === "Edit")? "bg-button-edit": "bg-button-delete")
    return (
        <>
            <input type="Button" value={button.label} onClick={button.on_click_handler}
            className={"cursor-pointer bg-slate-100 p-2 pl-6 pr-6 text-white drop-shadow-lg rounded-md "+color}></input>
        </>
    )
}

export default Button_component