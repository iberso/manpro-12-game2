<?php
include_once "../connection.php";
session_start();

$id_game = $_POST['id'];
$timer = (int)$_POST['timer'];
$score = (int)$_POST['score'];
$winner = $_POST['winner'];
$id_team1 = (int)$_POST['idp1'];
$id_team2 = (int)$_POST['idp2'];

$sql = "INSERT INTO game2(id, time, score, winner, id_team1, id_team2) VALUES ('$id_game',$timer,$score,'$winner',$id_team1,$id_team2)";
$result = mysqli_query($con, $sql);
echo $result;
?>