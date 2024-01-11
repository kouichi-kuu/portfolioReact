import { useState,useEffect } from "react"
import {Link,useParams} from "react-router-dom"

const ReadSingleItem = ()=>{
    const params = useParams()
    const [program, setProgram] = useState("")
    const [update, setUpdate] = useState("")
    const [image, setImage] = useState("")
    const [title,setTitle] = useState("")
    const [text, setText] = useState("")
    
    useEffect(()=>{
        const getSingleItem = async()=>{
            const response = await fetch(`https://portfolionodejs-i77e.onrender.com/item/${params.id}`)
            const jsonResponse = await response.json()
            setProgram(jsonResponse.singleItem.program)
            setUpdate(jsonResponse.singleItem.update)
            setTitle(jsonResponse.singleItem.title)
            setImage(jsonResponse.singleItem.image)
            setText(jsonResponse.singleItem.text)
        }
        getSingleItem()
    },[params.id])
    return (
        <section id="page-main">
            <div className="page-main__wrap">
            <div className="page-main__top-title">{program}</div>
            <div className="page-main__top-sub">{update.slice(0,10)}</div>
            <figure className="page-main__img">{image && <img src={require(`../images/${image}`)} alt="item" />}</figure>
            <div className="page-main__sub-wrap">
                <h2 className="page-main__big-text">{title}</h2>
                <p className="page-main__small-txt">{text}</p>
                <ul className="page-main__link-wrap">
                    <li className="page-main__top-link"><Link to={'/'} className="page-main__link link">トップに戻る</Link></li>
                    <li className="page-main__top-link"><Link to={`/item/update/${params.id}`} className="page-main__link link">アイテム編集</Link></li>
                    <li className="page-main__btm-link"><Link to={`/item/delete/${params.id}`} className="page-main__link link">アイテム削除</Link></li>
                </ul>
            </div>
            </div>
        </section>
    )
}

export default ReadSingleItem