<?php	
	session_start();

	if(isset($_GET['logout'])){
		session_destroy();
		session_unset();

		setcookie('user', $arr['username'], time()-120);

		header('location: index.php');
	}

	if(isset($_SESSION['username']) OR isset($_COOKIE['user'])){
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ToDo</title>
		<link rel="stylesheet" href="style/style_home.css">
		<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	</head>
	<body>
		<div class="cover" onclick="hideShow(); removeFromPop()"></div>
		<div class="cover2" onclick="hideShowUser(); removeFromPop()"></div>

			<nav>
				<header>ToDo</header>	

				<div class = "linput_box">	
					<input type="text" class="linput" id="addList" placeholder="Create a List">
					<input type="button" onclick = "addList();" class="linput_btn" value="+">
				</div>
				<div class='menuDiv'>
					<a id="menu" onclick="hideShowMenu()">|||</a>
					<div id="menuList" class="menu">
						<a class="menuItem username" id="username"><?php if(isset($_SESSION['username'])){echo "#".$_SESSION['username'];}else{echo "#".$_COOKIE['user'];}?></a>
						<a class="menuItem" onclick="hideShowUser(); changeUsername()">Change Username</a>
						<a class="menuItem" onclick="hideShowUser(); changeEmail()">Change Email</a>
						<a class="menuItem" onclick="hideShowUser(); changePassword()">Change Password</a>
						<a class="menuItem" onclick="hideShowUser(); aboutUs()">About Us</a>
						<a class="menuItem" id="logout" href="home.php?logout=0">Log Out</a>
					</div>
				</div>
			</nav>

			<input type="hidden" id="taskID" value="0">
			<input type="hidden" id="chosenList" value="">

			<div class="popupList">	
			</div>
			
			<div id="sortable">
				
			</div>

			<div class='noList'>
				<p>Your lists will appear here!</p>
			</div>

			<footer>
	            <p># ჩვენი თესლი საიტი, ორი მეგაბაიტი #</p>
	        </footer>

	        <script src="list.js"></script>
	</body>
</html>

<?php

	}else{
		header('location: index.php');
	}

?>
