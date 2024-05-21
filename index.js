const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json())

//============================================
//    *****************************************
//    mongoDB operation start 
//    *****************************************
//=============================================
const uri = `mongodb+srv://AllData:uFPWPTEc2bqqmNqH@cluster0.27ma61s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        // ===========================
        // MongoDB CURD operation
        //   --------------------------------
        //      0. create a database name and collection name
        //      1. post / create
        //          1.1
        //          1.2
        //      2. get / read
        //          1.1 get all data
        //          1.2 sort by email
        //      3. post / create
        //          1.1
        //          1.2
        //      4. delete / delete
        //          1.1 delete 1
        //          1.2
        // ============================

        //  ----------------------
        //  0. create a database name and collection name
        const MenuCollection = client.db('Sushi-Sensation').collection('Menu');
        const BookingCollection = client.db('Sushi-Sensation').collection('Booking');


        // 1. post / create
        // ---------------------------------
        // post 1 iteam
        // booking
        app.post('/booking', async (req, res) => {
            const info = req.body;
            console.log(info)
            const result = await BookingCollection.insertOne(info);
            res.send(result)

        })





        // 2. get / read
        // -------------------------------
        // 2.1. get all data
        // menu
        app.get('/menu', async (req, res) => {
            const result = await MenuCollection.find().toArray();
            res.send(result)
        })

        // booking
        // sord by email
        app.get('/booking', async (req, res) => {
            const email = req.query?.email;
            console.log(email);
            let query = {};
            if(req.query?.email){
                query = { Email: req.query?.email };
            }
            const result = await BookingCollection.find(query).toArray();
            console.log(result);
            res.send(result)
        })
        //booking
        // get by id
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await BookingCollection.findOne(query);
            res.send(result);
        });




        // 2. delete / delete
        // -------------------------------
        // 2.1. delete 1 iteam
        // booking
        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await BookingCollection.deleteOne(query);
            res.send(result)
        })




        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }






}
run().catch(console.dir);








//============================================
//    *****************************************
//    mongoDB operation end 
//    *****************************************
//=============================================





















app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})