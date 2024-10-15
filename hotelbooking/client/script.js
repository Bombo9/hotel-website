// Handle form submission for booking a room
document.getElementById('booking-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const roomType = document.getElementById('room-type').value;
    const roomNumber = document.getElementById('room-number').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    try {
        const response = await fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, roomType, roomNumber, checkIn, checkOut }),
        });

        if (response.ok) {
            alert('Booking successful! A confirmation email has been sent.');
            // Optionally, you can reset the form after submission
            document.getElementById('booking-form').reset();
        } else {
            const errorData = await response.json();
            alert(`Error booking room: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    }
});

// Call fetchRooms on page load
// Removed the function for fetching rooms if not needed
window.onload = function() {
    // You can place any additional setup logic here if needed
};
