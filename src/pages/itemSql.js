import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const ItemSql = ()=>{
    const [itemProg, setItemProg] = useState()
    useEffect(()=>{
        const getItems = async()=>{
            const response = await fetch('http://localhost:5000/item/mysql')
            const jsonResponse = await response.json()
            setItemProg(jsonResponse)
        }
        getItems()
    },[])
    return (
        <section id="main">
        <ul className="main__elem-ul">
            {itemProg && itemProg.sqlItem.map((item)=>
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
    )
}

export default ItemSql