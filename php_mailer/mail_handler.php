<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

// Validate POST inputs
$message = [];
$output = [
    'success' => null,
    'messages' => []
];

//Sanitize name field
$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
    $output['success'] = false;
    $output['messages'][] = 'missing name key';
}
//validate email field
$message['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if(empty($message['email'])){
    $output['success'] = false;
    $output['messages'][] = 'invalid email key';
}

//validate phone number
//$message['phone'] = filter_var($_POST['phone'], FILTER_VALIDATE_REGEXP);
//'options' => ]
//    'regexp'=> '/^regexpressionputhere '
//]


//Sanitize message
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
    $output['success'] = false;
    $output['messages'][] = 'invalid missing message key';
}

if($output['success'] !== null) {
    //http_response_code(400);
    echo json_encode($output);
    exit();
}
$message['message'] = nl2br($message['message']); //convert newline characters to line break html tags



$mail = new PHPMailer;
$mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = $message['email'];  // sender's email address (shows in "From" field)
$mail->FromName = $message['name'];             // Name is optional
$mail->addAddress(EMAIL_USER); // add a recipient
$mail->addReplyTo($message['email'], $message['name']);                          // Add a reply-to address


//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
//$mail->isHTML(true);                                  // Set email format to HTML

$message['subject'] = ($message["name"]);
$message['subject'] = substr($message['message'], 0, 70);
$mail->Subject = $message['subject'];

$message['message'] = nl2br($message['message']);

//$mail->Subject = 'Here is the subject';
$mail->Body    = $message['message'];
$mail->AltBody = htmlentities($message['messages']);

if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success'] = true;
}
echo json_encode($output);
?>
