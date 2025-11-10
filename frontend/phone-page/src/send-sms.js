const urlParams = new URLSearchParams(window.location.search);
const phone = urlParams.get('phone');
const name = urlParams.get('name');

const contactInfo = document.getElementById('contactInfo');
const smsText = document.getElementById('smsText'); 
const sendBtn = document.getElementById('sendBtn');

contactInfo.textContent = `Send SMS to ${name} (${phone})`;

sendBtn.addEventListener('click', async () => {
    const message = smsText.value.trim();
    if (!message) {
        alert('Write a message first');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/phone/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: phone, message })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err || 'Failed to send SMS');
        }

        alert('SMS sent successfully!');
        smsText.value = '';
    } catch (err) {
        console.error(err);
        alert('Failed to send SMS: ' + err.message);
    }
});
