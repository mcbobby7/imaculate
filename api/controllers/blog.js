const mongoose = require('mongoose');
const Blog = require('../models/blog');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


exports.post_blog = (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.body,
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        date: req.body.date,
        tag: req.body.tag,
        image: req.file.path,

    });
    blog.save().then(result => {
        res.status(200).json({
            message: "blog created successfully",
            createdProperty: {
                _id: result._id,
                body: result.body,
                title: result.title,
                imgUrl: result.imgUrl,
                date: result.data,
                tag: result.tag,
                image: result.image,
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/blog/" + result._id
                }
            } 
        });
    })
    .catch(err => console.log(err));

    
}

exports.get_blogs = (req, res, next) => {
    Blog.find()
    .select("body title imgUrl date tag _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            blogs: docs.map(doc => {
                return {
                    _id: doc._id,
                    body: doc.body,
                    title: doc.title,
                    imgUrl: doc.imgUrl,
                    date: doc.date,
                    tag: doc.tag,
                    request: {
                        type: "GET, PATCH, DELETE",
                        url: `http://localhost:4000/blog/${doc._id}`
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.single_blog = (req, res, next) => {
    const id = req.params.blogId;
    Blog.findById(id)
    .select("body title imgUrl date tag _id")
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                event: doc,
                request: {
                    type: "PATCH, DELETE",
                    url: "http://localhost:4000/blog/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "No valid entry found for blog"
            });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
}

exports.patch_blog = (req, res, next) => {
    const id = req.params.blogId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Blog.update({ _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'blog updated successfully',
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/blog/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_blog = (req, res, next) => {
    const id = req.params.blogId;
    Blog.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'blog deleted successfully',
                request: {
                    type: "POST",
                    url: "http://localhost:4000/blog/",
                    body: {
                        body: 'String',
                        title: 'String',
                        imgUrl: 'String',
                        date: 'String',
                        tag: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
