<?php
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data->userids) 
	&& !empty(trim($data->userids))
	){
  $adduserid = mysqli_real_escape_string($db_conn, trim($data->userids));
	$allUsers = mysqli_query($db_conn,"SELECT * FROM user where user_id = '".$adduserid."'");
	if(mysqli_num_rows($allUsers) > 0){
		while($row = mysqli_fetch_array($allUsers)){
      $viewjson["user_id"] = $row['user_id'];
      $viewjson["name"] = $row['name'];
      $viewjson["email"] = $row['email'];
      $viewjson["date"] = $row['date'];
      $json_array["userdata"][] = $viewjson;
		}
		echo json_encode(["success"=>true,"userlist"=>$json_array]);
		return;
			
	}
	else{
		echo json_encode(["success"=>false]);
		return;
	}
		
}
?>