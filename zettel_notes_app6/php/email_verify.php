<?php
require "./db_con.php";
require "./functions.php";

if(!empty($_GET)){
    if(isset($_GET['verification_code'])){
        $verificationToken = $_GET['verification_code'];
        $results = $pdo->query("SELECT * FROM user_tokens join users
        on user_id = users.id
        WHERE token = '$verificationToken'");

    }
}


?>