import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/DataBase";
import { PORT } from "./config"
import { initial } from "./utility/initUser";

const startServer = async () =>{
    const app = express();
    await App(app);
    await dbConnection();
    app.listen( PORT, ()=>{
        console.clear()
        console.log(`App is running on port ${PORT}`);
        initial();
    })

}
startServer()