import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    

},{ timestamps:true } );


export const ContactModel = mongoose.model('Contact', contactSchema);