<?php
require "./db_con.php";
require "./functions.php";

if(!empty($_POST) && isset($_POST['username'])){
    try{
        $username = $_POST['username'];
        $results = $pdo->query("SELECT name, email FROM users
        WHERE name = '$username'
        OR
        email = '$username'"); 
    }catch (PDOException $e) {
        $results = null;
        $pdo = null;
        exit;
    }
    
    
    
    try{
        $row = $results -> fetch(PDO::FETCH_NUM);
        if(count($row) == 0 || !is_countable($row)){
            $results = null;
            echo json_encode($results);
            exit;
        }
        else{
            // $db_password = $row[1];
            // if(password_verify($_POST['password'], $db_password)){
                if(!isset($resultArray)) $resultArray = array();
                    // $results = $pdo->query("SELECT * FROM
                    // (SELECT * FROM
                    //     (SELECT collection_id, notes.id as note_id, notes.name, note_text, creation_date FROM notes JOIN folders on folder_id = folders.id) as note_folder
                    //     JOIN collections on collection_id = collections.id) as note_folder_collection
                    //                 JOIN users on owner_id = users.id
                    //                 WHERE users.name = '$username'
                    //                 ORDER BY note_id");
                    $query_string =
                        "SELECT keyword FROM
                        (SELECT keyword, owner_id FROM
                        (SELECT keyword, collection_id FROM
                        (SELECT keyword, folder_id FROM keywords
                        JOIN notes on id_note = notes.id) as keywords_folders
                        JOIN folders on folder_id = folders.id) as keywords_folders
                        JOIN collections on collection_id = collections.id) as keywords_folders_collections
                        JOIN users on owner_id = users.id
                        WHERE name = '$username' or email = '$username'";
                    // echo ;
                    $results = $pdo->query($query_string);
                    // echo $results;
                    $keywords = array();
                    while($keyword = $results->fetch(PDO::FETCH_ASSOC)){
                        $keywords[] = $keyword;
                    }
                    echo json_encode($keywords);
                    // echo "meow";
                    // $reconArray = array();
                    // $reconArray['a'] = 'a';
                    // $reconArray['b'] = 'b';
                    // echo json_encode($reconArray);
                    exit;
            // }else {
            //     $results = array();
            //     $results['notes'] = null;
            //     // $results = null;
            //     $results['password'] = $_POST['password'];
            //     $results['hash'] = $db_password;
            //     $results['verified'] = password_verify($_POST['password'], $db_password);
            //     echo json_encode($results);
            //     // $reconArray = array();
            //     // $reconArray['a'] = 'a';
            //     // $reconArray['b'] = 'b';
            //     // echo json_encode($reconArray);
            //     exit;
            // }
        }
    }catch (PDOException $e) {
        $results = null;
        $pdo = null;
        // header("Location: registration_form.php");
        exit;
    }
}



?>