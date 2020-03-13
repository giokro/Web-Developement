<?php
	include 'dbh.php';

	$username = $_GET['username'];

	//prevent sql injection
	sanitizeInput($con,$username);

	$sql = "SELECT * from users where username = '$username'";

	$result = mysqli_query($con, $sql);

	$numRows = mysqli_num_rows($result);

	if($numRows > 0){
		echo "true";
	}else{
		echo "false";
	}

?>