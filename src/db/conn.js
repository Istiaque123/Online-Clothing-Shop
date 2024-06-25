import mongoose from 'mongoose';

mongoose.connect( "mongodb://localhost:27017/women_dress_onlineShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,


} ).then( () => {
    console.log( `MongoDB connected successfully\n` );

    
} ).catch( ( err ) => {
    console.error( `MongoDB connection error: ${err}` );
} );

export default mongoose;