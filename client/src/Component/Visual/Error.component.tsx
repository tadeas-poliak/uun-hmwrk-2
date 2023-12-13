import { useTranslation } from "react-i18next"
import { Error_props } from "../../Props/Error.props"
const Error_component = ({message}:Error_props) =>
{
    const {t} = useTranslation();
    return (
        <>
            <div className="flex justify-center">
                <div className="text-white p-4 grid grid-cols-1">
                    <p className="text-lg text-center font-bold">{t("error.oh_no")}</p>
                    <p className="text-center">{t("error.communication_server")}</p>
                    <p className="text-center">{message}</p>
                </div>
            </div>
        </>
    )
}

export default Error_component