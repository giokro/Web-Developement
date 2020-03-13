<?php	
	session_start();
	include 'dbh.php';

	$listName = $_POST['listName'];
	$username = $_SESSION['username'];

	//prevent sql injection
	sanitizeInput($con,$listName);
	sanitizeInput($con,$username);

	$query = "INSERT INTO lists (title, user) VALUES ('$listName', '$username')";

	mysqli_query($con, $query);
	$id = mysqli_insert_id($con);

	echo $id;
?>