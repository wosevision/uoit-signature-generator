<?php
error_reporting(E_ALL);
$message = '';

$target_dir = dirname(dirname(__FILE__)) . "/uploads/";
$target_file = $target_dir . basename($_FILES["upload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
// if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["upload"]["tmp_name"]);
  if($check !== false) {
    // echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    // echo "File is not an image.";
    $uploadOk = 0;
  }
// }
// Check if file already exists
if (file_exists($target_file)) {
  $message = "Sorry, file already exists.";
  $uploadOk = 0;
}
// Check file size
if ($_FILES["upload"]["size"] > 500000) {
  $message = "Sorry, your file is too large.";
  $uploadOk = 0;
}
// Allow certain file formats
if ($imageFileType !== "jpg" && $imageFileType !== "png" && $imageFileType !== "jpeg" && $imageFileType !== "gif" ) {
  $message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk === 1) {
  // if everything is ok, try to upload file
  if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_file)) {
    $message = "The file ". basename( $_FILES["upload"]["name"]). " has been uploaded.";
  } else {
    $message = "Sorry, there was an error uploading your file.";
  }
}
echo json_encode(['message' => $message, 'files' => $_FILES, 'target' => $target_file]);
?>
