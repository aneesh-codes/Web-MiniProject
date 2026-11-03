<?php
    $conn = new mysqli('localhost', 'root', '', 'todolist');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }

    if (isset($_POST['task'])) {
        $task = trim($_POST['task']);
        if ($task !== '') {
            $stmt = $conn->prepare("INSERT INTO tasks (task) VALUES (?)");
            $stmt->bind_param('s', $task);
            $stmt->execute();
            $stmt->close();
        }
        header('Location: index.php');
        exit;
    }

    if (isset($_GET['delete'])) {
        $id = (int) $_GET['delete'];
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->close();
        header('Location: index.php');
        exit;
    }

    if (isset($_GET['complete'])) {
        $id = (int) $_GET['complete'];

        $columnCheck = $conn->query("SHOW COLUMNS FROM tasks LIKE 'completed'");
        if ($columnCheck && $columnCheck->num_rows === 0) {
            $conn->query("ALTER TABLE tasks ADD COLUMN completed TINYINT(1) NOT NULL DEFAULT 0");
        }

        $stmt = $conn->prepare("UPDATE tasks SET completed = 1 WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->close();

        header('Location: index.php');
        exit;
    }

    $result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <!-- css file -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class = "container">
        <h1>  TODO LIST</h1>

        <form action="index.php" method="POST">
            <input type="text" name="task" placeholder="Add a new task...">
            <button type="submit">Add Task</button>
        </form>
        <ul>
            <?php while($row = $result->fetch_assoc()): ?>
                <li>
                    <strong> <?php echo htmlspecialchars($row['task'], ENT_QUOTES, 'UTF-8'); ?> </strong>
                    <div class = "actions">
                        <?php if (empty($row['completed'])): ?>
                            <a href="index.php?complete=<?php echo (int) $row['id']; ?>">Complete</a>
                        <?php else: ?>
                            <span>Completed</span>
                        <?php endif; ?>
                        <a href="delete.php?id=<?php echo (int) $row['id']; ?>">Delete</a>
                    </div>
                </li>
            <?php endwhile; ?>
        </ul>
    </div>
</body>
</html>