var handle  = "https://web.njit.edu/~jen25/handle.php"
var scott = "https://web.njit.edu/~sn479/index.php"
var php = "https://web.njit.edu/~jen25/dummy.php"

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

var absoluteQNum = 0;
var result = document.getElementById("result");
var result1 = document.getElementById("result1");
var total = 0; //pts of test
var qNum = 0;

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

var exam = {
	'questions':{
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
		}
	},
	"points":[20,10,30,10,30]
}

var functionList = [];
var functionWorth = [];
function login(){

	result1.innerHTML="";
	result.innerHTML="";

	let args = {
		'username':""+document.getElementById("user").value,
		'password':""+document.getElementById("pass").value
	};
	console.log(args);

	//"user_name="+document.getElementById("user").value+"&password="+document.getElementById("pass").value;
	//document.getElementById("result").innerHTML=args;
	let xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {

	if (this.readyState == 4 && this.status == 200) {
		if (this.response == "instructor" || this.response == "student"){
			result.style.color="#31c55a";
			result.innerHTML+="Login valid, Redirecting.\n";
			if (this.response == "instructor"){
				window.location.href = "/teacherSearch.html";
			}
		}else{
			result.style.color="#e40042";
			result.innerHTML+="Login invalid.\n";
		}
	
		console.log(this.response);
	}
	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "login");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(args));
	console.log(xhttp);
}


function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON" && /questionPreviewButton/.test(element.className)) {
            ButtonStateHandler(element);
            break;
        }

        element = element.parentNode;
    }
}

function ButtonStateHandler(button) {
	let val = (button.parentElement.getElementsByClassName('select')[0].value);

	if (button.classList.contains("up")){
		let temp =total-(-val);
		if (!isNaN(val) && val > 0 && temp<=100){

			let buttonId = button.parentElement.parentElement.parentElement.parentElement.id;

			total-=-val;
			button.parentElement.getElementsByClassName('select')[0].readOnly = true;
			button.classList.add("down");
			button.classList.remove("up");
			button.innerHTML = "Remove";

			functionWorth.push((val));
			let key = Object.keys(theObject)[buttonId];
			let obj = theObject[key];

			console.log(Object.keys(theObject)[buttonId]);
			//console.log(button.parentElement.parentElement.parentElement.parentElement.id);
			functionList.push(Object.keys(theObject)[buttonId]);

		}else{
			console.log("NaN");
		}
	}else{
		let buttonId = button.parentElement.parentElement.parentElement.parentElement.id;

		button.classList.remove("down");
		button.classList.add("up");
		total-=-(-val);
		button.parentElement.getElementsByClassName('select')[0].readOnly = false;
		button.innerHTML = "Append";

		console.log(Object.keys(theObject)[buttonId]);

		for (var i =0; i < functionList.length;i++){
			if (functionList[i]===Object.keys(theObject)[buttonId]){
				functionList.splice(i,1);
				functionWorth.splice(i,1);
			}
		}
	}
	document.getElementById("total").innerHTML=`${total}/100`;
	console.log(functionList);
	console.log(functionWorth);
}

function createJSONQuestionAdd(){

	if (document.getElementById("fname").value.length == 0 || document.getElementById("vars").length == 0 ||
	document.getElementById("desc").length == 0 || document.getElementById("in1").length == 0 ||
	document.getElementById("out1").length == 0 || document.getElementById("topic").length == 0 ||
	document.getElementById("in2").length == 0 || document.getElementById("out2").length == 0 ){
		console.log("Something is empty...");
	}else{
		let id = document.getElementById("fname").value+"__"+String(absoluteQNum);
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
		}

		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {

			if (this.readyState == 4 && this.status == 200) {
			}

		};

		xhttp.open("POST", scott, true);
		xhttp.setRequestHeader("Request_Type", "new_question");
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send(JSON.stringify(question));
		console.log(xhttp);

		//Update the search bar, new question might appear.
		createJSONQuestionQuery();
	}
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

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			theObject = JSON.decode(response);
			CreateListForTeacher(); //Redraw the list based on new Query
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request_Type", "query");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(query));
	console.log(xhttp);
}

function releaseScores(){
	let query = {};

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			theObject = JSON.parse(this.response);
			CreateListForTeacher(); //Redraw the list based on new Query
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request_Type", "release");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(query));
	console.log(xhttp);
}

function createAbsoluteNumQuery(){
	let xhttp = new XMLHttpRequest();

	let args = {};
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			absoluteQNum = this.response;
		}
	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request_Type", "num_questions");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(args));
	console.log(xhttp);
}

function buildTextUnit(topic, func_name, desc, difficulty){
	return `<div class="questionPreview" id = ${qNum}>
	<div class="questionPreviewTitle">ID: ${func_name} TOPIC: ${topic}</div>
	<hr>
	<div class="questionPreviewText">
		<span class="smallHeading">Question:</span>
	 	<br>
		<div>
			${desc}
		</div>
	<hr>
	<div class="questionPreviewHandler">
	  <div style="margin-top:8px;" class="questionPreviewContainer">
		<div style="margin-top:8px; margin-right:5px; margin-left:5px" class="questionPreviewDifficulty">Difficulty: ${difficulty}</div>
		<div style="float:left;margin-top:8px; margin-right:5px">Points Value:</div>
		<input class="select pts" style="height:15px;float:left;width:10%;margin-top:5px"></input>
		<button style="float:right; margin-right:20px; width:20%;" class="up questionPreviewButton">Append</button>
	  </div>
	</div>
  </div>`;


	/*`<div class="questionPreview">
	<div class="questionPreviewTitle">TOPIC: ${topic} KEYWORDS: ${keywords}</div>
	<hr>
	<div class="questionPreviewText">	${desc}</div>
	<hr>
	<div class = "questionPreviewDifficulty">Difficulty: ${difficulty}</div>
	</div>`*/

}

function CreateListForTeacher(){

	var scroll = document.getElementById("heap");
	scroll.innerHTML = ""; //Erase the current.

	qNum = 0;

	for (let i = 0; i<Object.keys(theObject).length;i++){
		let key = Object.keys(theObject)[i];
		let obj = theObject[key]['topic']
		console.log("key: "+key)
		//console.log([obj])
		let piece = buildTextUnit(theObject[key]['topic'],key,theObject[key]['description'],theObject[key]['difficulty']);
		scroll.innerHTML+=piece;
		qNum++;
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

function createExam(){
	var examOut = {"questions":{}};
	for (let i = 0;i<functionList.length;i++){
		//console.log(theObject[functionList[i]]);
		let key = functionList[i];
		examOut['questions'][key] = theObject[functionList[i]];
	}
	examOut['points'] = functionWorth;
	console.log(examOut);

	return examOut;
}

//Submit exam as completely built to the DB
function submitExam(){
	if (total != 100){
		return;
	}else{

	let query = createExam();

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
		//	theObject = JSON.decode(response);
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request_Type", "release");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(query));
	console.log(xhttp);
	}
}

//builds exam to display
function assembleExam(){
	//let l = Object.keys(exam['questions']);
	for (let i = 0; i<Object.keys(exam['questions']).length;i++){
		let key = Object.keys(exam['questions'])[i];
		let curr = exam['questions'][key];

		document.getElementById('exam').innerHTML+=`
		<div class="questionWritten">
		<div>
		  <h2 class="questionTitle">Question ${i+1}:</h2>
		</div>
		<div class="questionText">
		${curr['description']}
		</div>
		<div class="ans">Answer:</div>
		<textarea id="${i}" onkeydown="return stopTab(event);"></textarea>
		<div style="float:right; padding-top:220px;padding-right:50px">${exam['points'][i]}</div>
		<div style="float:right; padding-top:220px;padding-right:50px">${key}</div>
		<hr>
	  </div>`
	}
}

//student finished the exam
function SubmitFinishedExam(){

	let args = {
		'username':""+document.getElementById("user").value,
		'password':""+document.getElementById("pass").value
	};
	console.log(args);

	//"user_name="+document.getElementById("user").value+"&password="+document.getElementById("pass").value;
	//document.getElementById("result").innerHTML=args;
	let xhttp = new XMLHttpRequest();

  	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		if (this.response == "student"){

			//TODO test this section outside of this nested http
			//need to determine if the structure is correct
			var complete = {};

			complete[args['username']]['questions'] = exam['questions'];
			complete['points'] = exam['points'];
			complete['answers'] = [];
			complete['score'] = 0;
			complete['comments'] = "";

			for (let i = 0; i<exam['points'].length;i++){
				exam['answers'][i] = document.getElementById(i).value;
			}

			}
		}
		console.log(exam);
		let xhttp1 = new XMLHttpRequest();
		xhttp1.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log("Done?")
			}
		}



		xhttp1.open("POST", scott, true);
		xhttp1.setRequestHeader("Request_Type", "submit_exam");
		xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp1.send(JSON.stringify(args));
		console.log(xhttp1);
	};

	xhttp.open("POST", handle, true);
	xhttp.setRequestHeader("Request_Type", "login");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(xhttp);
	xhttp.send(JSON.stringify(args));
}

function stopTab( e ) {
    var evt = e || window.event
    if ( evt.keyCode === 9 ) {
		e.preventDefault();
		event.target.value+=("\u00a0\u00a0\u00a0\u00a0");

		return false;
    }
}

/*
function onKeyDown(e) {
	console.log(e.keyCode)
	if (e.keyCode === 9) { // tab key
		console.log('tab')
        e.preventDefault();  // this will prevent us from tabbing out of the editor

        // now insert four non-breaking spaces for the tab key
        var editor = document.getElementById("editor");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}*/


assembleExam();

//On Load, we're required to know the # of functions in the DB
createAbsoluteNumQuery()
//Create a list of questions for the teacher to skim
CreateListForTeacher();																																																						  //



//TODO
//Release Button (simple empty request)
//Submit Test Button (a pain but step thru the array)
