import { Link } from "react-router-dom"

const SlideText = (props)=>{
    const styleEntity = {
        opacity:1
    }

    const styleTrans = {
        opacity:0
    }
    return (
        <>
        {props.slideData.map((txtData,index)=>
        <ul className="wrap-slide__ul-text" key={index} style={index==props.slideCount?styleEntity:styleTrans}>
        <li className="wrap-slide__li-toptext"><Link to={`/item/${txtData._id}`}><a className="link">{txtData.title}</a></Link></li>
        <li className="wrap-slide__li-btmtext"><Link to={`/item/${txtData._id}`}><a className="link">{txtData.text}</a></Link></li>
        </ul>
        )}
        </>
    )
}

export default SlideText;

