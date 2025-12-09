const express=require('express');
const app=express();
const cors=require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.port || 3000;

app.use(cors());
app.use(express.json()); 


//
//


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6pjurty.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run(){
    try{
          await client.connect();
          await client.db('admin').command({ping:1});
          console.log("Connect with database");

          const database=client.db('TravelDB');
          const dataCollection=database.collection("properties")
          
          //home page
          app.get('/properties',async(req,res)=>{
            const cursor=dataCollection.find().limit(6);
            const result=await cursor.toArray();
            res.send(result);

            //all vehicles page
            app.get('/allProperty',async(req,res)=>{
                 
                const result=await dataCollection.find().toArray();
                 res.send(result)
                
            })
          })
    }

    finally{

    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("hellow Travel agency")
})
 
app.listen(port,()=>{
    console.log("Port moves to",port);
})