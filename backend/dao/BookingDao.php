
<?php

require_once __DIR__ . '/BaseDao.php';

class BookingDao extends BaseDao
{
    protected string $table = 'bookings';
    protected string $primaryKey = 'booking_id';
}
