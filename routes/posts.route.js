let Post = require("../models/post.model").Post;
let uniqid = require("uniqid");
let express = require("express");
let router = express.Router();
let authMiddleware = require("../middleware/auth");

router.get("/", async (req, resp) => {
  let posts = await Post.find();
  resp.send(posts);
});

router.get("/:id", async (req, resp) => {
  let id = req.params.id;
  let post = await Post.findOne({ id: id });
  resp.send(post);
});

router.post("/", authMiddleware, async (req, resp) => {
  try {
    const reqBody = req.body;
    let imagePath;

    // Check if an image URL is provided or if a file was uploaded
    if (reqBody.imageUrl) {
      imagePath = reqBody.imageUrl;
    } else if (req.file) {
      imagePath = `/images/${req.file.filename}`; // Set path for the image in public/images folder
    } else {
      return resp.status(400).send("Image is required.");
    }

    // Create a new Post instance
    const newPost = new Post({
      id: uniqid(),
      title: reqBody.title,
      date: new Date(),
      description: reqBody.description,
      text: reqBody.text,
      country: reqBody.country,
      imageUrl: imagePath,
    });

    // Save the post to the database
    await newPost.save();

    // Send a success response
    resp.status(201).send("Post Created");
  } catch (error) {
    console.error(error);
    resp.status(500).send("Server Error");
  }
});
// router.post('/', authMiddleware, async (req,resp)=>{
//     let reqBody= req.body;
//     let imagePath;
//     if(reqBody.imageUrl){
//         imagePath= reqBody.imageUrl;
//     }else{
//         imagePath=  req.file.path.substring(req.file.path.indexOf('/'),req.file.path.length);
//     }
//     let newPost= new Post({
//         id: uniqid(),
//         title: reqBody.title,
//         date: new Date(),
//         description: reqBody.description,
//         text: reqBody.text ,
//         country : reqBody.country,
//         imageUrl: imagePath
//     });
//     await newPost.save();
//     resp.send('Created');
// })

router.delete("/:id", authMiddleware, async (req, resp) => {
  let id = req.params.id;
  await Post.deleteOne({ id: id });
  resp.send("Deleted");
});

router.put("/:id", authMiddleware, async (req, resp) => {
  let id = req.params.id;
  await Post.updateOne({ id: id }, req.body);
  resp.send("Updated");
});

module.exports = router;
