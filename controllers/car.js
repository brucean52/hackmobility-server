const Car = require('../models/car');

var carController = {};

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
                    message: car
                });
            } else {
                res.status(200).send({
                    status: 200,
                    message: "no car is found"
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

module.exports = carController;