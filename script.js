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
var lock = false;
var DEBUG = false;//true;

//theObject will be assigned to the value of var['questions']
var exam = {};
var theObject={};
var students={};


var functionList = [];
var functionListName = [];
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
		if (r == "instructor" || r == "student"){
			localStorage.setItem("username",args['username']);
			result.style.color="#31c55a";
			if (r == "instructor"){
				result.innerHTML+="Login valid, Redirecting.\n";
				window.location.href = "./teacherSearch.html";
			}else{
				result.innerHTML+="Login valid, Redirecting.\n";

				//Check if Released
				let xhttpa = new XMLHttpRequest();
  			xhttpa.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if (this.response == "true"){
							window.location.href = "./studentReview.html";
						}else{
							window.location.href = "./studentTake.html";
						}
					}
				}

				xhttpa.open("POST", scott, true);
				xhttpa.setRequestHeader("Request-Type", "is_released");
				xhttpa.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhttpa.setRequestHeader("Access-Control-Allow-Origin","*");
				xhttpa.send();
				console.log(xhttpa);

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
	console.log("current theObject");
	console.log(theObject);

	UpdateTeacherExamPreview();
	if (button.classList.contains("up")){
		let temp =total-(-val);
		console.log("Lock State");
		console.log(lock);
		console.log("Lock Logic:");
		console.log((!lock || (lock && temp <=100)));
		if ((!isNaN(val) && val > 0) && (!lock || (lock && temp <=100))){
			let buttonId = button.parentElement.parentElement.parentElement.parentElement.parentElement.id;
			console.log("buttonId");
			console.log(buttonId);
/*
			let key = Object.keys(theObject['questions'])[buttonId];
			console.log("keys:");
			console.log(Object.keys(theObject['questions']));
			console.log("key:");
			console.log(key);
			let obj = theObject[key];
			let questionName= Object.keys(theObject['questions'])[buttonId]
*/

			let keys = Object.keys(theObject['questions']);
			console.log("keys:");
			console.log(keys);
			console.log("id:");
			console.log(buttonId);
			console.log("key:");
			console.log(keys[buttonId]);
			key=keys[buttonId];
			console.log("Obj:");
			let obj = theObject['questions'][key];
			console.log(obj);
			let questionName= Object.keys(theObject['questions'])[buttonId]


			console.log("QuestionName:");
			console.log(questionName);
			console.log("adding following to functionList");
			console.log(theObject['questions'][questionName]);
			functionList.push(theObject['questions'][questionName]);
			functionListName.push(questionName);

			total-=-val;
			button.classList.add("down");
			button.classList.remove("up");
			button.parentElement.getElementsByClassName('select')[0].readOnly = true;
			button.innerHTML = "Remove";
			functionWorth.push((val));
		}else{
			console.log("NaN");
			alert("Erroneous Input. (Require: positive integer greater than 0. If 100 point bound set, total cannot exceed 100.)");
		}
	}else{
		let buttonId = button.parentElement.parentElement.parentElement.parentElement.parentElement.id;

		button.classList.remove("down");
		button.classList.add("up");
		total-=-(-val);
		button.parentElement.getElementsByClassName('select')[0].readOnly = false;
		button.innerHTML = "Append";
/*
		let key = Object.keys(theObject)[buttonId];
		let obj = theObject[key];
		let questionName= Object.keys(theObject['questions'])[buttonId]
*/

			let keys = Object.keys(theObject['questions']);
			console.log("keys:");
			console.log(keys);
			console.log("id:");
			console.log(buttonId);
			console.log("key:");
			console.log(keys[buttonId]);
			key=keys[buttonId];
			console.log("Obj:");
			let obj = theObject['questions'][key];
			console.log(obj);
			let questionName= Object.keys(theObject['questions'])[buttonId]

		console.log("from folloing to functionList");
		console.log(theObject['questions'][questionName]);

		for (var i =0; i < functionList.length;i++){
			if (functionListName[i]===questionName){
				console.log("should remove");
				functionList.splice(i,1);
				functionWorth.splice(i,1);
				functionListName.splice(i,1);
			}
		}
	}
	if(lock){
		document.getElementById("total").innerHTML=`Exam Total: ${total}/100`;
	}else{
		document.getElementById("total").innerHTML=`Exam Total: ${total}`;
	}
	console.log("funciton list follows");
	console.log(functionList);
	console.log(functionListName);
	console.log(functionWorth);

	UpdateTeacherExamPreview();
}

function Lock(){
	let button = document.getElementById('lock');
	if (lock){
		//unlock
		button.classList.remove("down");
		button.classList.add("up");
	}else{
		//unlock
		button.classList.remove("up");
		button.classList.add("down");
	}
	
	lock = !lock;
	
	if(lock){
		document.getElementById("total").innerHTML=`Exam Total: ${total}/100`;
	}else{
		document.getElementById("total").innerHTML=`Exam Total: ${total}`;
	}
}


function UpdateTeacherExamPreview(){
	document.getElementById("examBuilder").innerHTML="";
	for (let i = 0; i<functionList.length;i++){
		console.log("FUNCITON LSIT EBUG FOR UPDATE");
		console.log(functionList[i]);
		document.getElementById("examBuilder").innerHTML += buildTextUnitDisplay(
			arrayToWords(functionList[i]["topics"]),
			functionList[i]['func_name'],
			functionList[i]['description'],
			functionList[i]['difficulty'],
	//		arrayToWords(functionList[i]['arg_names']),
			i
		);	
	}
	hideAddQuestion();
}

function hideAddQuestion(){
	document.getElementById("AddQuestion").style.display="none";
	document.getElementById("QuestionPreview").style.display="block";
}

function showAddQuestion(){
	document.getElementById("QuestionPreview").style.display="none";
	document.getElementById("AddQuestion").style.display="block";
}

function gatherInputs(){
	let items = [];
	if (document.getElementById(`in${1}`).value==""){
		//No inputs!!!
		let size = gatherOutputs().length;
		for (let i = 0;i<size;i++){
			items.push([]);
		}
	}else{
		for (let i =0; i<testcases;i++){
			if (document.getElementById(`in${i+1}`).value != ""){
				let ins = (document.getElementById(`in${i+1}`).value).replace(/\s+/g, '').split("|");
				items.push(ins);
			}else{
				i=9;
			}
		}
	}
	console.log("Gather inputs");
	console.log(items);
	return items;
}

function gatherOutputs(){
	let items = [];
	for (let i =0; i<testcases;i++){
		if (document.getElementById(`out${i+1}`).value != "" ){
			items.push(document.getElementById(`out${i+1}`).value.replace(/\s+/g, ''));
		}else{
			i=9;
		}
	}
	console.log("Gather outputs");
	console.log(items);
	return items;
}

function TestCaseErrors(){
	let outSet = gatherOutputs();
	let inSet = gatherInputs();
	//let varSet = document.getElementById("vars").value.split(",");
	
	let varSet = inSet[0];

	console.log("TESTCASEERRORS:");
	console.log("IN Set");
	console.log(inSet);
	console.log("OUT Set");
	console.log(outSet);
	console.log("VAR Set");
	console.log(varSet);

	try{
		console.log(varSet.length);
	}catch(err){
		console.log("varSet[i] has 0 len");
			
	}

	let flag = false;
	document.getElementById("feedbackA").innerHTML = "";
	
	if (outSet.length == 0 || inSet.length == 0){
		console.log("ERROR: inSet or outSet empty");
		document.getElementById("feedbackA").innerHTML += "Require at least one Input and Output pair! <br>";
		flag = true;
	}

	if (outSet.length != inSet.length){
		document.getElementById("feedbackA").innerHTML += `Require that rows are completed.`;
		flag = true;
	}

	for (let i = 0; i<inSet.length;i++){
		//if the length of any input Set is not equal to variables
		console.log("COMP: "+inSet[i].length+":"+varSet.length);
		if (inSet[i].length != varSet.length){
			console.log("ERROR: Not all InSets match VarSet Length");
			document.getElementById("feedbackA").innerHTML += `Test case ${i+1} must have as many arguments as there are variables. <br>`;
			flag = true;
		}
		//if any inset is null and the outset isnt, or vice versa.
		if ((inSet[i] == "" && outSet[i] != "" ) || (inSet[i] != "" && outSet[i] == "")){
			document.getElementById("feedbackA").innerHTML += `Test case ${i+1} must have input variables and an expected output. <br>`;
		}
	}

	console.log(flag);
	return flag;

}

var testcases = 0;
function deltaHTMLInputs(a){
	console.log("DelatHTMLInputs");
	if (a>0 && testcases<6){
		testcases++;
		document.getElementById("testcases").innerHTML+=`
	  <div class="case" style="" id = "Case${testcases}">
		 <div class="option leftdivsmall">
		  <div class="selectheading">
		   Input Set ${testcases}:
		  </div>
		  <input id="in${testcases}" type="text" class="leftdiv select"></input>
		 </div>
		 <div class = "option rightdivsmall">
		  <div class="selectheading">
		     Output ${testcases}:
		  </div>
		  <input id='out${testcases}' value=''type="text"class="rightdiv select"></input>
		  </div>
		 </div>`;
	}else if (a<0 && testcases>1){
		testcases--;
		document.getElementById(`Case${testcases+1}`).remove();
	}

	if (testcases>3){
		if (!(document.getElementById('testcases').classList.contains("scrollSmall"))){
			document.getElementById('testcases').classList.add("scrollSmall");
		}
	}else{
		if ((document.getElementById('testcases').classList.contains("scrollSmall"))){
			console.log("remove?");
			document.getElementById('testcases').classList.remove("scrollSmall");
		}
	}
}

function getTopics(){
	let list = [];
	console.log(document.getElementById("topics").value);
	for (let i = 0; i<12;i++){
		if (document.getElementById("topics").options[i].selected){
		list.push(document.getElementById("topics").options[i].value);
		}
	}
	return list;
}

function properStrip(){

}

function createJSONQuestionAdd(){
	document.getElementById("feedbackA").innerHTML = "";
	document.getElementById("feedbackA").style.color= "#e40042";
	//console.log(getTopics());
	if (document.getElementById("fname").value.length == 0 || //document.getElementById("vars").length == 0 ||
		document.getElementById("desc").length == 0 || document.getElementById("topics").value.length == 0){ 
		document.getElementById("feedbackA").innerHTML += "Critical field(s) missing.";
	}else if (TestCaseErrors()){
		
	}else{

		document.getElementById("feedbackA").style.color= "#31c55a";
		document.getElementById("feedbackA").innerHTML = "Question added!";
		let id = document.getElementById("fname").value+"__"+String(absoluteQNum+1);
		console.log("new id is "+id);
		let question = {"questions":{
			[id] : {
				"description": document.getElementById("desc").value,
				"func_name" : document.getElementById("fname").value.replace(/\s+/g, ''),
				//"arg_names" : document.getElementById("vars").value.replace(/\s+/g, '').split(","),
				//"inputs" : [document.getElementById("in1").value.split(","), document.getElementById("in2").value.split(",")],
				"inputs" : gatherInputs(), 
				//"expected_outputs" : [document.getElementById("out1").value, document.getElementById("out2").value],
				"constraints" : document.getElementById("constraints").value,
				"expected_outputs" : gatherOutputs(), 
				"difficulty" : document.getElementById("difficulty").value,
				"topics" : getTopics()
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
		console.log("QUESTION");
		console.log(question);
		console.log(xhttp);

		//Update the search bar, new question might appear.
	}
}

//This function is called every update on the search, hopefully rewritting the divs won't be a problem?
function createJSONQuestionQuery(){
	console.log("Query Asking for following");

	//For Matt, tell him that if the querry['x'] is empty, skip this search portion.
	//If all the variables are empty, send all.
	let query = {
		"topics" : [document.getElementById("qtopic").value],
		"keywords": document.getElementById("qkeywords").value.split(","),
		"difficulty": document.getElementById("qdifficulty").value
	}
	console.log(query);

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			if (this.response == "no results"){
				failToFind();
			}else{
				console.log("Not empty");
				console.log(this.response);
				theObject = JSON.parse(this.response);
				CreateListForTeacher(); //Redraw the list based on new Query
			}
		}else if (this.readyState == 4){
      failToFind();
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
			console.log(this.response);
			alert("Exam release state flipped!");
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

//Assemble Question Display
function buildTextUnit(topic, name, desc, difficulty,ith){ //args, ith){
	let topicList = "", argsList="";
	for (let i = 0; i <topic.length;i++){
		topicList+=topic[i];
		if (i < topic.length-1){
			topicList+=", ";
		}
	}
		console.log(topicList);
	/*
	for (let i = 0; i <args.length;i++){
		if (args[i]!=false){
		argsList+="\""+args[i]+"\"";
		if (i < args.length-1){
			argsList+=", and ";
		}
		}
	}*/
	return ` <div class="questionPreview" id = ${ith}>
	  <div class="questionPreviewTitle">Function Name: ${name} </div>
		  <hr>
			  <div class="questionPreviewText">
				    <span class="smallHeading">Question:</span>
						    <br>
								    <div style="width: 95%; margin-top:4px; margin-left:2px">Create a function called \"${name}\" that takes argument ${argsList} that can do the following:  ${desc}
										    </div>
												    <span class="smallerHeading"><br>Topics: ${topicList}<br></span>
														    <hr>
																    <div class="questionPreviewHandler">
																		      <div style="margin-top:8px;" class="questionPreviewContainer">
																					        <div class="ButtonContainer">
																									          <button style="width:50%; float:right; margin-right:15px"class="questionPreviewButton ${check(name)} ">${aprem(check(name))}</button>
																														          <div style="width:40%">
																																			            <div style="" >Points Value:</div>
																																									            <input class="select pts" style="width:100%"value="${findVal(name)}"></input>
																																															          </div>
																																																				        </div>
																																																								        <div style="width:30%;float:left" class="ButtonContainer">
																																																												          <div style="float:left; margin-left:5px" class="questionPreviewDifficulty">Difficulty: ${difficulty.toUpperCase()}</div>
																																																																	        </div>
																																																																					        </div>
																																																																									      </div>
																																																																												    </div>
																																																																														  </div>
																																																																															`;
}

//Assemble Question Display FOR THE PREVIEW BUTTON 
//Args was the 5th element prior to deletion, ith was 6th
function buildTextUnitDisplay(topic, name, desc, difficulty, ith){
	let topicList = "", argsList="";
	//args = args.split(",");
	for (let i = 0; i <topic.length;i++){
		topicList+=topic[i];
		if (i < topic.length-1){
			topicList+=", ";
		}
	}
/*	
	for (let i = 0; i <args.length;i++){
		if (args[i]!=false){
		argsList+="\""+args[i]+"\"";
 			if (i < args.length-1){
				argsList+=", and ";
			}
		}
		argsList+=",";
	}
*/
	console.log("ITH: "+ith);
	return `<div class="questionPreview" style="">
	<div class="questionPreviewTitle">Question ${ith+1}: </div>
	<hr>
	<div class="questionPreviewText" style="">
		<div style="width: 95%; margin-top:4px; margin-left:2px">
			Create a function called \"${name}\" that takes argument ${argsList} that can do the following:  ${desc}
		</div>
		<div style="height:30px">
			<br>
			<div class="" style="float:left">Topics: ${topic}<br></div>
			<div class=""style="margin-right:15px; float:right;text-align:right">Worth: ${functionWorth[ith]} Points</div>
		</div>
	</div>
  </div>`;
}

function findVal(arg){
	let found = -1;
	for (let i = 0; i<functionListName.length;i++){
		if (arg == functionListName[i]){
			console.log("matched");
			found = i;
		}
	}
	if (found>-1){
		console.log("dd");
		return `${functionWorth[found]}`;
	}else{
		return "";
	}
}

function aprem(arg){
	if (arg == "down"){
		return "Remove";
	}else{
		return "Append";
	}
}

function check(arg){
	let found = 0;
	for (let i = 0; i<functionListName.length;i++){
		if (arg == functionListName[i]){
			found = 1;
		}
	}
	if (found==1){
		return "down";
	}else{
		return "up";
	}
}

//Button builder on right
function CreateListForTeacher(){

  if (theObject=={}){
    failToFind();
  }

	var scroll = document.getElementById("heap");
	scroll.innerHTML = ""; //Erase the current.
	console.log('list for teachers');
	console.log(theObject['questions']);
	for (let i = 0; i<Object.keys(theObject['questions']).length;i++){
		let key = Object.keys(theObject['questions'])[i];
		let obj = theObject['questions'][key]['topics']
		let piece = buildTextUnit(
		theObject['questions'][key]['topics'],
		key,
		theObject['questions'][key]['description'],
		theObject['questions'][key]['difficulty'],
		//theObject['questions'][key]['arg_names'],
		i);
		scroll.innerHTML+=piece;
		qNum++;
	}
}

function arrayToWords(l){
	let out = "";
	for (let i = 0; i < l.length; i++){
		out+=l[i];
		if (i!=l.length-1){
			out+=", ";
		}
	}
	return out;
}

//ASSEMBLE EXAM FROM PARTS
function createExam(){
	var examOut = {"questions":{}};

	for (let i = 0;i<functionList.length;i++){
		examOut['questions'][functionListName[i]] = functionWorth[i];
	}

	console.log("EXAM OUT");
	console.log(examOut);

	return examOut;
}

//SUBMIT BUILT EXAM (TEACHERSEARCH UPLOAD)
function submitBuiltExam(){
	if ( (lock && total != 100) ) {
		console.log("improper");
		alert("Exam is not out of 100, but you have the safety lock on.");
		return;
	}else{

	let out = createExam();
	console.log(functionList);
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			alert("Sucessfully uploaded the new exam!");
			console.log(this.response);
			//No clue why this was here, but let's leave the comment incase we need it.
			//Although we shouldn't, this is rewriting information for no real reason.
			//theObject = JSON.decode(this.response);
		}

  	};

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "new_exam");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(out);
	xhttp.send(JSON.stringify(out));
	console.log(xhttp);
	}
}

function upperFirst(str){

	return str.toUpperCase().charAt(0)+str.substring(1);
}

//builds exam to display
//buildExamTake
function assembleExam(){
	//let l = Object.keys(exam['questions']);
	for (let i = 0; i<Object.keys(exam['questions']).length;i++){
		console.log("working on:");
		let key = Object.keys(exam['questions'])[i];
		let curr = exam['questions'][key];
		console.log(curr);
		let require = curr['constraint']!="print"?"<div class='questionText'>NOTE: This question requires the following keywords: "+(curr['constraint'])+", and return. </div>":"<div class='questionText'>NOTE: This question requires the following keywords: "+(curr['constraint'])+" </div>";
		let newItem=`<div class="questionWritten">
		<div>
		  <div style="font-size:1.5em; font-weight:bold;${i==0?'margin-top:20px;':''}" class="questionTitle">Question ${i+1}:</div>
		</div>
		<div class="questionText">
		Create a function called \"${curr['func_name']}\" that can do the following:<br>  ${curr['description']}
		</div>
		${require}
		<div class="ans">Answer:</div>
		<textarea id="${i}" onkeydown="return stopTab(event);"></textarea>
		<div style="float:right; padding-top:220px;padding-right:50px; text-align:right">Value: ${curr['points']} Pts</div>
		<hr>
	  </div>`
		document.getElementById('examTake').innerHTML+=newItem;
		console.log(newItem);
	}
}


//*********TEACHER REVIEW :CLAP::CLAP:************************

function sendExamBack(){
	let xhttp = new XMLHttpRequest();
	let args = {"username":document.getElementById("selectName")};

	NewExam = exam;
	let student = Object.keys(exam)[0];
	console.log("WORKING NEWEXAM STARTS");
	console.log(NewExam);
	console.log(Object.keys(NewExam[student]['questions']).length);
	for (let i = 0;i<Object.keys(NewExam[student]['questions']).length;i++){
		NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['score']=0;
		console.log("QUESTION: "+i);
		console.log("Question working on: "+Object.keys(NewExam[student]['questions'])[i]);
		for(let j = 0;j<NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['comments'].length;j++){

			NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['comments'][j]	= document.getElementById(i+"_"+j+"_comment").value;
		
			NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j]	= parseFloat(document.getElementById(i+"_"+j+"_marksoff").value );
		
			console.log(`Comments ${i+"_"+j} ${document.getElementById(i+"_"+j+"_comment").value}`);
			console.log(`MarksOff ${i+"_"+j} ${parseFloat(document.getElementById(i+"_"+j+"_marksoff").value)}`);
			NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['score']-=-(parseFloat(document.getElementById(i+"_"+j+"_marksoff").value));	
			//MarksOff[j] > pointsPer[j]
			if(NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j] > NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['pointsPer'][j]){
				NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j]=NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['pointsPer'][j];
			}
			//MarskOff[j] not an integer go to 0
			if(isNaN((NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j]))){
				NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j]=0;
			}
			//MarksOff[j] negative
			if(NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j] < 0){ 
				NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'][j]=0;
			}
			if(NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['score'] > NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['points']){
				NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['score']=NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['points'];
			}
		}
		NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['comments'].push(document.getElementById(i+"_Misc").value);
		NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['marksoff'].push(0);
		NewExam[student]['questions'][Object.keys(NewExam[student]['questions'])[i]]['pointsPer'].push(0);
	}
		console.log("PRE SUBMIT");
		console.log(NewExam)

  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(NewExam)
			console.log("submitted.")
			getStudents()
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
		console.log(exam);

		let sum = 0;
		let debug = "{\r\n\t\"sn479\": {\r\n\t\t\"questions\": {\r\n\t\t\t\"adds\": {\r\n\t\t\t\t\"func_name\": \"adds\",\r\n\t\t\t\t\"description\": \"double the number\",\r\n\t\t\t\t\"inputs\": [\r\n\t\t\t\t\t[\"1\", \"2\", \"4\"],\r\n\t\t\t\t\t[\"8\", \"4\", \"6\"],\r\n\t\t\t\t\t[\"1\", \"6\", \"7\"]\r\n\t\t\t\t],\r\n\t\t\t\t\"expected_outputs\": [\"7\", \"18\", \"14\"],\r\n\t\t\t\t\"constraint\": \"for\",\r\n\t\t\t\t\"points\": 25,\r\n\t\t\t\t\"answer\": \"def adds(x, y, z):\\n\\tprint(x+y+z)\",\r\n\t\t\t\t\"score\": 25,\r\n\t\t\t\t\"comments\": [\"correct thing\", \"test case passed1\", \"test case passed2\"],\r\n\t\t\t\t\"marksoff\": [10, 10, 5],\r\n\t\t\t\t\"pointsPer\": [10, 20, 5, 15]\r\n\t\t\t},\r\n\t\t\t\"multiply\": {\r\n\t\t\t\t\"func_name\": \"multiply\",\r\n\t\t\t\t\"description\": \"double the number\",\r\n\t\t\t\t\"inputs\": [\r\n\t\t\t\t\t[\"4\", \"8\"],\r\n\t\t\t\t\t[\"8\", \"8\"]\r\n\t\t\t\t],\r\n\t\t\t\t\"expected_outputs\": [\"32\", \"64\"],\r\n\t\t\t\t\"constraint\": \"print\",\r\n\t\t\t\t\"points\": 50,\r\n\t\t\t\t\"answer\": \"def mult(x, y):\\n\\treturn x*y\",\r\n\t\t\t\t\"score\": 35,\r\n\t\t\t\t\"comments\": [\"Wrong function name.\", \"got points wooo\", \"Expected \\\"multiply\\\", got \\\"mult\\\".\", \"more points!\"],\r\n\t\t\t\t\"marksoff\": [-10, 20, -5, 15],\r\n\t\t\t\t\"pointsPer\": [10, 20, 5, 15]\r\n\t\t\t},\r\n\t\t\t\"max\": {\r\n\t\t\t\t\"func_name\": \"doubleIt\",\r\n\t\t\t\t\"description\": \"double the number\",\r\n\t\t\t\t\"inputs\": [\r\n\t\t\t\t\t[\"9\"],\r\n\t\t\t\t\t[\"4\"]\r\n\t\t\t\t],\r\n\t\t\t\t\"expected_outputs\": [\"18\", \"8\"],\r\n\t\t\t\t\"constraint\": null,\r\n\t\t\t\t\"points\": 25,\r\n\t\t\t\t\"answer\": \"def doubleIt(x):\\n\\treturn 18\",\r\n\t\t\t\t\"score\": 15,\r\n\t\t\t\t\"comments\": [\"passed 1\", \"passed 2\", \"wrong func name\"],\r\n\t\t\t\t\"marksoff\": [10, 10, -5],\r\n\t\t\t\t\"pointsPer\": [10, 20, 5, 15]\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}";

		if (DEBUG){
			exam=JSON.parse(debug);
			student = Object.keys(exam)[0];
			console.log("DEBUG EXAM");
			console.log(exam);
			console.log("Student");
			console.log(student);
		}

		let worth = 0;
		for (let i =0; i<Object.keys(exam[student]['questions']).length;i++){
			sum+=parseFloat(exam[student]['questions'][Object.keys(exam[student]['questions'])[i]]['score']);
			worth+=parseFloat(exam[student]['questions'][Object.keys(exam[student]['questions'])[i]]['points']);
			console.log(Object.keys(exam[student]['questions'])[i]);
		}

		document.getElementById('exam').innerHTML = `
			<div>
				<h2 class="questionTitle">${student}'s final Score: ${parseInt(sum)}/${worth} (${parseInt(100*sum/worth)}%)</h2>
			</div>
			<hr>
		`;

		for (let i =0; i<Object.keys(exam[student]['questions']).length;i++){
			let key = Object.keys(exam[student]['questions'])[i];
			let curr = exam[student]['questions'][Object.keys(exam[student]['questions'])[i]];//exam[student]['questions'][key];
			let comments = "";
	
			for (let j=0;j<curr['marksoff'].length;j++){
				if (curr['pointsPer'][j] != undefined){
				comments+=`
					<div style="width:100%; height:80px;" >
						<div class="ans"style="float:left; width:600px; font-size:18px">
						 Comment ${j+1}:
							<br>
						<textarea id=${i+"_"+j+"_comment"} class="comment">${curr['comments'][j]}</textarea>
						</div>
						`;
						comments+=`<div class="ans"style="float:left; width:130px; font-size:18px">
							Worth:
							<br>
							<textarea disabled class="comment">${curr['pointsPer'][j]}</textarea>
						</div>
						<div class="ans"style="float:left; width:130px; font-size:18px">
							Awarded:
							<br>
							<textarea id=${i+"_"+j+"_marksoff"} class="comment">${parseFloat(curr['marksoff'][j])}</textarea>
						</div>
					</div>
				`
				}
			}

	document.getElementById('exam').innerHTML+=`<div class="questionWritten" id=${i}>
  <div>
	<h2 class="questionTitle">Question ${i+1}:</h2>
  </div>
  <div class="questionText">
  Objective: ${curr['description']}
  </div>
  <div class="ans">Answer Given:</div>
  <pre class="studentAns">${curr['answer']}</pre>
	${comments}
	<br>
	<br>
	<div class="ans" >Misc Comments:</div>
	<textarea id=${i+"_Misc"} style="" onkeydown="return stopTab(event);"></textarea>
  <div style="float:right; padding-top:220px;padding-right:50px">Value: ${curr['points']}</div>
  <div style="float:right; padding-top:220px;padding-right:50px">${key}</div>
  <hr>
  </div>`
		}
}

//For Review
//TODO fails to show answers
function LoadStudentExam(){

	let xhttp = new XMLHttpRequest();
	let args = {"username":document.getElementById("selectName").value};
	console.log(`Trying for ${args['username']}`);
  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {


			console.log(this.response);
			if (DEBUG){
				assembleExamComments();
			}else if (isJSON(this.response)){
				exam=JSON.parse(this.response);
				assembleExamComments();
			}else{
				failToFindStudentExam();
			}
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

	if (!confirm("You are about to submit your exam! Are you sure you wish to do this?")){
		console.log("Student didn't want to submit.");
		return;
	}

	let args = {
		'username':localStorage.getItem("username")
	//	'username':""+document.getElementById("user").value,
	//	'password':""+document.getElementById("pass").value
	};

	//"user_name="+document.getElementById("user").value+"&password="+document.getElementById("pass").value;
	//document.getElementById("result").innerHTML=args;
	let xhttp1 = new XMLHttpRequest();

  xhttp1.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("State of submission: "+this.response);
			alert("Student submitted exam.");
		}
			console.log("Should have sent?");
	}
	console.log("exam:");
	console.log(exam);
	
	var complete = {};
	complete[args['username']] = {};
	complete[args['username']]['questions'] = exam['questions'];

	for (let i = 0; i< Object.keys(exam['questions']).length; i++){
		//console.log('answer '+i);
		//console.log(document.getElementById(i).value);
		console.log(`question ${i} data:`);
		let user =complete[args["username"]]; 
		let key = [Object.keys(user['questions'])[i]];//['answer']=0;
		user["questions"][key]["answer"] = (document.getElementById(i).value);
		user["questions"][key]["score"] = 0;	
		user["questions"][key]["points"] = user["questions"][key]["points"]; 
		user["questions"][key]["comments"] = []; 
		
		//['answer']=(document.getElementById(i).value);
		//complete[args['username']]['questions'][i]['score'] = 0;
		//complete[args['username']]['points'] = exam['questions'][i]['answers'];
  }
  
  console.log("follows is whats being sent");
  console.log(complete);
	xhttp1.open("POST", scott, true);
	xhttp1.setRequestHeader("Request-Type", "submit");
	xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp1.send(JSON.stringify(complete));
	console.log(xhttp1);
//	};
/*
	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "login");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(xhttp);
	xhttp.send(JSON.stringify(args));
*/
}

//For Taking
function LoadStudentExamTake(){

	let debug = "";
	//let debug = "{ \"questions\" : {\r\n          \"adds\" : {\r\n              \"func_name\" : \"adds\",\r\n \t\t   \"description\" : \"double the number\",\r\n              \"inputs\" : [[\"1\", \"2\", \"4\"], [\"8\", \"4\", \"6\"], [\"1\", \"6\", \"7\"]],\r\n              \"expected_outputs\" : [\"7\", \"18\", \"14\"],\r\n              \"constraint\" : \"for\",\r\n              \"points\" : 25\r\n          },\r\n          \"multiply\" : {\r\n              \"func_name\" : \"multiply\",\r\n   \"description\" : \"double the number\",\r\n              \"inputs\" : [[\"4\", \"8\"], [\"8\", \"8\"]],\r\n              \"expected_outputs\" : [\"32\",\"64\"],\r\n              \"constraint\" : \"print\",\r\n              \"points\" : 50\r\n          },\r\n          \"max\" : {\r\n              \"func_name\" : \"doubleIt\",\r\n              \"description\" : \"double the number\",\r\n              \"inputs\" : [[\"9\"], [\"4\"]],\r\n              \"expected_outputs\" : [\"18\",\"8\"],\r\n              \"constraint\" : null,\r\n              \"points\" : 25\r\n          }\r\n     }\r\n}\r\n";

	if (document.URL.includes("studentTake")){
		if (debug==""){
		let xhttp = new XMLHttpRequest();
		//console.log(`Trying for ${document.getElementById("selectName").value}`)
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("EXAM:");
			console.log(this.response);
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
			console.log("Debug mode!");
			exam = JSON.parse(debug);
			console.log("EXAM:");
			console.log(exam);
			assembleExam();
		}
	}else{
		console.log(document.URL);
	}
}

function assembleAnswersStudentReview(){
	console.log(exam);
	let student = Object.keys(exam)[0];

	for (let i = 0; i<Object.keys(exam[student]['questions']).length;i++){
		console.log(i);
		let key = Object.keys(exam[student]['questions'])[i];
		let curr = exam[student]['questions'][key];
		document.getElementById("heap").innerHTML+=`<div style="background: #FFF;text-align: left" class="questionWritten">
		<div>
			<h2 class="padleftSmall">Question ${i+1}:</h2>
		</div>
		<div class="padleftSmall">
			<strong>Objective:</strong> ${curr['description']}
		</div>
		<div>
		${curr['constraint']!="print"?"<div class='padleftSmall'><strong>NOTE:</strong> This question requires the following keywords: "+(curr['constraint'])+", and return. </div>":"<div class='padleftSmall'><strong>NOTE:</strong> This question requires the following keywords: "+(curr['constraint'])+" </div>"}
		</div>
		<div class="padleftSmall padtop"><strong>Answer Given:</strong></div>
		<pre class="padleftSmall" id="" onkeydown="return stopTab(event);">${curr['answer']}</pre>
		<div class="padleftSmall" style="float:left; "><strong>Points Recieved:</strong> ${curr['score']} </div>
		<br>
		<br>
		<hr>`
	}
	document.getElementById("comments").innerHTML+=`<h1 class="padleftSmall">Criteria, Scoring & Comments</h1>`
	for (let i = 0;i<Object.keys(exam[student]['questions']).length;i++){
		let key = Object.keys(exam[student]['questions'])[i];
		let curr = exam[student]['questions'][key];
		document.getElementById("comments").innerHTML+=`<hr><h2 class="padleftSmall">Question ${i+1}</h2>`
		for (let j = 0;j<curr['comments'].length;j++){
			if (curr['comments'][j]==0){
				continue;
			}
			document.getElementById("comments").innerHTML+=`
			<p class="padleft">${j+1}) ${curr['comments'][j]} ${curr['marksoff'][j]}/${curr['pointsPer'][j]}</p>`
		}
	
	}
	document.getElementById("comments").style.backgroundColor="#FFF";
	console.log("should have finished");	
}

function GetResults(){

	let student = localStorage.getItem("username");	
	let xhttp1 = new XMLHttpRequest();

	xhttp1.onreadystatechange = function() {
		if(this.readyState==4 &&this.status==200){
			console.log("EXAM GOT");
			console.log(this.response);
			exam = JSON.parse(this.response);
			assembleAnswersStudentReview();
		}
	}
	xhttp1.open("POST", scott, true);
	xhttp1.setRequestHeader("Request-Type", "review_grade");
	xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(xhttp1);
	xhttp1.send(JSON.stringify({"username":student}));

}

function stopTab( e ) {
    var evt = e || window.event
    if ( evt.keyCode === 9 ) {
		e.preventDefault();
		event.target.value+="    ";//("\u00a0\u00a0\u00a0\u00a0");

		return false;
    }
}

function failToFind(){
            document.getElementById("heap").innerHTML=`<div style="margin-top:50px" class="center">
                <img class="sad"  src="./sad.png">
              </div>
              <div class="center">
                <div style="" class="sadText">Sorry, we couldn't find any questions to match your query!</div>
              </div>
            </div>`
}

function failToFindStudentExam(){

	if (document.getElementById('selectName').value == "-"){
	document.getElementById("exam").innerHTML=`
	<div style="margin-top:50px" class="center">
  	<img class="sad"  src="./teacher.png">
  </div>
  <div class="center">
  	<div style="" class="teacherText">Select a Student's Exam to review it.</div>
  	</div>
  </div>`
	}else{
	document.getElementById("exam").innerHTML=`
	<div style="margin-top:50px" class="center">
  	<img class="sad"  src="./sad.png">
  </div>
  <div class="center">
  	<div style="" class="sadText">${document.getElementById('selectName').value} has not submitted the exam at this time.</div>
  	</div>
  </div>`
	}
}

function getStudents(){
	let xhttp = new XMLHttpRequest();
	//console.log(`Trying for ${document.getElementById("selectName").value}`)
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("Students:");
		console.log(this.response);
		students = JSON.parse(this.response);
		try{
			document.getElementById("selectName").innerHTML='<option value="-" selected>---</option>';
			for (let i = 0;i<Object.keys(students).length;i++){
				let key = Object.keys(students)[i];
				let curr = students[key];
				document.getElementById("selectName").innerHTML+=`<option value="${key}">${key} (Score: ${curr})</option>`;	
			}
		}catch(err){
		}
	}
	}

	xhttp.open("POST", scott, true);
	xhttp.setRequestHeader("Request-Type", "students");
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send("");
	console.log(xhttp);
}

function isJSON(str){
	try{
		JSON.parse(str)
	}catch(err){
		return false;
	}
	return true;
}

getStudents();

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


console.log("User: "+localStorage.getItem("username"));

//TeacherSearch
try{
	Lock();
	createAbsoluteNumQuery();
	LoadStudentExamTake();
	createJSONQuestionQuery();																																																		  //
}catch(err){

}


try{
	LoadStudentExamTake();
}catch(err){
	console.log('Error on loadstudentexamtake');
	console.log(err);
}
//TeacherReview, I think
try{
	LoadStudentExam();
	console.log("fine?");
}catch(err){
	console.log('Error on loadstudentexam');
	console.log(err);
}

try{
for(let i =0; i<2;i++){
	deltaHTMLInputs(1);
}
}catch(err){

}
//TestCaseErrors();
try{
GetResults()
}catch(err){}
