import SlideChild from "./slideChild";
import SlideText from "./slideText";
import { useEffect,useState } from "react";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";

import '../css/slide_style.css';

const Slide = (props)=>{
    //const progInnerBar = useRef(null);
    const [slideData,setSlideData] = useState([])
	const [slideSize,setSlideSize] = useState(0)
	const [slideCount, setSlideCount] = useState(0)
	const [duration,setDuration] = useState(5000)
	const [isAnimation, setIsAnimation] = useState(true)

	const liData = [
		{title:'Javascript',rubyTitle:'ジャバスクリプト',imgLink:'#1',img:img1,topTxt:'動的に要素を追加したい：appendChild',btmTxt:'appendChildメソッドを使うと、指定したHTML要素の中の一番最後にパラメータで渡したHTML要素を挿入することができます。'},
		{title:'PHP',rubyTitle:'ピーエイチピー',imgLink:'#2',img:img2,topTxt:'json_decode関数',btmTxt:'JSONデータをPHPで利用するためには、json_decode関数を利用します。'},
		{title:'MYSQL',rubyTitle:'マイエスキューエル',imgLink:'#3',img:img3,topTxt:'NULLを条件にデータを取得する方法',btmTxt:'NULLであることを条件にデータを取得する場合、is nullやis not nullを用います。'},
		{title:'HTML・CSS',rubyTitle:'エイチティエムエル・シーエスエス',imgLink:'#4',img:img4,topTxt:'absoluteした要素に可変の高さを与える',btmTxt:'positionは便利だけど、リキッドデザインで使う場合囲んだdivなどにposition:absoluteを当てると画像の伸縮がうまくいかなくなる。'},
		{title:'Other',rubyTitle:'その他',imgLink:'#5',img:img5,topTxt:'react.js 現在のページのURL取得',btmTxt:'現在のページのURLを取得するには「react-router-dom」の「useParams」を使う'},
	]

	//console.log(props.allItems && props.allItems.allItems)

	//プログレッシブバーのアニメーションリセット用クラスの切替
	const progBarClass = isAnimation?'progBarAnime':'resetProgBarAnime'
	const resetAnimeProgBar = ()=>{
		setIsAnimation(false)
		setTimeout(()=>{
			setIsAnimation(true)
		},0)
	}

	//ページネーション用に配列をliDataの個数分作成して初期値にHTMLを格納
	const elements = Array(liData.length).fill(<span></span>)

	let transformValue
	let slideMoveDist = 0

	// スライダーの移動距離を指定
	const slideMove = (num)=>{
		slideMoveDist = -slideSize * num
		if((slideMoveDist <= -(slideSize*(liData.length)) && num >= (liData.length))){
			setSlideCount(0)
		}
		transformValue = "translateX("+slideMoveDist+"px)"
	}
	slideMove(slideCount)

	//スライダーデータをJSXにセット（現在はスライダーのテキスト部分のみ）＆プログレッシブバー実行
	//let duration = 3000
    useEffect(()=>{
		setSlideData(liData)
    },[]);

	//スライダー自動運転のカスタムフック
	const useSlideMoveAuto = (callback,delay)=>{
		useEffect(()=>{
			if(delay !== null){
				const slideMoveAuto = setInterval(()=>{
					callback()
				},delay)
				return ()=>clearInterval(slideMoveAuto)
			}
		},[callback, delay])
	}

	//スライダーの自動運転実行
	useSlideMoveAuto(()=>{
		setSlideCount((count)=>count+1)
	},duration)

	// スライダー移動距離をCSSへ
	const transStyle = {
		transform:transformValue
	}

	//現在のナンバー
	const currentNum = ()=>{
		return (slideCount+1)<=10?'0'+(slideCount+1):slideCount+1
	}

	//次のナンバー
	const nextNum = ()=>{
		if(slideCount >= liData.length-1){
			return '01'
		}else{
			return (slideCount+2)<=10?'0'+(slideCount+2):slideCount+2
		}
	}

	const nextBtn = ()=>{
		setDuration(null)
		setSlideCount((count)=>count+1)
		setDuration(duration)
		resetAnimeProgBar()
	}

	const reverseBtn = ()=>{
		if(slideCount === 0){
			return false
		}else{
			setDuration(null)
			setSlideCount((count)=>count-1)
			setDuration(duration)
			resetAnimeProgBar()
		}
	}

    return (
        <div id="wrap-slide">
	<div className="wrap-slide__page">
		<div className="wrap-slide__midwrap-left">
			<p className="wrap-slide__current-num">{currentNum()}</p>
			<div className="wrap-slide__pgs-bar">
				<div className={`wrap-slide__inner-bar ${progBarClass}`}></div>
			</div>
			<p className="wrap-slide__next-num">{nextNum()}</p>
			<p className="wrap-slide__next-txt">NEXT</p>
		</div>
		<ul className="wrap-slide__page-circle">
			{elements.map((elem,index)=>(
				<li className={slideCount==index?"wrap-slide__circle active":"wrap-slide__circle"} key={index}>{elem}</li>
			))}
		</ul>
	</div>
	<div className="wrap-slide__main">
		<div className="wrap-slide__wrap-ul">
			<ul className="wrap-slide__ul-img" style={transStyle}>
				<SlideChild slideData={liData} setSlideSize={setSlideSize} />
			</ul>
		</div>
		<SlideText slideData={slideData} slideCount={slideCount} />
		<ul className="wrap-slide__page-nation">
			<li className="wrap-slide__reverse">
				<div onClick={reverseBtn} className="wrap-slide__reverse-link link">
					<i className="fas fa-chevron-left"></i>
					<span className="wrap-slide__reverse-btn">戻る</span>
				</div>
			</li>
			<li className="wrap-slide__next">
				<div onClick={nextBtn} className="wrap-slide__next-link link">
					<span className="wrap-slide__next-btn">次へ</span>
					<i className="fas fa-chevron-right"></i>
				</div>
			</li>
		</ul>
	</div>
</div>
    )
}

export default Slide;