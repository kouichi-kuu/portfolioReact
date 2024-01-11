import React from "react";
import {useRef,useEffect,createRef,useState} from "react";
import { Link } from "react-router-dom";

const SlideChild = (props)=>{
    const listRef = useRef([])
    props.slideData && props.slideData.forEach((_,index)=>{
        listRef.current[index] = createRef()
    })
    useEffect(()=>{
        const styles = window.getComputedStyle(listRef.current[0].current)
        const margin = styles.getPropertyValue('margin-right')
        const marginLeftNum = margin.split('px')
        const slideListWidth = listRef.current[0].current.clientWidth
        const slideListSize = Number(marginLeftNum[0])+slideListWidth
        console.log(listRef.current[0].current.children[1].children[0].children[0].children[0].naturalWidth)
        props.setSlideSize(slideListSize)
    },[])
    return (
        <>
        {props.slideData && props.slideData.map((ref,index)=>(
        <li className="wrap-slide__li-img" key={index} ref={listRef.current[index]}>
        <p className="wrap-slide__wrap-title"><span className="wrap-slide__main-title">{ref.program}</span><span className="wrap-slide__sub-title">{ref.ruby}</span></p>
        <figure className="wrap-slide__img"><Link to={`/item/${ref._id}`}><a className="link"><img src={require(`../images/${ref.image}`)} alt="" className="images" /></a></Link></figure>
        </li>
        ))}
        </>
    )
}

export default SlideChild;