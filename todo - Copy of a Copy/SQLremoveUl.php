<?php
	include 'dbh.php';
	session_start();

	$id= $_POST['id'];

	//prevent sql injection
	sanitizeInput($con,$id);

	$query = "DELETE from lists where LiID = '$id'";
	mysqli_query($con, $query);
?>