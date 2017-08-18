"use strict";var DraftApp=angular.module("DraftApp",["ngRoute","ngMessages","ngAnimate","ui.router","ui.bootstrap","dndLists","angular-confirm","AppController","DashboardController","LeagueController","LeagueCommishController","LeagueJoinController","LeagueNewController","UserSettingsController","UserLoginController","UserRegisterController","DraftController","DraftPickController","DraftBoardController","DraftChatController","AuthenticationService","DraftService","LeagueService","ChatFactory","DraftFactory","LeagueFactory","UserFactory"]);angular.module("DraftApp").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("index",{url:"/",views:{content:{templateProvider:["$templateCache",function(e){return e.get("welcome.html")}],controller:"AppController",controllerAs:"vm"}}}).state("login",{url:"/login",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/login.html")}],controller:"UserLoginController",controllerAs:"vm"}}}).state("register",{url:"/register",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/register.html")}],controller:"UserRegisterController",controllerAs:"vm"}}}).state("settings",{url:"/settings",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/settings.html")}],controller:"UserSettingsController",controllerAs:"vm"}}}).state("dashboard",{url:"/dashboard",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("dashboard.html")}],controller:"DashboardController",controllerAs:"vm"}}}).state("newLeague",{url:"/league/new",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.new.html")}],controller:"LeagueNewController",controllerAs:"vm"}}}).state("joinLeague",{url:"/league/join",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.join.html")}],controller:"LeagueJoinController",controllerAs:"vm"}}}).state("league",{url:"/league/:leagueID/index",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.index.html")}],controller:"LeagueController",controllerAs:"vm",resolve:{league:["LeagueService","$stateParams",function(e,t){return e.get()}]}}}}).state("leagueCommish",{url:"/league/:leagueID/commish",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.commish.html")}],controller:"LeagueCommishController",controllerAs:"vm"}}}).state("draft",{url:"/league/:leagueID/draft/:draftID",authenticate:!0,resolve:{_draft:["DraftService","$stateParams",function(e,t){return e.getDraft(t)}]},views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("draft/draft.index.html")}],controller:"DraftController",controllerAs:"vm"}}}).state("draft.pick",{url:"/pick",authenticate:!0,views:{draftPick:{templateProvider:["$templateCache",function(e){return e.get("draft/draft.pick.html")}],controller:"DraftPickController",controllerAs:"vm"}}}).state("draft.draftBoard",{url:"/draftBoard",authenticate:!0,views:{draftBoard:{templateProvider:["$templateCache",function(e){return e.get("draft/draft.draftBoard.html")}],controller:"DraftBoardController",controllerAs:"vm"}}}).state("draft.chat",{url:"/chat",authenticate:!0,views:{draftChat:{templateProvider:["$templateCache",function(e){return e.get("draft/draft.chat.html")}],controller:"DraftChatController",controllerAs:"vm"}}})}]),angular.module("DraftApp").run(["$transitions","$state","$location","AuthenticationService",function(e,t,n,r){e.onStart({to:"*"},function(e){return r.isLoggedIn().then(function(n){e.to().authenticate&&0==n&&t.transitionTo("login")},function(e){console.log(e)})}),e.onStart({to:"login"},function(e){return r.isLoggedIn().then(function(e){1==e&&t.transitionTo("dashboard")},function(e){console.log(e)})})}]),angular.module("AppController",[]).controller("AppController",["$rootScope","$state","AuthenticationService","DraftService","LeagueService",function(e,t,n,r,o){var a=this;a.isLoggedIn=!1,n.isLoggedIn().then(function(e){a.isLoggedIn=e},function(e){console.log(e)}),a.currentUser={},n.currentUser().then(function(e){a.currentUser=e},function(e){console.log(e)}),a.downloadPlayers=function(){r.downloadPlayers(function(e){console.log(e)})},a.deleteAllPlayers=function(){r.deleteAllPlayers(function(e){console.log(e)})},a.logOut=function(){n.logOut()}}]),angular.module("ChatFactory",[]).factory("ChatFactory",["$http",function(e){var t={};return t.postMessage=function(t,n){e.post("/message",t).success(function(e,t){n(e,!1)}).error(function(e,t){n(e,!0)})},t.deleteAllChat=function(){e.post("/deleteAllChat").success(function(e){console.log(e)})},t}]),angular.module("DraftFactory",[]).factory("DraftFactory",["$http","$stateParams",function(e,t){var n={};return n.startDraft=function(n){return e.post("/league/"+t.leagueID+"/draft/new",n).then(function(e){return e},function(e){console.log(e)})},n.getDraft=function(t){return e.get("/league/"+t.leagueID+"/draft/"+t.draftID+"/get").then(function(e){return e},function(e){console.log(e)})},n.downloadPlayers=function(){return e.post("/downloadPlayers").then(function(e){console.log(e)},function(e){console.log(e)})},n.draftPlayer=function(n){return e.post("/league/"+t.leagueID+"/draft/"+t.draftID+"/position/"+n.position+"/player/"+n.player_id).then(function(e){return e},function(e){console.log(e)})},n}]),angular.module("LeagueFactory",[]).factory("LeagueFactory",["$http","$stateParams",function(e,t){var n={};return n.createLeague=function(t){return e.post("/league/create",t).then(function(e){return e},function(e){console.log(e)})},n.joinLeague=function(t){return e.patch("/league/join",t).then(function(e){return e},function(e){console.log(e)})},n.getLeague=function(t){return e.get("/getLeague/",{params:{_id:t}}).then(function(e){return e},function(e){console.log(e)})},n.newLeagueMessage=function(t){return e.post("/league/newMessage",t).then(function(e){return e},function(e){console.log(e)})},n.updateTeamPick=function(n){return e.post("/league/"+t.leagueID,n).then(function(e){return e},function(e){console.log(e)})},n.deleteLeagueTeam=function(n){return console.log(n),e.post("/league/"+t.leagueID+"/deleteLeagueTeam",n).then(function(e){return e},function(e){console.log(e)})},n.getUserLeagues=function(t){return e.get("/leagues/user/"+t).then(function(e){return e},function(e){console.log(e)})},n}]),angular.module("UserFactory",[]).factory("UserFactory",["$http",function(e){var t={};return t.register=function(t){return e.post("/register",t).then(function(e){return e},function(e){return console.log(e),e})},t.login=function(t){return e.post("/login",t).then(function(e){return e},function(e){return console.log(e),e})},t}]),angular.module("AuthenticationService",[]).service("AuthenticationService",["$window","$state","$rootScope","$q","UserFactory",function(e,t,n,r,o){var a={},l={setToken:function(t,n){return Promise.resolve().then(function(){e.localStorage.setItem(t,n)})},getToken:function(t){return Promise.resolve().then(function(){return e.localStorage.getItem(t)})},removeToken:function(t){return Promise.resolve().then(function(){e.localStorage.removeItem(t)})}};return a.isLoggedIn=function(){return l.getToken("user-token").then(function(t){if(t){var n=t.split(".")[1];return n=e.atob(n),(n=JSON.parse(n)).exp>Date.now()/1e3}return!1},function(e){console.log(e)})},a.currentUser=function(){return a.isLoggedIn().then(function(t){if(t)return l.getToken("user-token").then(function(t){var n=t.split(".")[1];return n=e.atob(n),n=JSON.parse(n),{_id:n._id,userName:n.userName,firstName:n.firstName,email:n.email,leagues:n.leagues}},function(e){console.log(e)})},function(e){console.log(e)})},a.updateToken=function(e){return l.removeToken("user-token").then(function(){return l.setToken("user-token",e).then(function(){return"Token Set!"},function(e){console.log(e)})},function(e){console.log(e)})},a.register=function(e,t){return o.register(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"}):e.message?reponse.message:"Unknown Error"},function(e){console.log(e)})},a.login=function(e){return o.login(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"},function(e){console.log(e)}):401==e.status?"Incorrect Username or Password!":"Unknown Error!"},function(e){console.log(e)})},a.logOut=function(){e.localStorage.clear(),n=n.$new(!0)},a}]),angular.module("DraftService",[]).service("DraftService",["$window","$state","DraftFactory","AuthenticationService","LeagueService",function(e,t,n,r,o){var a={},l=io.connect(),u={setDraft:function(t,n){return Promise.resolve().then(function(){e.sessionStorage.setItem(t,n)})},getDraft:function(t){return Promise.resolve().then(function(){return e.sessionStorage.getItem(t)})},removeDraft:function(){return Promise.resolve().then(function(){e.sessionStorage.removeItem(id)})}};return a.getDraft=function(e){return n.getDraft(e).then(function(e){return u.setDraft("draft",JSON.stringify(e.data)).then(function(){},function(e){console.log(e)})},function(e){console.log(e)})},a.startDraft=function(){return o.getLeague().then(function(e){for(var t=0;t<e.teams.length;t++)if(!e.teams[t].pick)return{error:"Please Assign All Picks"};for(var r=[],a=1;a<=e.size;a++)!function(t){var n={position:t};e.teams.forEach(function(e){e.pick==t&&(n._user=e._user._id)}),r.push(n)}(a);var l={};return l.teams=r,n.startDraft(l).then(function(e){return o.getLeague().then(function(e){return e},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},a.joinDraft=function(){o.getLeague().then(function(e){})},a.onClock=function(){return u.getDraft("draft").then(function(e){return JSON.parse(e).onClock},function(e){console.log(e)})},a.availablePlayers=function(){return u.getDraft("draft").then(function(e){return JSON.parse(e).availablePlayers},function(e){console.log(e)})},a.draftField=function(){return u.getDraft("draft").then(function(e){return JSON.parse(e).draft.field})},a.draftList=function(){return u.getDraft("draft").then(function(e){for(var t=JSON.parse(e),n=[],r=!1,o=0;0==r;){for(var a=0;a<t.draft.field.length;a++){if(!t.draft.field[a].picks[o]){r=!0;break}n.push(t.draft.field[a].picks[o]._player)}if(o++,0==r){for(var l=t.draft.field.length-1;l>=0;l--){if(!t.draft.field[l].picks[o]){r=!0;break}n.push(t.draft.field[l].picks[o]._player)}o++}}return n},function(e){console.log(e)})},a.draftPlayer=function(e){return n.draftPlayer(e).then(function(e){return l.emit("successfulPick"),e},function(e){console.log(e)})},a.downloadPlayers=function(){n.downloadPlayers()},l.on("updateDraft",function(){t.reload()}),a}]),angular.module("LeagueService",[]).service("LeagueService",["$window","$state","$stateParams","$q","$location","LeagueFactory","AuthenticationService",function(e,t,n,r,o,a,l){var u={},i=(r.defer(),{});l.currentUser().then(function(e){i=e},function(e){console.log(e)});var c={};return u.getLeague=function(){if(n.leagueID)return a.getLeague(n.leagueID).then(function(e){if(e.data)return c=e.data,e.data},function(e){console.log(e)})},u.createNewLeague=function(e){return a.createLeague(e).then(function(e){return e},function(e){console.log(e)})},u.joinLeague=function(e){return a.joinLeague(e).then(function(e){return e},function(e){console.log(e)})},u.newLeagueMessage=function(e){return a.newLeagueMessage(e).then(function(e){return e},function(e){console.log(e)})},u.updateTeamPick=function(e){return a.updateTeamPick(e).then(function(e){return e},function(e){console.log(e)})},u.deleteLeagueTeam=function(e){return a.deleteLeagueTeam(e).then(function(e){return e},function(e){console.log(e)})},u.getUserLeagues=function(e){return a.getUserLeagues(e).then(function(e){return e},function(e){console.log(e)})},u}]),angular.module("DashboardController",[]).controller("DashboardController",["AuthenticationService","LeagueService",function(e,t){var n=this;n.currentLeagues=[],n.currentUser=e.currentUser().then(function(e){return n.currentUser=e,t.getUserLeagues(e._id).then(function(e){n.currentLeagues=e.data},function(e){console.log(e)})},function(e){console.log(e)})}]),angular.module("DraftBoardController",[]).controller("DraftBoardController",["$state","$stateParams","AuthenticationService","LeagueService","DraftService",function(e,t,n,r,o){var a=this;a.message="",o.draftField().then(function(e){a.draftField=e})}]),angular.module("DraftChatController",[]).controller("DraftChatController",["$scope","AuthenticationService","LeagueService","DraftService",function(e,t,n,r){var o=this;o.messages=[],o.message="",o.filterText="",o.sendMessage=function(){}}]),angular.module("DraftController",[]).controller("DraftController",["$rootScope","$state","_draft","$stateParams","AuthenticationService","LeagueService","DraftService",function(e,t,n,r,o,a,l){var u=this;u.params=r,u.message="",u.sortType="displayName",u.sortReverse=!1,u.searchPlayer="",u.filterPosition="",u.currentUser=o.currentUser().then(function(e){u.currentUser=e}),l.onClock().then(function(e){u.onClock=e},function(e){console.log(e)})}]),angular.module("DraftPickController",[]).controller("DraftPickController",["$state","$stateParams","AuthenticationService","LeagueService","DraftService",function(e,t,n,r,o){var a=this;a.message="",a.sortType="displayName",a.sortReverse=!1,a.searchPlayer="",a.filterPosition="",o.onClock().then(function(e){a.onClock=e},function(e){console.log(e)}),o.availablePlayers().then(function(e){a.availablePlayers=e},function(e){console.log(e)}),o.draftList().then(function(e){a.draft=e},function(e){console.log(e)}),a.draftPlayer=function(e){var t={position:a.onClock.position,player_id:e};return o.draftPlayer(t).then(function(e){},function(e){console.log(e)})}}]),angular.module("UserLoginController",[]).controller("UserLoginController",["$state","$location","$stateParams","AuthenticationService",function(e,t,n,r){var o=this;o.message="",o.loginInfo={email:"",password:""},o.login=function(){return r.login(o.loginInfo).then(function(t){"Token Set!"==t?e.go("dashboard"):o.message=t},function(e){console.log(e)})},o.dismissError=function(){o.message=""}}]),angular.module("UserRegisterController",[]).controller("UserRegisterController",["$state","AuthenticationService",function(e,t){var n=this;n.message="",n.registerInfo={email:"",userName:"",firstName:"",password:""},n.registerNew=function(){return t.register(n.registerInfo).then(function(t){e.transitionTo("dashboard")},function(e){console.log(e)})},n.dismissError=function(){n.message=""}}]),angular.module("UserSettingsController",[]).controller("UserSettingsController",["AuthenticationService",function(e){var t=this;t.message="",t.currentUser={},e.currentUser().then(function(e){t.currentUser=e},function(e){console.log(e)}),t.tab=1,t.setTab=function(e){t.tab=e},t.isSet=function(e){return t.tab===e},t.dismissError=function(){t.message=""}}]),angular.module("LeagueCommishController",[]).controller("LeagueCommishController",["$rootScope","$scope","$q","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.league={},a.getLeague().then(function(e){l.league=e,u(e)},function(e){console.log(e)}),l.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},l.leagueField=[];var u=function(e){e&&function(){for(var t={title:"Draft Order",teams:[]},n=e.size,r=e.teams,o=1;o<=n;o++)!function(e){var n={pick:e};r.forEach(function(t,o){t.pick==e&&(n=t,r.splice(o,1))}),t.teams.push(n)}(o);if(l.leagueField.push(t),r.length>0){var a={title:"Needs Pick",teams:[]};r.forEach(function(e){a.teams.push(e)}),l.leagueField.push(a)}}()};t.onDrop=function(e,t,n,r){n.splice(r,0,e[t]),e==n&&r<=t&&t++,e.splice(t,1);for(var o=0;o<n.length;o++)if(n[o]._id==this.team._id){var a=this.team;return i(a,o+1).then(function(){return!0},function(e){console.log(e)})}return!0};var i=function(e,t){var n={pick:t,team:e};return a.updateTeamPick(n).then(function(e){r.reload()},function(e){console.log(e)})};l.deleteTeam=function(e){var t={team_id:e};return a.deleteLeagueTeam(t).then(function(e){r.reload()},function(e){console.log(e)})}}]),angular.module("LeagueController",[]).controller("LeagueController",["$scope","$q","$uibModal","$confirm","$state","$stateParams","AuthenticationService","LeagueService","DraftService",function(e,t,n,r,o,a,l,u,i){var c=this;c.message="",c.params=a,c.currentUser={},l.currentUser().then(function(e){c.currentUser=e},function(e){console.log(e)}),c.league={},u.getLeague().then(function(e){c.league=e},function(e){console.log(e)}),c.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},c.newMessage=function(){e.modalInstance=n.open({animation:!0,size:"lg",templateUrl:"newMessageModal.html",controller:"LeagueController",controllerAs:"vm",scope:e,backdrop:"static"})},c.sendMessage=function(){var e={leagueID:c.league._id,userID:c.currentUser._id,message:c.newLeagueMessage};return u.newLeagueMessage(e).then(function(e){console.log(e),"OK"==e.statusText&&o.reload(),console.log(e)},function(e){console.log(e)})},c.cancel=function(){e.modalInstance.dismiss("cancel")},c.dismissError=function(){c.message=""},c.startDraft=function(){i.startDraft().then(function(e){e.error?c.message=e.error:o.reload()},function(e){console.log(e)})}}]),angular.module("LeagueJoinController",[]).controller("LeagueJoinController",["$q","$rootScope","$scope","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.joinLeague=function(){var e="";for(var t in l.data)e+=l.data[t];var n={user_id:l.currentUser._id,league_code:e};return a.joinLeague(n).then(function(e){e.data.message?l.message=e.data.message:r.transitionTo("dashboard")},function(e){console.log(e)})},l.moveFocus=function(e){$("#"+e).focus()},l.dismissError=function(){l.message=""}}]),angular.module("LeagueNewController",[]).controller("LeagueNewController",["$q","$state","AuthenticationService","LeagueService",function(e,t,n,r){var o=this;o.messsage="",o.currentUser={},n.currentUser().then(function(e){o.currentUser=e},function(e){console.log(e)}),o.createNewLeague=function(){var e={leagueName:o.newLeague.leagueName,leagueSize:o.newLeague.leagueSize,user_id:o.currentUser._id};return r.createNewLeague(e).then(function(e){t.transitionTo("dashboard")},function(e){console.log(e)})}}]);
//# sourceMappingURL=app.js.map
