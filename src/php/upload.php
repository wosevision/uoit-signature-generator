<?php
$message = '';
$status = 500;

try {

  $target_dir = dirname(dirname(__FILE__)) . '/uploads/';
  $target_file = $target_dir . basename($_FILES['upload']['name']);
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  $check = getimagesize($_FILES['upload']['tmp_name']);
  if ($check !== false) {
    $status = 201;
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    $message = 'Sorry, file already exists.';
    $status = 409;
  }
  // Check file size
  if ($_FILES['upload']['size'] > 300000) {
    $message = 'Sorry, your file is too large.';
    $status = 400;
  }
  // Allow certain file formats
  if ($imageFileType !== 'jpg' && $imageFileType !== 'png' && $imageFileType !== 'jpeg' && $imageFileType !== 'gif' ) {
    $message = 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.';
    $status = 415;
  }
  // Check if $uploadOk is set to 0 by an error
  if ($status === 201) {
    // if everything is ok, try to upload file
    if (move_uploaded_file($_FILES['upload']['tmp_name'], $target_file)) {
      $message = 'File '. basename($_FILES['upload']['name']). ' uploaded successfully!';
    } else {
      $message = 'Sorry, there was an error uploading your file.';
    }
  }
} catch (Exception $e) {
  $message = $e->getMessage();
}

header('Content-Type: application/json; charset=UTF-8');
http_response_code($status);
echo json_encode(['message' => $message, 'filename' => $_FILES['upload']['name']]);
?>
