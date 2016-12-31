

////////////////////////////
// SignUp Page Validation //
////////////////////////////

  $('.createacct').on('click', function(e){
    e.preventDefault();

    var username = $('.loginusername').val();
    console.log(username)

    var password1 = $('.loginpassword1').val();
    var password2 = $('.loginpassword2').val();

    if (password1 === password2) {
      document.getElementById("createacct").submit();
    } else {
      console.log('do nothing')
    }

  })



////////////////////////////
// Password Typing status //
////////////////////////////
    // $('.loginpassword1').keyup(function() {
    //  console.log($(this).context.value.length)
    //  if(Number($(this).context.value.length) > 0){
    //    $('.status')[0].innerHTML = "typing...";
    //  } else if(Number($(this).context.value.length) == "") {
    //    $('.status')[0].innerHTML = "Passwords are empty";
    //  }
    // });
    // $('.loginpassword2').keyup(function() {
    //  if(Number($(this).context.value.length) > 0){
    //    $('.status')[0].innerHTML = "typing...";
    //  } else if(Number($(this).context.value.length) == "") {
    //    $('.status')[0].innerHTML = "Password are empty";
    //  }
    // });

    $('.loginpassword1').keyup(function() {
      var password1 = $('.loginpassword1').val();
      var password2 = $('.loginpassword2').val();
      console.log(password1)

      if(Number($(this).context.value.length) > 0  && password1 === password2){
        $('.status')[0].innerHTML = "Password match";


      } else if (Number($(this).context.value.length) > 0) {
        $('.status')[0].innerHTML = "Passwords don't match";

        console.log('btn is not clickable until ')
      }
    });

    $('.loginpassword2').keyup(function() {
      var password1 = $('.loginpassword1').val();
      var password2 = $('.loginpassword2').val();
      console.log(password1)

      if(Number($(this).context.value.length) > 0  && password1 === password2){
        $('.status')[0].innerHTML = "Password match";


      } else if (Number($(this).context.value.length) > 0) {
        $('.status')[0].innerHTML = "Passwords don't match";

        console.log('btn is not clickable until ')
      }
    });



    // show/hide(toggle) password
function togglePassword() {
  

  var pw1 = document.getElementsByClassName('loginpassword1');
  var pw2 = document.getElementsByClassName('loginpassword2');

  console.log(pw1)

  var togglePw = document.getElementById('togglePw');
  if(pw1[0].type == "password"){
    pw1[0].type = "text";
    pw2[0].type = "text";
    togglePw.value = "Hide pw";
  } else {
    
    pw1[0].type = "password";
    pw2[0].type = "password";
    togglePw.value = "Show pw";
  }
}

$("#togglePw").on('click', function(){
  console.log('hi')
  togglePassword()
})







