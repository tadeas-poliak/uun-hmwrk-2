import { useState } from "react"

import { Drop_down_button_props } from "../../Props/DropDownButton.props"
import { Button_props } from "../../Props/Button.props"



import ButtonComponent from "./Button.component"

const DropDownButtonComponent = (drop_down:Drop_down_button_props) =>
{
    const [is_open,set_is_open] = useState(false);
    
    function instanceOfButton(data: any): data is Button_props { 
        return 'label' in data; 
    } 

    function instanceOfDropDown(data: any): data is Drop_down_button_props { 
        return 'button_items' in data; 
    } 

    return (
        <div >
            <div className="    ">
                {
                    //If icon is set use it, otherwise use default drop down
                    (drop_down.icon_before)?
                <ButtonComponent icon_before={drop_down.icon_before} label={drop_down.label} on_click_handler={()=>{set_is_open(!is_open)}} type="Default"></ButtonComponent>:
                <ButtonComponent icon_before={{path:"/icons/down-arrow.png", width_px:15}} label={drop_down.label} on_click_handler={()=>{set_is_open(!is_open)}} type="Default"></ButtonComponent>
                }
            </div>
            <div className="relative flex justify-center">
            {
                (is_open)?
                <div className={"grid grid-cols-1 absolute z-10 bg-black bg-opacity-80 w-[225px] p-4"}>
                {
                    drop_down.button_items.map((button)=>
                    {
                        if(instanceOfDropDown(button))
                            return (
                                <div className="p-2 flex justify-center rounded-sm">
                                    <DropDownButtonComponent button_items={button.button_items} label={button.label} />
                                </div>
                            );

                        if(instanceOfButton(button))
                            return (
                                <div className="p-2 flex justify-center rounded-sm">
                                    <ButtonComponent label={button.label} on_click_handler={()=>{set_is_open(false); button.on_click_handler();}} type={button.type}
                                    icon_before={button.icon_before}></ButtonComponent>
                                </div>
                            );
                        return null;
                    })
                }
                </div>:
                null
            }
            </div>
            
        </div>
    )
}

export default DropDownButtonComponent