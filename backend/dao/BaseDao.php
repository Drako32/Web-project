<?php

require_once __DIR__ . '/../config/Database.php';

abstract class BaseDao
{
    protected PDO $connection;
    protected string $table;
    protected string $primaryKey;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    // Check that table and column names are valid identifiers
    protected function validateIdentifier(string $name): void
    {
        if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $name)) {
            throw new InvalidArgumentException("Invalid SQL identifier: $name");
        }
    }

    // CREATE - Insert a new record
    public function create(array $data): string
    {
        if (empty($data)) {
            throw new InvalidArgumentException('Create data cannot be empty.');
        }

        $this->validateIdentifier($this->table);

        $columns = array_keys($data);
        $placeholders = [];
        $values = [];

        foreach ($columns as $index => $column) {
            $this->validateIdentifier($column);

            $placeholder = ':value_' . $index;
            $placeholders[] = $placeholder;
            $values[$placeholder] = $data[$column];
        }

        $columnList = implode(', ', $columns);
        $placeholderList = implode(', ', $placeholders);

        $sql = "INSERT INTO {$this->table} ($columnList)
                VALUES ($placeholderList)";

        $statement = $this->connection->prepare($sql);
        $statement->execute($values);

        return $this->connection->lastInsertId();
    }

    // READ - Get all records
    public function findAll(): array
    {
        $this->validateIdentifier($this->table);

        $sql = "SELECT * FROM {$this->table}";

        $statement = $this->connection->prepare($sql);
        $statement->execute();

        return $statement->fetchAll();
    }

    // READ - Get one record by ID
    public function findById(int $id): array|false
    {
        $this->validateIdentifier($this->table);
        $this->validateIdentifier($this->primaryKey);

        $sql = "SELECT * FROM {$this->table}
                WHERE {$this->primaryKey} = :id";

        $statement = $this->connection->prepare($sql);
        $statement->execute(['id' => $id]);

        return $statement->fetch();
    }

    // UPDATE - Modify an existing record
    public function update(int $id, array $data): bool
    {
        if (empty($data)) {
            throw new InvalidArgumentException('Update data cannot be empty.');
        }

        $this->validateIdentifier($this->table);
        $this->validateIdentifier($this->primaryKey);

        $setParts = [];
        $values = [];

        foreach ($data as $index => $value) {
            $this->validateIdentifier($index);

            $placeholder = ':value_' . count($setParts);
            $setParts[] = "$index = $placeholder";
            $values[$placeholder] = $value;
        }

        $setClause = implode(', ', $setParts);

        $sql = "UPDATE {$this->table}
                SET $setClause
                WHERE {$this->primaryKey} = :record_id";

        $values['record_id'] = $id;

        $statement = $this->connection->prepare($sql);

        return $statement->execute($values);
    }

    // DELETE - Remove a record
    public function delete(int $id): bool
    {
        $this->validateIdentifier($this->table);
        $this->validateIdentifier($this->primaryKey);

        $sql = "DELETE FROM {$this->table}
                WHERE {$this->primaryKey} = :id";

        $statement = $this->connection->prepare($sql);

        return $statement->execute(['id' => $id]);
    }
}