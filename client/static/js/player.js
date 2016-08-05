var picked_players = ["Buck Nasty"];

$(document).ready(function () {
  $('#get_all').click(function () {
      $("#player_return").empty();
    var position = $('#positions').val();
    $.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/'+position, function (data) {
      var all_players = data;
      $("#player_return").append($compile('<br><button type="submit" class="btn btn-primary btn-lg" ng-click="draft()">Draft Player</button><br>')(scope));
      for(var x in all_players.Players){
          for(var y in picked_players){
              if(all_players.Players[x].displayName!=picked_players[y]){
                  $('#player_return').append('<label><input type="checkbox" class="ng-binding" ng-submit="$event.preventDefault()" ng-true-value="'+all_players.Players[x].displayName+'" ng-model="checkboxModel1.name">' + all_players.Players[x].displayName + '</label>');
              }
          }   
      }
    });
    return false;
  });
});


