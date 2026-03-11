import { useEffect,useState } from "react";
import API from "../api/api";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";

function Articles(){

const [articles,setArticles] = useState([]);

useEffect(()=>{
 loadArticles();
},[]);

const loadArticles = async ()=>{

const res = await API.get("/articles");

setArticles(res.data.articles);

};

return(

<div>

<Navbar/>

<h2>Articles</h2>

{articles.map((a)=>(
<ArticleCard key={a._id} article={a}/>
))}

</div>

);
}

export default Articles;