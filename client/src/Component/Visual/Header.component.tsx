import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router"

import Button from "./Button.component"
import DropDownButtonComponent from "./DropDownButton.component";

//Icons
//import en_flag_icon from "/icons/en.svg";

const Header_component = () =>
{
    const {t,i18n} = useTranslation();


    const navigate = useNavigate();
    return (
        <div className="dark:bg-darker-red bg-dark-red p-10 lg:flex justify-between md:block shadow-xl">
            <h1 className="text-white font-bold text-2xl drop-shadow-md"><a href="/">{t("header.title")} </a></h1>
            <div className="flex justify-evenly mt-5 lg:mt-0">
                <div className="pr-4">
                    <DropDownButtonComponent 
                    label={t("header.settings_button")}
                    button_items={[
                        {   label:t("header.language_button"),
                            button_items:[
                                {label:"English",on_click_handler:()=>{i18n.changeLanguage("en");},type:"Default", icon_before:{path:"/icons/en.svg", width_px:25}}, 
                                {label:"Czech",on_click_handler:()=>{i18n.changeLanguage("cs");},type:"Default", icon_before:{path:"/icons/cs.svg", width_px:25}},
                                {label:"German",on_click_handler:()=>{i18n.changeLanguage("de");},type:"Default", icon_before:{path:"/icons/de.svg", width_px:25}}
                            ]
                        }
                    ]}/>
                </div>
                <Button label={t("header.button")} on_click_handler={()=>{navigate("/shoppingList/create"); window.location.reload();}} type="Default"></Button>
            </div>
        </div>
    )
}

export default Header_component