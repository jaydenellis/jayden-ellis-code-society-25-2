	const express = require("express"); // Get express
const morgan = require("morgan"); // Get morgan
const path = require("path"); // Get path
var debug = require('debug')('myapp:server'); // Get debug logger
 
const app = express(); // Create express app
 
app.use(morgan("dev")); // Setup morgan middleware
app.use(express.static(path.join(__dirname, "public"))); // Setup static files
 
const PORT = process.env.PORT || 3000; // Setup port

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Serve index.html
    });

// Start the server
app.listen(PORT, () => {
 debug(`Server listening on http://localhost:${PORT}`);
});
