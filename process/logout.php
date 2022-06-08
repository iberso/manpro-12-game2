<?php
session_start();
$user = $_GET['user'];
if(isset($_GET['user']) && !empty($_GET['user'])){
    if ($user == 1) {
        echo $user;
        unset($_SESSION['user1']);
        header("HTTP/1.1 200 OK");
    }else if ($user == 2) {
        echo $user;
        unset($_SESSION['user2']);
        header("HTTP/1.1 200 OK");
    }else{
        header("HTTP/1.1 404 Not Found");
    }
}
?>
