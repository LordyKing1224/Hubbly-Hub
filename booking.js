function calculateTotal() {
    var numHookahs = document.getElementById('numHookahs').value;
    var total = numHookahs * 350;
    document.getElementById('total').innerText = 'Total: R' + total;
}

function handleBooking(event) {
    event.preventDefault();
    var total = document.getElementById('total').innerText.split('R')[1];
    
    // Initialize YOCO SDK
    var yoco = new window.YocoSDK({
        publicKey: 'YOUR_PUBLIC_KEY'
    });

    yoco.showPopup({
        amountInCents: total * 100, // amount in cents
        currency: 'ZAR',
        name: 'Hubbly Hub Booking',
        callback: function (result) {
            if (result.error) {
                alert("Payment failed: " + result.error.message);
            } else {
                alert("Payment successful! Token: " + result.id);
                sendBookingDetails(result.id);
            }
        }
    });
}

function sendBookingDetails(paymentToken) {
    var formData = new FormData(document.getElementById('booking-form'));
    formData.append('paymentToken', paymentToken);

    // Here you would send the form data to your server for processing
    fetch('process_booking.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert("Booking confirmed! An email has been sent.");
        } else {
            alert("There was an error processing your booking.");
        }
    });
}
