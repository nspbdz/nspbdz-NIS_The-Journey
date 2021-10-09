const { Router } = require("express");

// Controller
const { register, login,checkAuth } = require('../controllers/auth');
const { updateJourney,deleteUserJourney,searchJourney,todayJourneys,getUserJourney,addJourney,getAllJourneys,getJourneyById } = require('../controllers/journey');
const { getAllBookmark,getMostBookmarked,addBookmark,getBookmark, deleteBookmark } = require('../controllers/bookmark');

const { getUsers,updateUser,getDetailUser, deleteUser } = require("../controllers/user");



const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router();

// Route

//auth
router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

//user 
router.patch("/user", auth,uploadFile("image"), updateUser);
// router.patch("/userUpdate", auth, updateUsers);
router.get("/user", auth, getDetailUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);


//journey
router.post("/journey", auth, uploadFile("image"), addJourney)
// router.post("/journey", auth, addJourney);
router.get("/journeys", getAllJourneys);
router.get("/todayjourney", todayJourneys);
router.get("/searchjourney", searchJourney);
router.get("/journey/:id", getJourneyById);
router.get("/journey",auth, getUserJourney);
router.delete("/journey/:id",auth, deleteUserJourney);
router.patch("/journey/:id", auth, uploadFile("image"), updateJourney)



//Bookmark
router.post("/bookmark/:id", auth, addBookmark);
router.get("/bookmark",auth, getBookmark);
router.delete("/bookmark/:id",auth, deleteBookmark);
router.get("/mostbookmark", getMostBookmarked);
router.get("/bookmarks", getAllBookmark);





















module.exports = router;
