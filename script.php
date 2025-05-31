<?php
header('Content-Type: image/png');
//error_reporting(E_ALL);
//ini_set('display_errors', 1);



$log = fopen(__DIR__ . "/debug.log", "a");
fwrite($log, date('Y-m-d H:i:s') . " - Request received:\n");
fwrite($log, print_r($_GET,true));



$parts = explode('-', $_GET['options']);
$id = $_GET['id'] ?? '1';
$view = $_GET['view'] ?? 'FRONT';
$size = $_GET['size'] ?? 'large';

$basePath = __DIR__ . '/Assets/';
$baseImage = $basePath .$view."/p0/" . $id . ".png";

    if (!file_exists($baseImage)) {
        fwrite($log, date('Y-m-d H:i:s') . " - Missing file: $baseImage\n");

          $baseImage = $basePath ."no_image.png";

    }else{
        fwrite($log, date('Y-m-d H:i:s') . " - Found file: $baseImage\n");
    }

$base = @imagecreatefrompng($baseImage);

imagealphablending($base, true);
imagesavealpha($base, true);





$width = 800;
$height = 800;

/*$finalImage = imagecreatetruecolor($width, $height);
imagesavealpha($finalImage, true);
imagealphablending($finalImage, false); // important!
$transparent = imagecolorallocatealpha($finalImage, 0, 0, 0, 127);
imagefill($finalImage, 0, 0, $transparent);*/



foreach ($parts as $index => $code) {
    if ($code === '00') { 
        continue; // Skip layering if "00"
    }



    // For id = 7, only process layers 7 and 8 (index 6 and 7)
    if ($id == 7) {
        if ($index < 6 || $index > 7) {
            continue; // skip all except index 6 and 7
        }
    } else {
        // For others, only process layers 1 to 6 (index 0 to 5)
        if ($index > 5) {
            continue;
        }
    }

    $layerNum = $index + 1;



    //$dir = $code;
    $imgPath = __DIR__ . "/Assets/".$view."/p". $layerNum. "/" . $code . ".png";
    if (!file_exists($imgPath)) {
        fwrite($log, date('Y-m-d H:i:s') . " - Missing file: $imgPath\n");
        continue;
    }else{
        fwrite($log, date('Y-m-d H:i:s') . " - Found file: $imgPath\n");
    }
    if (file_exists($imgPath)) {
        $layer = @imagecreatefrompng($imgPath);
        if (!$layer) {
            fwrite($log, date('Y-m-d H:i:s') . " - Failed to load image: $imgPath\n");
            continue;
        }
                    imagecopy($base, $layer, 0, 0, 0, 0, imagesx($layer), imagesy($layer));
        imagedestroy($layer);
    }
}




imagepng($base);
imagedestroy($base);
//imagedestroy($overlay);
?>