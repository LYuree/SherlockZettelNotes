<?php
require "./db_con.php";
require "./functions.php";

if(!empty($_POST) && isset($_POST['username'])){
    try{
        // echo "entering the main branch";
        $username = $_POST['username'];
        //AUTHORIZATION
        try{
            $results = $pdo->query("SELECT name, password, email, active FROM users
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
            $row = $results -> fetch(PDO::FETCH_ASSOC);
            // print_r($row);
            if(count($row) == 0 || !is_countable($row)){
                $results = null;
                echo json_encode($results);
                exit;
            }
            else if ($row['active'] == false){
                $userEntry = new stdClass();
                $userEntry->active = false;
                echo json_encode($userEntry);
                exit;
            }
            else{
                $userEntry = new stdClass();
                $userEntry->active = true;
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