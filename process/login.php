<?php
include_once "../connection.php";
session_start();
$username = $_POST['username'];
$password = $_POST['password'];
$user = $_POST['user'];

$sql = "SELECT * FROM team WHERE username='$username'";
$result = mysqli_query($con, $sql);
$data = $result->fetch_all(MYSQLI_ASSOC)[0];
$verify = password_verify($password, $data["password"]);

if ($result->num_rows != 0) {
    if ($verify) {
        if ($user == 1) {
            $res_data = [
                'id' => $data["id"],
                'username' => $data["username"],
                'asal_sekolah' => $data["asal_sekolah"],
                'player' => $user
            ];
            $_SESSION["user1"] = serialize($res_data);
            echo json_encode($res_data);
        } else if ($user == 2) {
            $res_data = [
                'id' => $data["id"],
                'username' => $data["username"],
                'asal_sekolah' => $data["asal_sekolah"],
                'player' => $user
            ];
            $_SESSION["user2"] = serialize($res_data);
            echo json_encode($res_data);
        }
    } else {
        echo "Password Salah";
        throw new Exception("Password Salah");
    }
} else {
    echo "Username Tidak ditemukan";
    throw new Exception("Username Tidak ditemukan");
}