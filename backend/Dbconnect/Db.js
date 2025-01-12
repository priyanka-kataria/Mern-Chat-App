MONGODB_URI="mongodb+srv://priyankaiitd22:K7jnWMDq69Lrw5kG@cluster0.je2xg.mongodb.net/";
const mongoose= require("mongoose");

const connectDB= async()=>{
    console.log("objejhhct")
    try {
        const connect= await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDb connect successfully:,${connect.connection.host}`)

    } catch (error) {
        console.log(`error while connecting to the database:, ${error}`)
    }
}
module.exports=connectDB