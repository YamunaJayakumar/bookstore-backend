// import express
const express = require('express')
// import usercontroller
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const AdminMiddleware=require('../middlewares/AdminMiddleware')
// create router object
const router = new express.Router()

// define path for client api request
// register

router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
//google login
router.post('/google/sign-in',userController.googleLoginController)
// get home data
router.get('/books/home',bookController.getHomeBooksController)

//--------------------------------- authorised user -----------------------------

// add book -req body content is formdata

router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

// get all books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBookPageController)

// get all user uploaded books page

router.get('/user-books/bought',jwtMiddleware,bookController.getUserUploadedBookProfilePageBookController)


// get single- view book details
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

// user edit - request body content is form data
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)

// delete book
router.delete('/books/:id',jwtMiddleware,bookController.deleteBookController)
// get payment
router.put('/books/:id/buy',jwtMiddleware,bookController.bookPaymentController)

//---------------------------authorised admin------------------

//get all books 
router.get('/admin-books/all',AdminMiddleware,bookController.getAllBooksController)

//get all users
router.get('/admin-users/all',AdminMiddleware,userController.getAllUsersController)

//update books by admin
router.put('/books/:id/update',AdminMiddleware,bookController.updateBookStatusController)
module.exports=router