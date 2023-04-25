<?php
require "./db_con.php";
require "./functions.php";

require '.\rake-php-plus-master\src\AbstractStopwordProvider.php';
require '.\rake-php-plus-master\src\ILangParseOptions.php';
require '.\rake-php-plus-master\src\LangParseOptions.php';
require '.\rake-php-plus-master\src\StopwordArray.php';
require '.\rake-php-plus-master\src\StopwordsPatternFile.php';
require '.\rake-php-plus-master\src\StopwordsPHP.php';
require '.\rake-php-plus-master\src\RakePlus.php';

use DonatelloZa\RakePlus\RakePlus;

if(!empty($_POST) && isset($_POST['noteText'])){
    $note_text = $_POST['noteText'];
    $phrases = RakePlus::create($note_text, "ru_RU")->get();
    //optimize the trimming process
    //by including this step into the code of the algorithm
    //class methods
    foreach($phrases as $phrase){
        $phrase = $phrase.trim(" \n\r\t\v\x00");
    }
    // echo($note_text);
    echo json_encode($phrases, JSON_UNESCAPED_UNICODE);
}
else if (empty($_POST)){
    echo "post is empty :(";
}
else if (!isset($_POST['noteText'])){
    echo "notetext isn't set";
}
?>