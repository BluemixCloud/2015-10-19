$('.sms').click(function(){
  var data = {};
  data.message = $(this).siblings().val();
  data.phone = $(this).parent().parent().children(':nth-child(4)').text();
  $.ajax({
    url: '/text',
    method: 'post',
    data: data,
    success: function(response){
      console.log(response);
    }
  });
});
