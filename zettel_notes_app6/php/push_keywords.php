<?php
    require "./db_con.php";
    require "./functions.php";
    // print("meow");
    if(!empty($_POST) && isset($_POST['username']) && isset($_POST['noteId']) && isset($_POST['keywordsStr'])){
                try{
                    // print_r($_POST);
                    $username = $_POST['username'];
                    $results = $pdo->query("SELECT id FROM users where name = '$username'");
                    $resultsArray = $results->fetch(PDO::FETCH_NUM);
                    $userId = $resultsArray[0];               

                    $note_id = $_POST['noteId'];  
                    echo "KEYWORDS STRING: ".$_POST['keywordsStr']."\n";
                    $keywords = explode(",", $_POST['keywordsStr']);
                    print_r($keywords);
                    $query_results = array();
                    $deletion_query = "DELETE from keywords
                    WHERE id_note = $note_id RETURNING *";
                    $deletion_result = $pdo->query($deletion_query);
                    $counter = 0;
                    foreach($keywords as $token){
                        // echo "\nTOKEN: ".$token;

                        $insertion_already_happened = 
                        (isset($insertion_result)? "INSERTED" : "DIDN'T INSERT");
                        
                        // print_r($insertion_already_happened);
                        // print_r($deletion_result);
                        // print_r("$userId, $note_id, $token\n");
                        
                        $query_string = "SELECT * from keywords join users on id = userid
                            where keyword = '$token'
                            AND name = '$username'";
                        $results = $pdo->query($query_string);
                        $resultsArray = $results->fetch(PDO::FETCH_ASSOC);
                        // print_r($resultsArray);

                        $insertion_query = "INSERT into keywords
                        (userid, id_note, keyword) VALUES
                        ($userId, $note_id, '$token') 
                        ON CONFLICT (userid, id_note, keyword) DO UPDATE 
                        SET occurrences = keywords.occurrences + 1
                        RETURNING *";

                        $insertion_result = $pdo->query($insertion_query);
                        $counter++;
                        // echo "QUERY STRING".$query_string;
                        // $result = $pdo->query($query_string);
                        // print_r($result);
                        // array_merge($query_results, $result);
                    }
                    // print_r("counter: $counter");
                    // echo json_encode($query_results, JSON_UNESCAPED_UNICODE);
                    // echo "meow";
                    // echo json_encode($_POST);
                }
                catch(PDOException $e){
                    $pdo = null;
                    echo '' . $e->getMessage(); 
                    exit;
                }
    }
    else if (empty($_POST)){
        echo "post is empty :(";
    }
    else if (!isset($_POST['keywordsStr'])){
        echo "notetext isn't set";
    }
?>