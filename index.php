<?php
//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

//echo "User:",$_POST['user_name'],"\nPass:",$_POST['password'];
//print_r($_GET)

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	//$middle = 'https://web.njit.edu/~jen25/dummy.php';
	$middle = 'https://web.njit.edu/~sn479/index.php';

	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => $middle,
		CURLOPT_POST => 1,
		CURLOPT_POSTFIELDS => array(
			user_name  => $_POST['user_name'],
			password => $_POST['password']
		)
	));


	$result = curl_exec($curl);
	curl_close($curl);
	echo $result;
}else{
	echo "nouser";
}
