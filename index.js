const express=require('express');
const app=express();
const cors=require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
          const myVehicleCollection=database.collection('vehicle')
          const bookingVehicleInfoCollection=database.collection('vehicleInfo')
          //home page
          app.get('/properties',async(req,res)=>{
            const cursor=dataCollection.find().limit(6);
            const result=await cursor.toArray();
            res.send(result);

           
          })

           //all vehicles page
            app.get('/allProperty',async(req,res)=>{
                 
                const result=await dataCollection.find().sort({pricePerDay:1}).toArray();
                 res.send(result)
                
            })

              //view details api
            app.get('/viewdetail/:id',async(req,res)=>{
                  
                  const id=req.params.id;
                  const query={_id: new ObjectId(id)};
                  const result=await dataCollection.findOne(query);
                  res.send(result);
            })

            app.post('/vehicleDetail',async(req,res)=>{
                       
                  
                  const detail=req.body;

                  const query={
                    vehicleId:detail.vehicleId,
                    userEmail:detail.userEmail
                  }

                  const vehicleExist=await bookingVehicleInfoCollection.findOne(query);

                  if(vehicleExist){
                    return res.send({exist:true})
                  }
                  const result=await bookingVehicleInfoCollection.insertOne(detail);
                  res.send(result)
            })

       //addvehicle api
            app.post('/addvehicle',async(req,res)=>{
                      
                   const query=req.body;
                   
                   const result=await myVehicleCollection.insertOne(query);
                   res.send(result) 

            })

            app.get('/addvehicle/email',async(req,res)=>{
                   
                  const email=req.query.email;

                  const query={}

                  if(email){
                      query.email=email
                  }
               

                  const result=await myVehicleCollection.find(query).toArray();

                  res.send(result);
                   
            })

            app.delete('/removevehicle/:id',async(req,res)=>{
                        
                     const id=req.params.id;
                     const query={_id: new ObjectId(id)}

                     const result=await myVehicleCollection.deleteOne(query);
                     res.send(result);
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