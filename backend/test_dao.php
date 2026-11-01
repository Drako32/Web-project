
<?php

require_once __DIR__ . '/dao/UserDao.php';
require_once __DIR__ . '/dao/DestinationDao.php';
require_once __DIR__ . '/dao/GuideDao.php';
require_once __DIR__ . '/dao/FavoriteDao.php';
require_once __DIR__ . '/dao/ReviewDao.php';
require_once __DIR__ . '/dao/BookingDao.php';

try {
    $userDao = new UserDao();
    $destinationDao = new DestinationDao();
    $guideDao = new GuideDao();
    $favoriteDao = new FavoriteDao();
    $reviewDao = new ReviewDao();
    $bookingDao = new BookingDao();

    echo "<h1>TravelExplore DAO Test</h1>";

    echo "<h2>Users</h2>";
    $users = $userDao->findAll();

    foreach ($users as $user) {
        echo htmlspecialchars($user['full_name']) . " - ";
        echo htmlspecialchars($user['email']) . "<br>";
    }

    echo "<h2>Destinations</h2>";
    $destinations = $destinationDao->findAll();

    foreach ($destinations as $destination) {
        echo htmlspecialchars($destination['name']) . " - ";
        echo htmlspecialchars($destination['country']) . "<br>";
    }

    echo "<h2>Other DAO checks</h2>";
    echo "Guides: " . count($guideDao->findAll()) . "<br>";
    echo "Favorites: " . count($favoriteDao->findAll()) . "<br>";
    echo "Reviews: " . count($reviewDao->findAll()) . "<br>";
    echo "Bookings: " . count($bookingDao->findAll()) . "<br>";

    echo "<h2>DAO test completed successfully!</h2>";

} catch (Throwable $e) {
    echo "<h2>DAO test failed</h2>";
    echo htmlspecialchars($e->getMessage());
}
