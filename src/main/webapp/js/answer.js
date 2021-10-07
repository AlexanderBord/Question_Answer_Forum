
(function () {

    function updateAnswerCounter(index) {
     location.replace('DataServlet?i='+index);
    }

    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    function goToQuestions() {
        deleteCookie('questionNumber');
        window.location.href='index.html';
    }

    document.addEventListener('DOMContentLoaded', function ()
    {
        document.getElementById("submit").onclick = function (event) {

            let cookie = decodeURIComponent(document.cookie); //keep the current answered question in hidden input value
            let question = document.getElementById("question");

            question.value = cookie.charAt(15);
            updateAnswerCounter(question.value);
        }
        document.getElementById("btn").addEventListener('click', goToQuestions);
    });
})();
