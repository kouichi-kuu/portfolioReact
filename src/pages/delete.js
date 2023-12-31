import {useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'

const Delete = ()=>{
    const [program, setProgram] = useState("")
    const [update, setUpdate] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const params = useParams()

    useEffect(()=>{
        const getSingleItem = async()=>{
            const response = await fetch(`http://localhost:5000/item/${params.id}`)
            const jsonResponse = await response.json()
            setProgram(jsonResponse.singleItem.program)
            setUpdate(jsonResponse.singleItem.update)
            setImage(jsonResponse.singleItem.image)
            setTitle(jsonResponse.singleItem.title)
            setText(jsonResponse.singleItem.text)
        }
        getSingleItem()
    },[params.id])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:5000/item/delete/${params.id}`,{
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("消去失敗")
        }
    }
    return (
        <section id="page-main">
            <div className="page-main__wrap">
            <form onSubmit={handleSubmit}>
            <div className="page-main__top-title">{program}</div>
            <div className="page-main__top-sub">{update}</div>
            <figure className="page-main__img">{image && <img src={require(`../images/${image}`)} alt="item" />}</figure>
            <div className="page-main__sub-wrap">
                <h2 className="page-main__big-text">{title}</h2>
                <p className="page-main__small-txt">{text}</p>
            </div>
            <div className='page-main__btn'>
                <button>削除</button>
            </div>
            </form>
            <button className="subpage__btn"><Link to={`/item/${params.id}`}>削除せずに戻る</Link></button>
            </div>
        </section>
    )
}

export default Delete