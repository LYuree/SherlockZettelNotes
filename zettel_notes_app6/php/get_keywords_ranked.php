<?php
    require "./db_con.php";
    require "./functions.php";

    class keywordCollectionsHolder{
        private $requesterUsername;
        private $keywordRankings = array();
        private $requestersRanking;

        public function __construct($username){
            $this->requesterUsername = $name;
        }
        
        public function setRankings(){
            $usernames = $this->_getUserIds();
            foreach($usernames as $username){
                $ranking = $this->_getUsersRanks($username);
                // $query_string =
                // "SELECT keyword FROM
                // (SELECT keyword, owner_id FROM
                // (SELECT keyword, collection_id FROM
                // (SELECT keyword, folder_id FROM keywords
                // JOIN notes on id_note = notes.id) as keywords_folders
                // JOIN folders on folder_id = folders.id) as keywords_folders
                // JOIN collections on collection_id = collections.id) as keywords_folders_collections
                // JOIN users on owner_id = users.id
                // WHERE name = '$username' or email = '$username')";                
                // $results = $pdo->query("query_string");
                // $keywords = array();
                // while($keyword = $results->fetch(PDO::FETCH_ASSOC)){
                //     $keywords[] = $keyword;
                // }
                // $frequencies = array();
                // foreach($keywords as $keyword){
                //     $keyword = strtolower($keyword); // convert word to lowercase
                //     if(isset($frequencies[$keyword])){
                //         $frequencies[$keyword]++;
                //     }
                //     else {
                //         $frequencies[$keyword] = 1;
                //     }
                // }
                // // sort an array preserving the keys (words)
                // asort($frequencies);
                // $ranks = array();
                // // we'll start assigning ranks to words,
                // // beginning with the lowest rank possible -- one;
                // // note: a rank of a given object is basically
                // // the number of objects that are "inferior" to it,
                // // so the word with the highest frequency will have
                // // the highest rank equal to the total number of words;
                // // also it may be worth pointing out that we
                // // won't complicate things too much with words that
                // // have equal frequencies; assigning equal ranks or
                // // mean ranks would be more accurate, but there seems
                // // to be no big necessity in that
                // $rank = 1;
                // // a slick trick: we iterate through an array's items
                // // as through PAIRS (key => value), not as values only,
                // // like we've been doing previously;
                // // values (as $freq) won't be specifically applied to
                // // in the loop below
                // foreach($frequencies as $word => $freq){
                //     $ranks[$word] = $rank;
                //     $rank++;
                // }
                $this->keywordCollections[] = array(
                    "username" => $username,
                    "ranks" => $ranks
                );
            }
            $reqRanks = $this->_getUsersRanks($requesterUsername);
            $this->requestersRanking = array(
                "username" => $this->requestersUsername,
                "ranks" => $reqRanks
            );
        }

        private function _getUsernames(){
            $usernames = array();
            $results = $pdo->query("SELECT name FROM users
            WHERE name <> '$this->requesterUsername'
            ");
            while($name = $results->fetch(PDO::FETCH_ASSOC)){
                $usernames[] = $name;
            }
            return $usernames;
        }

        private function _getUsersRanks($username){
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
            // sort an array preserving the keys (words)
            asort($frequencies);
            $ranks = array();
            // we'll start assigning ranks to words,
            // beginning with the lowest rank possible -- one;
            // note: a rank of a given object is basically
            // the number of objects that are "inferior" to it,
            // so the word with the highest frequency will have
            // the highest rank equal to the total number of words;
            // also it may be worth pointing out that we
            // won't complicate things too much with words that
            // have equal frequencies; assigning equal ranks or
            // mean ranks would be more accurate, but there seems
            // to be no big necessity in that
            $rank = 1;
            // a slick trick: we iterate through an array's items
            // as through PAIRS (key => value), not as values only,
            // like we've been doing previously;
            // values (as $freq) won't be specifically applied to
            // in the loop below
            foreach($frequencies as $word => $freq){
                $ranks[$word] = $rank;
                $rank++;
            }
            return $ranks;
        }
    }
?>