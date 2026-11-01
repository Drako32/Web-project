
<?php

require_once __DIR__ . '/dao/DestinationDao.php';

$destinationDao = new DestinationDao();
$testId = null;

try {
    // CREATE
    echo "<h2>Testing CREATE</h2>";

    $testId = $destinationDao->create([
        'name' => 'CRUD Test Destination',
        'country' => 'Test Country',
        'category' => 'Test',
        'description' => 'Temporary destination for testing CRUD operations.',
        'estimated_budget' => 100.00
    ]);

    echo "Destination created successfully. ID: " . htmlspecialchars($testId) . "<br>";

    // READ
    echo "<h2>Testing READ</h2>";

    $destination = $destinationDao->findById((int) $testId);

    if ($destination === false) {
        throw new RuntimeException('Could not find the new destination.');
    }

    echo "Destination found: " . htmlspecialchars($destination['name']) . "<br>";

    // UPDATE
    echo "<h2>Testing UPDATE</h2>";

    $destinationDao->update((int) $testId, [
        'name' => 'Updated CRUD Test Destination'
    ]);

    $updatedDestination = $destinationDao->findById((int) $testId);

    if ($updatedDestination['name'] !== 'Updated CRUD Test Destination') {
        throw new RuntimeException('Destination update failed.');
    }

    echo "Destination updated successfully.<br>";

    // DELETE
    echo "<h2>Testing DELETE</h2>";

    $destinationDao->delete((int) $testId);
    $deletedDestination = $destinationDao->findById((int) $testId);

    if ($deletedDestination !== false) {
        throw new RuntimeException('Destination was not deleted.');
    }

    $testId = null;

    echo "Destination deleted successfully.<br>";

    echo "<h2>All CRUD tests passed!</h2>";

} catch (Throwable $e) {
    echo "<h2>CRUD test failed</h2>";
    echo htmlspecialchars($e->getMessage());

} finally {
    // Clean up the temporary record if a test failed.
    if ($testId !== null) {
        try {
            $destinationDao->delete((int) $testId);
        } catch (Throwable $cleanupError) {
            error_log($cleanupError->getMessage());
        }
    }
}
