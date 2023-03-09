<?php

require "./db_con.php";
require "./functions.php";

function generate_activation_code(){
    return bin2hex(random_bytes(16));
}


if(!empty($_POST) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])){    try{
        $response = array();
        $response['usernameExists'] = false;
        $response['emailExists'] = false;
        $username = $_POST['username'];
        $email = $_POST['email'];
        $usernameResults = $pdo->query("SELECT id from users where name = '$username'");
        $emailResults = $pdo->query("SELECT id from users where email = '$email'");
        $usernameResultsRow = $usernameResults->fetch(PDO::FETCH_NUM);
        $emailResultsRow = $emailResults->fetch(PDO::FETCH_NUM);
        if(empty($usernameResultsRow) && empty($emailResultsRow)){
            $email = $_POST['email'];
            $passwordHash = password_hash($_POST['password'], PASSWORD_BCRYPT);
            $results = $pdo->query("INSERT into users values (default, '$username', '$email', '$passwordHash') RETURNING id");
            $resultsArray = $results->fetch(PDO::FETCH_NUM);
            $newUserId = $resultsArray[0];
            $newCollectionName = $username ."''s First Collection";
            $results = $pdo->query("INSERT into collections values (default, '$newCollectionName', CURRENT_TIMESTAMP(0), $newUserId) RETURNING id");
            $resultsArray = $results->fetch(PDO::FETCH_NUM);
            $newCollectionId = $resultsArray[0];
            $newFolderName = $username ."''s Initial Folder";
            $pdo->query("INSERT into folders values (default, null, '$newFolderName', $newCollectionId)");
            $activationCode = generate_activation_code();
            $pdo->query("INSERT into user_tokens values (default, $newUserId,
                                                        '$activationCode',
                                                        'email-verification'");
            // header("Location: index.php");
        }
        else{
            if(!empty($usernameResultsRow)) $response['usernameExists'] = true;
            if(!empty($emailResultsRow)) $response['emailExists'] = true;            
        }
        $response['usernameResults'] = $usernameResults;
        $response['emailResults'] = $emailResults;
        echo json_encode($response);
    }
    catch(PDOEexception $e){
        $pdo = null;
        echo '' . $e->getMessage(); 
        exit;
    }
}
else echo "Post is empty, my lad :("
?>