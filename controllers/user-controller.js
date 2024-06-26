const {UserModel, BookModel} = require("../models");        //Same statement as book-controller.js

exports.getAllUsers = async (req, res)=>{

    const users = await UserModel.find();       //...Fill all the fields same like books

    if(users.length === 0)
        return res.status(404).json ({
    success: false,
    message: "No Books Found"
    })

    res.status(200).json({
        success: true,
        data: users
    })
}


exports.getSingleUserById = async (req, res)=>{
    const {id} = req.params;
    // const user = users.find((each)=> each.id === id);
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
}



exports.addNewUser = async (req, res)=>{
    const { name, surname, email, subscriptionType, subscriptionDate} = req.body;

    // const user = users.find((each)=> each.id === id);

    // if(user){
    //     return res.status(404).json({
    //         success: false,
    //         message: "User with the given Id exist :-("
    //     })
    // }
    // users.push(
    //     {id, name, surname, email, subscriptionType, subscriptionDate
    // })

    const newUser = await UserModel.create({        //Adding a New User entry
        name, surname, email, subscriptionType, subscriptionDate
    })

    return res.status(201).json({
        success: true,
        data: newUser       //passing the NewUser - JS53
    })
}

exports.updateUserById = async (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    // const user = users.find((each)=> each.id === id);

    const updatedUserData = await UserModel.findOneAndUpdate({
        _id:id
    },{
        $set:{
            ...data,        //Whatever data we get, just Spread it out
        }
    }, {new: true})

    if(!updatedUserData){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }

    // const updateUser = users.map((each)=>{
    //     if(each.id===id){
    //         return {
    //             ...each,
    //             ...data
    //         }
    //     }
    //     return each;
    // })
    return res.status(200).json({
        success: true,
        data: updatedUserData
    })

}


exports.deleteUser = async (req, res)=>{
    const {id} = req.params;
    

    // const user = users.find((each)=> each.id === id);
    const user = await UserModel.deleteOne({
        _id:id
    })
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }
    // const index = users.indexOf(user);
    // users.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: user
    })
}



exports.getSubscriptionDetailsById = async (req, res)=>{
     const {id} = req.params;
    

    // const user = users.find((each)=> each.id === id);
    const uder = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }

    const getDateInDays = (data = "")=>{
        let date;
        if(data === ""){
            // current date
            date = new Date();
        }else{
            // getting date on basis of data variable
            date= new Date(data)
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24))
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };

    // JAN 1, 1970 UTC // milli seconds
    let returnDate = getDateInDays(user.returnDate)
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired:  subscriptionDate < currentDate,
        daysLeftForExpirtaion: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    return res.status(200).json({
        success: true,
        data,
    })

}