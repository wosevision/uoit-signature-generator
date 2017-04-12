<?php
$url = "https://ssbp.mycampus.ca/prod/www_directory.directory_uoit.p_showpeoplexml";
$str = file_get_contents($url);
$temp = mb_convert_encoding($str, "UTF-8");
$xml = simplexml_load_string($temp);
$obj = new \stdClass();
$obj->success = true;
$obj->data = Array();
foreach ($xml->person_info as $person) {
	$obj->data[] = $person;
}
$json = json_encode($obj);
echo $json;