import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router(); //acces to express router

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

export default router