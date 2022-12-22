<?php

require "db_con.php";
// require "functions.php";

if(!empty($_POST)){
    
    if(isset($_POST['idToSave']) && isset($_POST['noteTitle']) && isset($_POST['noteText'])){
        try{
            // echo "mkaaaay, trying to insert your little pile of gibberish...";
            $idToSave = $_POST['idToSave'];
            $noteTitle = $_POST['noteTitle'];
            $noteText = $_POST['noteText'];
            $pdo->query("INSERT into notes VALUES ($idToSave, '$noteTitle', CURRENT_TIMESTAMP(0), '$noteText', 1)
                ON CONFLICT (id) DO UPDATE
                SET name = '$noteTitle',
                creation_date = CURRENT_TIMESTAMP(0),
                note_text = '$noteText'");
        }
        catch(PDOException $e) {
            $pdo = null;
            echo '' . $e->getMessage(); 
            exit;
        }
    }
    else if(isset($_POST['idToDelete'])){
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
}
?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Project ZettelNotes</title>
</head>
<body>



    <div class="notes" id="app">

        <!-- THE SIDEBAR SECTION -->
        <?php

        if(!isset($resultArray)) $resultArray = array();
        $results = $pdo->query("SELECT id, name, note_text, creation_date FROM notes
        ORDER BY creation_date");
        while($item = $results->fetch(PDO::FETCH_ASSOC)){
            //print_r($item);
            $resultArray[] = $item;
            echo "\n";
        }

        ?>

        <aside class="notes__sidebar">
            
            <!-- search field and note-create button  -->            

            <div class="notes__sidebar__management__panel">
                <img src="images/vintage_ornament_maroon.png" id="vintage__ornament" alt="">
                <input type="text" name="search__note" id="search__note" class="search__note" placeholder="Поиск...">
                <button class="notes__add"> + </button>
            </div>


            <!-- the notes previews -->
            <div class="notes__list-items__container">
                <?php foreach($resultArray as $item): ?>         
                <div class="note__list-item" id="<?= $item['id']?>">
                    <div class="notes__small-title"><?= $item['name']?></div>
                    <button class="notes__delete"> X </button>
                    <div class="notes__small-body"><?= $item['note_text']?></div>
                    <div class="notes__small-updated"><?= $item['creation_date']?></div>
                </div>
                <?php endforeach?>


        </aside>

        <!-- THE MAIN SECTION -->
        <main class="notes__preview">
            <input type="text" name="" id="" class="notes__title" placeholder="Enter a title...">
            <textarea class="notes__body" placeholder="Type in your text here..."></textarea>

        </main>
    </div>

    <script src="js/main.js"></script>
</body>
</html>