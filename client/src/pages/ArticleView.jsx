import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import HighlightBox from "../components/ChartCard";
import Navbar from "../components/Navbar";

function ArticleView(){

const {id} = useParams();

const [article,setArticle] = useState(null);

useEffect(()=>{
loadArticle();
},[]);

const loadArticle = async ()=>{

const res = await API.get(`/articles/${id}`);

setArticle(res.data);

await API.post("/tracking",{
 articleId:id,
 duration:120
});

};

if(!article) return <p>Loading...</p>;

return(

<div>

<Navbar/>

<h1>{article.title}</h1>

<p>{article.category}</p>

{article.contentBlocks.map((c,i)=>(
<p key={i}>{c.content}</p>
))}

<HighlightBox articleId={id}/>

</div>

);
}

export default ArticleView;