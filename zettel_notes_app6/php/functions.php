<?php 

    function getNotes(){
        $resultArray = array();

        $results = $pdo->query("SELECT name, note_text, creation_date FROM notes");

        while($item = $results->fetch(PDO::FETCH_ASSOC)){
            //print_r($item);
            $resultArray[] = $item;
            echo "\n";
        }

        return $resultArray;
    }


    function saveNote(){

    }


    function deleteNote(){

    }




?>