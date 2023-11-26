//Importing components
import GetListsDataComponent from "../Component/Data/GetAllShoppingLists.datacomponent"
import Header from "../Component/Visual/Header.component"

const main_page = () =>
{
    return (
        <>
            <Header></Header>
            <div>
                <GetListsDataComponent />
            </div>
        </>
    )
}

export default main_page