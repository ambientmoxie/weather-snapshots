<?php
require_once __DIR__ . "/../templates/head.php";
?>

<body>
    <div id="loading-screen">
        <div class="loader">Loading weather data...</div>
    </div>
    <div id="wrapper">
        <header>
            <h1>::: Weather Snapshots from Across France</h1>
        </header>
        <main id="block-container"></main>
    </div>
</body>

<?php
require_once __DIR__ . "/../templates/foot.php";
?>