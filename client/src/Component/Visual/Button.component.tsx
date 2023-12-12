import { Button_props } from "../../Props/Button.props"
import IconComponent from "./Icon.component"

const Button_component = (button:Button_props) =>
{
    const color = (button.type === "Default")? "bg-button-default" :
                ((button.type === "Edit")? "bg-button-edit":
                (button.type === "Delete")? "bg-button-delete":"bg-button-submit")


                 
    return (
            <div className={"flex justify-center cursor-pointer lg:p-2 lg:pl-6 lg:pr-6 p-1  text-white drop-shadow-lg rounded-md "+color+
                            " hover:scale-[1.02] transition-[250ms] drop-shadow-lg"} onClick={button.on_click_handler}>
                <div className="flex justify-center">
                    {(button.icon_before)?<IconComponent path={button.icon_before.path} width_px={button.icon_before.width_px}></IconComponent>:null}
                </div>
                <div className={"p-1"}>
                    <p className="select-none whitespace-pre text-center">{button.label}</p>
                </div>
            </div>
    )
}

export default Button_component