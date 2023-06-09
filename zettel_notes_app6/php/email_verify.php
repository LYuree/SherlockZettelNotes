<?php
require "./db_con.php";
require "./functions.php";

if(!empty($_GET)){
    if(isset($_GET['verification_code'])){
        try{
            $verificationToken = $_GET['verification_code'];
            $results = $pdo->query("SELECT * FROM user_tokens join users
            on user_id = users.id
            WHERE token = '$verificationToken'");
            $row = $results -> fetch(PDO::FETCH_ASSOC);
            $username = $row['name'];
            $update_query_string = "UPDATE users SET active = true
                            WHERE name = '$username'";
            $pdo->query($update_query_string);
            $pdo->query("DELETE from user_tokens where token = '$verificationToken'");
            $verification_message = "E-mail успешно подтверждён!";
            $main_page_link_display = "block";
        }
        catch (PDOException $e) {
            $verification_message = "Что-то пошло не так...";
            $main_page_link_display = "none";
            $results = null;
            $pdo = null;
            exit;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p class="verification_message"><?=$verification_message?></p>
    
    <div class="modal__sign-in__button-wrapper__flex-container">
        <div class="modal__sign-in__button-wrapper">
            <button type="submit" class="main_button">Войти</button>
        </div>
    </div>

    <style>
        p.verification_message,
        button.main_button
        {
            text-align: center;
            /* vertical-align: middle; */
        }
        p.verification_message {
            position: relative;
            top: -50%;
            /* left: 50%; */
            /* transform: translate(-50%, -50%);    */
        }
        button.main_button {
            display: <?=$main_page_link_display?>;
        }
    </style>
</body>
</html>