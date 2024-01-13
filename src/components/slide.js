import SlideChild from "./slideChild";
import SlideText from "./slideText";
import { useEffect,useState } from "react";

import '../css/slide_style.css';

const Slide = ()=>{
    //const progInnerBar = useRef(null);
    const [slideData,setSlideData] = useState()
	const [slideSize,setSlideSize] = useState(0)
	const [slideCount, setSlideCount] = useState(0)
	const [duration,setDuration] = useState(5000)
	const [isAnimation, setIsAnimation] = useState(false)

	// const liData = [
	// 	{_id:'001',image:'mysql.jpg',title:'コマンドラインでSSH接続する',text:'レンタルサーバーのデータベースにコマンドラインで接続する場合はSSH接続が必要',program:'MySQL',ruby:'マイエスキューエル'},
	// 	{_id:'002',image:'html.jpg',title:'position:absoluteした要素に可変の高さを与える',text:'positionは便利だけど、リキッドデザインで使う場合囲んだdivなどにposition:',program:'HTML',ruby:'エイチティエムエル'},
	// 	{_id:'003',image:'mysql.jpg',title:'コマンドラインでSSH接続する',text:'レンタルサーバーのデータベースにコマンドラインで接続する場合はSSH接続が必要',program:'MySQL',ruby:'マイエスキューエル'},
	// 	{_id:'004',image:'mysql.jpg',title:'コマンドラインでSSH接続する',text:'レンタルサーバーのデータベースにコマンドラインで接続する場合はSSH接続が必要',program:'MySQL',ruby:'マイエスキューエル'},
	// 	{_id:'005',image:'mysql.jpg',title:'コマンドラインでSSH接続する',text:'レンタルサーバーのデータベースにコマンドラインで接続する場合はSSH接続が必要',program:'MySQL',ruby:'マイエスキューエル'},
	// ]

	const [newdateItem, setNewdateItem] = useState()
	useEffect(()=>{
		const getSlideItems = async()=>{
			const response = await fetch("https://portfolionodejs-i77e.onrender.com/item/newdate")
			const jsonRes = await response.json()
			setNewdateItem(jsonRes)
		}
		getSlideItems()
	},[])

	const liDataLength = newdateItem && newdateItem.newdateItem.length
	//console.log(newdateItem && newdateItem.newdateItem)
	//console.log(slideSize)

	//プログレッシブバーのアニメーションリセット用クラスの切替
	const progBarClass = isAnimation?'progBarAnime':'resetProgBarAnime'
	const resetAnimeProgBar = ()=>{
		setIsAnimation(false)
		setTimeout(()=>{
			setIsAnimation(true)
		},500)
	}
	
	//ページネーション用に配列をliDataの個数分作成して初期値にHTMLを格納
	const elements = Array(liDataLength).fill(<span></span>)

	let transformValue
	let slideMoveDist = 0

	// スライダーの移動距離を指定
	const slideMove = (num)=>{
		slideMoveDist = -slideSize * num
		if((slideMoveDist <= -(slideSize*(liDataLength)) && num >= (liDataLength))){
			setSlideCount(0)
		}
		transformValue = "translateX("+slideMoveDist+"px)"
	}
	slideMove(slideCount)

	//スライダーデータをJSXにセット（現在はスライダーのテキスト部分のみ）
	//let duration = 3000
    useEffect(()=>{
		setSlideData(newdateItem && newdateItem.newdateItem)
		resetAnimeProgBar()
    },[newdateItem]);

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
		resetAnimeProgBar()
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
		if(slideCount >= liDataLength-1){
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
			setDuration(null)
			setSlideCount(liDataLength-1)
			setDuration(duration)
			resetAnimeProgBar()
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
				{slideData === undefined?"":<SlideChild slideData={slideData} setSlideSize={setSlideSize} />}
			</ul>
		</div>
		{slideData === undefined?"":<SlideText slideData={slideData} slideCount={slideCount} />}
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