function Ajax(url, method, params, succCb, failCb){
  var ajaxOption={
    url : url,
    crossDomain:true,
    type : method.toUpperCase(),
    data : params,
    //contentType:'application/x-www-form-urlencoded',
    //dataType : 'json',
    success : function( result ){
      succCb( result );
    },
    error : function( err ){
      if(!failCb){
        alert(JSON.stringify(err));
      }else{
        failCb( err );
      }
    }
  };

  console.log('AjaxOption\n' + JSON.stringify(ajaxOption));

  var beforeSend = null;

  $.ajax(ajaxOption);
}
