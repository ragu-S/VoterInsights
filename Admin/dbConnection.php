<?php
// common.php
define('DB_HOST', 'localhost');
define('DB_PORT', '80');
define('DB_NAME', 'voterInsights');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '...');


?>

// pdo query runs
$pdo->query("update person set name = '$name'");

class sqlDb {
	$pdo;
	$result;
	$stmt;

function __construct() {
	$this->pdo = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
	$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,
	PDO::FETCH_ASSOC);

	$this->pdo->exec('set session sql_mode = traditional');
	$this->pdo->exec('set session innodb_strict_mode = on');
}

private function writeTable($sql) {
 
}

public function sqlExe($sql) {
	$stmt = $pdo->prepare('select * from department');
	$stmt->execute();
	$result = $stmt->fetchAll();
}

function __destruct() {
	//$pdo->close();
}
}