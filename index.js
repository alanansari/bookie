const express = require('express');
const rateLimit  = require('express-rate-limit');
require('dotenv').config();
const cors=require('cors');
const cluster = require('cluster');
const os = require('os');
const helmet = require('helmet');
const mongoose = require('mongoose');
const {userRoutes, bookRoutes} = require('./routes');
const {errorMiddleware} = require('./middleware/errors');
const PORT = process.env.PORT || 3000;


const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);
  
	// Fork workers.
	for (let i = 0; i < totalCPUs; i++) {
	  cluster.fork();
	}
  
	cluster.on('exit', (worker, code, signal) => {
	  console.log(`worker ${worker.process.pid} died`);
	});
} else {
	const app = express();
	
	app.use(express.json());
	app.use(cors({origin:true}));
	app.use(express.urlencoded({ extended: false }));

    // Connect to MongoDB and Starting the Server
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log("DB Connected");
        app.listen(PORT, "0.0.0.0", () => {
          console.log(`Server is running on port ${PORT}`);
        });
    });

	// express app security
	app.use(helmet());

	// Applying Global Rate Limiter
	const limiter = rateLimit({
		windowMs: 1 * 60 * 1000, // 1 minutes
		max: 30,				// max 30 requests
		standardHeaders: true,
		legacyHeaders: false
	});
	app.use(limiter);

	// Global Error Handling
	app.use(errorMiddleware);

	// Routes
    app.use('/api/books',bookRoutes,errorMiddleware);
    app.use('/api',userRoutes,errorMiddleware);
}
