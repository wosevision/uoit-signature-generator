<?php
$message = '';
$status = 500;

try {

  $target_dir = dirname(dirname(__FILE__)) . '/uploads/';
  $target_file = $target_dir . basename($_FILES['upload']['name']);
  $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  $upload_record = $target_dir . 'upload-record.json';


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
  if ($file_type !== 'jpg' && $file_type !== 'png' && $file_type !== 'jpeg' && $file_type !== 'gif' ) {
    $message = 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.';
    $status = 415;
  }

  // Check if $status is an error
  if ($status === 201) {
    // if everything is ok, try to upload file
    if (move_uploaded_file($_FILES['upload']['tmp_name'], $target_file)) {
      $hash = hash_file('md5', $target_file);
      $record = json_decode(file_get_contents($upload_record));
      $record[] = [
        'name' => $_FILES['upload']['name'],
        'path' => $target_file,
        'hash' => $hash
      ];
      $recorded = file_put_contents($upload_record, json_encode($record));
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
