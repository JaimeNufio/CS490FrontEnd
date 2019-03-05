<?php
//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

//echo "User:",$_POST['user_name'],"\nPass:",$_POST['password'];
//print_r($_GET)


//	print_r($_SERVER["HTTP_REQUEST_TYPE"]);
	print_r($_SERVER);
	$data = file_get_contents("php://input");
	echo $data;
