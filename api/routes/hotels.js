const express = require('express');
const {createHotel,updateHotel,deleteHotel,getHotel,getAllHotel, countByCity, countByType, getHotelRooms} = require('../controllers/hotel');
const {verifyAdmin} = require('../utils/verifyToken')

const router = express.Router();

//CREATE
router.post("/", verifyAdmin ,createHotel)

//UPDATE
router.put("/:id", verifyAdmin ,updateHotel);

//DELETE
router.delete("/:id", verifyAdmin ,deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getAllHotel);
router.get("/find/countByCity", countByCity);
router.get("/find/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;