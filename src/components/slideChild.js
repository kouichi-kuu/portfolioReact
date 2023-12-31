import React from "react";
import {useRef,useEffect,createRef} from "react";

const SlideChild = (props)=>{
    const listRef = useRef([])
    props.slideData.forEach((_,index)=>{
        listRef.current[index] = createRef()
    })
    useEffect(()=>{
        const styles = window.getComputedStyle(listRef.current[0].current)
        const margin = styles.getPropertyValue('margin-right')
        const marginLeftNum = margin.split('px')
        const slideListWidth = listRef.current[0].current.clientWidth
        const slideListSize = Number(marginLeftNum[0])+slideListWidth
        props.setSlideSize(slideListSize)
    },[])
    return (
        <>
        {props.slideData.map((ref,index)=>(
        <li className="wrap-slide__li-img" key={index} ref={listRef.current[index]}>
        <p className="wrap-slide__wrap-title"><span className="wrap-slide__main-title">{ref.title}</span><span className="wrap-slide__sub-title">{ref.rubyTitle}</span></p>
        <figure className="wrap-slide__img"><a href={ref.imgLink} className="link"><img src={ref.img} alt="" className="images" /></a></figure>
        </li>
        ))}
        </>
    )
}

export default SlideChild;


