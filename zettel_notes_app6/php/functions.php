<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';    

    // php\sensitive_info\sensitive_info.php
    // echo "\nfunctions: ".$noreply_email." ".$noreply_app_code;

    function getNotes(){
        $resultArray = array();

        $results = $pdo->query("SELECT name, note_text, creation_date FROM notes");

        while($item = $results->fetch(PDO::FETCH_ASSOC)){
            //print_r($item);
            $resultArray[] = $item;
            echo "\n";
        }

        return $resultArray;
    }


    function saveNote(){

    }


    function deleteNote(){

    }

// function send_verification_link($activation_code)
function send_verification_link($email, $activation_code, $sender_email, $sender_app_code){
    // echo "send_link: ".$noreply_email." ".$noreply_app_code;

    $expFormat = mktime(
    date("H"), date("i"), date("s"), date("m") ,date("d")+1, date("Y")
    );
    $expDate = date("Y-m-d H:i:s",$expFormat);
    // $key = md5(strval(2418*2).$email);
    // $addKey = substr(md5(uniqid(rand(),1)),3,10);
    // $key = $key . $addKey;
    $key = $activation_code;
    // Insert Temp Table
    // $pdo->query("INSERT INTO `password_reset_tokens` (`email`, `key`, `expDate`) VALUES ('".$email."', '".$key."', '".$expDate."');");
    // echo "email_sender, key = ".$key;
    $output='<p>Dear user,</p>';
    $output.='<p>Please click on the following link to reset your password.</p>';
    $output.='<p>-------------------------------------------------------------</p>';
    // $output.='<p><a href="https://www.allphptricks.com/forgot-password/reset-password.php?
    // key='.$key.'&email='.$email.'&action=reset" target="_blank">
    // https://www.allphptricks.com/forgot-password/reset-password.php
    // ?key='.$key.'&email='.$email.'&action=reset</a></p>';	
    $output.='<p><a href="http://localhost:3000/PHP/zettel_notes_app6/php/email_verify.php?verification_code='.$key;
    $output.='&action="reset" target="_blank">sherlocknotes.php</a></p>';

    $output.='<p>-------------------------------------------------------------</p>';
    $output.='<p>Please be sure to copy the entire link into your browser.
    The link will expire after 1 day for security reasons.</p>';
    $output.='<p>If you did not request this forgotten password email, no action 
    is needed, your password will not be reset. However, you may want to log into 
    your account and change your security password as someone may have guessed it.</p>';   	
    $output.='<p>Thanks,</p>';
    $output.='<p>Sherlock Notes</p>';
    $body = $output; 
    $subject = "Sherlock Notes - подтверждение почтового адреса";

    $email_to = $email;
   //  $fromserver = "index.php";
    $fromserver = "noreplylibrarium@gmail.com";
   //  require("PHPMailer/PHPMailerAutoload.php");
    $mail = new PHPMailer(true);
    $mail->IsSMTP();
    // $mail->Host = "mail.yourwebsite.com"; // Enter your host here
    $mail->Host = "smtp.gmail.com"; 
    $mail->SMTPAuth = true;
    $mail->Username = $sender_email; // Enter your email here
    $mail->Password = $sender_app_code; //Enter your password here
    $mail->Port = 465;

    //****************************
    $mail->SMTPSecure = "ssl";
    //****************************
    
    $mail->IsHTML(true); //for the letter itself?

   //  $mail->From = "noreply@yourwebsite.com";
   
   //  $mail->From = "lereanon@mail.ru";
    $mail->setFrom("noreplylibrarium@gmail.com");
    $mail->addAddress($email);
   //  $mail->Subject = "Восстановление пароля: код подтверждения";
   
    $mail->FromName = "Sherlock Notes";

    $mail->Sender = $fromserver; // indicates ReturnPath header
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($email_to);
    if(!$mail->Send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
    }else{
    echo "<div class='error'>
    <p>An email has been sent to you with instructions on how to reset your password.</p>
    </div><br /><br /><br />";
    }    
}




?>