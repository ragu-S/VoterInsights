<?php 

$url = 'http://fyed.elections.on.ca/fyed/en/list_page_en.jsp';
$myvars = 'pcode=' . $_POST['pcode'];

$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_POST, 1);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

//$response = curl_exec( $ch );

//var_dump($response);

echo $_POST;

?>