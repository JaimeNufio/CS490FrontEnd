
var php = "https://web.njit.edu/~jen25/index.php"
var result = document.getElementById("result");
var result1 = document.getElementById("result1");
var count = 0;

//theObject will be assigned to the value of var['questions']
var theObject = {
	"func_ID" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID2" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID3" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID4" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID5" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID6" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID7" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID8" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID9" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID10" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID11" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID12" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	},
	"func_ID13" : {
		"func_name" : "func1",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question",
		"inputs" : ["1", "2"],
		"expected_outputs" : ["5","6"],
		"difficulty" : "hard",
		"topic" : "lol",
		"keywords" : ["truth","covered","in","security"]
	},
	"func_ID14" : {
		"func_name" : "func2",
		"arg_names" : ["name1", "name2"],
		"description" : "stuff about question 2",
		"inputs" : ["4", "19"],
		"expected_outputs" : ["four","nineteen"],
		"difficulty" : "easy",
		"topic" : "turtle",
		"keywords": ["holy","shit"]
	}
}

function POST(args){
	var xhttp = new XMLHttpRequest();

  	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {

		var obj = JSON.parse(this.responseText);
		if (obj["db_login"]){
			result.style.color="#31c55a";
			result.innerHTML+="Login valid, Redirecting.\n";
		}else{
			result.style.color="#e40042";
			result.innerHTML+="Login invalid.\n";
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
	let id = document.getElementById("fname").value+"__"+String(count);
  let question = {
		id : {
			"func_name" : document.getElementById("fname").value,
			"arg_names" : document.getElementById("vars").value.split(","),
			"description" : document.getElementById("desc").value,
			"inputs" : [document.getElementById("in1").value.split(","), document.getElementById("in2").value.split(",")],
			"expected_outputs" : [document.getElementById("out1"), document.getElementById("out2")],
			"difficulty" : document.getElementById("difficulty").value,
			"topic" : document.getElementById("topic").value
	}


    };
//  POST(question);
	console.log(question);

//Request to post this question
//Also need to send a request to backend for everything again
}

//This function is called every update on the search, hopefully rewritting the divs won't be a problem?
function createJSONQuestionQuery(){
	//For Matt, tell him that if the querry['x'] is empty, skip this search portion.
	//If all the variables are empty, send all.
	let query = {
		"topic" : document.getElementById("qtopic").value,
		"keywords": document.getElementById("qkeywords").value.split(","),
		"difficulty": document.getElementById("qdifficulty").value
	}

	console.log(query)
}

function buildTextUnit(topic, keywords, desc, difficulty){

	return `<div class="questionPreview">
	<div class="questionPreviewTitle">TOPIC: ${topic} KEYWORDS: ${keywords}</div>
	<hr>
	<div class="questionPreviewText">	${desc}</div>
	<hr>
	<div class = "questionPreviewDifficulty">Difficulty: ${difficulty}</div>
	</div>`

}

function insert(){
	var scroll = document.getElementById("heap");

	for (let i = 0; i<Object.keys(theObject).length;i++){
		let key = Object.keys(theObject)[i];
		let obj = theObject[key]['topic']
		console.log([obj])
		let piece = buildTextUnit(theObject[key]['topic'],arrayToWords(theObject[key]['keywords']),theObject[key]['description'],theObject[key]['difficulty']);
		scroll.innerHTML+=piece;
	}
}

function arrayToWords(l){
	let out = "";
	console.log(l)
	for (let i = 0; i < l.length; i++){
		out+=l[i];
		if (i!=l.length-1){
			out+=", ";
		}
	}
	return out;
}

//Initially Load Everything in DB
createJSONQuestionQuery();


//insert();																																																						  //

//TODO
//get all questions on page load (Will affect load times?)

