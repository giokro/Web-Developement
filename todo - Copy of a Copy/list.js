fetchLists();

//adds an ul
function addList(){
	if($('input#addList').val() != ''){
		var listName = $('input#addList').val();

		//prevent js injection
		listName = listName.replace(/</g, "&lt;");
		listName = listName.replace(/>/g, "&gt;");

		var data = {
			listName: listName
		};

		$.ajax({
			data: data,
			url: 'SQLsaveUl.php',	
			type: "post",
			cache: false,
			complete:function(){
				var chosenList=$("#chosenList").val();

				$("*").removeClass("chosen");

				if($('input#addList').val()!==""){
					$("#sortable").prepend("<div class='divLi' data-index='' data-position=''><input type='button' class='listDel' onclick='deleteList(this)' value='+'><ul id='"+chosenList+"' class='list' onclick='chooseList(this); hideShow(); addToPop(this)'><h2 contenteditable spellcheck='false' onkeyup='editTitle(this)'></h2><ol><h3>Completed:</h3></ol></ul></div>");
					$("ul#"+chosenList+" h2").html(listName);
				}else{
					alert("Enter a frickn name boi");
				}
				$("input#addList").val('');
				checkListExist();
			}
		}).done(function(response, statusT, jqXHR){
			var id = response;
			$("#chosenList").val(id);
		});
	}else{
		alert('enter a frickn name boi!');
	}
}

//adds li in ul with chosen class
function addTask(){
	if($('input#addTask').val() !== ""){
		var LiID = $('.chosen').attr('id'), task = $('input#addTask').val(), completed = 0;

		var position = ($('.popupList li').length+1);

		//prevent js injection
		task = task.replace(/</g, "&lt;");
		task = task.replace(/>/g, "&gt;");

		var data = {
			LiID: LiID,
			task: task,
			completed: completed,
			position: position
		};

		$.ajax({
			data: data,
			url: "SQLsaveLi.php",
			type: "post",
			cache: false,
			complete: function(){
				$('.popupList ol').before("<li class='"+$('#taskID').val()+" li' data-index='' data-position=''><a class='handle'>:::</a><input class='listCheck' onclick='doneLi(this); emptyUl(this)' type='checkbox'><a onclick='emptyUl(this); deleteTask(this); SQLremoveLi(this)' class='del'>+</a><div onkeyup='editTask(this)' spellcheck='false' class='editable' aria-multiline='true' contenteditable>"+task+"</div>"+"</li>");
				$('input#addTask').val('');
			}
		}).done(function(response, statusT, jqXHR){
			var id = response;
			$('#taskID').val(id);
		});
	}else{
		alert("Make a list!");
	}
}

//adds a chosen class to the selected ul, removes from the previous ul
function chooseList(elm){
	$("#chosenList").val($(elm).attr("id"));
	$("*").removeClass("chosen");
	$("#"+$(elm).attr("id")).addClass("chosen");
}

//toggle popup
function hideShow(){
	$('.cover').fadeToggle(300);

	var currentScroll = $(window).scrollTop();
	$('.cover').css('top',currentScroll+'px');

	$('.popupList').slideToggle(150);
	var popPoss = $('.popupList').scrollTop();
	$('.popupList').css('top',(currentScroll-popPoss)+85+'px');

	if(!($('body').hasClass('flowHide'))){
		$('body').addClass('flowHide');
	}else{
		$('body').removeClass('flowHide');
		$("*").removeClass("chosen");
	}

	$('.popupList .addBox').remove();

    addToLi();
}

//keypress functions
$(document).on('keydown', function(e){
    if (e.keyCode === 27 && $('.popupList').css('display') == 'block'){ 
        hideShow();
        removeFromPop();
    }
});	
$(document).on('keydown', function(e){
	if(e.which === 13){
		if($(e.target).attr("id")=="addList"){
			addList();
		}
	}
});
$(document).on('keydown', function(e){
	if(e.which === 13){
		if($(e.target).attr("id")=="addTask"){
			addTask();
			emptyPop();
		}
	}
});

//writes contents into the popup
function addToPop(elm){
	$('.popupList').append("<div class='addBox'><input type='text' placeholder='Add a task' id='addTask'><input type='button' onclick='addTask(); emptyPop()' value='+'></div>");

	var whatToAdd = $('.chosen').html();
	$('.popupList').append(whatToAdd);
	var width = ($('.chosen').width() + 'px'), height = ($('.chosen').height() + 'px');
	$('.chosen').css('height',height);
	$('.popupList').children('li').find(':checkbox').each(function(){
		$(this).attr('checked',false);
	});
	$('.popupList').find('ol').find(':checkbox').each(function(){
		$(this).attr('checked',true);
	});
	$('.chosen').html('');
}

function addToLi(){
	chosenList = $('#chosenList').val();
	$("#"+chosenList).prepend($('.popupList').html());
}

//this empties the popup upon close
function removeFromPop(){
	$('.popupList').html('');
	$('.chosen').height('auto');
}

//done items have a line-through
function doneLi(elm){
	if(!($(elm).parent().hasClass("done"))){
		data = "true="+$(elm).parent().attr("class");
		data = data.slice(0, -3);

		$(elm).parent().appendTo($('.popupList').children('ol'));
		$(elm).parent().addClass("done");
		$.ajax({
			data: data,
			url: "SQLfetchLists.php",
			type: "post",
			cache: false
		}).done(function(response){
			//
		});
	}else{
		data = "false="+$(elm).parent().attr("class");
		data = data.slice(0, -8);

		$('.popupList ol').before($(elm).parent());
		$(elm).parent().removeClass("done");
		$.ajax({
			data: data,
			url: "SQLfetchLists.php",
			type: "post",
			cache: false
		}).done(function(response){
			//
		});
	}	
}

function deleteList(elm){
	var count = $(elm).next('ul').children('li').length;
	if(count == 0){
		$(elm).parent().remove();
		SQLremoveUl(elm);
		checkListExist();
	}else if(confirm('Are you sure?')){
		$(elm).parent().remove();
		SQLremoveUl(elm);
		checkListExist();
	}
}

function deleteTask(elm){
	SQLremoveLi(elm);
	$(elm).parent().remove();
}

function hideShowUser(){
	$('.cover2').fadeToggle(300);
	$('.popupList').slideToggle(150);

	if(($('body').hasClass('flowHide'))){
		$('body').addClass('flowHide');
	}else{
		$('body').removeClass('flowHide');
	}
}

function checkListExist(){
	if($('ul').length == 0 ){
		$('.noList').css('display', 'inline-block');
	}else{
		$('.noList').css('display', 'none');
	}
}

function SQLremoveUl(elm){
	var data = 'id='+$(elm).next('ul').attr('id');

	$.ajax({
		data: data,
		url: 'SQLremoveUl.php',
		type: 'post',
		cache: false
	}).done(function(response){
		//
	});
}

function SQLremoveLi(elm){
	var data = 'id='+$(elm).parent().attr('class');
	data = data.slice(0, -3);

	$.ajax({
		data: data,
		url: 'SQLremoveLi.php',
		type: 'post',
		cache: false
	}).done(function(response){
		//
	});
}

checkListExist();

function fetchLists(){
	$.ajax({
		data: "list=list",
		type: "post",
		url: 'SQLfetchLists.php',
		cache: false
	}).done(function(response){
		var jboi = JSON.parse(response);
		var arrID = [], arrTitle = [], arrPosition = [];
		for(i=0;i<jboi["id"].length;i++){
			arrID[i] = jboi["id"][i]["LiID"];
			arrTitle[i] = jboi["title"][i]["title"];
			arrPosition[i] = jboi["position"][i]["position"];
		}
		for(i=0;i<arrID.length;i++){
			$("#sortable").prepend("<div class='divLi' data-index='' data-position='"+arrPosition[i]+"'><input type='button' class='listDel' onclick='deleteList(this)' value='+'><ul id='"+arrID[i]+"' class='list' onclick='chooseList(this); hideShow(); addToPop(this)'><h2 class='editableH2' contenteditable spellcheck='false' onkeyup='editTitle(this)'></h2><ol><h3>Completed:</h3></ol></ul></div>");
			$("ul#"+arrID[i]+" h2").html(arrTitle[i]);
		}
		fetchTasks();
		checkListExist();
	});
}

function fetchTasks(){
	$.ajax({
		data: "task=task",
		url: "SQLfetchLists.php",
		type: "post",
		cache: false
	}).done(function(response){
		var x = JSON.parse(response);

		for(i=0;i<x.length;i++){
			var LiID = x[i]["LiID"];
			var TID = x[i]["TID"];
			var task = x[i]["task"];
			var completed = x[i]["completed"];	
			var position = x[i]["position"];

			if(completed == 1){
				$('#'+LiID).children('ol').append("<li class='"+TID+" li done' data-index='' data-position='"+position+"'><a class='handle'>:::</a><input class='listCheck' onclick='doneLi(this); emptyUl(this)' type='checkbox' checked><a onclick='emptyUl(this); deleteTask(this); SQLremoveLi(this)' class='del'>+</a><div onkeyup='editTask(this)' spellcheck='false' class='editable' aria-multiline='true' contenteditable>"+task+"</div>"+"</li>");
				$('input#addTask').val('');
			}else{
				$('#'+LiID).children('ol').before("<li class='"+TID+" li' data-index='' data-position='"+position+"'><a class='handle'>:::</a><input class='listCheck' onclick='doneLi(this); emptyUl(this)' type='checkbox'><a onclick='emptyUl(this); deleteTask(this); SQLremoveLi(this)' class='del'>+</a><div onkeyup='editTask(this)' spellcheck='false' class='editable' aria-multiline='true' contenteditable>"+task+"</div>"+"</li>");
				$('input#addTask').val('');
			}

			if($('#'+LiID).children('li').length != 0){
				$('#'+LiID).css('background-image','none');
			}

		}
	});
}

//updates the db with the edited task
function editTask(elm){
	var updateTask = $(elm).text(); 
	if($(elm).parent().hasClass('done')){
		TID = $(elm).parent().attr('class').slice(0,-8);
	}else{
		TID = $(elm).parent().attr('class').slice(0,-3);
	}
	
	var data = {
		updateTask: updateTask,
		TID: TID
	};

	$.ajax({
		data: data,
		url: 'SQLfetchLists.php',
		type: 'post',
		cache: false
	}).done({
		//
	});
}

function editTitle(elm){
	var updateTitle = $(elm).text();
	var LiID = $('#chosenList').val();

	var data = {
		updateTitle: updateTitle,
		LiID: LiID
	};
	
	$.ajax({
		data: data,
		url: "SQLfetchLists.php",
		type: 'post',
		cache: false
	});
}

function hideShowMenu(){
	$('.menu').slideToggle(100);

	if(($('body').hasClass('flowHide'))){
		$('body').addClass('flowHide');
	}else{
		$('body').removeClass('flowHide');
	}
}

$('*').click(function(e) {
   	if(e.target.id != 'menu' && e.target.id != 'menuList' && e.target.id != 'username') {
   	    $('.menu').hide(100);
   	}
});

$('#sortable').sortable({
	tolerance: 'pointer',
	revert: true,
	helper: 'clone',
	update: function(event, ui){
		$(this).children().each(function(index){
			$(this).attr('data-index', index+1); 
			if($(this).attr('data-position') != (index+1)){
				$(this).attr('data-position',index+1);
				var LiID = $(this).children('ul').attr('id');

				var data = {
					position: (index+1),
					LiID: LiID
				};

				$.ajax({
					data: data,
					url: "SQLfetchLists.php",
					type: 'post',
					cache: false
				});
			}
		});
	}
});

$('.popupList').sortable({
	containment: 'parent',
	items: "> li",
	tolerance: 'pointer',
	handle: '.handle',
	update: function(event, ui){
		$(this).children('li').each(function(index){
			$(this).attr('data-index',index+1);
			if($(this).attr('data-position') != (index+1)){
				$(this).attr('data-position',index+1);

				if($(this).hasClass('done')){
					var TID = $(this).attr('class').slice(0,-8);
				}else{
					var TID = $(this).attr('class').slice(0, -3);
				}

				var data = {
					position: (index+1),
					TID: TID
				};

				$.ajax({
					data: data,
					url: "SQLfetchLists.php",
					type: 'post',
					cache: false
				});
			}
		});
	}
});

$('ol').sortable("disable");

function emptyUl(elm){
	var parent = $(elm).parent().parent();
	console.log($(elm).text());

	if(parent.is('ol')){
		var count = $(elm).parent().parent().parent().children('li').length;
		console.log(count);
	}else{
		if($(elm).text() == '+'){
			var count = $(elm).parent().parent().children('li').length -1;
			console.log(count);
		}else{
			var count = $(elm).parent().parent().children('li').length;
			console.log(count);
		}
	}

	if(count != 0){
		$('.chosen').css('background-image','none');
	}else{
		$('.chosen').css('background-image','url(img/empty.png)');
	}
}

function emptyPop(){
	$('.chosen').css('background-image','none');
}

function changePassword(){
	$('.popupList').append("<form method='post' action='changePassword.php'><div class='accDiv'><h2>Change Password:</h2><input type='password' placeholder='current password' name='oldPassword'><br><input type='password' id='newPass' placeholder='new password' name='newPassword' onkeyup='passwordMatch()'><br><input type='password' id='newPassRep' placeholder='repeat new password' name='newPasswordRepeat' onkeyup='passwordMatch()'><br><span id='message'>-</span><br><input id='submitPass' type='submit'></div><form>");
}

function passwordMatch(){
	if($('#newPass').val() != $('#newPassRep').val()){
		$('#message').css('color','red');
		$('#message').html("Passwords don't match!");
		$('#submitPass').attr('disabled',true);
	}else{
		$('#message').css('color','#41b3a3');
		$('#message').html("Passwords match!");
		$('#submitPass').attr('disabled', false);
	}
}

function changeEmail(){
	$('.popupList').append("<form action='changeEmail.php' method='post'><div class='accDiv'><h2>Change Email:</h2><input type='email', placeholder='New email' name='email'><br><input type='submit'></div><form>");
}

function changeUsername(){
	$('.popupList').append("<form action='changeUsername.php' method='post'><div class='accDiv'><h2>Change Username:</h2><input type='text', placeholder='New username' name='username'><br><input type='submit'></div><form>");
}

function aboutUs(){
	$('.popupList').append("<div class='accDiv'><h2>About Us:</h2><p><b>We're just two bros browing our broat towards a better end... <br><br>All y'all, just keep on browing.</b></p></div>");
}
