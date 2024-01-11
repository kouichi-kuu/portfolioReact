import rogo from "../images/rogo.jpg"
import {Link} from "react-router-dom"
import { useState,useRef } from "react"


const Header = ()=>{
    const [active, setActive] = useState(false)
    const clickMenu = (e)=>{
        setActive(!active)
        //console.log(e.target.classList)
    }
    //const clkDisp = useRef()
    return (
        <section id="header">
            <div className="header__elem">
                <div className="header__rogo"><img src={rogo} className="header__img images" alt="技術ブログ" /></div>
                <p className="header__main-txt"><span className="header__in-txt">技術メモ</span></p>
            </div>
            <nav className={active?"header__menu-wrap animate__fadeIn":"header__menu-wrap disp animate__fadeIn"}>
                <span className="header__txt">カテゴリーから探す</span>
                <ul className="header__menu">
                    <li className="header__list">
                        <Link to="/" className="link"><a className="header__menu-link current link" onClick={clickMenu}>TOP</a></Link>
                    </li>
                    <li className="header__list">
                        <Link to="/item/javascript" className="link"><a className="header__menu-link link" onClick={()=>setActive(!active)}>Javascript</a></Link>
                    </li>
                    <li className="header__list">
                        <Link to="/item/php" className="link"><a className="header__menu-link link" onClick={()=>setActive(!active)}>PHP</a></Link>
                    </li>
                    <li className="header__list">
                        <Link to="/item/mysql" className="link"><a className="header__menu-link link" onClick={()=>setActive(!active)}>MYSQL</a></Link>
                    </li>
                    <li className="header__list">
                        <Link to="/item/html" className="link"><a className="header__menu-link link" onClick={()=>setActive(!active)}>HTML・CSS</a></Link>
                    </li>
                    <li className="header__list">
                        <Link to="/item/other" className="link"><a className="header__menu-link link" onClick={()=>setActive(!active)}>Other</a></Link>
                    </li>
                </ul>
            </nav>
            <div className={active?'openbtn1 active':'openbtn1'} onClick={()=>setActive(!active)}><span></span><span></span><span></span></div>
        </section>
    )
}

export default Header