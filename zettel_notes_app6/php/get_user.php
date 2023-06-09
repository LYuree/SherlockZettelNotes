<?php
require "./db_con.php";
require "./functions.php";

if(!empty($_POST) && isset($_POST['username'])){
    try{
        // echo "entering the main branch";
        $username = $_POST['username'];
        //AUTHORIZATION
        try{
            $username = $_POST['username'];
            $results = $pdo->query("SELECT name, password, email FROM users
            WHERE name = '$username'
            OR
            email = '$username'");
            // print_r($results);
        }catch (PDOException $e) {
            $results = null;
            $pdo = null;
            exit;
        }

        try{
            $row = $results -> fetch(PDO::FETCH_NUM);
            // print_r($row);
            if(count($row) == 0 || !is_countable($row)){
                $results = null;
                echo json_encode($results);
                exit;
            }
            else{
                // $row = $results -> fetch(PDO::FETCH_NUM);
                $db_password = $row[1];
                if(password_verify($_POST['password'], $db_password))
                $userEntry = new stdClass();
                $userEntry->active = "true";
                echo json_encode($userEntry);
                exit;
            }
        }catch (PDOException $e) {
            $results = null;
            $pdo = null;
            exit;
        }
    }catch(PDOException $e){
        $pdo = null;
        echo '' . $e->getMessage(); 
        exit;
    }
}




?>