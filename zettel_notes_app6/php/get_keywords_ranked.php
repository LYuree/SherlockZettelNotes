<?php
    require "./db_con.php";
    require "./functions.php";

    class keywordCollectionsHolder{
        private $keywordCollections = array();
        
        private function _getUserIds(){
            $user_ids = array();
            $results = $pdo->query("SELECT id from users");
            while($id = $results->fetch(PDO::FETCH_ASSOC)){
                $user_ids[] = $id;
            }
            return $user_ids;
        }


        public function getKeywordArrays(){
            $user_ids = $this->_getUserIds();
            foreach($user_ids as $id){
                $query_string =
                "SELECT keyword FROM
                (SELECT keyword, owner_id FROM
                (SELECT keyword, collection_id FROM
                (SELECT keyword, folder_id FROM keywords
                JOIN notes on id_note = notes.id) as keywords_folders
                JOIN folders on folder_id = folders.id) as keywords_folders
                JOIN collections on collection_id = collections.id) as keywords_folders_collections
                JOIN users on owner_id = users.id
                WHERE name = '$username' or email = '$username')";                
                $results = $pdo->query("query_string");
                $keywords = array();
                while($keyword = $results->fetch(PDO::FETCH_ASSOC)){
                    $keywords[] = $keyword;
                }
                $frequencies = array();
                foreach($keywords as $keyword){
                    $keyword = strtolower($keyword); // convert word to lowercase
                    if(isset($frequencies[$keyword])){
                        $frequencies[$keyword]++;
                    }
                    else {
                        $frequencies[$keyword] = 1;
                    }
                }
            }
        }

    }





    function countKeywords($array) {
        $keywordCount = array();        
        foreach ($array as $word) {          
            $word = strtolower($word); // convert word to lowercase
            if (isset($keywordCount[$word])) { // if word already exists in array, increment its count
              $keywordCount[$word]++;
            } else { // else, initialize the count to 1
              $keywordCount[$word] = 1;
            }
        }        
        return $keywordCount;
      }







?>