const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express()
const port = process.env.PORT || 3000

// app.use(router);
//simple get
app.get('/', (req, res) => { 
    res.send('Hello People'); 
});

// 2. this is second method of multer.....

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    },
        filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage, limits: {
          fileSize: 5242880 // 5242880 Bytes = 5 MB
        },
        fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})

app.post('/uploads', upload.single('image'), function (req, res) {
    console.log(req.file, req.body)
    res.send(req.file);
 });

// For multiple image upload
app.post('/uploadBulkImage', upload.array('images', 12),(req, res) => {
    res.send(req.files)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 });

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});