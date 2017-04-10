<?php

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Canada/Eastern');
header('Access-Control-Allow-Origin: http://localhost:8080', false);
header('Access-Control-Allow-Headers: origin, x-requested-with, content-type, x-xsrf-token');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Content-type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// echo 'fun!';
	$req = json_decode(file_get_contents('php://input'),true);
	// foreach ($req as $k => $v) {
	// 	echo preg_replace('/\s+/S', " ", $v);
	// }
	$error = false;

	require 'PHPMailer/PHPMailerAutoload.php';

	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	//Tell PHPMailer to use SMTP
	$mail->isSMTP();
	//Enable SMTP debugging
	// 0 = off (for production use)
	// 1 = client messages
	// 2 = client and server messages
	$mail->SMTPDebug = 0;
	//Ask for HTML-friendly debug output
	$mail->Debugoutput = 'html';
	//Useful character encoding
	$mail->CharSet = 'UTF-8';
	//Set the hostname of the mail server
	$mail->Host = "smtp-mail.outlook.com";
	//Set the SMTP port number - likely to be 25, 465 or 587
	$mail->Port = 587;
	//Whether to use SMTP authentication
	$mail->SMTPAuth = true;
	//Username to use for SMTP authentication
	$mail->Username = "jacksonteather@hotmail.com";
	//Password to use for SMTP authentication
	$mail->Password = "NastyJaspy1234";
	//Set who the message is to be sent from
	$mail->setFrom('signaturemailer@uoit.ca', 'Signature mailer');
	//Set an alternative reply-to address
	$mail->addReplyTo('webteam@uoit.ca', 'UOIT Webteam');

	// $mail->isHTML(true);
	//Set who the message is to be sent to
	// $addressees = explode(',', trim($_POST['to']));//, 'John Doe');
	//Set the subject line
	$mail->Subject = '[do not reply] Your UOIT email signature';
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//convert HTML into a basic plain-text alternative body
	//Replace the plain text body with one created manually
	$mail->Body = preg_replace('/\s+/S', ' ', $req['html'] );
	$mail->AltBody = preg_replace('/\s+/', '', strip_tags($req['html']) );
	//Attach an image file
	//$mail->addAttachment('images/phpmailer_mini.png');
	// foreach ($addressees as $a) {
		$mail->addAddress($req['sendto']);
		if (!$mail->send()) {
			$error = $mail->ErrorInfo;
		}
		$mail->clearAddresses();
	// }

	//send the message, check for errors
	if ($error) {
		$result = array('success' => false, 'data' => $error);
		echo json_encode($result, true);
		exit();
	} else {
		$result = array('success' => true, 'data' => 'Message sent successfully!');
		echo json_encode($result, true);
		exit();
	}
	
}

?>