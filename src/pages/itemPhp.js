import { useState,useEffect } from "react"
import {Link} from "react-router-dom"

const ItemPhp = ()=>{
    const [itemProg, setItemProg] = useState()
    useEffect(()=>{
        const getItems = async()=>{
            const response = await fetch("https://portfolionodejs-i77e.onrender.com/item/php")
            const jsonResponse = await response.json()
            setItemProg(jsonResponse)
        }
        getItems()
    },[])
    return (
        <section id="main">
        <ul className="main__elem-ul">
            {itemProg && itemProg.phpItems.map((item)=>
            <li className="main__elem-li" key={item._id}>
                <div className="main__top-elem">
                    <p className="main__li-title">{item.program}</p>
                    <p className="main__li-sub">{item.update.slice(0,10)}</p>
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
    )
}

export default ItemPhp