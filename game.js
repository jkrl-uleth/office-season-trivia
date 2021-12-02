;(function () {
    var questions = [
        { audio: "some/path", character: "michael", season: 4, score: 250 },
        { audio: "some/path", character: "michael", season: 4, score: 250 },
        { audio: "some/path", character: "michael", season: 4, score: 250 },
    ]
    var possibleQuestionScores = [250, 500, 1000]
    var score = 0
    var answerCounter = 0

    function selectQuestions() {
        var selectedQuestions = []

        for (var score of possibleQuestionScores) {
            var scoreQuestions = questions.filter(e => e.score === score)
            var scoreSelectedQuestions = _.sampleSize(scoreQuestions, 4)
            selectedQuestions.push(scoreSelectedQuestions)
        }

        return selectedQuestions
    }

    function initGame() {
        var selectedQuestions = selectQuestions()
    }

    initGame()
})()
