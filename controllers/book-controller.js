const {UserModel, BookModel} = require("../models");


// router.get("/", (req, res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })

exports.getAllBooks = async (req, res) => {     //async & await - is required in order to make sure our Applications are working in a Normal Way
    const books = await BookModel.find();

    if(books.length === 0) 
        return res.status(404).json({
    success: false,
    message: "No Book Found"
});

return res.status(200).json({
    success: true,
    data: books
})
}

// router.get("/:id", (req, res)=>{
//     const {id} = req.params;
//     const book = books.find((each)=> each.id === id);
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: "Book Not Found For The Given Id :-("
//         })
//     }
//     return res.status(200).json({
//         success: true,
//         data: book
//     })
// })

exports.getSingleBookById = async (req, res)=>{     //books.js - JS55       ...//Copy the above Commented lines & modify in that - Smart Work
    const {id} = req.params;
    // const book = books.find((each)=> each.id === id);
    const book = await BookModel.findById(id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Not Found For The Given Id :-("
        })
    }
    return res.status(200).json({
        success: true,
        data: book
    })
}


exports.addNewBook = async(req, res)=>{
    const {data} = req.body;

    if(!data)       //If no Data...  ,   ...user not passes any data
         return res.status(404).json({
        success: false,
        message: "No Data Provided"
    })

    // const book = books.find((each)=> each.id === id);
    await BookModel.create(data)        //Adding a Field
    const allBooks = await BookModel.find()     //getting all the Books present in the Table
    // if(book){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Book with the given Id exist :-("
    //     })
    // }
    // books.push(
    //     {id, name, author, genre, price, publisher
    // })

    // const allBooks = [...books, data]
    return res.status(201).json({
        success: true,
        data: allBooks
    })
}


// module.exports = {getAllBooks, getSingleBookById}