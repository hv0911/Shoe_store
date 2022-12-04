const app = require('./app');
const { connectDatabase } = require('./config/database');

connectDatabase();
// adding cloudinary later


const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});