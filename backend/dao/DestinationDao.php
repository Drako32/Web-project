
<?php

require_once __DIR__ . '/BaseDao.php';

class DestinationDao extends BaseDao
{
    protected string $table = 'destinations';
    protected string $primaryKey = 'destination_id';
}
