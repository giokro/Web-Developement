<?php
	include 'dbh.php';
	session_start();

	$user = $_SESSION['username'];
	$oldPassword = $_POST['oldPassword'];

	$newPassword = $_POST['newPassword'];
	$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

	$query = "SELECT password from users where username='$user'";
	$result = mysqli_query($con, $query);
	$arr = mysqli_fetch_assoc($result);

	if(password_verify($oldPassword, $arr['password'])){
		mysqli_query($con, "UPDATE users set password='$newPassword' where username='$user'");
		header('location: home.php');
	}else{
		echo "oh no no";
	}

?>