<?php

require_once 'mysql.php';
require_once 'oauth.php';

	$method = $_GET['m'];
	echo $method;
	$db->sql_conn();
	$Menber = new New_Mb();
	$Menber -> $method();

class New_Mb{

	public function __construct(){
		
	}

	public function __destruct(){

	}

	public function Login(){
		/*if(isset($_POST['submit'])&&$_POST['submit']=="登录"){
		$name=$_POST['username'];
		$pws=$_POST['password'];
		if($_POST['username']==""||$_POST['password']==""){
			echo "<script>alert('请输入用户名或密码！');history.go(-1);</script>";
		}
		else{
			$db->sql_conn();
			$check="select password from user where username = '$name'";
			if($query=mysql_query($check)){

				if(mysql_num_rows($query)<1)
					echo "<script>alert('用户名不正确！');history.go(-1);</script>";

				$row=mysql_fetch_array($query);
				if($row['password'] === $pws){
			
					$_SESSION['username'] = $name;
					$_SESSION['password'] = md5($pws);

					header("location:get_state.php");
				}
				else{
					echo "<script>alert('密码错误！');history.go(-1);</script>";
				}
			}
		}
		}*/
		$client_id = '217eead024f1704f7f20fb78deb7db8e9babb4dfdc95acaa7f26052766c45c34';  
		$secret    = '5358b46eaae8c8e2a31a8f33362ad424fcb5273dd851c8ebb545663c53210888';
		$url = 'http://zypc.xupt.org/oauth/authorize?client_id='.$client_id.'&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%2Fnew%2Foauth.php&secret='.$secret;
		echo $url;
   		header("Location:".$url);

	}


	public  function Logout(){
		session_destroy('username');
		session_destroy('password');
		session_destroy('sex');
		header("location:index.html");
	}


	public  function Get_State(){

		$username = $_SESSION['username'];

		$sql = 'select test_state from user where username = \''.$_SESSION['username'].'\'';
		if($query = mysql_query($sql)){
	
		$result = mysql_fetch_array($query);
	
		$temp = $result['test_state'];
		if($temp == "0"){
			echo '还未进行一面在线测试！';
			header("location:get_subject.php"); 
		}
		else{
			$sql = 'select level from new_state where username = \''.$username.'\'';
			//$sql = 'select * from user';
			if($query = mysql_query($sql)){
				$rows = mysql_num_rows($query);
				$result = mysql_fetch_array($query);
			if($rows < 1){
				echo '一面结果于2017-5-xx日公布!';
			}
			else if($result['level'] == 'C'||$result['level'] == NULL)
				echo '很抱歉，你没有通过一面！';
			else{
				echo '恭喜你，通过了第一次面试！';
			}
				
		//echo var_dump($result);
			}
		}

		}else{
		echo "系统忙,请稍后再试!";
		}
	}


	public function Get_Subject(){
		$sql = 'select suj_id,subject,correct,as_a,as_b,as_c,as_d from subject_bank order by rand() limit 30';
		$query = mysql_query($sql);
		$result = mysql_fetch_assoc($query);
		echo json_encode($result);
	}


	public function Upload_Subject(){
		if($_POST['subject']&&$_POST['correct']&&$_POST['cate']&&$_POST['as_a']&&$_POST['as_b']&&$_POST['as_c']&&$_POST['as_d'] != 0){

		$subject = $_POST['subject'];
		$correct = $_POST['correct'];
		//$cate =    $_POST['cate'];//subject_web subject_safe subject_oper
		$as_a =    $_POST['as_a'];
		$as_b =    $_POST['as_b'];
		$as_c =    $_POST['as_c'];
		$as_d =    $_POST['as_d'];
	
		$sql = 'insert into subject_bank(subject,correct,as_a,as_b,as_c,as_d) value(\''.$subject.'\',\''.$correct.'\',\''.$as_a.'\',\''.$as_b.'\',\''.$as_c.'\',\''.$as_d.'\')';
		if($query = mysql_query($sql)){
		echo "<script>alert('提交成功！');history.go(-1);</script>";
		}	
	
		}else{
		echo "<script>alert('每一项都不能为空！');history.go(-1);</script>"; 
		}
	}


	public function Get_New_Answer(){

		$suj_id = $_POST['suj_id'];
		//$cate = $_POST['cate'];
		$choice = $_POST['choice'];

		$sql = 'select correct from subject_bank where suj_id='.$suj_id;
		$query = mysql_query($sql);
		$result = mysql_fetch_array($query,MYSQL_NUM);
		$temp = $result[0];

		if($temp == $choice)
			return 1; 
		else
			return 0;
	}

	public function Text_Judge(){
		$point = $_POST['point'];
		if($point<=30)
		$sql = 'update subject_bank set point='.$point;
		$query = mysql_query($sql);
	}

	public function test() {
		$str = 1;
		echo json_encode($str);
		//echo $str;
	}


}




	


?>