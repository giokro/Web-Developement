<?php

include 'dbh.php';
session_start();

$user = $_POST['username'];
$old_user = $_SESSION['username'];

mysqli_query($con, "UPDATE users set username='$user' where username='$old_user'");
mysqli_query($con, "UPDATE lists set user='$user' where user='$old_user'");

$_SESSION['username']=$user;

header('location: home.php');

?>