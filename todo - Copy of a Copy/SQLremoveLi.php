<?php
	include 'dbh.php';
	session_start();

	$id= $_POST['id'];

	//prevent sql injection
	sanitizeInput($con,$id);

	$query = "DELETE from tasks where TID = '$id'";
	mysqli_query($con, $query);
?>