<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "todo";

	$con = mysqli_connect($servername, $username, $password, $dbname);

	//$con = mysqli_connect("anysql.itcollege.ee", "team13", "VZ_384keQqe", "WT_13");

	function sanitizeInput($con, $input){
		$input = stripslashes($input);
		$input = htmlentities($input);
		$input = strip_tags($input);
		$input = mysqli_real_escape_string($con,$input);
		return $input;
	}

?>