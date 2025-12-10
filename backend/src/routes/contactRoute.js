
import { Router } from 'express';
import { ContactModel } from '../models/contact-model.js';
import { authMiddleware } from '../middlewares/auth-middleswares.js';

export const contactRouter = Router();



contactRouter.post('/create', authMiddleware, async (req, res) => {
    try {
        const { name, lastname, phone } = req.body;
        const userId = req.user.userId; 


        const contact = await ContactModel.create({ name, lastname, phone, userId });
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

contactRouter.get('/',authMiddleware, async (req, res) => {
    try {
        const contacts = await ContactModel.find({userId:req.user.userId});
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ err: 'Failed to fetch contacts' });
    }

});

// contactRouter.get('/:name', authMiddleware, async (req, res) => {
//     try {
//         const { name } = req.params;
//         const contacts = await ContactModel.find({ name, userId: req.user.userId });
//         res.json(contacts);
//     } catch (err) {
//         res.status(500).json({ err: 'Failed to fetch contacts' });
//     }
// });


contactRouter.put('/:id',authMiddleware, async (req, res) => {

    try {
        const updated = await ContactModel.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true });
        
        if (!updated) {
           return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ err: 'Failed toupdate contact' });
    }
});

contactRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.userId; // hämtar userId från token

    console.log('Trying to delete contact:', contactId, 'for user:', userId);

    // Hitta först kontakten
    const contact = await ContactModel.findOne({ _id: contactId, userId });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found or you do not have permission' });
    }

    // Radera kontakten
    await ContactModel.deleteOne({ _id: contactId, userId });
    res.json({ message: 'Contact deleted' });

  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});