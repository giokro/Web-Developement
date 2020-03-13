function check(){
    var username = $('#username').val(),
    data = "username="+username;
    $.ajax({
        data: data,
        url: 'usernameCheck.php',
        type: "get",
        cache: false
    }).done(function(response,statusT,jqXHR){
        if(response=="true"){
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = "Username already exists!";
            document.getElementById('submit').disabled = true;
        }else{
            document.getElementById('message').style.color = 'black';
            document.getElementById('message').innerHTML = "-";
            document.getElementById('submit').disabled = false;
            var email = $('#email').val();
            data = "email="+email;
            $.ajax({
                data: data,
                url: "emailCheck.php",
                type: "get",
                cache: false
            }).done(function(response, statusT, jqXHR){
                if(response == "true"){
                    document.getElementById('message').style.color = 'red';
                    document.getElementById('message').innerHTML = "Email already exists!";
                    document.getElementById('submit').disabled = true;
                }else{
                    document.getElementById('message').style.color = 'black';
                    document.getElementById('message').innerHTML = "-";
                    document.getElementById('submit').disabled = false;
                    if(document.getElementById('pass').value != "" && document.getElementById('passrep').value != ""){
                        if(document.getElementById('pass').value == document.getElementById('passrep').value){
                            document.getElementById('message').style.color = 'rgb(25, 146, 155)';
                            document.getElementById('message').innerHTML = 'Passwords match!';
                            document.getElementById('submit').disabled = false;
                        }else{
                            document.getElementById('message').style.color = 'red';
                            document.getElementById('message').innerHTML = "Passwords don't match!";
                            document.getElementById('submit').disabled = true;
                        }
                    }
                }
            });
        }
    });
}
