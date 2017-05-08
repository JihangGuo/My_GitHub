/**
 * Created by hang on 2017/4/29.
 */

//定义通用节点
var back_close = document.getElementsByClassName("img_close");
var view_back = document.getElementsByClassName("view_back");
var view_state = document.getElementsByClassName("view_state");
var view_text = document.getElementsByClassName("view_text");
var view_admin = document.getElementsByClassName("view_admin");
var view_info = document.getElementsByClassName("view_info");
var table_info = document.getElementById("table_info");
var user_id;
var swapajax;//设置ajax数据中转

//设置节点属性函数 ok 冗余太大有待改进
function set_Attribute(node,name,value) {
    node.setAttribute("type","radio");
    node.setAttribute("value",value);
    node.setAttribute("name",name);
    node.style.cssText = "margin:6px";
}

//初始化页面 ok
function start() {
    //隐藏子页面
    for( var i = 0; i<=2; i++)
    {
        back_close[i].style.display = "none";
        view_back[i].style.display = "none";
    }

    //定义触发事件
    document.getElementById("a_text").onclick = function () {
        back_close[0].style.display = "block";
        view_back[0].style.display = "block";
    };
    document.getElementById("a_state").onclick = function () {
        back_close[1].style.display = "block";
        view_back[1].style.display = "block";

    };
    document.getElementById("a_admin").onclick = function () {
        back_close[2].style.display = "block";
        view_back[2].style.display = "block";
        //添加判断函数
    };
    //关闭按钮
    var a;
    for( var x = 0; x<=2; x++)
    {
        back_close[x].onclick = function (a) {
            return function () {
                view_back[a].style.display = "none";
            };

        }(x);
    }

    //初始化用户名
    $(document).ready(function(){
        $.get("http://127.0.0.1/Web_codes/new/1.php",function (data) {
            document.getElementById("user_name").innerHTML = data;
        })
    });

    //用户判定
    /*
    check_user();
    function check_user() {

       $(document).ready(function () {
           $.get("http://127.0.0.1/Web_codes/new/2.php",function (data) {
               var whois_text = data;
               if (whois_text == 1)
               {
                   //这个判定还需要多考虑一下
                   document.getElementById("whois_root").innerHTML =  "<input 'class='form-control active input_txt' placeholder='提供学号查询'><button type='button' class='btn btn-primary btn-md find_people' data-toggle='modal' data-target='#myModalone'>查询</button></form></div></div><div class='row'><div class='col-md-4 col-md-offset-4'><h3>上传题目</h3><form class='form-inline' id='formid'><br><p>提交格式为：题目/选项之间以。分割/正确答案/ 题目与题目之间用|来进行分割。如以下提交格式为：|请问谁是ZYPC最帅的人/A:郭吉航。B：郭吉航。C：郭吉航。D：郭吉航/A|</p><textarea id='textareaid' name='textareaname' style='height: 100%; width: 100%'></textarea><button type='submit' id='buttonid'  form='formid' class='btn btn-primary btn-md post_text'>上传</button></form></div></div><div class='row'><div class='col-md-8 col-md-offset-2'><table class='table table-hover' id='table_info'><tr class='success'><th>姓名</th><th>学号</th><th>联系方式</th><th>状态</th></tr><tr class='success'><td>郭吉航</td><td>04152119</td><td>17691151557</td><td>一面通过</td> </tr> <tr class='danger'> <td>郭吉航</td> <td>04152119</td> <td>17691151557</td><td>一面通过</td></tr></table></div></div><div class='row'><div class='col-md-2 col-md-offset-5'> <button type='button' class='btn btn-primary btn-lg' id='more_info'>加载更多...</button></div></div>";
               } else {
                   document.getElementById("a_admin").style.cssText = "cursor: default;";
                   document.getElementById("whois_root").innerHTML = "<div><h2>这是学长学姐看的哦，你不能看</h2></div>";
               }
           })
       })

    }
    */
} start();

//定义管理员事件 ok
function admin() {
    var input_txt = document.getElementsByClassName("input_txt");

    //查询纳新信息
    document.getElementById("find_people").onclick = function () {
        var getrow = document.getElementById("find_table");
        getrow.innerHTML = "<tr class='success'><th>姓名</th><th>学号</th><th>联系方式</th><th>状态</th></tr>";
        //获取查询值
        var the_find = input_txt[0].value;
        alert(the_find);
        $(document).ready(function(){
            $.post("http://127.0.0.1/Web_codes/4.0/3.php",
                {
                    key:the_find
                }
            ,function (data) {
                    var new_data = data;
                    //改变接受格式并显示在弹出窗 接受json数据格式为
                    var showcell = [];
                    var showrow = getrow.insertRow();
                    showrow.insertCell();
                    for ( var i = 0; i<=3; i++) {
                        showcell[i] = showrow.insertCell(i);
                        if (i == 0) {
                            showcell[i].innerHTML = new_data.name;
                        } else if (i == 1) {
                            showcell[i].innerHTML = new_data.id;
                        } else if (i == 2) {
                            showcell[i].innerHTML = new_data.phone;
                        } else {
                            showcell[i].innerHTML = new_data.state;
                        }
                    }
            })
        });
    };

    //动态加载更多信息 ok

    document.getElementById("more_info").onclick = function () {
        //访问数据函数 post,将数据加入 采用循环模式进行植入 封装成方法后循环十次
        for ( var i = 0; i<=9; i++) {
            $(document).ready(function(){
                $.get("",function (data) {
                    //var new_info = data;
                    var new_info = {
                        name:"郭吉航",
                        id:123456,
                        phone:17691151557,
                        state:"一面通过"
                    };
                    var addcell = [];
                    var addrow = table_info.insertRow();
                    if (new_info.state == 3)
                    {
                        addrow.setAttribute("class","success");
                    } else if(new_info.state == 2) {
                        addrow.setAttribute("class","warning");
                    } else if (new_info.state == 1) {
                        addrow.setAttribute("class","info");
                    } else {
                        addrow.setAttribute("class","danger");
                    }
                    for (var x = 0; x <= 3; x++) {
                        addcell[x] = addrow.insertCell(x);
                        if ( x== 0) {
                            addcell[x].innerHTML = new_info.name;
                        } else if ( x == 1) {
                            addcell[x].innerHTML = new_info.id;
                        } else if ( x == 2) {
                            addcell[x].innerHTML = new_info.phone;
                        } else {
                            addcell[x].innerHTML = new_info.state;
                        }
                    }
                })
            });

        }
    };

    /*
    //录入试题系统 ok
    document.getElementById("").onclick = function () {
        获取试题原始值
        var all_test = document.getElementById("textareaid").value;
        对试题进行分割为数组
        var first_test = all_test.split("|");
        console.log(first_test);
        all_ajax("POST","http://127.0.0.1/Web_codes/new/3.php","fname=Bill&lname=Gates");
        待加入上传状态判断
        if ( push_state == 1)
        {
            alert("上传成功");
        } else {
            alert("上传失败");
        }

    };*/
} admin();

//定义在线答题事件  程序冗余太大待优化 ok
function do_text() {
    //获取题库
    var the_main = document.getElementById("main_text");
    document.getElementById("text_more").onclick = function () {
        //获取题库数据

        for (var i = 0; i <= 29; i++) {
            $(document).ready(function(){
                $.get("",function (data) {
                    var new_text = data;
                    //分割json数据包 数据格式为：1.郭吉航帅不帅/A.帅。B.帅。C.shuai。D.shuai
                    var all_txt = new_text.split("/");
                    var ques_txt = all_txt[0];//题目
                    var all_ans = all_txt[1].split("。");//全部答案数组
                    //选项赋值
                    var ques_txt = "1.asxasxax";
                    var answ_txt = [];
                    answ_txt[0] = all_ans[0];
                    answ_txt[1] = all_ans[1];
                    answ_txt[2] = all_ans[2];
                    answ_txt[3] = all_ans[3];

                    //设置增加节点
                    var the_div = document.createElement("div");
                    var the_txt = document.createTextNode(ques_txt);
                    var the_oneansw = document.createTextNode(answ_txt[0]);
                    var the_twoansw = document.createTextNode(answ_txt[1]);
                    var the_threeansw = document.createTextNode(answ_txt[2]);
                    var the_fouransw = document.createTextNode(answ_txt[3]);
                    var the_question = document.createElement("h4");
                    var the_oneinput = document.createElement("input");
                    var the_twoinput = document.createElement("input");
                    var the_threeinput = document.createElement("input");
                    var the_fourinput = document.createElement("input");
                    the_question.appendChild(the_txt);
                    the_div.appendChild(the_question);
                    the_div.appendChild(the_oneinput);
                    the_div.appendChild(the_twoinput);
                    the_div.appendChild(the_threeinput);
                    the_div.appendChild(the_fourinput);
                    the_div.insertBefore(the_oneansw,the_oneinput);
                    the_div.insertBefore(the_twoansw,the_twoinput);
                    the_div.insertBefore(the_threeansw,the_threeinput);
                    the_div.insertBefore(the_fouransw,the_fourinput);
                    the_main.appendChild(the_div);
                    //设置节点属性
                    the_div.style.cssText = "text-align:center;";
                    set_Attribute(the_oneinput,"item1","A");
                    set_Attribute(the_twoinput,"item1","B");
                    set_Attribute(the_threeinput,"item1","C");
                    set_Attribute(the_fourinput,"item1","D");
                })
            });
            document.getElementById("text_more").style.display = "none";
        }

    };
    //判断得分
    document.getElementById("text_submit").onclick = function () {
        //var chick_point = document.getElementById("main_text").
    }
} do_text();

//定义进度查询事件  ok
function my_state() {
    var stateimg = document.getElementById("the_stateimg");
    var statetxt = document.getElementById("the_statetxt");
    //进度一共四种情况 一面未通过 一面通过进入二面 二面通过进入三面 进入工作室
    //获取后台返回面试进度
    $(document).ready(function(){
        $.get("",function (data) {
            var state_num = data;
            //对后台返回数据进行判断
            if (state_num==0)
            {
                //一面未通过
                statetxt.innerHTML = "<h2 style='text-align: center' id='the_statetxt'>一面未通过</h2>";
                stateimg.style.cssText = "width:50px; background:red;";
            } else if(state_num==1) {
                //一面通过进入二面
                statetxt.innerHTML = "<h2 style='text-align: center' id='the_statetxt'>一面通过</h2>";
                stateimg.style.cssText = "width:100px; background:#46b8da;";
            } else if (state_num==2) {
                //二面通过进入三面
                statetxt.innerHTML = "<h2 style='text-align: center' id='the_statetxt'>二面通过</h2>";
                stateimg.style.cssText = "width:200px; background:green;";
            } else if (state_num==3) {
                //进入工作室
                statetxt.innerHTML = "<h2 style='text-align: center' id='the_statetxt'>欢迎你的加入，ZYPC有你更精彩</h2>";
                stateimg.style.cssText = "width:300px; background:pink;";
            }
            else {
                //返回错误信息
                statetxt.innerHTML = "<h2 style='text-align: center' id='the_statetxt'>出现错误，请和管理员联系</h2>";
                stateimg.style.cssText = "width: 300px; background: black;";
            }
        })
    });
} my_state();

