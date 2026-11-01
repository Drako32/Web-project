
<?php

require_once __DIR__ . '/BaseDao.php';

class UserDao extends BaseDao
{
    protected string $table = 'users';
    protected string $primaryKey = 'user_id';

    public function findByEmail(string $email): array|false
    {
        $sql = "SELECT * FROM users WHERE email = :email";

        $statement = $this->connection->prepare($sql);
        $statement->execute(['email' => $email]);

        return $statement->fetch();
    }
}
