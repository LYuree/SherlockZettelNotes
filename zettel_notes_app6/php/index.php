<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="../images/holmes_icon.png">
    <title>Project ZettelNotes</title>
</head>
<body>
    <!-- SIGN IN MODAL WINDOW -->
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

                <div class="modal__sign-in__error-wrapper__flex-container">
                    <div class="modal__sign-in__error-wrapper">
                        <p>Неверный логин или пароль</p>
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
        </div>


        <!-- MODAL SIGN UP (REGISTRATION) WINDOW -->


        <div class="modal__sign-up__background">
            <div id="modal__sign-up">
                <div class="modal__sign-up__caption">Мы рады приветствовать Вас!<br>Пожалуйста, войдите в аккаунт</div>
                
                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Имя пользователя:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                    <small class="modal__sign-in__username-error"></small>
                </div>
                
                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__password-input">e-mail:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="password" name="modal__sign-up__password-input" class="modal__sign-up__password-input">
                    </div>
                    <small class="modal__sign-in__email-error"></small>
                </div>

                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Пароль:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                    <small class="modal__sign-in__password-error"></small>
                </div>

                <div class="modal__sign-up__row">
                    <label for="modal__sign-up__login-input">Подтвердите пароль:&nbsp</label>
                    <div class="modal__sign-up__intput-wrapper">
                        <input type="text" name="modal__sign-up__login-input" class="modal__sign-up__login-input">
                    </div>
                    <small class="modal__sign-in__password-repeat-error"></small>
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
        </div>

    <div class="notes" id="app">


        <script type="module" src="../js/main.js"></script>


        <!-- THE SIDEBAR SECTION -->
        <aside class="notes__sidebar">            
            <!-- search field and note-create button  -->
            <div class="notes__sidebar__management__panel">
                <img src="../images/vintage_ornament_maroon.png" id="vintage__ornament" alt="">
                <input type="text" name="search__note" id="search__note" class="search__note" placeholder="Search notes...">
                <button class="notes__add"> New </button>
            </div>
            <!-- the notes previews -->
            <div class="notes__list-items__container">
            </div>
        </aside>
        <!-- THE MAIN SECTION -->
        <main class="notes__preview">
            <input type="text" name="" id="" class="notes__title" placeholder="Enter a title...">
            <textarea class="notes__body" placeholder="Type in your text here..."><?php //echo $output?></textarea>

        </main>
    </div>
</body>
</html>