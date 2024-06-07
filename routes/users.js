const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Paramaters: None
 */
router.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})


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


/**
 * Route: /users
 * Method: POST
 * Description: Create a New User
 * Access: Public
 * Paramaters: None
 */
router.post("/", (req, res)=>{
    const {id, name, surname, emai, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each)=> each.id === id);
    if(user){
        return res.status(404).json({
            success: false,
            message: "User with the given Id exist :-("
        })
    }       //When data already present, Negative Response
    users.push(
        {id, name, surname, emai, subscriptionType, subscriptionDate
    })      //When data NOT present, add new id
    return res.status(201).json({
        success: true,
        data: users
    })      //After adding data, Positive Response
})


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Paramaters: ID
 */
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }

    const updateUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,    //Previous Data
                ...data     //Current Data
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateUser
    })

})


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Paramaters: ID
 */
router.delete("/:id", (req, res)=>{
    const {id} = req.params;
    

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: users
    })
})

module.exports = router;