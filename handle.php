<?php
//ini_set('display_errors', 'On');
//error_reporting(E_ALL);

//echo "User:",$_POST['user_name'],"\nPass:",$_POST['password'];
//print_r($_GET)

	print_r($_SERVER);
	if(5==4 && $_SERVER['HTTP_REQUEST_TYPE'] == 'login'){
//		$middle = 'https://web.njit.edu/~jen25/dummy.php';
		$middle = 'https://web.njit.edu/~sn479/index.php';

		$data = file_get_contents("php://input");

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $middle,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => array(
				'request_type' => 'login',
				'data' => $data 
			)
		));

		$result = curl_exec($curl);
		curl_close($curl);
		echo $result;
	}
}else if ($_SERVER['HTT_REQUEST_TYPE'] == 'login){
	echo "Invalid Request";
}


