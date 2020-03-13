<?php
	include 'dbh.php';

    $username = $_POST['username'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['pass'], PASSWORD_DEFAULT);

    //prevent sql injection
    sanitizeInput($con,$username);
    sanitizeInput($con,$email);
    sanitizeInput($con,$pass);
    
	mysqli_query($con,"INSERT INTO users (username, password, email) VALUES ('$username', '$pass', '$email')");
	header('location: index.php');
?>