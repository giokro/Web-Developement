<?php

	include "dbh.php";

    $user = $_POST['username'];
    $pass = $_POST['pass'];

    //prevent sql injection
    sanitizeInput($con,$user);
    sanitizeInput($con,$pass);

    $arr = mysqli_query($con,"SELECT * FROM users WHERE username = '$user'");

    $arr = mysqli_fetch_array($arr);

    if($arr['username'] == $user && password_verify($pass, $arr['password'])){
        
        session_start();
        $_SESSION['username'] = $arr['username'];

        if(isset($_POST['remember'])){
            setcookie('user', $arr['username'], time()+60*60*7);
        }

        header('location: home.php');
    }else{
        header('location: index.php?wrongPass=0');
    }

?>