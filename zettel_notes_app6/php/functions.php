<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';    

    // php\sensitive_info\sensitive_info.php
    // echo "\nfunctions: ".$noreply_email." ".$noreply_app_code;

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

    function getRankedKeywords($pdo, $username){
        $query_string =
            "SELECT keyword, occurrences FROM
            (SELECT keyword, owner_id, occurrences FROM
            (SELECT keyword, collection_id, occurrences FROM
            (SELECT keyword, folder_id, occurrences FROM keywords
            JOIN notes on id_note = notes.id) as keywords_folders
            JOIN folders on folder_id = folders.id) as keywords_folders
            JOIN collections on collection_id = collections.id) as keywords_folders_collections
            JOIN users on owner_id = users.id
            WHERE (name = '$username' and active is true)
            or (email = '$username' and active is true)
            ORDER BY occurrences DESC";
        $results = $pdo->query($query_string);
        $keywords = array();
        while($keyword = $results->fetch(PDO::FETCH_ASSOC)){
            $keywords[] = $keyword;
        }
        foreach($keywords as $item){
            // why tolower? they've already been 'tolower-ed'
            // $item['keyword'] = strtolower($item['keyword']);
            $item['keyword'] = ($item['keyword']);
        }

        // print_r($keywords);

        // сформируем новый массив, где дубли ключевых слов будут "слиты" воедино
        $keywordsUnique = array();
        $iteration = 0;
        foreach($keywords as $keyword){
            $index = keyword_in_array($keyword, $keywordsUnique);
            // if($index == null) print_r("index is null\n");
            // else print_r($index."\n");
            // if($index == null) print_r("index is null, KEYWORD: ".$keyword['keyword']."\n");
            // else print_r($index."\n");
            if($index != -1){
                // print_r("keyword: ".$keywordsUnique[$index]['keyword']. ", occurrences: ".
                //     $keywordsUnique[$index]['occurrences']."\n");
                $keywordsUnique[$index]['occurrences']+= $keyword['occurrences'];
                // print_r("keyword: ".$keywordsUnique[$index]['keyword']. ", occurrences: ".
                // $keywordsUnique[$index]['occurrences']."\n");
            }
            else {
                // print_r("index = -1, keyword: ");
                // print_r($keyword);
                // print_r("iteration: ".$iteration."\n");
                $keywordsUnique[] = $keyword;
            }
            $iteration++;
        }
        usort($keywordsUnique, "occ_cmp");
        // print_r($keywordsUnique);
        // if($keywordsUnique[1]['keyword'] == $keywordsUnique[3]['keyword'])
        //     echo "keywords are equal";
        // print_r($keywordsUnique[1]['keyword'].", ".$keywordsUnique[3]['keyword']);

        // print_r($keywordsUnique);

        $rank = count($keywordsUnique);
        foreach($keywordsUnique as &$row){
            $row['rank'] = $rank;
            $rank--;
        }
        return $keywordsUnique;
    }


    // compares occurrences of two words through subtraction
    // (for descending sort)
    function occ_cmp($a, $b){
        return $b["occurrences"] - $a["occurrences"];
    }

    function keyword_in_array($needle, &$haystack){
        $index = -1;
        $haystack_length = count($haystack);
        for ($i = 0; $i < $haystack_length; $i++){
            // print_r($haystack[$i]['keyword']."-".$needle['keyword']."\n");
            if ($haystack[$i]['keyword'] == $needle['keyword']) {
                // print_r($haystack[$i]['keyword']."-".$needle['keyword']."\n");
                $index = $i;
                // print("\n$index");
                // if ($i === null) echo "null";
                // else echo "$i";
                // break;
            }            
            // print_r("index is null, KEYWORD: ".$needle['keyword'].", haystack: ".
            //     $haystack[$i]['keyword']."\n");
            // ($index." - KEYWORD: ".$needle['keyword'].", haystack: ".
            //      $haystack[$i]['keyword']."\n");
            // if($index == null) print_r("index is null, KEYWORD: ".$needle['keyword'].", haystack: ".
            //     $haystack[$i]['keyword'].", i = ".$i."\n");
            // else print_r($index."\n");
        }
        if($index == null && $index != 0) return -1;
        return $index;
    }

// function send_verification_link($activation_code)
    function send_verification_link($email, $activation_code, $sender_email, $sender_app_code){
        // echo "send_link: ".$noreply_email." ".$noreply_app_code;

        $expFormat = mktime(
        date("H"), date("i"), date("s"), date("m") ,date("d")+1, date("Y")
        );
        $expDate = date("Y-m-d H:i:s",$expFormat);
        // $key = md5(strval(2418*2).$email);
        // $addKey = substr(md5(uniqid(rand(),1)),3,10);
        // $key = $key . $addKey;
        $key = $activation_code;
        // Insert Temp Table
        // $pdo->query("INSERT INTO `password_reset_tokens` (`email`, `key`, `expDate`) VALUES ('".$email."', '".$key."', '".$expDate."');");
        // echo "email_sender, key = ".$key;
        $output='<p>Добрый день!</p>';
        $output.='<p>Для подтверждения регистрации в приложении Sherlock Notes перейдите по ссылке ниже.</p>';
        $output.='<p>-------------------------------------------------------------</p>';
        // $output.='<p><a href="https://www.allphptricks.com/forgot-password/reset-password.php?
        // key='.$key.'&email='.$email.'&action=reset" target="_blank">
        // https://www.allphptricks.com/forgot-password/reset-password.php
        // ?key='.$key.'&email='.$email.'&action=reset</a></p>';	
        
        // if you open your project by adding it to the workspace
        // $output.='<p><a href="http://localhost:3000/zettel_notes_app6/php/email_verify.php?verification_code='.$key;

        // if you open your project through "File" => "Open folder"
        $output.='<p><a href="http://localhost:3000/php/email_verify.php?verification_code='.$key;


        $output.='&action="reset" target="_blank">sherlocknotes.php?verification_code='.$key.'</a></p>';

        $output.='<p>-------------------------------------------------------------</p>';
        $output.='<p>Обратите внимание: срок действия ссылки истечёт через 24 часа.</p>';
        $output.='<p>Если вы не регистрировались на сайте, можете проигнорировать это письмо.</p>';   	
        $output.='<p>Искренее благодарим за внимание к нашему сервису,</p>';
        $output.='<p>команда Sherlock Notes</p>';
        $body = $output; 
        $subject = "Sherlock Notes - подтверждение почтового адреса";

        $email_to = $email;
    //  $fromserver = "index.php";
        $fromserver = "noreplylibrarium@gmail.com";
    //  require("PHPMailer/PHPMailerAutoload.php");
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
        // $mail->Host = "mail.yourwebsite.com"; // Enter your host here
        $mail->Host = "smtp.gmail.com"; 
        $mail->SMTPAuth = true;
        $mail->Username = $sender_email; // Enter your email here
        $mail->Password = $sender_app_code; //Enter your password here
        $mail->Port = 465;

        //****************************
        $mail->SMTPSecure = "ssl";
        //****************************
        
        $mail->IsHTML(true); //for the letter itself?
        $mail->CharSet = "utf-8";


    //  $mail->From = "noreply@yourwebsite.com";
    
    //  $mail->From = "lereanon@mail.ru";
        $mail->setFrom("noreplylibrarium@gmail.com");
        $mail->addAddress($email);
    //  $mail->Subject = "Восстановление пароля: код подтверждения";
    
        $mail->FromName = "Sherlock Notes";

        $mail->Sender = $fromserver; // indicates ReturnPath header
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AddAddress($email_to);
        if(!$mail->Send()){
        echo "Mailer Error: " . $mail->ErrorInfo;
        }else{
        echo "<div class='error'>
        <p>An email has been sent to you with instructions on how to reset your password.</p>
        </div><br /><br /><br />";
        }    
    }




?>