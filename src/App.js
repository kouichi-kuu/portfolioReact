import {Route, Routes, BrowserRouter} from "react-router-dom"
import ReadAll from "./pages/readAll"
import ReadSingleItem from "./pages/readSingle"
import ItemPhp from "./pages/itemPhp"
import ItemJs from "./pages/itemJs"
import ItemSql from "./pages/itemSql"
import ItemHtml from "./pages/itemHtml"
import ItemOther from "./pages/itemOther"
import CreateItem from "./pages/create"
import UpdateItem from "./pages/update"
import Delete from "./pages/delete"
import Header from "./components/header"
import Footer from "./components/footer"
import "./css/reset.css"
import "./App.css"

const App = ()=>{
    return (
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<ReadAll />} />
            <Route path="/item/php" element={<ItemPhp />} />
            <Route path="/item/javascript" element={<ItemJs />} />
            <Route path="/item/mysql" element={<ItemSql />} />
            <Route path="/item/html" element={<ItemHtml />} />
            <Route path="/item/other" element={<ItemOther />} />
            <Route path="/item/:id" element={<ReadSingleItem />} />
            <Route path="/item/create" element={<CreateItem />} />
            <Route path="/item/update/:id" element={<UpdateItem />} />
            <Route path='/item/delete/:id' element={<Delete />} />
        </Routes>
        <Footer />
        </BrowserRouter>
    )
}

export default App