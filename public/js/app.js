"use strict";var DraftApp=angular.module("DraftApp",["ngRoute","ngMessages","ngAnimate","ui.router","ui.bootstrap","dndLists","angular-confirm","AppController","ChatController","DashboardController","LeagueController","LeagueCommishController","LeagueJoinController","LeagueNewController","UserSettingsController","UserLoginController","UserRegisterController","DraftController","AuthenticationService","DraftService","LeagueService","ChatFactory","DraftFactory","LeagueFactory","UserFactory"]);angular.module("DraftApp").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("index",{url:"/",views:{content:{templateProvider:["$templateCache",function(e){return e.get("welcome.html")}],controller:"AppController",controllerAs:"vm"}}}).state("login",{url:"/login",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/login.html")}],controller:"UserLoginController",controllerAs:"vm"}}}).state("register",{url:"/register",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/register.html")}],controller:"UserRegisterController",controllerAs:"vm"}}}).state("settings",{url:"/settings",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/settings.html")}],controller:"UserSettingsController",controllerAs:"vm"}}}).state("dashboard",{url:"/dashboard",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("dashboard.html")}],controller:"DashboardController",controllerAs:"vm"}}}).state("newLeague",{url:"/league/new",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.new.html")}],controller:"LeagueNewController",controllerAs:"vm"}}}).state("joinLeague",{url:"/league/join",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.join.html")}],controller:"LeagueJoinController",controllerAs:"vm"}}}).state("league",{url:"/league/:leagueID/index",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.index.html")}],controller:"LeagueController",controllerAs:"vm",resolve:{league:["LeagueService","$stateParams",function(e,t){return e.get()}]}}}}).state("leagueCommish",{url:"/league/:leagueID/commish",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.commish.html")}],controller:"LeagueCommishController",controllerAs:"vm"}}}).state("draft",{url:"/league/:leagueID/draft/:draftID/index",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("draft/draft.index.html")}],controller:"DraftController",controllerAs:"vm"}}}).state("availablePlayers",{url:"/availablePlayers",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("availablePlayers.html")}],controller:"PlayerController",controllerAs:"vm"}}}).state("chat",{url:"/chat",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("chat.html")}],controller:"ChatController",controllerAs:"vm"}}})}]),angular.module("DraftApp").run(["$transitions","$state","$location","AuthenticationService",function(e,t,n,r){e.onStart({to:"*"},function(e){return r.isLoggedIn().then(function(n){e.to().authenticate&&0==n&&t.transitionTo("login")},function(e){console.log(e)})}),e.onStart({to:"login"},function(e){return r.isLoggedIn().then(function(e){1==e&&t.transitionTo("dashboard")},function(e){console.log(e)})})}]),angular.module("AppController",[]).controller("AppController",["AuthenticationService","DraftService","LeagueService",function(e,t,n){var r=this;r.isLoggedIn=!1,e.isLoggedIn().then(function(e){r.isLoggedIn=e},function(e){console.log(e)}),r.currentUser={},e.currentUser().then(function(e){r.currentUser=e},function(e){console.log(e)}),r.downloadPlayers=function(){t.downloadPlayers(function(e){console.log(e)})},r.deleteAllPlayers=function(){t.deleteAllPlayers(function(e){console.log(e)})},r.logOut=function(){e.logOut()}}]),angular.module("ngEnter",[]).directive("ngEnter",["$scope","element","attrs",function(e,t,n){t.bind("keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),t.preventDefault())})}]),angular.module("ChatController",[]).controller("ChatController",["$scope","AuthenticationService","LeagueService","ChatFactory",function(e,t,n,r){var o=this;o.currentUser=t.currentUser(),o.currentLeague=n.currentLeague(),o.messages=[],o.message="",o.filterText="";var a=io.connect();a.on("pastMessages",function(t){e.$apply(function(){o.messages=t.reverse()})}),a.on("receiveMessage",function(t){e.$apply(function(){o.messages.unshift(t)})}),o.sendMessage=function(){n.postMessage(o.message,function(e,t){t&&window.alert("Error!")})}}]),angular.module("ChatFactory",[]).factory("ChatFactory",["$http",function(e){var t={};return t.postMessage=function(t,n){e.post("/message",t).success(function(e,t){n(e,!1)}).error(function(e,t){n(e,!0)})},t.deleteAllChat=function(){e.post("/deleteAllChat").success(function(e){console.log(e)})},t}]),angular.module("DraftFactory",[]).factory("DraftFactory",["$http","$stateParams",function(e,t){var n={};return n.startDraft=function(n){return e.post("/league/"+t.leagueID+"/draft/new",n).then(function(e){return e},function(e){console.log(e)})},n.getDraft=function(){return e.get("/league/"+t.leagueID+"/draft/"+t.draftID+"/get")},n.downloadPlayers=function(){return e.post("/downloadPlayers").then(function(e){console.log(e)},function(e){console.log(e)})},n.getPlayers=function(t,n){e.get("/getPlayers/",{params:{position:t}}).success(function(e){n(e)})},n.deleteAllPlayers=function(t){e.post("/deleteAllPlayers").success(function(e){t(e)})},n.draftPlayer=function(n){return e.post("/league/"+t.leagueID+"/draft/"+t.draftID+"/position/"+n.position+"/player/"+n.player_id).then(function(e){return console.log(e),e},function(e){console.log(e)})},n.getDraftedPlayers=function(t){e.get("/getDraftedPlayers").success(function(e){t(e)})},n}]),angular.module("LeagueFactory",[]).factory("LeagueFactory",["$http","$stateParams",function(e,t){var n={};return n.createLeague=function(t){return e.post("/league/create",t).then(function(e){return e},function(e){console.log(e)})},n.joinLeague=function(t){return e.patch("/league/join",t).then(function(e){return e},function(e){console.log(e)})},n.getLeague=function(t){return e.get("/getLeague/",{params:{_id:t}}).then(function(e){return e},function(e){console.log(e)})},n.newLeagueMessage=function(t){return e.post("/league/newMessage",t).then(function(e){return e},function(e){console.log(e)})},n.updateTeamPick=function(n){return e.post("/league/"+t.leagueID,n).then(function(e){return e},function(e){console.log(e)})},n.deleteLeagueTeam=function(n){return console.log(n),e.post("/league/"+t.leagueID+"/deleteLeagueTeam",n).then(function(e){return e},function(e){console.log(e)})},n.getUserLeagues=function(t){return e.get("/leagues/user/"+t).then(function(e){return e},function(e){console.log(e)})},n}]),angular.module("UserFactory",[]).factory("UserFactory",["$http",function(e){var t={};return t.register=function(t){return e.post("/register",t).then(function(e){return e},function(e){return console.log(e),e})},t.login=function(t){return e.post("/login",t).then(function(e){return e},function(e){return console.log(e),e})},t}]),angular.module("AuthenticationService",[]).service("AuthenticationService",["$window","$state","$rootScope","$q","UserFactory",function(e,t,n,r,o){var a={},l={setToken:function(t,n){return Promise.resolve().then(function(){e.localStorage.setItem(t,n)})},getToken:function(t){return Promise.resolve().then(function(){return e.localStorage.getItem(t)})},removeToken:function(t){return Promise.resolve().then(function(){e.localStorage.removeItem(t)})}};return a.isLoggedIn=function(){return l.getToken("user-token").then(function(t){if(t){var n=t.split(".")[1];return n=e.atob(n),(n=JSON.parse(n)).exp>Date.now()/1e3}return!1},function(e){console.log(e)})},a.currentUser=function(){return a.isLoggedIn().then(function(t){if(t)return l.getToken("user-token").then(function(t){var n=t.split(".")[1];return n=e.atob(n),n=JSON.parse(n),{_id:n._id,userName:n.userName,firstName:n.firstName,email:n.email,leagues:n.leagues}},function(e){console.log(e)})},function(e){console.log(e)})},a.updateToken=function(e){return l.removeToken("user-token").then(function(){return l.setToken("user-token",e).then(function(){return"Token Set!"},function(e){console.log(e)})},function(e){console.log(e)})},a.register=function(e,t){return o.register(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"}):e.message?reponse.message:"Unknown Error"},function(e){console.log(e)})},a.login=function(e){return o.login(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"},function(e){console.log(e)}):401==e.status?"Incorrect Username or Password!":"Unknown Error!"},function(e){console.log(e)})},a.logOut=function(){e.localStorage.clear(),n=n.$new(!0)},a}]),angular.module("DraftService",[]).service("DraftService",["$window","$state","$q","DraftFactory","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l={};return l.startDraft=function(){return a.getLeague().then(function(e){for(var t=0;t<e.teams.length;t++)if(!e.teams[t].pick)return{error:"Please Assign All Picks"};for(var n=[],o=1;o<=e.size;o++)!function(t){var r={position:t};e.teams.forEach(function(e){e.pick==t&&(r._user=e._user._id)}),n.push(r)}(o);var l={};return l.teams=n,r.startDraft(l).then(function(e){return a.getLeague().then(function(e){return e},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},l.joinDraft=function(){a.getLeague().then(function(e){})},l.getDraft=function(){return r.getDraft().then(function(e){return e},function(e){console.log(e)})},l.onClock=function(){},l.draftPlayer=function(e){return r.draftPlayer(e).then(function(e){return e},function(e){console.log(e)})},l.downloadPlayers=function(){r.downloadPlayers()},l}]),angular.module("LeagueService",[]).service("LeagueService",["$window","$state","$stateParams","$q","$location","LeagueFactory","AuthenticationService",function(e,t,n,r,o,a,l){var u={},c=(r.defer(),{});l.currentUser().then(function(e){c=e},function(e){console.log(e)});var i={};return u.getLeague=function(){if(n.leagueID)return a.getLeague(n.leagueID).then(function(e){if(e.data)return i=e.data,e.data},function(e){console.log(e)})},u.createNewLeague=function(e){return a.createLeague(e).then(function(e){return e},function(e){console.log(e)})},u.joinLeague=function(e){return a.joinLeague(e).then(function(e){return e},function(e){console.log(e)})},u.newLeagueMessage=function(e){return a.newLeagueMessage(e).then(function(e){return e},function(e){console.log(e)})},u.updateTeamPick=function(e){return a.updateTeamPick(e).then(function(e){return e},function(e){console.log(e)})},u.deleteLeagueTeam=function(e){return a.deleteLeagueTeam(e).then(function(e){return e},function(e){console.log(e)})},u.getUserLeagues=function(e){return a.getUserLeagues(e).then(function(e){return e},function(e){console.log(e)})},u}]),angular.module("DashboardController",[]).controller("DashboardController",["AuthenticationService","LeagueService",function(e,t){var n=this;n.currentLeagues=[],n.currentUser=e.currentUser().then(function(e){return n.currentUser=e,t.getUserLeagues(e._id).then(function(e){n.currentLeagues=e.data},function(e){console.log(e)})},function(e){console.log(e)})}]),angular.module("DraftController",[]).controller("DraftController",["$state","$stateParams","AuthenticationService","LeagueService","DraftService","DraftFactory",function(e,t,n,r,o,a){var l=this;l.message="",l.onClock="",l.currentUser=n.currentUser().then(function(e){l.currentUser=e}),l.availablePlayers=[],l.currentDraft=o.getDraft().then(function(e){u(e.data.draft,e.data.players)}),l.draftPlayer=function(t){var n={position:l.onClock.position,player_id:t};return o.draftPlayer(n).then(function(t){e.reload()},function(e){console.log(e)})};var u=function(e,t){for(var n=[],r=!1,o=0;0==r;){for(var a=0;a<e.field.length;a++){if(!e.field[a].picks[o]){l.onClock=e.field[a],r=!0;break}n.push({_id:e.field[a].picks[o]._player})}if(o++,0==r){for(var u=9;u>=0;u--){if(!e.field[u].picks[o]){l.onClock=e.field[u],r=!0;break}n.push({_id:e.field[u].picks[o]._player})}o++}}for(var c=0;c<t.length;c++)for(var i=0;i<n.length;i++)t[c]._id==n[i]._id&&(n[i].displayName=t[c].displayName,n[i].team=t[c].team,n[i].position=t[c].position,t.splice(c,1));l.draft=n,l.availablePlayers=t}}]),angular.module("LeagueCommishController",[]).controller("LeagueCommishController",["$rootScope","$scope","$q","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.league={},a.getLeague().then(function(e){l.league=e,u(e)},function(e){console.log(e)}),l.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},l.leagueField=[];var u=function(e){e&&function(){for(var t={title:"Draft Order",teams:[]},n=e.size,r=e.teams,o=1;o<=n;o++)!function(e){var n={pick:e};r.forEach(function(t,o){t.pick==e&&(n=t,r.splice(o,1))}),t.teams.push(n)}(o);if(l.leagueField.push(t),r.length>0){var a={title:"Needs Pick",teams:[]};r.forEach(function(e){a.teams.push(e)}),l.leagueField.push(a)}}()};t.onDrop=function(e,t,n,r){n.splice(r,0,e[t]),e==n&&r<=t&&t++,e.splice(t,1);for(var o=0;o<n.length;o++)if(n[o]._id==this.team._id){var a=this.team;return c(a,o+1).then(function(){return!0},function(e){console.log(e)})}return!0};var c=function(e,t){var n={pick:t,team:e};return a.updateTeamPick(n).then(function(e){r.reload()},function(e){console.log(e)})};l.deleteTeam=function(e){var t={team_id:e};return a.deleteLeagueTeam(t).then(function(e){r.reload()},function(e){console.log(e)})}}]),angular.module("LeagueController",[]).controller("LeagueController",["$scope","$q","$uibModal","$confirm","$state","$stateParams","AuthenticationService","LeagueService","DraftService",function(e,t,n,r,o,a,l,u,c){var i=this;i.message="",i.params=a,i.currentUser={},l.currentUser().then(function(e){i.currentUser=e},function(e){console.log(e)}),i.league={},u.getLeague().then(function(e){i.league=e},function(e){console.log(e)}),i.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},i.newMessage=function(){e.modalInstance=n.open({animation:!0,size:"lg",templateUrl:"newMessageModal.html",controller:"LeagueController",controllerAs:"vm",scope:e,backdrop:"static"})},i.sendMessage=function(){var e={leagueID:i.league._id,userID:i.currentUser._id,message:i.newLeagueMessage};return u.newLeagueMessage(e).then(function(e){console.log(e),"OK"==e.statusText&&o.reload(),console.log(e)},function(e){console.log(e)})},i.cancel=function(){e.modalInstance.dismiss("cancel")},i.dismissError=function(){i.message=""},i.startDraft=function(){c.startDraft().then(function(e){e.error?i.message=e.error:o.reload()},function(e){console.log(e)})}}]),angular.module("LeagueJoinController",[]).controller("LeagueJoinController",["$q","$rootScope","$scope","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.joinLeague=function(){var e="";for(var t in l.data)e+=l.data[t];var n={user_id:l.currentUser._id,league_code:e};return a.joinLeague(n).then(function(e){e.data.message?l.message=e.data.message:r.transitionTo("dashboard")},function(e){console.log(e)})},l.moveFocus=function(e){$("#"+e).focus()},l.dismissError=function(){l.message=""}}]),angular.module("LeagueNewController",[]).controller("LeagueNewController",["$q","$state","AuthenticationService","LeagueService",function(e,t,n,r){var o=this;o.messsage="",o.currentUser={},n.currentUser().then(function(e){o.currentUser=e},function(e){console.log(e)}),o.createNewLeague=function(){var e={leagueName:o.newLeague.leagueName,leagueSize:o.newLeague.leagueSize,user_id:o.currentUser._id};return r.createNewLeague(e).then(function(e){t.transitionTo("dashboard")},function(e){console.log(e)})}}]),angular.module("UserLoginController",[]).controller("UserLoginController",["$state","$location","$stateParams","AuthenticationService",function(e,t,n,r){var o=this;o.message="",o.loginInfo={email:"",password:""},o.login=function(){return r.login(o.loginInfo).then(function(t){"Token Set!"==t?e.go("dashboard"):o.message=t},function(e){console.log(e)})},o.dismissError=function(){o.message=""}}]),angular.module("UserRegisterController",[]).controller("UserRegisterController",["$state","AuthenticationService",function(e,t){var n=this;n.message="",n.registerInfo={email:"",userName:"",firstName:"",password:""},n.registerNew=function(){return t.register(n.registerInfo).then(function(t){e.transitionTo("dashboard")},function(e){console.log(e)})},n.dismissError=function(){n.message=""}}]),angular.module("UserSettingsController",[]).controller("UserSettingsController",["AuthenticationService",function(e){var t=this;t.message="",t.currentUser={},e.currentUser().then(function(e){t.currentUser=e},function(e){console.log(e)}),t.tab=1,t.setTab=function(e){t.tab=e},t.isSet=function(e){return t.tab===e},t.dismissError=function(){t.message=""}}]);
//# sourceMappingURL=app.js.map
