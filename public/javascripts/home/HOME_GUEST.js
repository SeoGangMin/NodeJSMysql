function initPage(){

}

function onclick_insertIdea(form){
  var title = form.title.value;
  var description = form.description.value;

  if(title == ''){
    alert('아이디어를 입력해주세요.');
    return false;
  }

  if(description == ''){
    alert('아이디어 설명을 입력해주세요.');
    return false;
  }

  form.action = '/guest/insert_idea';
  form.method = 'POST';
  form.submit();
}

function onclick_btnDeleteIdea(form){
  var msg = '해당 아이디어를 삭제하시겠습니까?';
  if(!confirm(msg)) return false;

  form.action = '/guest/delete_idea';
  form.method = 'POST';
  form.submit();
}
