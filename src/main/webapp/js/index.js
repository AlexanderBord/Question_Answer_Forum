
(function () { //global namespace

    const questionSize = 3;
    var buttonsId = [];
    var questionsId = [];
    var answerCounter = [];
    var hideBtnIndex = 0;


    document.addEventListener('DOMContentLoaded', function ()
    {
        document.body.style.backgroundImage = "url('images/background.jpg')"; //background image
        document.body.style.backgroundSize = "100%"

        resetArray();
        getList();
        document.getElementById("questionDiv").addEventListener('click', getQuestion);
        document.addEventListener('click', hideList);
    });

    //status response function
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            console.log("Looks like there was a problem. Status Code: " + response.status);
        }
    }

    function resetArray(){
        for(let i = 0; i < questionSize; i++){
            answerCounter[i] = 0;
        }
    }

    //receive counters of questions by get request from server
    function receiveAnswerCounter() {

        fetch('DataServlet', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(status)
            .then(res => res.text())
            .then(resp => {
                    let counters = resp.split(",");
                    for(let i = 0; i < counters.length; i++){
                        let temp = counters[i].replace(/[\[\]']+/g,'')
                        answerCounter[i] = parseInt(temp);
                    }
            })
            .catch(e => {
                console.log(e);
            });
    }

    //hide current list of answers
    function hideList(event){

        for(let i = 0; i < hideBtnIndex; i++){
            if(event.target && event.target.id === ('h' + i)){

                let list = document.getElementById(event.target.id).parentElement;
                list.lastChild.remove();
                list.lastChild.remove();
                break;
            }
        }
    }

    //build list of wanted answer only html
    function buildAnswer(index, response) {

        let temp = document.getElementById("b" + index);
        let br = document.createElement("br");
        let ul = document.createElement("ul");

        ul.setAttribute("class", "list-group");
        ul.appendChild(br);

        let hide = document.createElement("button");
        hide.setAttribute("class", "btn btn-secondary");
        hide.setAttribute("id", "h" + hideBtnIndex);
        hide.innerText = "Hide";
        hideBtnIndex++;

        let data = response.split("/");

        for(let i = 1; i < data.length-1; i+=2){

            let li = document.createElement("li");
            let span = document.createElement("span");
            li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
            li.innerText = data[i];
            span.setAttribute("class", "badge badge-primary badge-pill");
            span.innerText = data[i+1];
            li.appendChild(span);
            ul.appendChild(li);
        }
        temp.appendChild(ul);
        temp.appendChild(hide);
    }

    //fetch current question
    function fetchQuestion(questionNumber) {
        location.replace('AnswerServlet?qn='+questionNumber);
    }

    //fetch current answers from servlet
    function fetchAnswer(index) {
        const data = { answer : index };

        fetch('AnswerServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(status)
            .then(response => response.text())
            .then(response => {
                buildAnswer(index, response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    //get question function - sends to wanted function - show or answer
    function getQuestion(event) {
        if(event.target.type === "submit") //target the button
        {
            for(let i=0; i < buttonsId.length; i++) //find current target
            {
                let target = event.target;
                let parent = target.parentElement;//parent of "target"

                if(parent.id === buttonsId[i]){

                    let whichFunc = target.textContent;
                    if(whichFunc === "Answer this question"){
                        fetchQuestion(i);
                    }
                    else if(whichFunc === "Show" && answerCounter[i] > 0){
                        fetchAnswer(i);
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }


    //delete cookie
    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    //get list function - fetch list of questions from server
    function getList() {

        receiveAnswerCounter();

        let cookie = decodeURIComponent(document.cookie); //if question was answered then there is cookie
        if(cookie !== ""){
            deleteCookie("questionNumber");
        }

        fetch("QuestionServlet", {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(status)
            .then(res => res.text())
            .then(resp => {
                let arr = resp.split(',');
                buildQuestionPage(arr);
            })
            .catch(e => {
                console.log(e);
            });

    }

    //build dynamically html question page
    function buildQuestionPage(arr) {

        let buttons = ["Answers", "Show", "Answer this question"];
        let designButtons = ["btn btn-default", "btn btn-info", "btn btn-primary"]
        let index = 0;
        var idBtnIndex = 0;
        var idQuestionIndex = 0;

        let newQuestions = document.createElement("div");
        newQuestions.setAttribute("class", "panel panel-info");

        for(let i = 0; i < arr.length; i++) {

            let newQuestion = document.createElement("div");
            newQuestion.innerText = arr[i].toString().replace(/[\[\]']+/g,''); ///remove brackets
            newQuestion.setAttribute("class", "panel-heading");

            let id = "a" + idQuestionIndex;
            newQuestion.setAttribute("id",id);
            idQuestionIndex++;
            questionsId.push(id);

            let newButtons = document.createElement("div");
            id = "b" + idBtnIndex;
            newButtons.setAttribute("id",id);
            idBtnIndex++;
            buttonsId.push(id);

            newButtons.setAttribute("class","panel-body")
            for(let j = 0; j < buttons.length; j++){

                let button = document.createElement("button");
                button.innerText = buttons[j];
                if(j === 0 || j % 3 === 0){ //only answer button
                    button.innerText = answerCounter[i] + " " + buttons[j];
                }

                button.setAttribute("class" , designButtons[index]);
                button.style.marginRight = "0.5%";
                newButtons.append(button);
                index++;
            }
            newQuestions.append(newQuestion);
            newQuestions.append(newButtons);
            index = 0;
        }
        $("#questionDiv").html(newQuestions);
    }
})();