const express = require("express");
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../codecraft-8d13c-caadf388441f.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'codecraft-8d13c.appspot.com',
});
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = () => {
  router.post("/", upload.single('image'),async(req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
    
        // Get the file data
        const fileBuffer = req.file.buffer;
    
        // Create a unique filename or use the original filename
        const filename = Date.now() + '-' + req.file.originalname;
    
        // Specify the file path in Firebase Storage
        const filePath = 'images/' + filename;
    
        // Upload the file to Firebase Storage
        const bucket = admin.storage().bucket();
        const file = bucket.file(filePath);
        await file.save(fileBuffer, {
          metadata: {
            contentType: req.file.mimetype,
          },
        });
    
        // Get the public URL of the uploaded file
        // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    
        // res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
         // Generate a signed URL with a temporary authentication token
         const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: '01-01-2100', // Replace with an appropriate expiration date
        });
    
        res.status(200).json({ message: 'File uploaded successfully', url: signedUrl });
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
      }
  });
  return router;
};
