const routers=require('express').Router();

// const conn = require('../config/db');
// const router = require('./tutorialsRouts');

class AppRoute {


    initAppRouts() {
        this.#rootRoute();
        this.#userRouts();
        this.#surveyRouts();
        this.#questionRouts();
        return routers;
    }

    #rootRoute(){

        routers.get('/',(req,res)=>{
            res.send("OK");
        });

    }

    #userRouts(){
        routers.use("/user",require("../../routers/user_routes/user_routes") );
    }


    #surveyRouts(){
        routers.use("/survey",require("../../routers/survey_routes/survey_routes") );
    }


    #questionRouts(){
        routers.use("/question",require("../../routers/questions_routes/question_routes") );
    }




}

module.exports  = AppRoute;


