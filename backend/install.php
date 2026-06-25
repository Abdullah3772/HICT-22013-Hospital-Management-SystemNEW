
<?php
require_once __DIR__ . '/config.php';

function connect() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];
    return new PDO($dsn, DB_USER, DB_PASS, $options);
}

try {
    $db = connect();
    $adminUsername = 'admin';
    $adminPassword = 'admin123';
    $adminEmail = 'admin@nationalhospital.lk';
    $adminPhone = '011 234 5678';

    $roleStmt = $db->prepare('SELECT role_id FROM roles WHERE role_name = ?');
    $roleStmt->execute(['Super Admin']);
    $role = $roleStmt->fetchColumn();
    if (!$role) {
        echo "Role 'Super Admin' not found. Please import db.sql first.";
        exit;
    }

    $userStmt = $db->prepare('SELECT user_id FROM users WHERE username = ?');
    $userStmt->execute([$adminUsername]);
    if ($userStmt->fetch()) {
        echo "Admin user already exists.\n";
        exit;
    }

    $insert = $db->prepare('INSERT INTO users (username, password_hash, role_id, full_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)');
    $insert->execute([
        $adminUsername,
        password_hash($adminPassword, PASSWORD_DEFAULT),
        $role,
        'Super Admin',
        $adminEmail,
        $adminPhone,
    ]);

    echo "Super Admin user created successfully.\n";
    echo "Username: {$adminUsername}\n";
    echo "Password: {$adminPassword}\n";
} catch (PDOException $ex) {
    echo "Error: " . $ex->getMessage();
}
