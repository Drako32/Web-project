
<?php

require_once __DIR__ . '/BaseDao.php';

class GuideDao extends BaseDao
{
    protected string $table = 'guides';
    protected string $primaryKey = 'guide_id';
}
