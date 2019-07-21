const Car = require('../models/car');
const keys = require('../config/keys');
const smartcar = require('smartcar');
const got = require('got');

var carController = {};
let _accessToken = null;
const SMARTCAR_API = 'https://api.smartcar.com/v1.0';

const client = new smartcar.AuthClient({
    clientId: keys.smartcarClientId,
    clientSecret: keys.smartcarClientSecret,
    redirectUri: keys.redirectURI,
    scope: ['read_vehicle_info'],
    testMode: true, // launch Smartcar Connect in test mode
});

carController.getSmartCarOauthURL = async (req, res) => {
    const link = client.getAuthUrl();
    res.status(200).json({
        link
    })
}

carController.handleSmartCarCB = async (req, res) => {
    const code = req.query.code;
    const token = await client.exchangeCode(code);
    this._accessToken = token.accessToken;
    const vehicleIds = smartcar.getVehicleIds(this._accessToken);
    res.status(200).json({
        code: 200,
        message: "get token sucessful",
        vehicleIds: vehicleIds
    });
}

carController.getAccessToken = async (req, res) => {
    res.status(200).json(this._accessToken);
}

carController.addCar = async (req, res) => {
    let newCar = new Car();

    newCar.ownerId = req.body.ownerId;
    newCar.carName = req.body.carName;
    newCar.make = req.body.make;
    newCar.model = req.body.model;


    newCar.save();
    res.status(201).send({
        newCar: newCar,
        status: 201,
        message: "Car Created Sucessful"
    })
    // =======
    //     const savedUser = await newUser.save();
    //     res.json(savedUser);
    // >>>>>>> master

}

carController.findCarByOwnerId = async (req, res) => {
    console.log("!!!inside findCarByOwnerId", req.params);
    const { ownerId } = req.params;
    Car.getCarByOwnerId(ownerId, (err, car) => {
        if (!err) {
            if (car) {
                res.status(200).send({
                    status: 200,
                    carInfo: car
                });
            } else {
                res.status(200).send({
                    status: 200,
                    carInfo: null
                });
            }

        } else {
            res.status(500).send({
                status: 500,
                message: "encounter problems when findCarByOwnerId"
            })
        }
    });
}

carController.get_sm_vehicles = async (req, res) => {
    // const vehicleIds = await smartcar.getVehicleIds(this._accessToken.accessToken);
    const vehicleIds = await got.get(
        `${SMARTCAR_API}/vehicles`,
        {
            headers: { 'Authorization': "Bearer " + this._accessToken },
            json: true
        }
    );
    // console.log("vehicleIds", vehicleIds);
    res.status(200).send(vehicleIds.vehicles);
}

module.exports = carController;