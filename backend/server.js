import app from "./app.js";
import connectDB from "./database/index.js";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("The following error occured: ", error);
            throw error
        })
        app.listen(process.env.PORT || 5000, () => {
            console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed, The following error occured: ", err)
    });