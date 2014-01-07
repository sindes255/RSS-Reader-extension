var arr=[];



function getRSS(feedUrl, feedUrl_2) {
    $("#rssContent").empty();

    $.get(feedUrl, function(data) {
    

        $(data).find('item').each(function() {



            var title = $(this).find('title').text();

      

            var url = $(this).find('link').text();;

      
            var description= $(this).find('description').text();
            var pubDate = $(this).find('pubDate').text();

             var media = $(this).find('media\\:content,content').attr('url');



            var html;

            html  = "<div class='item'><div class=\"entry\"><h2 class=\"postTitle\">" + "<a href=\"" + url + "\" target=\"_blank\">"+title+"<\/a><\/h2>";
            if(description!=''){
              html += "<p class='description'>"+description+"<\/p>";
            }
            html += "<\/div><a href=\"" + url + "\" target=\"_blank\"><img class='news-pic' src='"+media+"'/><\/a>";

            html += "<em class=\"date\">" + pubDate + "</em></div>";

arr.push($(html));





        });
    });

$.get(feedUrl_2, function(data) {

    $('#indicator').hide();

        $(data).find('item').each(function() {



            var title = $(this).find('title').text();

      

            var url = $(this).find('link').text();

      
            var description= $(this).find('description').text();
            var pubDate = $(this).find('pubDate').text();

             var media = $(this).find('enclosure').attr('url');



            

            html  = "<div class='item'><div class=\"entry\"><h2 class=\"postTitle\">" + "<a href=\"" + url + "\" target=\"_blank\">"+title+"<\/a><\/h2><p class='description'>"+description+"<\/p><\/div>";

            html += "<a href=\"" + url + "\" target=\"_blank\"><img class='news-pic' src='"+media+"'/><\/a>";

            html += "<em class=\"date\">" + pubDate + "</em></div>";

            



arr.push($(html));



        });

    });




}



function sortBubble(data) {

    var dateI, dateJ;

    for (var i = data.length - 1; i > 0; i--) {

        dateI = new Date(data[i].find('.date').eq().html());

        for (var j = 0; j < i; j++) {

            dateJ = new Date(data[j].find('.date').eq().html());

            if (data[j] < data[j+1]) {

                tmp = data[j];

                data[j] = data[j+1];

                data[j+1] = tmp;

            }

        }



    }


    return data;                

            }

$(document).ready(function() {
getRSS("http://www.adme.ru/rss/metabar","http://news.sportbox.ru/taxonomy/term/11731/0/feed");


    var count = 0,trigger = false;
    var activate = function(){
        setTimeout(function ()
        {
            
            for(var i =count-15;i<count;i++){
          
            $('#rssContent').append(arr[i]);
                }
            $('#indicator').hide();
setTimeout(function(){
$("#rssContent").find('.item').hover(
  function () {
   
$(this).find('.description').slideDown("fast");
  },
 function () {
   
$(this).find('.description').slideUp("fast");
  }
);
},1100);

            

        },0);
count+=15;
};

setTimeout(function (){
activate();


},1000);

sortBubble(arr);

$(window).scroll(
    function(){

        if(($(document).scrollTop()>($(document).height()*0.50))&&($(document).scrollTop()<($(document).height()*0.99))&&trigger ==false){
             trigger =true;
            activate();
        $('#indicator').fadein();
        }else{trigger=false}
});



});


