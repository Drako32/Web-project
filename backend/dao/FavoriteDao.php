
<?php

require_once __DIR__ . '/BaseDao.php';

class FavoriteDao extends BaseDao
{
    protected string $table = 'favorites';
    protected string $primaryKey = 'favorite_id';
}
