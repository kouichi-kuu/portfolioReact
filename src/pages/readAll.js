import { useState,useEffect,createContext } from "react"
import { Link } from "react-router-dom"
import Slide from "../components/slide"

export const SlideContext = createContext()

const ReadAll = ()=>{
    const [allItems, setAllItems] = useState()
    const [liData, setLiData] = useState([])
    useEffect(()=>{
        const getAllItems = async()=>{
            const response = await fetch("https://portfolionodejs-i77e.onrender.com/")
            const jsonResponse = await response.json()
            setAllItems(jsonResponse)
        }
        getAllItems()
    },[])

    // allItems && allItems.allItems.map((items)=>
    // setLiData(items)
    // )
    // console.log(liData)

    return (
        <>
        <SlideContext.Provider value={allItems && allItems.allItems}>
        <Slide />
        </SlideContext.Provider>
        <section id="main">
        <ul className="main__elem-ul">
            {allItems && allItems.allItems.map((item)=>
            <li className="main__elem-li" key={item._id}>
                <div className="main__top-elem">
                    <p className="main__li-title">{item.program}</p>
                    <p className="main__li-sub">{item.update}</p>
                </div>
                <figure className="main__image">
                    <img src={require(`../images/${item.image}`)} className="main__img images" alt="" />
                </figure>
                <div className="main__text-elem">
                    <p className="main__big-text">{item.title}</p>
                    <p className="main__small-text">{item.text.substring(0,80)}...</p>
                </div>
                <div className="main__link-btn">
                    <Link to={`/item/${item._id}`} className="link">
                        <a className="main__link link">この記事を見る</a>
                    </Link>
                </div>
            </li>
            )}
        </ul>
        </section>
        </>
    )
}

export default ReadAll