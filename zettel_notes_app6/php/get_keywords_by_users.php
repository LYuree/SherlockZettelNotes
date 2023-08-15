<?php
require "./db_con.php";
require "./functions.php";
// echo "GET YOUR ASS DOWN TO ME!";
// echo "". empty($_GET);
if(isset($_GET)){
    $query_string = "SELECT name from users where active is true";
    $results = $pdo->query($query_string);
    $usernames = array();
    while($name = $results->fetch(PDO::FETCH_ASSOC)){
        $usernames[] = $name['name'];
    }
    // creating an array of objects storing the nickname of a user
    // and an array of his keywords, their frequencies and ranks
    $usersAndKeywords = array();
    foreach($usernames as $name){
        // $query_string = "SELECT keyword, occurences
        //     from users join keywords
        //     on id = userid
        //     where name = '$name'";
        // $results = $pdo->query($query_string);
        // echo "$name";
        $rankedKeywords = getRankedKeywords($pdo, $name);
        $item = new stdClass();
        $item->username = $name;
        $item->keywords = $rankedKeywords;
        $usersAndKeywords[] = $item;
        // while($row = $results->fetch(PDO::FETCH_ASSOC)){
        //     $usersAndKeywords[] = $row;
        // }
    }
    echo json_encode($usersAndKeywords);
}
?>