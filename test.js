var handle  = "https://web.njit.edu/~jen25/handle.php"
var scott = "https://web.njit.edu/~sn479/index.php"
var php = "https://web.njit.edu/~jen25/dummy.php"

function sampleFetch(qtype){
    switch(qtype){
        case "login":
            return {
                username:"2",password:"2"
            }
        break;
        case "new_question":
            return {
                "questions" : {
                    "func_ID" : {
                        "func_name" : "func1",
                        "arg_names" : "num1, num2",
                        "description" : "add two numbers together",
                        "inputs" : ["1", "2"],
                        "expected_outputs" : ["5","6"],
                        "difficulty" : "hard",
                        "topics" : ["lists", "files","if"]
                    }
                }
            }
        break;
        case "new_exam":
            return {
                "questions" : {
                    "func_ID1" : {
                        "func_name" : "func1",
                        "arg_names" : ["name1", "name2"],
                        "description" : "stuff about question",
                        "inputs" : ["1", "2"],
                        "expected_outputs" : ["5","6"],
                        "difficulty" : "hard",
                        "topics" : ["lists", "files"]
                    },
                    "func_ID2" : {
                        "func_name" : "func2",
                        "arg_names" : ["name1", "name2"],
                        "description" : "stuff about question 2",
                        "inputs" : ["4", "19"],
                        "expected_outputs" : ["four","nineteen"],
                        "difficulty" : "easy",
                        "topics" : ["turtle", "dictionary"]
                    }
                },
                "points" : [60, 40]
             }
        break;
        case "query":
            return {
            "keywords" : ["fuck"],
            "topics" : ["lists"],
            "difficulty" : "easy"
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
                            "inputs" : [ [1, 2], [6, 9] ],
                            "expected_outputs" : ["3","15"],
                            "difficulty" : "hard",
                            "topics" : ["lists", "files"]
                        },
                        "func_ID2" : {
                            "func_name" : "mult",
                            "arg_names" : ["num1", "num2"],
                            "description" : "stuff about question 2",
                            "inputs" : [ [5, 8], [7, 4] ],
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
let qType = document.getElementById("qtype").nodeValue;
xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
    }else{
        console.log("failed.")
    }

  };

xhttp.open("POST", scott, true);
xhttp.setRequestHeader("Request-Type", "query");
xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhttp.send(JSON.stringify(sampleFetch(qType)));
}
function PUTdown(){
    let xhttp = new XMLHttpRequest();
    let qType = document.getElementById("qtype").nodeValue;
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }else{
            console.log("failed.")
        }

      };

    xhttp.open("PUT", scott, true);
    xhttp.setRequestHeader("Request-Type", "query");
    xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(sampleFetch(qType)));
}
    function GETdown(){
        let xhttp = new XMLHttpRequest();
        let qType = document.getElementById("qtype").nodeValue;
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response);
            }else{
                console.log("failed.")
            }

          };

        xhttp.open("GET", scott, true);
        xhttp.setRequestHeader("Request-Type", "query");
        xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(JSON.stringify(sampleFetch(qType)));
    }