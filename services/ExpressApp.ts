import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AdminRoute, MissionRoute, RobotRoute  } from "../routes";
export default async (app: Application) => {

    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(cors({
        origin: '*'
    }));
    app.use( '/admin', AdminRoute);
    app.use( '/robot', RobotRoute);
    app.use( '/mission', MissionRoute);

    return app;

}