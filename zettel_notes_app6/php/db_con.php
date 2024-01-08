<?php
require 'sensitive_info/sensitive_info.php';

$dsn = "pgsql:host=localhost;port=5432;dbname=zettelnotes";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try{
     // З'єднання з базою даних
    $pdo = new PDO($dsn, "$db_server_username", "$db_server_password", $options);
    // print_r('<span style="color:white">Підключення вдалося! </span>'); 
}catch (PDOException $e) {
    $pdo = null;
    print_r('<span style="color:white">Підключення не вдалося: ' . $e->getMessage() . '</span>'); 
    exit;
}
?>