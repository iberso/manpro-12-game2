<?php
require_once "connection.php";
session_start();
if (isset($_SESSION['user1']) && !empty($_SESSION["user1"])) {
    $data1 = unserialize($_SESSION['user1']);
}
if (isset($_SESSION['user2']) && !empty($_SESSION["user2"])) {
    $data2 = unserialize($_SESSION['user2']);
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkers</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" href="icon.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" integrity="sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Changa:wght@500&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Alert Modal -->
    <div class="modal fade text-black" data-bs-backdrop="static" id="alertModal" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: #f0e7dc;">
                <div class="modal-body center-text" id="alertModalBody">
                    ...
                </div>
                <div class="modal-footer">
                    <div style="margin: auto;">
                        <button type="button" data-bs-dismiss="modal" class="btn btn-lg btn-outline-warning text-black"><b>View Board</b></button>
                        <!-- <button type="button" onclick="replayGame()" class="btn mx-5" style="background-color: #ffdf61;"><b>Replay</b></button> -->
                        <button type="button" class="btn btn-lg btn-outline-warning text-black" id="btnNewGame"><b>New Game</b></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg" style="background-color: #523322;
    outline: solid  #ffdf61 5pt;">
        <div class="container-fluid">
            <img src="icon.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
            <span class="navbar-brand px-2" href="#">Checkers</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav" style="margin-left: auto;">
                    <button class="btn mx-3" style="background-color: #ffdf61;" id="btnBackToMainMenu" onclick="newGame()" disabled>Main Menu</button>
                </div>
            </div>

        </div>
    </nav>

    <div class="container center-text mt-5">
        <div class="row align-items-center">

            <div class="col">
                <h1 id="timer">05m00s</h1>
                <div style="margin-bottom: 10px;">
                </div>

                <div id="notif" style="margin-bottom: 15px;" >
                    <h4>Player Turn : <span id="playerTurnInfo"></span></h4>
                </div>
            </div>

        </div>
        
        <div class="row">
            <div class="col-lg-3 m-auto">
                <div class="row text-center mb-5">
                    <div class="col">
                        <?php
                        echo '<h2>' . $data1['username'] . '</h2>';
                        echo '<h4>' . $data1['asal_sekolah'] . '</h4>';
                        ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h2>Yellow</h2>
                        <h2 id="colorPionsAmount"></h2>
                    </div>
                    <div class="col">
                        <h2>Score</h2>
                        <h2 id="colorPionsScore">0</h2>
                    </div>
                </div>

                <ul id="colormove" class="mt-4"></ul>

            </div>

            <div class="col-lg-6">
                <div class="boardBase" style="margin: auto;">
                </div>
            </div>

            <div class="col-lg-3 m-auto">
                <div class="row text-center mb-5">
                    <div class="col">
                        <?php
                        echo '<h2>' . $data2['username'] . '</h2>';
                        echo '<h4>' . $data2['asal_sekolah'] . '</h4>';
                        ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h2>White</h2>
                        <h2 id="whitePionsAmount"></h2>
                    </div>
                    <div class="col">
                        <h2>Score</h2>
                        <h2 id="whitePionsScore">0</h2>
                    </div>
                </div>


                <ul id="whitemove" class="mt-4"></ul>
            </div>
        </div>

    </div>

    <!-- <div class="boardClone">
    </div> -->

</body>


<script>
    function newGame() {
        // window.location.href = "index.php";
    }
    let gameState = {
        "id": "",
        "winner": "",
        "timer": "",
        "boardState": "", //isi json posisi semua pion pada papan
        "playerTurn": true, //True color || false white
        "player": [{
            "id":0,
            "name": "Dummy1",
            "score": 0,
            "firstKing": false
        }, {
            "id":0,
            "name": "Dummy2",
            "score": 0,
            "firstKing": false
        }]
    };
    gameState.id = "<?php echo $_GET['id'] ?>";
    gameState.player[0].id = "<?php echo $data1['id'] ?>";
    gameState.player[1].id = "<?php echo $data2['id'] ?>";
    gameState.player[0].name = "<?php echo $data1['username'] ?>";
    gameState.player[1].name = "<?php echo $data2['username'] ?>";
</script>

<script src="game.js" charset="utf-8"></script>
<script src="AI.js" charset="utf-8"></script>

</html>