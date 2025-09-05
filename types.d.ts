import { Connection } from "mongoose";


declare global  {
    var mongoose: {
        con: Connection | null;
        promise: Promise<Connection> | null;
    };
}

export {}; // the file is treated as module 