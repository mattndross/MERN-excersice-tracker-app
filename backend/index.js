import app from "./server"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port  = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {poolSize:50, //max 50 connections at the same time
    wtimeout:250, //cancel the connection if it takes more than 250seconds
    useNewUrlParse: true,}
)
.catch(()=>{
    console.error(err.stack);
    process.exit(1)
})
.then(async client => {
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    })
})