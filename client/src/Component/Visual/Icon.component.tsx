import { Icon_props } from "../../Props/Icon.props"

const Icon_component = (icon:Icon_props) =>
{      
    return (
        <>
            <img src={icon.path} alt="Icon" className={"min-w-[15px] rounded-sm"}
            style={{width:icon.width_px?.toString() +"px"}} />
        </>
    )
}

export default Icon_component