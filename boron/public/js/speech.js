$('button').click(function(){
    var text = $('#words').val();
    $.ajax({
      url: '/translate',
      method: 'post',
      data: {text: text},
      dataType: 'json',
      success: function(response){
        $('#words').val(response.translated)
        var url = 'http://ca-101-chyld-nitrogen.mybluemix.net/speech?text=' + response.translated;
        $('audio').attr('src', url);
        $('audio')[0].play();
      }
    });
});
