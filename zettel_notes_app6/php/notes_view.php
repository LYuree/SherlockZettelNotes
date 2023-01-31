<?php

        if(!isset($resultArray)) $resultArray = array();
        $results = $pdo->query("SELECT id, name, note_text, creation_date FROM notes
        ORDER BY id");
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
                <input type="text" name="search__note" id="search__note" class="search__note" placeholder="Search notes...">
                <button class="notes__add"> New </button>
            </div>

            <!-- the notes previews -->
            <div class="notes__list-items__container">
                <?php foreach($resultArray as $item): ?>         
                <div class="note__list-item" id="<?= $item['id']?>">
                    <div class="notes__small-title"><?= $item['name']?></div>
                    <button class="notes__delete"> X</button>
                    <div class="notes__small-body"><?= $item['note_text']?></div>
                    <div class="notes__small-updated"><?= $item['creation_date']?></div>
                </div>
                <?php endforeach?>
        </aside>

        <!-- THE MAIN SECTION -->

        <main class="notes__preview">
            <input type="text" name="" id="" class="notes__title" placeholder="Enter a title...">
            <textarea class="notes__body" placeholder="Type in your text here..."><?php echo $output?></textarea>
        </main>`