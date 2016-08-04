var picked_players = ["Ameer Abdullah"];

$(document).ready(function () {
  $('#get_all').click(function () {
      $("#player_return").empty();
    var position = $('#positions').val();
    $.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/'+position, function (data) {
      var all_players = data;
      for(var x in all_players.Players){
          for(var y in picked_players){
              if(all_players.Players[x].displayName!=picked_players[y]){
                  $('#player_return').append('<h6>' + all_players.Players[x].displayName + '</h6>');
              }
          }
          
      };
      
    });
    return false;
  });
});


