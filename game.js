;(function () {
    /**
     * Contains all game data for config. Each object is a different scoring tier.
     * The season number (the answer) is included in the filename, ie/ file "1_*" is from season 1.
     *
     * @param {clips}: Filename for the audio file.
     * @param {points}: Scoring value of each clip in the tier.
     * @param {sampleSize}: Number of questions in that tier selected for the game.
     */
    var data = [
        {
            clips: [
                "1_hoops",
                "1_in-the-wild-health-care",
                "2_presents",
                "2_smoking-drugs",
                "3_depression",
                "3_ignorant-slut",
                "4_turtles",
                "4_i-declare-bankruptcy",
                "4_i-have-flaws",
                "4_pretzel-day",
                "5_no-arms-or-legs",
                "5_stay-calm",
                "5_no-god-no",
            ],
            points: 250,
            sampleSize: 4,
        },
        {
            clips: [
                "2_feared-or-loved",
                "2_kill-myself",
                "2_the-way-you-are",
                "3_am-i-a-hero",
                "3_dont-be-an-idiot",
                "3_fool-me-once",
                "4_creed-debt",
                "4_hemorrhoids",
                "4_superstitious",
                "5_start_a_sentence",
                "5_turntables",
                "6_hardcore-parkour",
                "6_shoot-toby-twice",
                "9_good-old-days",
            ],
            points: 500,
            sampleSize: 6,
        },
        {
            clips: [
                "1_gentleman_and_scholar",
                "1_heroes-of-mine",
                "2_bang-on-this-mug",
                "2_rule-of-business",
                "2_toby-not-family",
                "3_early-worm",
                "3_estimate-me",
                "3_wikipedia",
                "4_need-to-be-liked",
                "5_no-idea-what-to-do",
            ],
            points: 1000,
            sampleSize: 2,
        },
    ]
    var score = 0 // cumulative game score
    var answered = 0 // game ends when 12 questions have been answered

    function selectClips() {
        var gameClips = []
        for (var tier of data) {
            var sample = _.sampleSize(tier.clips, tier.sampleSize)
            gameClips.push(sample)
        }
        return gameClips
    }

    function questionDiv(question) {
        return `<div class="active-question">${question.score}</div>`
    }

    function renderQuestions(selectedQuestions) {
        board = document.getElementById("game-board")
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
