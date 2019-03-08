var handle  = "https://web.njit.edu/~jen25/handle.php"
var scott = "https://web.njit.edu/~sn479/index.php"
var php = "https://web.njit.edu/~jen25/dummy.php"

function sampleFetch(qtype){
    switch(qtype){
        case "login":
            return {
                "username":"2",
								"password":"2"
            }
            break;
				case "submit":

					return {
					    "sn479" : {

							    "questions" : {
									        "1" : {
													            "func_name" : "adds",
																			            "arg_names" : ["num1, num2"],
																									            "description" : "add two numbers together",
																															            "inputs" : [["1", "2"], ["8", "4"]],
																																					            "expected_outputs" : ["3","12"],
																																											            "difficulty" : "easy",
																																																	            "topics" : ["lists"]
																																																							        },
																																																											        "2" : {
																																																															            "func_name" : "multiply",
																																																																					            "arg_names" : ["x, y"],
																																																																											            "description" : "multiply two numbesr together",
																																																																																	            "inputs" : [["4", "8"], ["8", "8"]],
																																																																																							            "expected_outputs" : ["32","64"],
																																																																																													            "difficulty" : "easy",
																																																																																																			            "topics" : ["lists"]
																																																																																																									        },
																																																																																																													        "3" : {
																																																																																																																	            "func_name" : "max",
																																																																																																																							            "arg_names" : ["a, b"],
																																																																																																																													            "description" : "find the max",
																																																																																																																																			            "inputs" : [["9", "4"], ["10", "45"]],
																																																																																																																																									            "expected_outputs" : ["9","45"],
																																																																																																																																															            "difficulty" : "easy",
																																																																																																																																																					            "topics" : ["lists"]
																																																																																																																																																											        },
																																																																																																																																																															        "points" : [50, 40, 10],
																																																																																																																																																																			        "score" : 0,
																																																																																																																																																																							        "answers" : ["def add(x, num2):\n\treturn x+num2", "def mult(x, y):\n\treturn x-y", "def maxs(x, b):\n\treturn bleh"],
																																																																																																																																																																											        "comments" : ""
																																																																																																																																																																															    }
																																																																																																																																																																																	 }
																																																																																																																																																																																	 };
					break;
        case "new_question":
            return {
                "questions" : {
                    "Sad face emoji" : {
                        "func_name" : "notfuck",
                        "arg_names" : "num1, num2",
                        "description" : "add two numbers together",
                        "inputs" : [["1", "2"],["4","5"]],
                        "expected_outputs" : ["5","6"],
                        "difficulty" : "hard",
                        "topics" : ["lists", "files","if"]
                    }
                }
            }
            break;
        case "new_exam":
            return {
						    "sn479" : {

								    
										    "questions" : {
												        "1" : {
																            "func_name" : "adds",
																						            "arg_names" : ["num1, num2"],
																												            "description" : "add two numbers together",
																																		            "inputs" : [["1", "2"], ["8", "4"]],
																																								            "expected_outputs" : ["3","12"],
																																														            "difficulty" : "easy",
																																																				            "topics" : ["lists"]
																																																										        },
																																																														        "2" : {
																																																																		            "func_name" : "multiply",
																																																																								            "arg_names" : ["x, y"],
																																																																														            "description" : "multiply two numbesr together",
																																																																																				            "inputs" : [["4", "8"], ["8", "8"]],
																																																																																										            "expected_outputs" : ["32","64"],
																																																																																																            "difficulty" : "easy",
																																																																																																						            "topics" : ["lists"]
																																																																																																												        },
																																																																																																																        "3" : {
																																																																																																																				            "func_name" : "max",
																																																																																																																										            "arg_names" : ["a, b"],
																																																																																																																																            "description" : "find the max",
																																																																																																																																						            "inputs" : [["9", "4"], ["10", "45"]],
																																																																																																																																												            "expected_outputs" : ["9","45"],
																																																																																																																																																		            "difficulty" : "easy",
																																																																																																																																																								            "topics" : ["lists"]
																																																																																																																																																														        },
																																																																																																																																																																		        "points" : [50, 40, 10],
																																																																																																																																																																						        "score" : 0,
																																																																																																																																																																										        "answers" : ["def add(x, num2):\n\treturn x+num2", "def mult(x, y):\n\treturn x-y", "def maxs(x, b):\n\treturn bleh"],
																																																																																																																																																																														        "comments" : ""
																																																																																																																																																																																		    }
																																																																																																																																																																																				 }
																																																																																																																																																																																				 };
        
				break;
        case "query":
            return {
            "keywords" : ["add"],
            "topics" : ["files"],
            "difficulty" : "hard"
            }

        break;
        case "release":
            return "";
        break;
        case "review_grade":
            return "";
        break;
        case "take_exam":
            return "";
        break;
        case "num_questions":
            return "";
        break;
        case "is_release":
            return "";
        break;
        case "modify_grade":
            return {
                "sn479" : {
                    "questions" : {
                        "1" : {
                            "func_name" : "add",
                            "arg_names" : ["x", "y"],
                            "description" : "stuff about question",
                            "inputs" : [ ["1","2"], ["6", "9"] ],
                            "expected_outputs" : ["3","15"],
                            "difficulty" : "hard",
                            "topics" : ["lists", "files"]
                        },
                        "func_ID2" : {
                            "func_name" : "mult",
                            "arg_names" : ["num1", "num2"],
                            "description" : "stuff about question 2",
                            "inputs" : [ ["5", "8"], ["7", "4"] ],
                            "expected_outputs" : ["40","28"],
                            "difficulty" : "easy",
                            "topics" : ["turtle", "dictionary"]
                        }
                    },
                    "points" : [60, 40],
                    "answers" : ["def add(x, z):\nreturn x+z", "def mults(num1, num2):\n\treturn num1num2"],
                    "scores" : 100,
                    "comments" : "MORE COMMENTS"
                }
             }
        break;
    }
}


function POSTdown(){
let xhttp = new XMLHttpRequest();
let qType = document.getElementById("qtype").value;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("GOT\n");
        console.log(this.response);
    }

  };

				xhttp.open("POST", scott, true);
				xhttp.setRequestHeader("Request-Type", qType);
				xhttp.setRequestHeader("Content-Type", "application/json");
				console.log(qType);
				console.log(sampleFetch(qType));
				xhttp.send(JSON.stringify(sampleFetch(qType)));
}
function PUTdown(){
    let xhttp = new XMLHttpRequest();
    let qType = document.getElementById("qtype").value;
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            console.log("GOT\n");
            console.log(this.response);
        }else if (this.status != 200){
						console.log("ReadState:"+this.readyState);
						console.log("Status:"+this.status);
            console.log("failed.")
        }

      };

    xhttp.open("PUT", scott, true);
    xhttp.setRequestHeader("Request-Type", qType);
    xhttp.setRequestHeader("Content-Type", "application/json");
    console.log(qType);
    console.log(sampleFetch(qType));
    xhttp.send(JSON.stringify(sampleFetch(qType)));
}
    function GETdown(){
        let xhttp = new XMLHttpRequest();
        let qType = document.getElementById("qtype").value;
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                console.log("GOT\n");
                console.log(this.response);
            }else if (this.status != 200){
								console.log("ReadState:"+this.readyState);
								console.log("Status:"+this.status);
                console.log("failed.")
            }

          };

        xhttp.open("GET", scott, true);
        xhttp.setRequestHeader("Request-Type", qType);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log(qType);
        console.log(sampleFetch(qType));
        xhttp.send(JSON.stringify(sampleFetch(qType)));
    }
