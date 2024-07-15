const app = require("./app");
const connectDatabase = require("./db/Database");


// handling uncaught exception 
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`);

    
})

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/.env"});
}

// const dotenv = require("dotenv");

// //config

// dotenv.config({path:"backend/config/config.env"});



// app.listen(process.env.PORT,()=>{
//     console.log("Server is running on port "+process.env.PORT);
// })

// Connection Database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
process.on('unhabledRejection', (err)=>{{
    console.log(`Shutting down the server for ${error.message}`);
    console.log(`Shutting down the server for unhandle Promise rejection`);

    server.close(()=>{
        process.exit(1);
    })

}})