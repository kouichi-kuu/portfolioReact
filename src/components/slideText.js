
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
        <li className="wrap-slide__li-toptext"><a href={txtData.imgLink} className="link">{txtData.topTxt}</a></li>
        <li className="wrap-slide__li-btmtext"><a href={txtData.imgLink} className="link">{txtData.btmTxt}</a></li>
        </ul>
        )}
        </>
    )
}

export default SlideText;

