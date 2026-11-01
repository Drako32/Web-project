
<?php

require_once __DIR__ . '/BaseDao.php';

class ReviewDao extends BaseDao
{
    protected string $table = 'reviews';
    protected string $primaryKey = 'review_id';
}
