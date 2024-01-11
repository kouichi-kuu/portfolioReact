import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Slide from "../components/slide"

const ReadAll = ()=>{
    const [allItems, setAllItems] = useState()
    useEffect(()=>{
        const getAllItems = async()=>{
            const response = await fetch("https://portfolionodejs-i77e.onrender.com/")
            const jsonResponse = await response.json()
            setAllItems(jsonResponse)
        }
        getAllItems()
    },[])

    return (
        <>
        <h2 className="slider-heading"><span className="slider-heading__child">最新情報TOP5</span></h2>
        <Slide />
        <section id="main">
        <h2 className="main__heading"><span className="main__heading-child">全ての情報</span></h2>
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