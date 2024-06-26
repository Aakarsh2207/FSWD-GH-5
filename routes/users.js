const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();

const {UserModel, BookModel} = require("../models");
const { getAllUsers, getSingleUserById, addNewUser, updateUserById, deleteUser, getSubscriptionDetailsById } = require("../controllers/user-controller");


/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Paramaters: None
 */
// router.get("/", (req, res)=>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })

router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by their ID
 * Access: Public
 * Paramaters: id
 */
router.get("/:id", (req, res)=>{
    const {id} = req.params;        //id is present on url
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }       //Negative Respond - When request not found
    return res.status(200).json({
        success: true,
        data: user
    })      //Positive Response
})


router.get("/:id", getSingleUserById)

/**
 * Route: /users
 * Method: POST
 * Description: Create a New User
 * Access: Public
 * Paramaters: None
 */
// router.post("/", (req, res)=>{
//     const {id, name, surname, emai, subscriptionType, subscriptionDate} = req.body;

//     const user = users.find((each)=> each.id === id);
//     if(user){
//         return res.status(404).json({
//             success: false,
//             message: "User with the given Id exist :-("
//         })
//     }       //When data already present, Negative Response
//     users.push(
//         {id, name, surname, emai, subscriptionType, subscriptionDate
//     })      //When data NOT present, add new id
//     return res.status(201).json({
//         success: true,
//         data: users
//     })      //After adding data, Positive Response
// })


router.post("/", addNewUser)


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Paramaters: ID
 */
// router.put('/:id', (req, res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     const user = users.find((each)=> each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: "User Not Found For The Given Id :-("
//         })
//     }

//     const updateUser = users.map((each)=>{
//         if(each.id===id){
//             return {
//                 ...each,    //Previous Data
//                 ...data     //Current Data
//             }
//         }
//         return each;
//     })
//     return res.status(200).json({
//         success: true,
//         data: updateUser
//     })

// })


router.put('/:id', updateUserById)



/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Paramaters: ID
 */
// router.delete("/:id", (req, res)=>{
//     const {id} = req.params;
    

//     const user = users.find((each)=> each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: "User Not Found For The Given Id :-("
//         })
//     }
//     const index = users.indexOf(user);
//     users.splice(index, 1);

//     return res.status(200).json({
//         success: true,
//         data: users
//     })
// })

router.delete("/:id", deleteUser)


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user subscription details by their ID
 * Access: Public
 * Paramaters: ID
 */
// router.get('/subscription-details/:id', (req, res)=>{
//     const {id} = req.params;
   

//    const user = users.find((each)=> each.id === id);
//    if(!user){
//        return res.status(404).json({
//            success: false,
//            message: "User Not Found For The Given Id :-("
//        })
//    }

//    const getDateInDays = (data = "")=>{
//        let date;
//        if(data === ""){
//            // current date, present date
//            date = new Date();
//        }else{
//            // getting date on basis of data variable
//            date= new Date(data)
//        }
//        let days = Math.floor(date / (1000 * 60 * 60 * 24))      //24-Hour   60-Minute   60-Second   1000-Converting from Milliseconds to the Current Duration
//        return days;
//    };

//    const subscriptionType = (date) => {
//        if(user.subscriptionType === "Basic"){
//            date = date + 90;        //Basic is for 3months
//        }else if(user.subscriptionType === "Standard"){
//            date = date + 180;       //Standard is for 6months
//        }else if(user.subscriptionType === "Premium"){
//            date = date + 365;       //Premium is for 365days
//        }
//        return date;
//    };

//    // JAN 1, 1970 UTC // milli seconds      //-always in Milliseconds
//    let returnDate = getDateInDays(user.returnDate)
//    let currentDate = getDateInDays();
//    let subscriptionDate = getDateInDays(user.subscriptionDate);
//    let subscriptionExpiration = subscriptionType(subscriptionDate);

//    const data = {
//        ...user,
//        subscriptionExpired:  subscriptionDate < currentDate,
//        daysLeftForExpirtaion: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
//        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//    }

//    return res.status(200).json({
//        success: true,
//        data,
//    })

// })


router.get('/subscription-details/:id', getSubscriptionDetailsById)


module.exports = router;