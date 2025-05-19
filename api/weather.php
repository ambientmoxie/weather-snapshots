<?php
require_once __DIR__ . '/../php/helpers/api-guard.php'; // if needed for dotenv
require_once __DIR__ . '/../vendor/autoload.php'; // if needed for dotenv

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$zip = $_GET['zip'] ?? null;
$country = $_GET['country'] ?? 'FR';
$units = $_GET['units'] ?? 'metric';
$apiKey = $_ENV['VITE_API_KEY'];

if (!$zip || !$apiKey) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing zip or API key']);
  exit;
}

$url = "https://api.openweathermap.org/data/2.5/weather?zip=$zip,$country&units=$units&appid=$apiKey";
$response = file_get_contents($url);

if ($response === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to fetch weather data']);
  exit;
}

header('Content-Type: application/json');
echo $response;
