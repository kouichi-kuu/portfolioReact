import { useState,useEffect } from "react"
import {useParams,Link} from "react-router-dom"
import useAuth from "../utils/useAuth"

const UpdateItem = (props)=>{
    const [program, setProgram] = useState("")
    const [ruby, setRuby] = useState("")
    const [update, setUpdate] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [email,setEmail] = useState("")
    const params = useParams()

    useEffect(()=>{
        const getSingleItem = async()=>{
            const response = await fetch(`https://portfolionodejs-i77e.onrender.com/item/${params.id}`)
            const jsonResponse = await response.json()
            setProgram(jsonResponse.singleItem.program)
            setRuby(jsonResponse.singleItem.ruby)
            setUpdate(jsonResponse.singleItem.update)
            setTitle(jsonResponse.singleItem.title)
            setImage(jsonResponse.singleItem.image)
            setText(jsonResponse.singleItem.text)
            setEmail(jsonResponse.singleItem.email)
        }
        getSingleItem()
    },[params.id])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`https://portfolionodejs-i77e.onrender.com/item/update/${params.id}`,{
                method:"PUT",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    program:program,
                    ruby:ruby,
                    update:update,
                    image:image,
                    title:title,
                    text:text,
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("アイテム編集失敗")
        }
    }
    const loginUser = useAuth()
    if(loginUser === email){
    return (
        <div id="update" className="subpage">
            <p className="update__heading subpage__heading">アイテム編集</p>
            <form onSubmit={handleSubmit} className="update__form subpage__form">
                <input value={program} onChange={(e)=>setProgram(e.target.value)} className="update__input subpage__input" type="text" name="program" placeholder="プログラム言語" required />
                <input value={ruby} onChange={(e)=>setRuby(e.target.value)} className="update__input subpage__input" type="text" name="ruby" placeholder="ルビ" required />
                <input value={update} onChange={(e)=>setUpdate(e.target.value)} className="update__input subpage__input" type="date" name="update" placeholder="アップ日" required />
                <input value={image} onChange={(e)=>setImage(e.target.value)} className="update__input subpage__input" type="text" name="image" placeholder="画像" required />
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="update__input subpage__input" type="text" name="title" placeholder="タイトル名" required />
                <textarea value={text} onChange={(e)=>setText(e.target.value)} className="update__input subpage__input" type="text" name="text" rows="15" placeholder="テキスト" required></textarea>
                <button>修正</button>
            </form>
            <button className="subpage__btn"><Link to={`/item/${params.id}`}>編集せずに戻る</Link></button>
        </div>
    )
    }else{
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem