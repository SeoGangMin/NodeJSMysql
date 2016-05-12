
function statusChangeCallback(response) {
  //로그온 상태 - 사용자의 정보를 불러옴
  if (response.status === 'connected') {
    var userID = response.authResponse.userID;    
    getUserProfile({user_id:userID});
  }
  else {
    //로그 아웃상태
    $('#btnStart').text('Signup').attr('onclick', 'onclick_facebookLogin();').show();
  }
}

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1764303753841663',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.6' // use version 2.2
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
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
function setLogon() {
  FB.api('/me/picture?width=150&height=150', function(response) {
    console.log(response);
    var picture_uri = response.data.url;
    $('#btnFbLogin').css({'background-image':'url("'+picture_uri+'")', 'content':''});
  });
}

function onclick_facebookLogin(){
  FB.login(function(response){
    console.log(response);
     if (response.status === 'connected') {
       var userId = response.authResponse.userID;
       getUserProfile({user_id : userId});
     }
     else {
       alert('페이스북 로그인에 실패하였습니다.');
       $('#btnStart').text('Signup').attr('onclick', 'onclick_facebookLogin();').show();
     }
   },{scope: 'public_profile,email',return_scopes: true});
}

function onclick_facebookLogout(){
  FB.logout(function(response){
    console.log(response);
  });
}

function getUserProfile(user){
  FB.api('/me/picture?width=150&height=150', function(response) {
    user['profile_img'] = response.data.url;
    console.log(user);
    $('#btnStart').text('Let\'s Start!').attr('onclick', '').attr('href', '/').show();
  });
}
