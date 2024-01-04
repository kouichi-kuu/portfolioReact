import { useState } from "react"

const CreateItem = ()=>{
    const [program, setProgram] = useState("")
    const [ruby, setRuby] = useState("")
    const [update, setUpdate] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch("https://portfolionodejs-i77e.onrender.com/item/create",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
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
            alert("アイテム作成失敗")
        }
    }
    return (
        <div id="create" className="subpage">
            <p className="create__heading subpage__heading">アイテム作成</p>
            <form onSubmit={handleSubmit} className="create__form subpage__form">
                <input value={program} onChange={(e)=>setProgram(e.target.value)} class="create__input subpage__input" type="text" name="program" placeholder="プログラム言語" required />
                <input value={ruby} onChange={(e)=>setRuby(e.target.value)} class="create__input subpage__input" type="text" name="ruby" placeholder="ルビ" required />
                <input value={update} onChange={(e)=>setUpdate(e.target.value)} class="create__input subpage__input" type="text" name="update" placeholder="アップ日" required />
                <input value={image} onChange={(e)=>setImage(e.target.value)} class="create__input subpage__input" type="text" name="image" placeholder="画像" required />
                <input value={title} onChange={(e)=>setTitle(e.target.value)} class="create__input subpage__input" type="text" name="title" placeholder="タイトル名" required />
                <textarea value={text} onChange={(e)=>setText(e.target.value)} class="create__input subpage__input" type="text" name="text" rows="15" placeholder="テキスト" required></textarea>
                <button className="create__btn">作成</button>
            </form>
        </div>
    )
}

export default CreateItem