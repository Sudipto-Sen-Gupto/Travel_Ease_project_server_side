const express=require('express');
const app=express();
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.port || 3000;

app.use(cors());
app.use(express.json()); 


//
//


const uri = "mongodb+srv://Travel-agency-project:ZNNYA5Eeo8OFPJmF@cluster0.6pjurty.mongodb.net/?appName=Cluster0";

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

          const database=client.db('travelData');
          const dataCollection=database.collection("properties")
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