<?php
	session_start();

	if(isset($_COOKIE['user']) OR isset($_SESSION['username'])){
        header('location: home.php');
    }
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>LOGIN</title>
		<link rel="stylesheet" href="style/style_login.css">
		<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	</head>

	<body>
		<div class="cover">

			<nav>
				<header>ToDo</header>
			</nav>

			<div class="text">
				<p class="quote">"The best preperation for tomorrow<br>is doing your best today."<br><br>So make a list!<br></p>
				<p class = "started">Get started with ToDo!</p>
			</div>

			<form class="login" action="login.php" method="post">
				<h1>Log In</h1>
				<input type="text" name="username" placeholder="Username" onfocus="this.placeholder = ''" onblur = "this.placeholder = 'Username'" required="">

				<input type="password" name="pass" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" required="">

				<input type="submit" value="Log In"/>

				<label style="color: red; margin-left: 5%;">
					<?php
					if(isset($_GET['wrongPass'])){
    					echo "The username or password is wrong!";
    				}
					?>
				</label>

				<div class = "remember">
					<label>Remember Me</label>	
					<div class='check'>			
						<input type="checkbox" name="remember">
					</div>
				</div>
				
				<a href="sign_up.html">Sign Up</a>
			</form>

		</div>
	</body>
</html>
