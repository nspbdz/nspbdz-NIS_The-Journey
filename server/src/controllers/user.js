const { user } = require("../../models");


exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
    
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
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



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({  
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};


exports.updateUser = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const { id } = req.params;
    const idUser = req.user.id
    const image = req.file.filename
    console.log(data)
    console.log(idUser)
    // console.log("image",image)
    data = {
      ...data,
      image
  }
  console.log(data)

    await user.update(data, {
          where: {
            id:idUser,
      },
    });
    let users = await user.findOne({
      where: {
        id:idUser,
      },
      attributes: {
        exclude: ["password", "idUser", "createdAt", "updatedAt"],
      },
    });
    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success...",
      data: {
        ...users,
        image: path + users.image,
      },
    });
   
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  } 
};

exports.getDetailUser = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const idUser = req.user.id
    const { id } = req.params;
    console.log(id)
    let users = await user.findOne({
      where: {
        id:idUser
      },
      attributes: {
        exclude: [ "password" ,"idUser" ,"createdAt", "updatedAt"],
      },
    });
   
   users = JSON.parse(JSON.stringify(users))
 
    res.send({
      status: "success...",
      data: {
        ...users,
        image: path + users.image,
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