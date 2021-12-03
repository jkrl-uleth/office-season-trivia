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
            points: 50,
            sampleSize: 4,
        },
        {
            clips: [
                "2_feared-or-loved",
                "2_kill-myself",
                "2_the-way-you-are",
                "3_am-i-a-hero",
                "3_fool-me-once",
                "4_creed-debt",
                "4_hemorrhoids",
                "4_superstitious",
                "5_start-a-sentence",
                "5_turntables",
                "6_hardcore-parkour",
                "6_shoot-toby-twice",
                "9_good-old-days",
            ],
            points: 100,
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
            points: 250,
            sampleSize: 2,
        },
    ]
    var answered = 0 // game ends when 12 questions have been answered
    var activeClip = null // data for currently selected clip (season, file, points)
    var score = 0 // cumulative game score
    var correct = new Audio("audio/right-answer.mp3")
    var incorrect = new Audio("audio/wrong-answer.mp3")

    function answerHandler(season) {
        var clip = document.getElementById(activeClip.file)
        activeClip.audio.pause()
        if (activeClip.season === season) {
            score += activeClip.points
            document.getElementById("score").innerHTML = `Score: ${score}`
            correct.play()
        } else {
            incorrect.play()
        }
        activeClip = null
        clip.classList.add("disabled")
        clip.onclick = null
        modal.style.display = "none"
        if (++answered === 12) {
        }
    }

    function renderSeasonDiv(season) {
        var div = document.createElement("div")
        var span = document.createElement("span")
        document.getElementById("season-container").appendChild(div)
        div.appendChild(span)
        div.classList.add("season")
        span.innerHTML = season
        span.classList.add("button-font")
        div.onclick = function () {
            answerHandler(season)
        }
    }

    function renderModal() {
        var modal = document.getElementById("modal")
        modal.addEventListener("click", function (e) {
            if (e.target.id === this.id) {
                activeClip.audio.pause()
                activeClip = null
                modal.style.display = "none"
            }
        })

        for (var i = 1; i < 10; i++) renderSeasonDiv(i)
    }

    function selectClips() {
        var gameClips = []
        for (var tier of data) {
            gameClips.push(_.sampleSize(tier.clips, tier.sampleSize))
        }
        return gameClips
    }

    function getClipDiv(clip, points) {
        var div = document.createElement("div")
        var span = document.createElement("span")
        var modal = document.getElementById("modal")
        var info = clip.split("_") // season, file
        div.appendChild(span)
        div.setAttribute("id", info[1])
        div.classList.add("clip")
        span.innerHTML = points
        span.classList.add("clip-points")
        // have to use onclick so I can remove the listener in answerHandler
        div.onclick = function () {
            var audio = new Audio(`audio/${clip}.mp3`)
            activeClip = {
                season: Number(info[0]),
                file: info[1],
                points: points,
                audio: audio,
            }
            modal.style.display = "flex"
            activeClip.audio.play()
        }
        return div
    }

    function renderClips(gameClips) {
        gameClips.forEach((e, i) => {
            for (var clip of e) {
                var child = document.getElementById("inner").children[i]
                child.appendChild(getClipDiv(clip, data[i].points))
            }
        })
    }

    function init() {
        document.getElementById("score").innerHTML = "Score: 0"
        renderModal()
        var gameClips = selectClips()
        console.log(gameClips)
        renderClips(gameClips)
    }

    init()
})()
