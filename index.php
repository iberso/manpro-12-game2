<?php
require_once "connection.php";
session_start();
if (isset($_SESSION['user1']) && !empty($_SESSION["user1"])) {
    $data1 = unserialize($_SESSION['user1']);
}
if (isset($_SESSION['user2']) && !empty($_SESSION["user2"])) {
    $data2 = unserialize($_SESSION['user2']);
}

$sg = "disabled";
if ((isset($_SESSION['user1']) && !empty($_SESSION["user1"])) && (isset($_SESSION['user2']) && !empty($_SESSION["user2"]))) {
    $sg = "";
}
?>

<!DOCTYPE html>
<html lang="en">

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Changa:wght@500&display=swap" rel="stylesheet">

</head>

<body>
    <!-- Modal Alert-->
    <div class="modal fade" id="alertmodalsuccess" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #f0e7dc;">
                <div class="modal-body text-center">
                    <div class="svg-box">
                        <svg class="circular green-stroke">
                            <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        <svg class="checkmark green-stroke">
                            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                                <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53" />
                            </g>
                        </svg>
                    </div>
                    <h2 style="color:#7CB342;">Success</h2>
                    <div class="text-center mt-5">
                        <button type="button" class="btn btn-outline-success" onclick="refresh()">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="alertmodalfail" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #f0e7dc;">
                <div class="modal-body text-center">
                    <div class="svg-box">
                        <svg class="circular red-stroke">
                            <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        <svg class="cross red-stroke">
                            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                                <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none" />
                            </g>
                            <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                                <path class="second-line" d="M634.087,300.805L673.361,261.53" />
                            </g>
                        </svg>
                    </div>
                    <h2 style="color:#FF6245;">Error</h2>
                    <div class="text-center mt-5">
                        <button type="button" class="btn btn-outline-danger" onclick="refresh()">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="howtoplaymodal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content">

                <div class="modal-header" style="background-color: #523322;">
                    <h5 class="modal-title">How To Play</h5>
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>
                </div>

                <div class="modal-body text-black p-3" style="background-color: #f0e7dc;">
                    <h1 class="text-center mb-5">ATURAN PERMAINAN CHECKERS</h1>

                    <h3 class="mt-3">TUJUAN DARI PERMAINAN</h3>
                    Tujuan dari permainan ini adalah menjadi pemain terakhir yang berdiri. Seorang pemain memenangkan permainan ketika lawannya tidak bisa lagi bergerak. Ini terjadi ketika semua pion lawannya telah ditangkap atau ketika semua jalan pion lawannya diblok.

                    <h3 class="mt-5">AWAL PERMAINAN</h3>
                    <p>Setiap pemain mulai dengan 12 buah pion. dan waktu permainan selama 5 menit per game </p>
                    <div class="text-center">
                        <img src="images/p1.png" width="45%">
                    </div>

                    <h3 class="mt-5">CARA BERMAIN</h3>
                    <p>Pion Pemain 1 bergerak lebih dulu. Pemain kemudian bergantian bergerak. pion hanya bergerak secara diagonal maju ke arah lawan. Namun, untuk Raja, seperti yang akan Anda lihat,
                        juga bisa bergerak mundur. sebuah pion hanya bisa bergerak maju 1 kotak, kecuali pion tersebut melompat.</p>
                    <div class="row">
                        <div class="col text-center">
                            <img src="images/p2.gif" width="85%">
                            <span>Gerakan Pion</span>
                        </div>
                        <div class="col text-center">
                            <img src="images/p3.gif" width="85%">
                            <span>Gerakan Pion Raja</span>
                        </div>
                    </div>


                    <h3 class="mt-5">GERAKAN MELOMPAT (SINGLE JUMP)</h3>
                    Sebuah pion dapat melompati salah satu pion secara diagonal dan mendarat
                    kotak kosong di sisi lain (harus ada kotak kosong untuk mendarat).
                    <div class="row">
                        <div class="col text-center">
                            <img src="images/p4.gif" width="85%">
                        </div>
                        <div class="col text-center">
                            <img src="images/p5.gif" width="85%">
                        </div>
                    </div>
                    <div class="row text-center mt-2">
                        <span>Melompat (single jump)</span>
                    </div>

                    <h3 class="mt-5">GERAKAN MELOMPAT (MULTI JUMP)</h3>
                    Sebuah pion dapat melompati lebih dari 1 pion jika setelah mendarat di depan arah pion terdapat pion lawan dan setelah mendarat terdapat kotak kosong di sisi lain (harus ada kotak kosong untuk mendarat).
                    <div class="row">
                        <div class="col text-center">
                            <img src="images/p6.gif" width="85%">
                        </div>
                        <div class="col text-center">
                            <img src="images/p7.gif" width="85%">
                        </div>
                    </div>
                    <div class="row text-center mt-2">
                        <span>Melompat (double jump)</span>
                    </div>


                    <h3 class="mt-5">JENIS BIDAK (BIASA)</h3>
                    Pion jenis ini didapat pada awal permainan dan hanya bisa bergerak maju ke arah lawan dan bergerak 1 kotak saja (kecuali melompat).
                    <div class="text-center">
                        <img src="images/p2.gif" class="py-3" width="45%">
                        <p>Gerakan Pion</p>
                    </div>

                    <h3 class="mt-5">JENIS BIDAK (RAJA)</h3>
                    Ketika sebuah pion mencapai ruang di baris di sisi berlawanan dari papan, maka pion tersebut menjadi pion Raja. Pion Raja bergerak lebih kuat dari pada pion biasa karena mereka dapat bergerak secara diagonal ke depan dan ke belakang. Raja dapat menggabungkan lompatan ke beberapa arah – maju dan mundur – pada giliran yang sama.
                    <div class="text-center">
                        <img src="images/p3.gif" class="py-3" width="45%">
                        <p>Gerakan Pion Raja</p>
                    </div>

                    <h1 class="text-center mt-5">PENILAIAN PERMAINAN</h1>
                    <h3 class="mt-3">NORMAL GAME</h3>
                    <p>1. Apabila waktu telah habis atau jumlah pion salah satu pemain sudah habis, maka pemain dengan score terbanyak adalah pemenang.</p>
                    <p>2. Apabila salah satu pemain berhasil mengunci gerakan pemain lain, maka pemain yang mengunci yang menang.</p>
                    <h3 class="mt-5">DRAW GAME</h3>
                    1. Apabila waktu telah habis dan jumlah pion pemain sama, maka sistem akan mengecek pemain pertama yang berhasil menaikan pion nya menjadi pion raja dan score pemain tersebut akan bertambah 15 poin (tie breaker). Pemain dengan score terbanyak adalah pemenang.
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="align-middle">
            <div class="row align-items-center" style="min-height: 100vh;">
                <div class="col-3 my-auto">
                    <?php
                    if (isset($_SESSION['user1']) && !empty($_SESSION["user1"])) {
                        echo '<h2 class="text-center mb-4">Player 1</h2>';
                        echo '<div class="text-center ">';
                        echo '<div class="p-3 mb-4 scale-in-ver-center" style="outline: solid #523322 5pt; border-radius: 5px; color: black; background-color: #f0e7dc;">';
                        echo '<h3>' . $data1['username'] . '</h3>';
                        echo '<h4>' . $data1['asal_sekolah'] . '</h4>';
                        echo '</div>';
                        echo '<button class="btn btn-outline-danger" id="logout1">Logout</button></div>';
                    }
                    ?>

                    <div id="p1loginform">
                        <h2 class="text-center mb-4">Login Player 1</h2>
                        <div class="mb-3">
                            <label for="inputUsernameP1" class="form-label">Username</label>
                            <input type="text" class="form-control" id="inputUsernameP1">
                        </div>
                        <div class="mb-3">
                            <label for="inputPasswordP1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPasswordP1">
                        </div>
                        <div class="text-center mt-4">
                            <button class="btn btn-lg btn-outline-warning" id="login1">Login</button>
                        </div>
                    </div>
                </div>

                <div class="col-6 my-auto text-center">
                    <p style="font-size: 60pt;">Checkers</p>
                    <img src="icon.png" alt="logo Checkers" class="mb-5 wobble-hor-bottom" width="200px">
                    <br>
                    <button class="btn btn-lg mb-4 btn-outline-warning" onclick="startgame()" <?php echo $sg ?>>Start Game</button>
                    <br>
                    <button class="btn btn-lg btn-outline-warning" id="btnHowToPlay">How to play</button>
                </div>

                <div class="col-3 my-auto">
                    <?php
                    if (isset($_SESSION['user2']) && !empty($_SESSION["user2"])) {
                        echo '<h2 class="text-center mb-4">Player 2</h2>';
                        echo '<div class="text-center">';
                        echo '<div class="p-3 mb-4 scale-in-ver-center" style="outline: solid #523322 5pt; border-radius: 5px; color: black; background-color: #f0e7dc;">';
                        echo '<h3>' . $data2['username'] . '</h3>';
                        echo '<h4>' . $data2['asal_sekolah'] . '</h4>';
                        echo '</div>';
                        echo '<button class="btn btn-outline-danger" id="logout2">Logout</button></div>';
                    }
                    ?>

                    <div id="p2loginform">
                        <h2 class="text-center mb-4">Login Player 2</h2>
                        <div class="mb-3">
                            <label for="inputUsernameP2" class="form-label">Username</label>
                            <input type="text" class="form-control" id="inputUsernameP2">
                        </div>
                        <div class="mb-3">
                            <label for="inputPasswordP2" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPasswordP2">
                        </div>
                        <div class="text-center mt-4">
                            <button class="btn btn-lg btn-outline-warning" id="login2">Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <script>
        function makeid() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function startgame() {
            window.location.href = "game.php?id=" + makeid();
        }

        function refresh() {
            window.location.href = "index.php"
        }

        $(document).ready(function() {

            if (<?php echo (isset($_SESSION['user1']) && !empty($_SESSION["user1"])) ? 'true' : 'false' ?>) {
                $('#p1loginform').hide();
            }
            if (<?php echo (isset($_SESSION['user2']) && !empty($_SESSION["user2"])) ? 'true' : 'false' ?>) {
                $('#p2loginform').hide();
            }

            $('#btnHowToPlay').click(function(event) {
                $("#howtoplaymodal").modal('show');
            });

            $('#logout1').click(function(event) {
                event.preventDefault();
                $.ajax({
                    type: "GET",
                    url: 'process/logout.php?user=1',
                    success: function(response) {
                        $('#alertmodalsuccess').modal('show');
                    },
                    error: function() {
                        $('#alertmodalfail').modal('show');
                    }
                });
            });

            $('#login1').click(function(event) {
                event.preventDefault();
                let username = $('#inputUsernameP1').val();
                let password = $('#inputPasswordP1').val();

                if (username && password) {
                    let data = new FormData();
                    data.append("username", username);
                    data.append("password", password);
                    data.append("user", 1);

                    $.ajax({
                        type: "POST",
                        data: data,
                        url: 'process/login.php',
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            response = $.parseJSON(response);
                            $('#alertmodalsuccess').modal('show');

                        },
                        error: function() {
                            $('#alertmodalfail').modal('show');
                        }
                    });
                } else {

                }
            });

            $('#logout2').click(function(event) {
                event.preventDefault();
                $.ajax({
                    type: "GET",
                    url: 'process/logout.php?user=2',
                    success: function(response) {
                        $('#alertmodalsuccess').modal('show');
                    },
                    error: function() {
                        $('#alertmodalfail').modal('show');
                    }
                });
            });

            $('#login2').click(function(event) {
                event.preventDefault();
                let username = $('#inputUsernameP2').val();
                let password = $('#inputPasswordP2').val();
                if (username && password) {
                    let data = new FormData();
                    data.append("username", username);
                    data.append("password", password);
                    data.append("user", 2);

                    $.ajax({
                        type: "POST",
                        data: data,
                        url: 'process/login.php',
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            response = $.parseJSON(response);
                            $('#alertmodalsuccess').modal('show');

                        },
                        error: function() {
                            $('#alertmodalfail').modal('show');
                        }
                    });
                } else {

                }
            });

        });
    </script>
</body>

</html>