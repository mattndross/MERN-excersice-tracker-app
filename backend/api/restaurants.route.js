import express from "express"

const router = express.Router(); //acces to express router

router.route("/").get((req, res)=> res.send("this is the RestRevApp"));

export default router