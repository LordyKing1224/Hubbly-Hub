<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $numHookahs = $_POST['numHookahs'];
    $location = $_POST['location'];
    $paymentToken = $_POST['paymentToken'];

    // Process payment with YOCO using the payment token
    // This would involve sending the token to YOCO's servers for verification and charging

    // If payment is successful, send email confirmation
    $to = $email;
    $subject = "Booking Confirmation - Hubbly Hub";
    $message = "Dear $name $surname,\n\nThank you for your booking. Here are the details:\n\nLocation: $location\nNumber of Hookahs: $numHookahs\nTotal: R" . ($numHookahs * 350) . "\n\nWe look forward to serving you!\n\nHubbly Hub Team";
    $headers = "From: no-reply@hubblyhub.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email.']);
    }
}
?>
