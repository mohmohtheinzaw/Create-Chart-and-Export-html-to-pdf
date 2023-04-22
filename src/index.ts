import http from "http"
import express from "express"
import bodyParser from "body-parser"
import validator from "express-validator"

const charts = require('./route/chart')

class App {
    httpPort: number = 3000
    app:any
    httpServer:any

    configs :Array<any> =[
        {
            name:"Access-Control-Allow-Origin",
            val :"*",
        },
        {
            name:"Access-Control-Allow-Methods",
            val:"GET,POST,PUT,DELETE,PATCH,OPTIONS"
        },
        {
            name:"Access-Control-Allow-Headers",
            val: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token",
        }
    ]

    constructor(){
        this.setupApplication()
    }

    setupApplication(){
        this.app = express()

        //initialize http server
        this.httpServer = http.createServer(this.app)
        
        this.app.use((req: any, res: any, next: any) => { this.configs.map((config: { name: string; val: string }) => res.set(config.name, config.val)); next() })

        //use third party libaray
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(validator())

        //this.app.use("/api/items",items)
        this.app.use("/api/charts",charts)
       // this.app.use("/api/test",test)

    }

    startServer(){
        this.httpServer.listen(this.httpPort,()=>{
            console.log("Http server is running on port" + this.httpPort);
        })
    }
}
const expressApp = new App()
expressApp.startServer()