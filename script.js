
var php = "https://web.njit.edu/~jen25/index.php"
var result = document.getElementById("result");
var result1 = document.getElementById("result1");

function POST(args){
	var xhttp = new XMLHttpRequest();

  	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {

		var obj = JSON.parse(this.responseText);
		if (obj["db_login"]){
			result.style.color="#31c55a";
			result.innerHTML+="Login valid for our DB.\n";
		}else{
			result.style.color="#e40042";
			result.innerHTML+="Login invalid for our DB.\n";
		}
																										if (obj["njit_login"]){
			result1.style.color="#31c55a";
			result1.innerHTML+="Login valid for NJIT's DB.";
		}else{
			result1.style.color="#e40042";
			result1.innerHTML+="Login invalid for NJIT DB.";
		}
	}
	};

	xhttp.open("POST", php, true);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(args);
	console.log(xhttp);
    }

function login(){
	result1.innerHTML="";
	result.innerHTML="";
        let args = "user_name="+document.getElementById("user").value+"&password="+document.getElementById("pass").value;
	//document.getElementById("result").innerHTML=args;
	POST(args);
}
																																																																  //
