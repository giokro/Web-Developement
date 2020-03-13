<?php
	include 'dbh.php';

	$LiID = $_POST['LiID'];
	$task = $_POST['task'];
	$completed = $_POST['completed'];
	$position = $_POST['position'];

	//prevent sql injection
	sanitizeInput($con,$LiID);
	sanitizeInput($con,$task);
	sanitizeInput($con,$completed);
	sanitizeInput($con, $position);

	$query = "INSERT INTO tasks (LiID, task, completed, position) VALUES ('$LiID', '$task', '$completed', '$position')";

	$result = mysqli_query($con, $query);
	$id = mysqli_insert_id($con);

	echo $id;
?>