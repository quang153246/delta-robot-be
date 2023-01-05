import express from "express";
import App from "./services/ExpressApp";
import { PORT } from "./config";
import { initial } from "./utility";

const startServer = async () =>{
    const app = express();

    await App(app);
    app.listen( PORT, ()=>{
        console.clear();
        console.log(`App is running on port ${PORT}`);
        initial()
    })

}
startServer()



