<?php
// Database configuration
$servername = "localhost"; // usually localhost
$username = "root";        // your MySQL username
$password = "";            // your MySQL password
$dbname = "st_db1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is sent
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['studentName'] ?? '';
    $email = $_POST['studentEmail'] ?? '';
    $roll = $_POST['rollNumber'] ?? '';

    // Simple validation
    if (!empty($name) && !empty($email) && !empty($roll)) {
        $stmt = $conn->prepare("INSERT INTO st_tbl1 (sname, semail, spassword) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $roll); // Bind parameters

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Please fill all fields";
    }
}

$conn->close();
?>
