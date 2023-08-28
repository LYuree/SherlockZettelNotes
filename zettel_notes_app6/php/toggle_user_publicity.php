<?php
require "./db_con.php";
require "./functions.php";
if(!empty($_POST) && isset($_POST['username'])){
    $username = $_POST['username'];
    $queryString = "SELECT public FROM users where name = '$username'";
    $results = $pdo->query($queryString);
    $row = $results->fetch(PDO::FETCH_ASSOC);
    $newPublicityStatus = ($row['public']) ? 'false' : 'true';
    $queryString = "UPDATE users SET public = '$newPublicityStatus' WHERE name = '$username'";
    if($pdo->query($queryString)) echo $newPublicityStatus;
    else echo "meh-meh :(";
}
else echo "meh :(";
?>