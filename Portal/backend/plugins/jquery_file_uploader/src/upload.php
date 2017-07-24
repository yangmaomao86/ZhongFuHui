<?php
header("Content-Type:application/json;charset=utf-8");
session_start();
//include "classes/mypdo.php";
//include "classes/jsonback.php";
//include "classes/ResizeImage.php";
//include "classes/news_back.php";

//define('ROOT',$_SERVER["DOCUMENT_ROOT"]."\\");



function proRandName() {
	$fileName = date('YmdHis')."_".rand(100,999);
	return $fileName;
}
function get_ext($file_name){
	return array_pop(explode('.', $file_name));
	//用.号对字符串进行分组
}


try {
	//$pdo = new MyPDO();

	$file=$_FILES["file"];
	if($file["error"]>0){
		echo "Error:".$file["error"]."<br>";
	}
	else{
		$tmp_name=$file["tmp_name"];
		$name=$file["name"];

		//$moveSuccess=move_uploaded_file($tmp_name,ROOT."uploaded/".$name);

		$moveSuccess=move_uploaded_file($tmp_name,"../uploaded_files/".$name);

		//echo $moveSuccess;
		//var_dump($moveSuccess);
		//var_dump($name);
		//var_dump($tmp_name);
		//exit;

		if($moveSuccess){
			echo json_encode("upload success");
		}
		else{
			echo json_encode("上传失败！");
		}
	}
}
catch (Exception $err) {
	echo json_encode($err->getMessage());
}


?>