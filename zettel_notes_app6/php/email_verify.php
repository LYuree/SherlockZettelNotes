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
            $update_query_string = "UPDATE users SET active = true,
                            memory_limit_kb = default
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
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../images/holmes_icon.png">
    <title>Document</title>
</head>
<body>
    <div class="sign-up-redirect__content-wrapper">
        <div class="sign-up-redirect__text">
            <p>E-mail успешно подтверждён!</p>
        </div>
        <div class="sign-up-redirect__btn__wrapper">
            <a href="../index.html"><button>На главную</button></a>
        </div>
    </div>
</body>
</html>