<?php
	include "dbh.php";

	$email = $_GET['email'];

	//prevent sql injection
	sanitizeInput($con,$email);

	$sql = "SELECT * from users where email = '$email'";

	$result = mysqli_query($con, $sql);

	$numRows = mysqli_num_rows($result);

	if($numRows > 0){
		echo "true";
	}else{
		echo "false";
	}

?>
