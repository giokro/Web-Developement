<?php 
include 'dbh.php';
$email=$_POST['email'];
session_start();
$user = $_SESSION['username'];

mysqli_query($con, "UPDATE users set email='$email' where username='$user'");

header('location: home.php');

?>