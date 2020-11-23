const handleSubmit = function(event){
    event.preventDefault();
    let email = $(".email-input").val();
    let password = $("#pwd").val()



    let preferences = []
    $('#div_checkboxes :checked').each(function(){
        preferences.push($(this).val());
    })

    //axios call to create a new user
    const result = axios({
        method: 'post',
        url: 'https://secret-brook-97060.herokuapp.com/signuppage',
        data:{
            "email":email,
            "password": password,
            "preferences": preferences
        },
    })

    //console.log(result)



  window.location.href = "index.html";

    
}





$(function() {
    $(`.signup-button`).on("click", handleSubmit)
});
