<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username)
	&& isset($data->useremail) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->useremail))
	){
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));
	$useremail = mysqli_real_escape_string($db_conn, trim($data->useremail));
	$date = date('Y-m-d');

	$add = mysqli_query($db_conn,"insert into user (name,email,date) values('$username','$useremail','$date')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);
		echo json_encode(["success"=>true,"insertid"=>$last_id]);
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} else{
    echo json_encode(["success"=>false,"msg"=>"Please fill all the required fields!"]);
	return;
}
?>