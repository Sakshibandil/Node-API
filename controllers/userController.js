const users = require("../models/UserSchema");
const moment = require("moment");

//create user
exports.userpost = async (req, res) => {
  //console.log(req.body)
  const { firstname, email, mobile, gender, status } = req.body;
  if (!firstname || !email || !mobile || !gender || !status) {
    res.status(400).json({ error: "All inputs are required" });
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      res.status(400).json({ error: "This user already exists" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        firstname,
        email,
        mobile,
        gender,
        status,
        dateCreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//get all users

exports.getUsers = async (req, res) => {

    const search = req.query.search || "";
    //console.log("search", search)
    const status = req.query.status || "All";
    const gender = req.query.gender || "All";
    const sort = req.query.sort || "";
    const page = parseInt(req.query.page) || 1;
    const ItemsPerPage = parseInt(req.query.items) || 4;
    

    const query ={
        firstname:{$regex:search, $options:"i"}
    }

    if(status !== "All"){
        query.status = status
    }

    if(gender !== "All"){
        query.gender = gender
    }
    //console.log("query", query)


  try {
    //skip
    const skip =(page - 1) * ItemsPerPage 

    // count document

    const count = await users.countDocuments(query);

    const userData = await users.find(query)
    .sort({dateCreated:sort == "new"? -1 : 1})
    .limit(ItemsPerPage)
    .skip(skip)

    const pageCount = Math.ceil(count/ItemsPerPage );


    res.status(200).json({
        pagination:{
            count:pageCount
        },
         userData
       
    });
    console.log(userData)
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//get single user

exports.getsingleuser = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUserData = await users.findOne({ _id: id });
    res.status(200).json(singleUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//delete user

exports.deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUserData = await users.findByIdAndDelete({ _id: id });

    res.status(200).json(deleteUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//update user

exports.updateuser = async(req,res)=>{
    const {id} = req.params;
   const {firstname, email, mobile, gender, status} = req.body;
    try{
        const dateupdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const updateuserdata = await users.findByIdAndUpdate({_id:id}, { firstname,
            email,
            mobile,
            gender,
            status,
            dateupdated: dateupdate},{new:true});

            await updateuserdata.save();
            res.status(200).json(updateuserdata)
    }catch(error){
        res.status(400).json(error);
        console.log("catch block error");

    }
}
