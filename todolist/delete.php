<?php
$conn = new mysqli('localhost', 'root', '', 'todolist');

if ($conn->connect_error) {
    die('Connection Failed : ' . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $conn->query("DELETE FROM tasks WHERE id = $id");
}

header('Location: index.php');
exit;
