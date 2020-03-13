<?php
	include "dbh.php";
	session_start();

	if(isset($_SESSION['username'])){
		$user = $_SESSION['username'];
	}else{
		$user = $_COOKIE['user'];
	}

	if(isset($_POST['list'])){
		$query1 = "SELECT title from lists where user = '$user' ORDER BY position DESC";
		$query2 = "SELECT LiID from lists where user = '$user' ORDER BY position DESC";
		$query3 = "SELECT position from lists where user = '$user' ORDER BY position DESC";

		$result1 = mysqli_query($con, $query1);
		$result2 = mysqli_query($con, $query2);
		$result3 = mysqli_query($con, $query3);

		while($arrResult1 = mysqli_fetch_assoc($result1)){
			$arrResponse["title"][]=$arrResult1;
		}

		while($arrResult2 = mysqli_fetch_assoc($result2)){
			$arrResponse["id"][]=$arrResult2;
		}

		while($arrResult3 = mysqli_fetch_assoc($result3)){
			$arrResponse["position"][]=$arrResult3;
		}

		echo json_encode($arrResponse);
	}elseif(isset($_POST['task'])){
		$query1 = "SELECT LiID from lists where user = '$user'";
		$result1 = mysqli_query($con, $query1);
		while($arrResult1 = mysqli_fetch_assoc($result1)){
			$arrResponse[] = $arrResult1;
		}
		for($i=0;$i<count($arrResponse);$i++){
			$arrID[$i] = $arrResponse[$i]["LiID"];
		}
		
		for($i=0;$i<count($arrID);$i++){
			$arrResponseEq=$arrID[$i];
			$query = "SELECT * from tasks where LiID = '$arrResponseEq' ORDER BY position ASC";
			$result = mysqli_query($con, $query);
			while($arrResult = mysqli_fetch_assoc($result)){
				$arrTasks[]=$arrResult;
			}
		}
		
		echo json_encode($arrTasks);
	}elseif(isset($_POST['true'])){
		$TID = $_POST['true'];
		$query = "UPDATE tasks set completed=1 where TID='$TID'";
		$result = mysqli_query($con, $query);
	}elseif(isset($_POST['false'])){
		$TID = $_POST['false'];
		$query = "UPDATE tasks set completed=0 where TID='$TID'";
		$result = mysqli_query($con, $query);
	}elseif(isset($_POST['updateTask'])){
		$TID = $_POST['TID'];
		$update = $_POST['updateTask'];

		$query = "UPDATE tasks set task='$update' where TID='$TID'";
		$result = mysqli_query($con, $query);
	}elseif(isset($_POST['updateTitle'])){
		$LiID = $_POST['LiID'];
		$update = $_POST['updateTitle'];

		$query = "UPDATE lists set title='$update' where LiID='$LiID'";
		$result = mysqli_query($con, $query);
	}elseif(isset($_POST['position']) && isset($_POST['LiID'])){
		$LiID = $_POST['LiID'];
		$position = $_POST['position'];

		$query = "UPDATE lists set position='$position' where LiID='$LiID'";
		$result = mysqli_query($con, $query);
	}elseif(isset($_POST['position']) && isset($_POST['TID'])){
		$TID = $_POST['TID'];
		$position = $_POST['position'];

		$query = "UPDATE tasks set position='$position' where TID='$TID'";
		$result = mysqli_query($con, $query);
	}
?>