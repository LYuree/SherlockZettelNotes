<?php
require "./db_con.php";
require "./functions.php";
if(!empty($_POST) && isset($_POST['newMemoryLimit']) && isset($_POST['username'])){
    $newMemoryLimit = $_POST['newMemoryLimit'];
    $username = $_POST['username'];
    $queryString = "UPDATE users SET memory_limit_kb = $newMemoryLimit WHERE name = '$username'";
    try{
        $pdo->query($queryString);
        echo json_encode(true);
    }
    catch (PDOException $e){
        echo "An error occurred while trying to update user memory limit: ".$e->getMessage().".";
    }
}
?>