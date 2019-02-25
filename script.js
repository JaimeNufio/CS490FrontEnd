
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
	
function createJSONQuestionAdd(){
  let question = {
		"func_ID" : {
			"func_name" : document.getElementById("fname").value,
			"arg_names" : document.getElementById("args").value.split(","),
			"description" : document.getElementById("desc").value,
			"inputs" : [document.getElementById("in1").value, document.getElementById("in2").value],
			"expected_outputs" : [document.getElementById("out1").value, document.getElementById("out2").value],
			"difficulty" : document.getElementById("difficulty").value,
			"topic" : document.getElementById("topic").value
	}


    };
//  POST(question); 
  console.log(question);
}

createJSONQuestionAdd();																																																															  //
