<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username)
	&& isset($data->useremail) 
	&& isset($data->userids) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->useremail))
	&& !empty(trim($data->userids))
	){
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));
	$useremail = mysqli_real_escape_string($db_conn, trim($data->useremail));
	$userids = mysqli_real_escape_string($db_conn, trim($data->userids));

  $add = mysqli_query($db_conn,"update user set name ='$username', email ='$useremail'where user_id='$userids'");

	if($add){
		echo json_encode(["success"=>true]);
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