const app = require("./app");


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

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.eventNames.PORT}`)
})
process.on('unhabledRejection', (err)=>{{
    console.log(`Shutting down the server for ${error.message}`);
    console.log(`Shutting down the server for unhandle Promise rejection`);
}})