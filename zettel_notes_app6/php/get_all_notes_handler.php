<?php
require "./db_con.php";
require "./functions.php";
if(!empty($_POST) && isset($_POST['username'])){
    if(isset($_POST['idToSave']) && isset($_POST['noteTitle']) && isset($_POST['noteText'])){
        //NOTE INSERTION/UPDATE
        try{
            $username = $_POST['username'];
            $collection_id_row = ($pdo->query("SELECT collections.id FROM collections join users on
            users.id = owner_id WHERE users.name = '$username' OR users.email = '$username'"))->fetch(PDO::FETCH_NUM);
            $collection_id = $collection_id_row[0];
            $folder_row = $pdo->query(("SELECT folders.id FROM collections join folders
            on collection_id = collections.id WHERE collections.id = $collection_id"))->fetch(PDO::FETCH_NUM);
            $folder_id = $folder_row[0];
        }
        catch(PDOException $e){
            $pdo = null;
            echo '' . $e->getMessage(); 
            exit;
        }

        try{
            // echo "mkaaaay, trying to insert your little pile of gibberish...";
            $idToSave = $_POST['idToSave'];
            $noteTitle = $_POST['noteTitle'];
            $noteText = $_POST['noteText'];
            $pdo->query("INSERT into notes VALUES ($idToSave, '$noteTitle', CURRENT_TIMESTAMP(0), '$noteText', $folder_id)
                ON CONFLICT (id) DO UPDATE
                SET name = '$noteTitle',
                creation_date = CURRENT_TIMESTAMP(0),
                note_text = '$noteText' RETURNING *");
        }
        catch(PDOException $e) {
            $pdo = null;
            echo '' . $e->getMessage(); 
            exit;
        }
    }
    else if(isset($_POST['idToDelete'])){
        //NOTE DELETION
        echo $_POST['idToDelete'];
        try{
            $idToDelete = $_POST['idToDelete'];
            $pdo->query("DELETE FROM notes WHERE id = $idToDelete");
        }
        catch(PDOException $e) {
            $pdo = null;
            echo '' . $e->getMessage();
            exit;
        }
    }
    else if(isset($_POST['password'])){
        //AUTHORIZATION
        try{
            $username = $_POST['username'];
            $results = $pdo->query("SELECT name, password, email FROM users
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
                // $row = $results -> fetch(PDO::FETCH_NUM);
                $db_password = $row[1];
                if(password_verify($_POST['password'], $db_password)){
                    if(!isset($resultArray)) $resultArray = array();
                        // $results = $pdo->query("SELECT * FROM
                        // (SELECT * FROM
                        //     (SELECT collection_id, notes.id as note_id, notes.name, note_text, creation_date FROM notes JOIN folders on folder_id = folders.id) as note_folder
                        //     JOIN collections on collection_id = collections.id) as note_folder_collection
                        //                 JOIN users on owner_id = users.id
                        //                 WHERE users.name = '$username'
                        //                 ORDER BY note_id");

                        
                        if(!isset($resultArray)) $resultArray = array();
                        $results = $pdo->query("SELECT n_id as id, note_name as name, note_text, creation_date FROM (SELECT * FROM
                        (SELECT note_id as n_id, owner_id, note_folder.name as note_name, note_text, note_folder.creation_date FROM
                        (SELECT collection_id, notes.id as note_id, notes.name, note_text, creation_date FROM
                        notes JOIN folders on folder_id = folders.id) as note_folder
                        JOIN collections on collection_id = collections.id) as note_folder_collection
                        JOIN users on owner_id = users.id
                        WHERE users.name = '$username' OR users.email = '$username') as
                        note_folder_collection_user
                        ORDER BY id");
                        
                        
                        while($item = $results->fetch(PDO::FETCH_ASSOC)){
                            $resultArray[] = $item;
                        }
                        // print_r($resultArray);
                        echo json_encode($resultArray);
                        // echo "meow";
                        // $reconArray = array();
                        // $reconArray['a'] = 'a';
                        // $reconArray['b'] = 'b';
                        // echo json_encode($reconArray);
                        exit;
                }else {
                    $results = array();
                    $results['notes'] = null;
                    // $results = null;
                    $results['password'] = $_POST['password'];
                    $results['hash'] = $db_password;
                    $results['verified'] = password_verify($_POST['password'], $db_password);
                    echo json_encode($results);
                    // $reconArray = array();
                    // $reconArray['a'] = 'a';
                    // $reconArray['b'] = 'b';
                    // echo json_encode($reconArray);
                    exit;
                }
            }
        }catch (PDOException $e) {
            $results = null;
            $pdo = null;
            // header("Location: registration_form.php");
            exit;
        }
        // $reconArray = array();
        // $reconArray['a'] = 'a';
        // $reconArray['b'] = 'b';
        // echo json_encode($reconArray);
    }
}
else {
    // $reconArray = array();
    // $reconArray['a'] = 'a';
    // $reconArray['b'] = 'b';
    // echo json_encode($reconArray);
    echo "post is empty...";
}
?>