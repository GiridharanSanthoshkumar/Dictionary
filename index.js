import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/content",(req,res)=>
{
    res.render("content.ejs");

}); 
app.post("/api",async(req,res)=>
{
    let word=req.body.word;
    try{
    const result=await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
    let list=result.data[0].meanings;
    
    var sound1;
    
    if(result.data[0].phonetics[0]||result.data[0].phonetics[1])
      {if(result.data[0].phonetics[0])
        sound1=result.data[0].phonetics[0].audio;
        else 
          sound1=result.data[0].phonetics[1].audio;
      }
    else{
        sound1='';
    }
   
    
   res.render("content.ejs",{meaning:list,wrd:word,sound:sound1});
    }
    catch(error)
    {   console.log(error.response);
      if(error.response)
           res.render("content.ejs",{er:error.response.data.message});
      else{
        res.render("content.ejs",{er:"check your internet connection 🥺 "})
      }
    }

});

app.listen(process.env.PORT||3000,()=>{
    console.log("server is started at the port 3000!");
})