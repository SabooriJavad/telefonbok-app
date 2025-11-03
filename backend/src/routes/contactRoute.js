
import { Router } from 'express';
import { ContactModel } from '../models/contact-model.js';

export const contactRouter = Router();



contactRouter.post('/', async (req, res) => {
    try {
       
        const contact = await ContactModel.create(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

contactRouter.get('/', async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ err: 'Failed to fetch contacts' });
    }

});
contactRouter.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const contacts = await ContactModel.find({username});
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ err: 'Failed to fetch contacts' });
    }

});

contactRouter.put('/:id', async (req, res) => {

    try {
        const updated = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updated) {
           return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ err: 'Failed toupdate contact' });
    }
});

contactRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await ContactModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'contact not found' });
        }
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});
