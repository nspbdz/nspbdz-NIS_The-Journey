const { journey, user } = require("../../models");
const { Op } = require("sequelize");
const moment = require('moment')

exports.addJourney = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { ...data } = req.body;
    const idUser = req.user.id
    // console.log(idUser)
    console.log("data", data)
    console.log("idUser", idUser)

    // console.log("request file", req.file);
    let newJourney = await journey.create({
      ...data,
      image: req.file.filename,
      idUser: idUser
    });


    newJourney = await journey.findOne({
      where: {
        id: newJourney.id
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },

    });
    newJourney = JSON.parse(JSON.stringify(newJourney));


    res.send({
      status: "success...",
      // data: "newJourney"
      data: {
        ...newJourney,
        image: path + newJourney.image,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};
exports.todayJourneys = async (req, res) => {

  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  // const NOW = new Date();
  const path = process.env.PATH_FILE

  try {
    let todayJourney = await journey.findAll({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START, //start hari ini
          // [Op.lt]: NOW // kurang dari hari ini
        },
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],

      attributes: {
        exclude: ["idUser", "idjourney", "updatedAt"],
      },
    });

    todayJourney = JSON.parse(JSON.stringify(todayJourney));
    todayJourney = todayJourney.map(journey => {
      console.log(journey.createdAt)
      return {
        ...journey,
        image: journey.image ? path + journey.image : null,
        createdAt: new Date(journey.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })

      }
    })
    res.send({
      status: "success...",
      data: todayJourney
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.searchJourney = async (req, res) => {
  const path = process.env.PATH_FILE
  try {

    let todayJourney = await journey.findAll({
      where: {
        title: {
          [Op.like]: '%' + req.query.title + '%'
        },
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "idjourney", "updatedAt"],
      },
    });


    todayJourney = JSON.parse(JSON.stringify(todayJourney));
    todayJourney = todayJourney.map(journey => {
      // console.log(journey.createdAt)
      return {
        ...journey,
        image: journey.image ? path + journey.image : null
      }
    })

    res.send({
      status: "success...",
      data: todayJourney
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getAllJourneys = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let newJourneys = await journey.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "idjourney", "updatedAt"],
      },
    });

    newJourneys = JSON.parse(JSON.stringify(newJourneys));
    newJourneys = newJourneys.map(journey => {
      return {
        ...journey,
        image: journey.image ? path + journey.image : null,
        createdAt: new Date(journey.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })

      }
    })

    res.send({
      status: "success...",
      data: newJourneys
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getJourneyById = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { id } = req.params;
    //   console.log(id)
    let journeys = await journey.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
    });

    journeys = JSON.parse(JSON.stringify(journeys))


    res.send({
      status: "success...",
      data: {
        ...journeys,
        image: path + journeys.image,
      },
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};


exports.updateJourney = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const { id } = req.params;
    const idUser = req.user.id
    const image = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      image
    }
    //   console.log(id)
    await journey.update(data, {
      where: {
        id,
      },
    });
    let journeys = await journey.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
    });

    journeys = JSON.parse(JSON.stringify(journeys))


    res.send({
      status: "success...",
      data: {
        ...journeys,
        image: path + journeys.image,
      },
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};



exports.getUserJourney = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const idUser = req.user.id
    //   console.log(id)
    let journeys = await journey.findAll({
      where: {
        idUser: idUser
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
    });

    journeys = JSON.parse(JSON.stringify(journeys))
    journeys = journeys.map((journey) => {
      journey = {
        ...journey,
        image: journey.image ? path + journey.image : null,
        createdAt: new Date(journey.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })


      }
      return journey

    })

    res.send({
      status: "success...",
      data: {
        journeys
      },
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUserJourney = async (req, res) => {

  try {
    const idUser = req.user.id
    const { id } = req.params;

    let deleteJourney = await journey.destroy({
      where: {
        id: id
      },
    });
    deleteJourney = await journey.findOne({
      where: {
        id: id

      },
    });
    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
      data: deleteJourney
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};



