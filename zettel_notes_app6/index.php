<?php

require "db_con.php";
require "functions.php";

if(!empty($_POST)){
    
    //============================================
    //ADD OR UPDATE NOTE
    //============================================

    if(isset($_POST['username']) && isset($_POST['password'])){
        if(!isset($resultArray)) $resultArray = array();
        $results = $pdo->query("SELECT id, name, note_text, creation_date FROM notes
        ORDER BY id");
        while($item = $results->fetch(PDO::FETCH_ASSOC)){
            //print_r($item);
            $resultArray[] = $item;
            // echo "\n";
        }
        echo json_encode($resultArray);
    }
    else if(isset($_POST['idToSave']) && isset($_POST['noteTitle']) && isset($_POST['noteText'])){
        try{
            echo "mkaaaay, trying to insert your little pile of gibberish...";
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
// else print_r("<span style='position: absolute; color:white; z-index: 1000'>FUCK YOU POST IS EMPTYYY</span>");


?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="images/holmes_icon.png">
    <title>Project ZettelNotes</title>
</head>
<body>
    <?php
        if(!isset($resultArray)) $resultArray = array();
        $results = $pdo->query("SELECT id, name, note_text, creation_date FROM notes
        ORDER BY id");
        while($item = $results->fetch(PDO::FETCH_ASSOC)){
            //print_r($item);
            $resultArray[] = $item;
            // echo "\n";
        }
    ?>
    <!-- SIGN IN MODAL WINDOW 
        <div class="modal__sign-in__background">
            <div id="modal__sign-in">
                <div class="modal__sign-in__caption">Мы рады приветствовать Вас!<br>Пожалуйста, войдите в аккаунт</div>
                <div class="modal__sign-in__row">
                    <label for="modal__sign-in__login-input">Логин/e-mail:&nbsp</label>
                    <div class="modal__sign-in__intput-wrapper">
                        <input type="text" name="modal__sign-in__login-input" class="modal__sign-in__login-input">
                    </div>
                </div>
                <div class="modal__sign-in__row">
                    <label for="modal__sign-in__password-input">Пароль:&nbsp</label>
                    <div class="modal__sign-in__intput-wrapper">
                        <input type="password" name="modal__sign-in__password-input" class="modal__sign-in__password-input">
                    </div>
                </div>
                <div class="modal__sign-in__button-wrapper__flex-container">
                    <div class="modal__sign-in__button-wrapper">
                        <button type="submit" class="modal__sign-in__button">Войти</button>
                    </div>
                </div>
                
                <div class="modal__sign-in__register-link__wrapper">
                    <span>Нет аккаунта?</span>
                    <br>
                    <a href="#" class="modal__sign-in__register-link">Регистрация</a>
                </div>
            </div>
        </div> -->
        <!--  -->


        <!-- MODAL SIGN UP (REGISTRATION) WINDOW -->


        <!-- <div class="modal__sign-up__background">
            <div id="modal__sign-up">
                <div class="modal__sign-up__caption">Мы рады приветствовать Вас!<br>Пожалуйста, войдите в аккаунт</div>
                
                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Имя пользователя:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                </div>
                
                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__password-input">e-mail:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="password" name="modal__sign-up__password-input" class="modal__sign-up__password-input">
                    </div>
                </div>

                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Пароль:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                </div>

                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Подтвердите пароль:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                </div>

                <div class="modal__sign-up__button-wrapper__flex-container">
                    <div class="modal__sign-up__button-wrapper">
                        <button type="submit" class="modal__sign-up__button">Войти</button>
                    </div>
                </div>
                
                <div class="modal__sign-up__register-link__wrapper">
                    <span>Уже есть аккаунт?</span>
                    <br>
                    <a href="#" class="modal__sign-up__register-link">Вход</a>
                </div>
            </div>
        </div> -->

    <div class="notes" id="app">


        <script type="module" src="js/main.js"></script>


        <!-- THE SIDEBAR SECTION -->
        <?php
        // if(!isset($resultArray)) $resultArray = array();
        // $results = $pdo->query("SELECT id, name, note_text, creation_date FROM notes
        // ORDER BY id");
        // while($item = $results->fetch(PDO::FETCH_ASSOC)){
        //     //print_r($item);
        //     $resultArray[] = $item;
        //     echo "\n";
        // }
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

        </main>
    </div>



    <!-- <script type="module" src="js/js_cookies/js.cookie.mjs"></script> -->
    <!-- <script nomodule defer src="js/js_cookies/js.cookie.js"></script> -->

</body>
</html>