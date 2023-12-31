import rogo from "../images/rogo.jpg"
import { Link } from "react-router-dom"

const Footer = ()=>{
    return (
        <section id="footer">
            <div className="footer__contents">
                <ul className="footer__elem-ul">
                    <li className="footer__elem-li">
                        <figure className="footer__rogo-img"><img src={rogo} className="footer__img images" alt="技術ブログ" /></figure>
                    </li>
                    <li className="footer__elem-li">技術ブログ</li>
                </ul>
                <ul className="footer__menu">
                    <li className="footer__list">
                        <Link to="/"><a className="footer__menu-link link">TOP</a></Link>
                    </li>
                    <li className="footer__list">
                        <Link to="/item/javascript"><a className="footer__menu-link link">Javascript</a></Link>
                    </li>
                    <li className="footer__list">
                        <Link to="/item/php"><a className="footer__menu-link link">PHP</a></Link>
                    </li>
                    <li className="footer__list">
                        <Link to="/item/mysql"><a className="footer__menu-link link">MYSQL</a></Link>
                    </li>
                    <li className="footer__list">
                        <Link to="/item/html"><a className="footer__menu-link link">HTML・CSS</a></Link>
                    </li>
                    <li className="footer__list">
                        <Link to="/item/other"><a className="footer__menu-link link">Other</a></Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Footer