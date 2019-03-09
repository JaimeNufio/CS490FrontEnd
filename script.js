var handle  = "https://web.njit.edu/~jen25/handle.php"
var scott = "https://web.njit.edu/~sn479/index.php"
var php = "https://web.njit.edu/~jen25/dummy.php"

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

var absoluteQNum = 0
var result = document.getElementById("result");
var result1 = document.getElementById("result1");
var total = 0; //pts of test
var qNum = 0;

//theObject will be assigned to the value of var['questions']
var exam = {};
var theObject={};



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
		let r = ""+this.response;
		if (r == " instructor" || r == " student"){
			result.style.color="#31c55a";
			if (r == " instructor"){
				result.innerHTML+="Login valid, Redirecting.\n";
				window.location.href = "./teacherSearch.html";
			}else{
				result.innerHTML+="Login valid, Redirecting.\n";
				
				//Check if Released
				let xhttp1 = new XMLHttpRequest();
  			xhttp1.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
							console.log(this.repsonse);
						if (this.response == ""){
					//		window.location.href = "./studentReview.html";
						}else{
							window.location.href = "./studentTake.html";
						}
					}
				}

				xhttp1.open("POST", scott, true);
				xhttp1.setRequestHeader("Request-Type", "is_released");
				xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhttp1.setRequestHeader("Access-Control-Allow-Origin","*");
				xhttp1.send(JSON.stringify(args));
				console.log(xhttp1);
			
			}
		}else{
			result.style.color="#e40042";
			result.innerHTML+="Login invalid.\n";
		}

		console.log(r);
	}
	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "login");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.send(JSON.stringify(args));
	console.log(xhttp);
}

function goToReview(){
	window.location.href = "./teacherReview.html";
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
			console.log("adding following to functionList");
			console.log(Object.keys(theObject)[buttonId]);
			//console.log(button.parentElement.parentElement.parentElement.parentElement.id);
			functionList.push(Object.keys(theObject['questions'])[buttonId]);

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

		console.log("from folloing to functionList");
		console.log(Object.keys(theObject['questions'])[buttonId]);

		for (var i =0; i < functionList.length;i++){
			if (functionList[i]===Object.keys(theObject)[buttonId]){
				functionList.splice(i,1);
				functionWorth.splice(i,1);
			}
		}
	}
	document.getElementById("total").innerHTML=`${total}/100`;
	console.log("funciton list follows");
	console.log(functionList);
	console.log(functionWorth);
}

function createJSONQuestionAdd(){

	if (document.getElementById("fname").value.length == 0 || document.getElementById("vars").length == 0 ||
	document.getElementById("desc").length == 0 || document.getElementById("in1").length == 0 ||
	document.getElementById("out1").length == 0 || document.getElementById("topics").length == 0 ||
	document.getElementById("in2").length == 0 || document.getElementById("out2").length == 0 ){
		console.log("Something is empty...");
	}else{
		let id = document.getElementById("fname").value+"--"+String(absoluteQNum+1);
		let question = {"questions":{
			[id] : {
				"func_name" : document.getElementById("fname").value,
				"arg_names" : document.getElementById("vars").value.split(","),
				"description" : document.getElementById("desc").value,
				"inputs" : [document.getElementById("in1").value.split(","), document.getElementById("in2").value.split(",")],
				"expected_outputs" : [document.getElementById("out1").value, document.getElementById("out2").value],
				"difficulty" : document.getElementById("difficulty").value,
				"topics" : [document.getElementById("topics").value]
				}
			}
		}

		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {

			if (this.readyState == 4 && this.status == 200) {
				console.log("back should have gotten the question");
				createJSONQuestionQuery();
			}

		};

		xhttp.open("POST", scott, true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Request-Type", "new_question");
		xhttp.send(JSON.stringify(question));
		console.log(question);
		console.log(xhttp);

		//Update the search bar, new question might appear.
	}
}

//This function is called every update on the search, hopefully rewritting the divs won't be a problem?
function createJSONQuestionQuery(){
	console.log("Query Called");

	//For Matt, tell him that if the querry['x'] is empty, skip this search portion.
	//If all the variables are empty, send all.
	let query = {
		"topics" : [document.getElementById("qtopic").value],
		"keywords": document.getElementById("qkeywords").value.split(","),
		"difficulty": document.getElementById("qdifficulty").value
	}

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
			theObject = JSON.parse(this.response);
			CreateListForTeacher(); //Redraw the list based on new Query
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "query");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(query));
	console.log(xhttp);
}

function releaseScores(){

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			theObject = JSON.parse(this.response);
		//	CreateListForTeacher(); //Redraw the list based on new Query
		}
  };

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "release");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send();
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

	xhttp.open("GET", handle, true);
	xhttp.setRequestHeader("Request-Type", "num_questions");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//xhttp.send(JSON.stringify(args));
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
}

function CreateListForTeacher(){
	var scroll = document.getElementById("heap");
	scroll.innerHTML = ""; //Erase the current.

	for (let i = 0; i<Object.keys(theObject['questions']).length;i++){

		let key = Object.keys(theObject['questions'])[i];
		let obj = theObject['questions'][key]['topics']
		//console.log([obj])
		let piece = buildTextUnit(
		theObject['questions'][key]['topics'],
		key,
		theObject['questions'][key]['description'],
		theObject['questions'][key]['difficulty']);
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
		console.log(i);
		console.log(functionList[i]);
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
	console.log(functionList);
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
			//theObject = JSON.decode(this.response);
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "new_exam");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(query);
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


//*********TEACHER REVIEW :CLAP::CLAP:*****************************************88888 */

function sendExamBack(){
	let xhttp = new XMLHttpRequest();
	let args = {"username":document.getElementById("selectName")};
	console.log(`Trying for ${document.getElementById("selectName")}`)

	NewExam = exam;

	let student = Object.keys(exam)[0];
	console.log(student);

	for (let i =0; i<Object.keys(exam[student]['questions']).length;i++){
		NewExam[student]['answers']+=document.getElementById(i).value+"\n\n";
	}

  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("submitted.")
		}
	}

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "modify_grade");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(NewExam));
	console.log(xhttp);
}


//assembleExam, but for the professor to view and edit.
//Presumably, theObject is already the single student exam
function assembleExamComments(){

		let student = Object.keys(exam)[0];
		console.log(student);

		for (let i =0; i<Object.keys(exam[student]['questions']).length;i++){
			let key = Object.keys(exam[student]['questions'])[i];
			let curr = exam[student]['questions'][key];

			document.getElementById('exam').innerHTML+=`
			<div class="questionWritten">
			<div>
				<h2 class="questionTitle">Question ${i+1}:</h2>
			</div>
			<div class="questionText">
				${curr['description']}
			</div>
			<div class="ans">Answer Given:</div>

			<div class="studentAns"></div>
			<div class="ans" style="width:200px;">
				<div style="float:left; margin-top:15px; margin-bottom:3px;">Points Delta:</div>
				<input class="" style="height: 17px;"></input>
			</div>
			<div class="ans">Comments:</div>
			<textarea id="${i}" onkeydown="return stopTab(event);"></textarea>
			<div style="float:right; padding-top:220px;padding-right:50px">Value: ${exam[student]['points'][i]}</div>
			<div style="float:right; padding-top:220px;padding-right:50px">${key}</div>
			<hr>
		</div>`;
		}
}

//For Review
//TODO fails to show answers
function LoadStudentExam(){

	let xhttp = new XMLHttpRequest();
	let args = {"username":document.getElementById("selectName").value};
	console.log(`Trying for ${document.getElementById("selectName").value}`)
  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			exam=JSON.parse(this.response);
			assembleExamComments();
		}
	}

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "review_grade");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify(args));
	console.log(xhttp);
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
		if (this.response == " student"){
			console.log(exam['questions']);	
			//TODO JSON not working, answers not displayed, not being built
			var complete = {};
			complete[args['username']] = {};
			complete[args['username']]['questions'] = exam['questions'];
			complete['points'] = exam['points'];
			complete['answers'] = [];
			complete['score'] = 0;
			complete['comments'] = "";

				for (let i = 0; i< exam['points'].length; i++){
					complete['answers'][i] = document.getElementById(i).value;
				}
			}

			let xhttp1 = new XMLHttpRequest();
			xhttp1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log("Done?")
				}
			}

			console.log(complete);
			xhttp1.open("POST", scott, true);
			xhttp1.setRequestHeader("Request-Type", "submit");
			xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhttp1.send(JSON.stringify(exam));
			console.log(xhttp1);
		}
	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "login");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(xhttp);
	xhttp.send(JSON.stringify(args));
}

//For Taking
function LoadStudentExamTake(){
	
	if (document.URL.includes("studentTake")){
		let xhttp = new XMLHttpRequest();
		//console.log(`Trying for ${document.getElementById("selectName").value}`)
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			exam = JSON.parse(this.response);
			assembleExam();
			}
		}

		xhttp.open("POST", scott, true);
		xhttp.setRequestHeader("Request-Type", "take_exam");
		xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("");
		console.log(xhttp);
	}else{
		console.log(document.URL);
	}
}

function assembleAnswersStudentReview(){

	let student = Object.keys(exam)[0];
	for (let i = 0; i<Object.keys(exam[student]['questions']).length;i++){
		let key = Object.keys(exam[student]['questions'])[i];
		let curr = exam['questions'][key];
		document.getElementById("heap").innerHTML+=`<div style="background: #FFF;text-align: left" class="questionWritten">
		<div>
			<h2 class="questionTitle">Question ${i+1}:</h2>
		</div>
		<div class="questionText">
		${curr['description']}
		</div>
		<div style="float:left; margin-left: 20px;">${exam['points'][i]}</div>
		<div class="ans">Answer:</div>
		<div class="answerDisplay" id="" onkeydown="return stopTab(event);">
		${exam['answers'][i]}
		</div>`
	}
	document.getElementById("comments").innerHTML=`<h1>FINAL SCORE: ${exam[student][score]}/100</h1>
	<br>
	<p>${exam[student][comments]}</p>`

}

function GetResults(){
	let args = {
		'username':""+document.getElementById("user").value,
		'password':""+document.getElementById("pass").value
	};

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.response==" student"){

				let student = this.response;
				let xhttp1 = new XMLHttpRequest();

				xhttp1.onreadystatechange = function() {
					exam=JSON.parse(this.response);
					assembleAnswersStudentReview();
				}
				xhttp1.open("POST", scott, true);
				xhttp1.setRequestHeader("Request-Type", "review_grade");
				xhttp1.setRequestHeader("Access-Control-Allow-Origin","*");
				xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				console.log(xhttp1);
				xhttp1.send(JSON.stringify({"username":student}));
			}
		}
	}

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "login");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
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


//assembleExam();

//On Load, we're required to know the # of functions in the DB
//Create a list of questions for the teacher to skim
//CreateListForTeacher();
try{
createAbsoluteNumQuery();
LoadStudentExamTake();
createJSONQuestionQuery();																																																		  //
}catch(err){

}


//TODO
//Release Button (simple empty request)
//Submit Test Button (a pain but step thru the array)
