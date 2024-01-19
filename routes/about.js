const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get("/", (request, response) => {
    
        return response.send('about section');
    
    //   response.sendFile(path.join(__dirname, "./static/index.html"));
      // response.send("hello prasanth  from express ;)");
    });
    router.get("/:shortname", (request, response) => {
    
        return response.send(`about ${request.params.shortname}`);
    
    //   response.sendFile(path.join(__dirname, "./static/index.html"));
      // response.send("hello prasanth  from express ;)");
    });
    return router;
};