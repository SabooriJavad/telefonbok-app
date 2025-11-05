import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    lastname: { type: String, required: true, unique: true },
    
    

},{ timestamps:true } );


export const ContactModel = mongoose.model('Contact', contactSchema);