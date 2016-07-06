
function statusChangeCallback(response) {
  //로그온 상태 - 사용자의 정보를 불러옴
  if (response.status === 'connected') {
    console.log(response);
    getUserProfile();
  }
  else {
    //로그 아웃상태
    //$('#btnStart').text('Signup').attr('onclick', 'onclick_facebookLogin();').show();
  }
}

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1764303753841663',
      cookie     : true,  // enable cookies to allow the server to access                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.6' // use version 2.2
    });

    // FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    // });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

function onclick_facebookLogin(f){
  var authNumber = f.auth_number.value;

  if(authNumber == ''){
    alert('인증번호를 입력해 주세요.');
    return false;
  }

  FB.login(function(response){
     if (response.status === 'connected') {

       getUserProfile(authNumber);
     }
     else {
       alert('페이스북 로그인에 실패하였습니다.');
     }
   },{scope: 'public_profile,email',return_scopes: true});
}

function onclick_facebookLogout(){
  FB.logout(function(response){
    console.log(response);
  });
}

function getUserProfile(authNumber){
  FB.api('/me?fields=id,name', function(response) {
    var user = {
      fb_id : response.id
      ,name : response.name
      ,picture : 'http://graph.facebook.com/'+response.id+'/picture?type=large&width=100&height=100'
      ,auth_number : authNumber
    };

    Ajax('/login', 'POST', user, function(data){
      document.location.href = '/guest/home';
    }
    ,function(err){
      var status = err.status;
      if(status == '403'){
        alert('잘못된 인증번호 입니다. 다시 시도해 주세요.');
      }else{
        alert('오류가 발생하였습니다. 관리자에게 문의하세요.');
      }
    });
  });

}
