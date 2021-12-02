;(function () {
    var questions = [
        { audio: "some/path", season: 4, score: 250 },
        { audio: "some/path", season: 4, score: 250 },
        { audio: "some/path", season: 4, score: 250 },
    ]
    var scores = [250, 500, 1000]
    var score = 0
    var answerCounter = 0 // game over when 12 questions have been answered

    function selectQuestions() {
        var selectedQuestions = []

        for (var score of scores) {
            // filter all questions of certain score, then randomly select 4 to use for the game
            var scoreQuestions = questions.filter(e => e.score === score)
            var scoreQuestionsSample = _.sampleSize(scoreQuestions, 4)
            selectedQuestions.push(scoreQuestionsSample)
        }

        return selectedQuestions
    }

    function questionDiv(question) {
        return `<div class="active-question">${question.score}</div>`
    }

    function renderQuestions(selectedQuestions) {
        board = document.getElementById("game-board")
        board.innerHTML = ""
        for (var question in selectedQuestions) {
            board.appendChild(questionDiv(question))
        }
    }

    function initGame() {
        var selectedQuestions = selectQuestions()
        renderQuestions(selectedQuestions)
    }

    initGame()
})()
