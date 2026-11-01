<?php

require_once __DIR__ . '/config/Database.php';

try {
    Database::connect();

    echo "Database connection successful!";
} catch (Throwable $e) {
    echo "Connection failed: " . $e->getMessage();
}