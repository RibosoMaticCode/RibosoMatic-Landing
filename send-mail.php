<?php
header('Content-type: application/json; charset=utf-8');

// Variables y validaciones
$data = $_POST;

if( strlen($data['Names']) < 3 ){
	$rspmail = [
		'result' => false,
		'msg' => 'Nombre debe tener mas de 3 caracteres'
	];
	die(json_encode($rspmail));
}
if( !is_numeric($data['Whatsapp']) ){
	$rspmail = [
		'result' => false,
		'msg' => 'Telefono debe contener solo números'
	];
	die(json_encode($rspmail));
}
if( strlen($data['Whatsapp']) < 9 ){
	$rspmail = [
		'result' => false,
		'msg' => 'Telefono debe tener mas de 9 caracteres'
	];
	die(json_encode($rspmail));
}
if ( !filter_var($data['Email'], FILTER_VALIDATE_EMAIL) ) {
	$rspmail = [
		'result' => false,
		'msg' => 'Correo electronico no tiene formato adecuado'
	];
	die(json_encode($rspmail));
}

// Armando mensaje
$email_content = "Informacion del mensaje:<br /><br />";

foreach ($data as $key => $value) {
	$email_content .= $key.": <br />".$value."<br /><br />";
}

$email_content .= "--<br />El e-mail fue enviado a través del formulario de la web.";

// Destinatarios :
$recipient = 'hello@ribosomatic.com';
//$cc = 'otro@mail.pe';

// Configuracion del cabecera
$subject = 'Contacto desde la web';
$from_name = 'RibosoMatic Landing';
$mail_no_reply = 'no-reply@ribosomatic.com';

// Construyendo cabeceras
$email_headers = "From: $from_name <$mail_no_reply> \r\n";
//$email_headers .= "Cc: $cc \r\n";
$email_headers .= "MIME-Version: 1.0\r\n";
$email_headers .= "Content-Type: text/html; utf-8\r\n";
$email_headers .= "Content-Transfer-Encoding: 8bit\r\n";

// Enviando el mensaje
if (mail($recipient, $subject, $email_content, $email_headers)) {
	$rspmail = [
		'result' => true,
		'msg' => 'Envio correcto del correo'
	];
} else {
	$rspmail = [
		'result' => false,
		'msg' => 'Oops! Algo salio mal y no pudimos enviar tu mensaje.'
	];
}
die(json_encode($rspmail));
?>