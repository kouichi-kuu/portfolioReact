import { useState } from "react"

const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch("https://portfolionodejs-i77e.onrender.com/user/login",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })
            const jsonResponse = await response.json()
            localStorage.setItem("token",jsonResponse.token)
            alert(jsonResponse.message)
        }catch(err){
            alert("ログイン失敗")
        }
    }
    return (
        <div id="create" className="subpage">
            <p className="create__heading subpage__heading">ログイン</p>
            <form onSubmit={handleSubmit} className="create__form subpage__form">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} class="create__input subpage__input" type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} class="create__input subpage__input" type="text" name="password" placeholder="パスワード" required />
                <button className="create__btn">ログイン</button>
            </form>
        </div>
    )
}

export default Login