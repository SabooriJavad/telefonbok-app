// Hämta contactId och name från URL
const urlParams = new URLSearchParams(window.location.search);
const contactId = urlParams.get('id'); // IMPORTANT
const name = urlParams.get('name') || 'contact';

const contactInfo = document.getElementById('contactInfo');
const smsText = document.getElementById('smsText');
const sendBtn = document.getElementById('sendBtn');

// Visa kontaktinfo i UI (namn)
contactInfo.textContent = `Send SMS to ${name}`;

sendBtn.addEventListener('click', async () => {
    const message = smsText.value.trim();

    if (!message) {
        alert('Write a message first');
        return;
    }

    if (!contactId) {
        alert('No contact selected!');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/phone/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contactId, // skickar ID istället för phone
                message
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to send SMS');
        }

        alert('SMS sent successfully!');
        smsText.value = '';
        console.log('SMS Result:', data);

    } catch (err) {
        console.error(err);
        alert('Failed to send SMS: ' + err.message);
    }
});
