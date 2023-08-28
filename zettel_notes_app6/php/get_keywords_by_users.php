<?php
require "./db_con.php";
require "./functions.php";
// echo "GET YOUR ASS DOWN TO ME!";
// echo "". empty($_GET);
if(isset($_GET)){
    $query_string = "SELECT name, email from users where active is true AND public is true";
    $results = $pdo->query($query_string);
    $users = array();
    while($user = $results->fetch(PDO::FETCH_ASSOC)){
        $users[] = $user;
    }
    // creating an array of objects storing the nickname of a user
    // and an array of his keywords, their frequencies and ranks
    $usersAndKeywords = array();
    foreach($users as $user){
        // $query_string = "SELECT keyword, occurences
        //     from users join keywords
        //     on id = userid
        //     where name = '$name'";
        // $results = $pdo->query($query_string);
        // echo "$name";
        $rankedKeywords = getRankedKeywords($pdo, $user['name']);
        $item = new stdClass();
        $item->username = $user['name'];
        $item->email = $user['email'];
        $item->keywords = $rankedKeywords;
        $usersAndKeywords[] = $item;
        // while($row = $results->fetch(PDO::FETCH_ASSOC)){
        //     $usersAndKeywords[] = $row;
        // }
    }
    echo json_encode($usersAndKeywords);
}
?>