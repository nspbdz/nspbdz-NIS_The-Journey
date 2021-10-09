const { bookmark, user, journey } = require("../../models");
const { Op } = require("sequelize");
const sequelize = require('sequelize')


exports.addBookmark = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { ...data } = req.body;
    const { id } = req.params;

    const idUser = req.user.id
    console.log(id)
    console.log("data", data)
    console.log("idUser", idUser)

    const checkBookmark = await bookmark.findOne({
      where: {
        idUser: idUser,
        idJourney: id
      }
    })
    if (checkBookmark) {
      console.log("masuk")
      return res.send({
        status: 'failed',
        message: 'user Already have bookmark this journey'
      })
    }

    let newBookmark = await bookmark.create({
      idUser: idUser,
      idJourney: id
    });


    newBookmark = await bookmark.findOne({
      where: {
        id: newBookmark.id
        // id: id
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["id", "idUser", "createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },

    });

    newBookmark = JSON.parse(JSON.stringify(newBookmark))
    newBookmark = {
      ...newBookmark,
      journey: {
        ...newBookmark.journey,
        image: newBookmark.journey.image ? path + newBookmark.journey.image : null,
      },

    }
    res.send({
      status: "success...",
      // data: "newBookmark"
      data: newBookmark

    });

  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};
exports.getMostBookmarked = async (req, res) => {
  const path = process.env.PATH_FILE

  try {

    let bookmarks = await bookmark.findAll({

      attributes: ['idJourney', [sequelize.fn('count', sequelize.col('idJourney')), 'count']],
      group: ['bookmark.idJourney'],
      // raw: true,
      order: sequelize.literal('count(*) DESC'),
      limit: 4,
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["idUser", "updatedAt"],
          },
        },

      ],


    });

    bookmarks = JSON.parse(JSON.stringify(bookmarks))
    bookmarks = bookmarks.map((bookmark) => {
      // console.log(bookmark.journey.image)
      console.log(bookmark)
      return {
        ...bookmark,
        // bookmark"journey.image",
        journey: {
          ...bookmark.journey,
          image: bookmark.journey.image ? path + bookmark.journey.image : null,
          createdAt: new Date(bookmark?.journey?.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })

        },
      }


    })
    res.send({
      status: "success...",
      // data: newBookmark
      data: {
        bookmarks
        // count:bookmarks.count

      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBookmark = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const idUser = req.user.id

    let bookmarks = await bookmark.findAll({
      where: {
        idUser: idUser
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["idUser", "updatedAt"],
          },
        },

      ],

      attributes: {
        exclude: ["idProduct", "idUser", "createdAt", "updatedAt"],
      },
    });

    bookmarks = JSON.parse(JSON.stringify(bookmarks))
    bookmarks = bookmarks.map((bookmark) => {
      // console.log(bookmark.journey.image)

      return {
        ...bookmark,
        journey: {
          ...bookmark.journey,
          image: bookmark.journey.image ? path + bookmark.journey.image : null,
          createdAt: new Date(bookmark?.journey?.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })

        },
      }


    })


    res.send({
      status: "success...",
      // data: newBookmark
      data: {
        bookmarks

      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getAllBookmark = async (req, res) => {
  const path = process.env.PATH_FILE

  try {

    let bookmarks = await bookmark.findAll({

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["idUser", "updatedAt"],
          },
        },

      ],

      attributes: {
        exclude: ["idProduct", "idUser", "createdAt", "updatedAt"],
      },
    });

    bookmarks = JSON.parse(JSON.stringify(bookmarks))
    bookmarks = bookmarks.map((bookmark) => {
      // console.log(bookmark.journey.image)

      return {
        ...bookmark,
        journey: {
          ...bookmark.journey,
          image: bookmark.journey.image ? path + bookmark.journey.image : null,
          createdAt: new Date(bookmark?.journey?.createdAt).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: '2-digit', })

        },
      }


    })


    res.send({
      status: "success...",
      // data: newBookmark
      data: {
        bookmarks

      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id


    await bookmark.destroy({
      where: {
        idUser: idUser,
        idJourney: id
      },
    });
    let bookmarks = await bookmark.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete bookmark id: ${id} dan idUser ${idUser} success`,
      // data:productDelete
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};