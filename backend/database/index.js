import mongoose from "mongoose"

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to database -> MongoDB succesfully")
    }
    catch (error) {
        console.log(`Some error occured while connecing to database: ${error}`);
    }
}

export default ConnectDB;