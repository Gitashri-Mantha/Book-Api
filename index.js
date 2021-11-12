require('dotenv').config();
const express= require("express");
const mongoose=require("mongoose");

//imporitng different schemas 
const BookModel=require("./schema/book");
const AuthorModel= require("./schema/author");
const PublicationModel= require("./schema/publication");

//importing API'S 
const Book=require("./API/book");
const Author=require("./API/book");
const Publication = require("./API/publication");



mongoose.connect(
    process.env.MONGO_URI
).then(()=>console.log("connection established!")).catch((err)=>{console.log(err);
});

//initialization
const OurApp = express();
OurApp.use(express.json());

//microservices

OurApp.use("/book",Book);
OurApp.use("/author",Author);
OurApp.use("/publication",Publication);




//testingapi
OurApp.get("/",(request,response)=>{
    response.json({message:"server is working!"});

});
OurApp.listen(4000,()=>{console.log("server is running!!!!")});