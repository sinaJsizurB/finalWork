<?php

use PHPMailer\PHPMailer\PHPMailer;

if (isset($_POST['datepicker']) && isset($_POST['name']) && isset($_POST['surname']) && isset($_POST['email']) && isset($_POST['phone'])) {
    $datepicker = $_POST['datepicker'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    //smtp settings
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "extraflysia@gmail.com";
    $mail->Password = 'Extra.Fly.Studio';
    $mail->Port = 465;
    $mail->SMTPSecure = "ssl";

    //email settings
    $mail->isHTML(true);
    $mail->setFrom($email, $name);
    $mail->addAddress("extraflysia@gmail.com");
    $mail->Subject = ("$email ('Jauns pieteikums')");
    $mail->Body =
        "Pasākuma datums - " . $datepicker . '<br>' .
        "Vārds, uzvārds - " . $name . $surname . '<br>' .
        "Epasts - " . $email . '<br>' .
        "Telefona Nr. - " . $phone;

    if ($mail->send()) {
        $status = "success";
        $response = "E-pasts ir nosūtīts!";
    } else {
        $status = "failed";
        $response = "Kaut kas nogāja greizi: <br>" . $mail->ErrorInfo;
    }

    exit(json_encode(array("status" => $status, "response" => $response)));
}
