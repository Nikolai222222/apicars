$(document).ready(function(){
    let username = '';
    let password = '';
    let soloNumeros =/^[0-9]+$/;

    let email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    $('#btnenviar').click(function(e){
        e.preventDefault();

        $("#error1").text("");

        username = $("#username").val();

        if($('#username').val() === ""){
            $("#error1").text("It must be a valid user");
            $("#error1").css("color","red");
            return;
        }

        if(!email.test(username)){
            $("#error1").text("It must be a valid email");
            $("#error1").css("color","red");
            
            return;
        }
       
        //password
        
        password=$('#password').val();
        
        $("#error2").text("");

        password = $("#password").val();

        if($('#password').val() === ""){
            $("#error2").text("It must be a valid password");
            $("#error2").css("color","red");
            return;
        }
        if($('#password').val().length <7  ){
            $("#error2").text("The password must be greater than or equal to 7");
            $("#error2").css("color","red");
            return;
        }

        
        console.log("paso");
        
      

        let formData={
            username,
            password
        };

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response){
                console.log('respuesta del servidor', response);

                localStorage.setItem("isAuthenticated", "true");
                window.location.href = "index.html"
            },
            error: function(xhr, status, error){
                console.error('error al enviar la solicitud', error);
            }
        });


    });

});