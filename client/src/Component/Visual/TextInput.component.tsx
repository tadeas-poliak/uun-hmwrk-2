import { useEffect, useState } from "react"
import { Text_input_props } from "../../Props/TextInput.props"
const Text_input_component = (text_input:Text_input_props) =>
{
    const [input,set_input] = useState<Text_input_props>();

    useEffect(()=>
    {
        set_input(text_input);
    },[text_input])

    return (
        <>
            { (text_input.multiple_line)?
            <textarea placeholder={text_input.placeHolder} value={text_input.value} onChange={(e)=>input?.on_change_event(e)} maxLength={50} />:
            <input placeholder={text_input.placeHolder} type="text" value={text_input.value} onChange={(e)=>input?.on_change_event(e)}
            className={"text-black p-2 pl-6 pr-6 drop-shadow-lg rounded-md hover:scale-[1.02] transition-[250ms] bg-paper-yellow dark:bg-gray-900 dark:text-white"}></input>

            }
        </>
    )
}

export default Text_input_component;