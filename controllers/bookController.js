const books = require('../models/bookModel')

// add book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
     
    // get book details from request req body , upload files from request files & seller mail from req payload
    const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category} = req.body
    const uploadImages = req.files.map(item=>item.filename)
    const sellerMail = req.payload
    console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail);
    try{
        // check book already exists
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook)
        {
            res.status(401).json("Uploaded book is already exists... Request failes!!!!!!!!")

        }else{
            const newBook = await books.create({
                title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail
            })
            res.status(200).json(newBook)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
    
   
  
}

// get home books - guest user
exports.getHomeBooksController = async (req,res)=>{
    console.log("Inside getHomeBooksController");
     
   try{
        // get newly added 4 books from db
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
       
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
    
   
  
}

// get all books-login  user
exports.getUserAllBookPageController = async (req,res)=>{
    console.log("Inside getUserAllBookPageController");
    // login user mail from token
     const loginUserMail = req.payload
   try{
        // get all books from db expect loggin user
        const allBooks = await books.find({sellerMail:{$ne:loginUserMail}})
        res.status(200).json(allBooks)
       
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
    
   
  
}



// get all user uploaded books
exports.getUserUploadedBookProfilePageBookController = async (req,res)=>{
    console.log("Inside getUserProfilePageBookController");
    //get login user mail from token
     const loginUserMail = req.payload
   try{
        // get all books uploaded by  user
        const allUserBooks = await books.find({sellerMail:{$eq:loginUserMail}})
        res.status(200).json(allUserBooks)
       
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
    
   
  
}

// get all user bought books
exports.getUserBoughtBookProfilePageBookController = async (req,res)=>{
    console.log("Inside getUserBoughtBookProfilePageBookController");
    //get login user mail from token
     const loginUserMail = req.payload
   try{
        // get all purchasedbook 
        const allUserPurchaseBooks = await books.find({buyerMail:{loginUserMail}})
        res.status(200).json(allUserPurchaseBooks)
       
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
    
   
  
}


