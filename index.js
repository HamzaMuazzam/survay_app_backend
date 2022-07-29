const colors = require("colors");
const express = require("express");
const dotenv = require("dotenv");
const AppRoute = require("./routers/routes_all/AppRoutes");
const morgan = require("morgan");
const app = express();
dotenv.config();
require("./db_configurations/db_connection")


app.use(morgan("dev"));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/uploads/images', express.static('uploads'));
app.use('/uploads/videos', express.static('uploads'));
app.use('/uploads/pdf_documents', express.static('uploads'));
app.use('/uploads/zip_files', express.static('uploads'));
app.use(new AppRoute().initAppRouts());

//TODO: parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`SERVER IS RUNNING ON PORT:  http://localhost:${PORT}`.bgRed);

    app.get('/create_db', async (req, res) => {

        res.send(true);
    });


})