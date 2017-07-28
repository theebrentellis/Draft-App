"use strict";var DraftApp=angular.module("DraftApp",["ngRoute","ngMessages","ngAnimate","ui.router","ui.bootstrap","dndLists","angular-confirm","AppController","ChatController","DashboardController","LeagueController","LeagueCommishController","LeagueJoinController","LeagueNewController","PlayerController","UserSettingsController","UserLoginController","UserRegisterController","AuthenticationService","DraftService","LeagueService","ChatFactory","DraftFactory","LeagueFactory","UserFactory"]);angular.module("DraftApp").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("index",{url:"/",views:{content:{templateProvider:["$templateCache",function(e){return e.get("welcome.html")}],controller:"AppController",controllerAs:"vm"}}}).state("login",{url:"/login",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/login.html")}],controller:"UserLoginController",controllerAs:"vm"}}}).state("register",{url:"/register",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/register.html")}],controller:"UserRegisterController",controllerAs:"vm"}}}).state("settings",{url:"/settings",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("auth/settings.html")}],controller:"UserSettingsController",controllerAs:"vm"}}}).state("dashboard",{url:"/dashboard",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("dashboard.html")}],controller:"DashboardController",controllerAs:"vm"}}}).state("newLeague",{url:"/league/new",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.new.html")}],controller:"LeagueNewController",controllerAs:"vm"}}}).state("joinLeague",{url:"/league/join",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.join.html")}],controller:"LeagueJoinController",controllerAs:"vm"}}}).state("league",{url:"/league/:leagueID/index",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.index.html")}],controller:"LeagueController",controllerAs:"vm",resolve:{league:["LeagueService","$stateParams",function(e,t){return console.log("Start Resolve"),e.get()}]}}}}).state("leagueCommish",{url:"/league/:leagueID/commish",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("league/league.commish.html")}],controller:"LeagueCommishController",controllerAs:"vm"}}}).state("availablePlayers",{url:"/availablePlayers",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("availablePlayers.html")}],controller:"PlayerController",controllerAs:"vm"}}}).state("draftboard",{url:"/draftboard",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("draftBoard.html")}],controller:"PlayerController",controllerAs:"vm"}}}).state("chat",{url:"/chat",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("chat.html")}],controller:"ChatController",controllerAs:"vm"}}})}]),angular.module("DraftApp").run(["$transitions","$location","$state","$q","AuthenticationService",function(e,t,n,r,o){e.onStart({to:"*"},function(e){var t=e.injector().get("AuthenticationService");e.to().authenticate&&!t.isLoggedIn()&&n.transitionTo("login")})}]),angular.module("AppController",[]).controller("AppController",["$scope","$location","$q","$state","AuthenticationService","DraftService","LeagueService",function(e,t,n,r,o,a,l){var u=this;u.isLoggedIn=!1,o.isLoggedIn().then(function(e){1==e&&(u.isLoggedIn=!0),0==e&&(u.isLoggedIn=!1)},function(e){console.log(e)}),u.currentUser={},o.currentUser().then(function(e){u.currentUser=e},function(e){console.log(e)}),u.setCurrentLeague=function(e){return l.setCurrentLeagueId(e).then(function(){return l.getLeague().then(function(){r.reload()},function(e){console.log(e)})},function(e){console.log(e)})},u.deleteAllDBs=function(){a.deleteAllPlayers(),o.deleteAllUsers(),l.deleteAllChat(),a.deleteAllDrafts()},u.downloadPlayers=function(){a.downloadPlayers(function(e){console.log(e)})},u.deleteAllPlayers=function(){a.deleteAllPlayers(function(e){console.log(e)})},u.deleteAllUsers=function(){o.deleteAllUsers(),t.path("/login")},u.deleteAllChat=function(){l.deleteAllChat()},u.deleteAllLeagues=function(){l.deleteAllLeagues()},u.deleteAllDrafts=function(){a.deleteAllDrafts()},u.currentUserLogOut=function(){o.currentUserLogOut()}}]),angular.module("ngEnter",[]).directive("ngEnter",["$scope","element","attrs",function(e,t,n){t.bind("keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),t.preventDefault())})}]),angular.module("ChatController",[]).controller("ChatController",["$scope","AuthenticationService","LeagueService","ChatFactory",function(e,t,n,r){var o=this;o.currentUser=t.currentUser(),o.currentLeague=n.currentLeague(),o.messages=[],o.message="",o.filterText="";var a=io.connect();a.on("pastMessages",function(t){e.$apply(function(){o.messages=t.reverse()})}),a.on("receiveMessage",function(t){e.$apply(function(){o.messages.unshift(t)})}),o.sendMessage=function(){n.postMessage(o.message,function(e,t){t&&window.alert("Error!")})}}]),angular.module("PlayerController",[]).controller("PlayerController",["$scope","$location","$confirm","$timeout","$q","DraftFactory","AuthenticationService","DraftService","LeagueService",function(e,t,n,r,o,a,l,u,c){var i=this;i.available_players=[],i.allDraftedPlayers=[],i.message="",i.currentUser=l.currentUser(),i.currentLeague=c.currentLeague(),i.setColorOnClock=function(e){if(i.currentLeague.onClock===e._id)return{"font-weight":"bold"}},i.getPlayers=function(e){a.getPlayers(e,function(e){i.available_players=e})},i.startDraft=function(e){var t={draftId:i.currentLeague.draft._id,draftOrder:i.currentLeague.draftOrder};return u.startDraft(t).then(function(e){console.log(e)},function(e){console.log(e)})},i.draftPlayer=function(e){if(!0===u.isOnClock()){var n={draftId:i.currentLeague.draft._id,leagueId:i.currentLeague._id,team:i.currentUser._id,pick:e};return u.draftPlayer(n).then(function(e){console.log(e),!0===e&&t.path("/draftBoard"),!1===e&&console.log("Error in PlayerControiller draftPlayer")},function(e){console.log(e)})}!1===u.isOnClock()&&(i.message="You Are Not On The Clock!",i.checkBox.value=!1,r(function(){i.message=!1},5e3))};a.getDraftedPlayers(function(e){i.allDraftedPlayers=e})}]),angular.module("ChatFactory",[]).factory("ChatFactory",["$http",function(e){var t={};return t.postMessage=function(t,n){e.post("/message",t).success(function(e,t){n(e,!1)}).error(function(e,t){n(e,!0)})},t.deleteAllChat=function(){e.post("/deleteAllChat").success(function(e){console.log(e)})},t}]),angular.module("DraftFactory",[]).factory("DraftFactory",["$http","$q",function(e,t){var n={};return n.downloadPlayers=function(){e.post("/downloadPlayers").success(function(e){console.log(e)})},n.getPlayers=function(t,n){e.get("/getPlayers/",{params:{position:t}}).success(function(e){n(e)})},n.deleteAllPlayers=function(t){e.post("/deleteAllPlayers").success(function(e){t(e)})},n.startDraft=function(t){return e.post("/startDraft",t).then(function(e){console.log(e)},function(e){console.log(e)})},n.draftPlayer=function(t){return e.post("/draftPlayer",t).then(function(e){return e},function(e){console.log(e)})},n.getDraftedPlayers=function(t){e.get("/getDraftedPlayers").success(function(e){t(e)})},n.deleteAllDrafts=function(){return e.post("/deleteAllDrafts")},n}]),angular.module("LeagueFactory",[]).factory("LeagueFactory",["$http","$stateParams",function(e,t){var n={};return n.createLeague=function(t){return e.post("/createLeague",t).then(function(e){return e},function(e){console.log(e)})},n.joinLeague=function(t){return e.patch("/joinLeague/",t).then(function(e){return e},function(e){console.log(e)})},n.getLeague=function(t){return e.get("/getLeague/",{params:{_id:t}}).then(function(e){return e},function(e){console.log(e)})},n.newLeagueMessage=function(t){return e.post("/league/newMessage",t).then(function(e){return e},function(e){console.log(e)})},n.updateTeamPick=function(n){return e.post("/league/"+t.leagueID,n).then(function(e){return e},function(e){console.log(e)})},n}]),angular.module("UserFactory",[]).factory("UserFactory",["$http",function(e){var t={};return t.register=function(t){return e.post("/register",t).then(function(e){return e},function(e){return console.log(e),e})},t.login=function(t){return e.post("/login",t).then(function(e){return e},function(e){return console.log(e),e})},t}]),angular.module("AuthenticationService",[]).service("AuthenticationService",["$window","$state","$rootScope","$q","UserFactory",function(e,t,n,r,o){var a={},l={setToken:function(t,n){return Promise.resolve().then(function(){e.localStorage.setItem(t,n)})},getToken:function(t){return Promise.resolve().then(function(){return e.localStorage.getItem(t)})},removeToken:function(t){return Promise.resolve().then(function(){e.localStorage.removeItem(t)})}};return a.isLoggedIn=function(){return l.getToken("user-token").then(function(t){if(t){var n=t.split(".")[1];return n=e.atob(n),(n=JSON.parse(n)).exp>Date.now()/1e3}return!1},function(e){console.log(e)})},a.currentUser=function(){return a.isLoggedIn().then(function(t){if(t)return l.getToken("user-token").then(function(t){var n=t.split(".")[1];return n=e.atob(n),n=JSON.parse(n),{_id:n._id,userName:n.userName,firstName:n.firstName,email:n.email,leagues:n.leagues}},function(e){console.log(e)})},function(e){console.log(e)})},a.updateToken=function(e){return l.removeToken("user-token").then(function(){return l.setToken("user-token",e).then(function(){return"Token Set!"},function(e){console.log(e)})},function(e){console.log(e)})},a.register=function(e,t){return o.register(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"}):e.message?reponse.message:"Unknown Error"},function(e){console.log(e)})},a.login=function(e){return o.login(e).then(function(e){return e.data.token?l.setToken("user-token",e.data.token).then(function(){return"Token Set!"},function(e){console.log(e)}):401==e.status?"Incorrect Username or Password!":"Unknown Error!"},function(e){console.log(e)})},a.currentUserLogOut=function(){e.localStorage.clear(),n=n.$new(!0)},a}]),angular.module("DraftService",[]).service("DraftService",["$window","$state","$q","DraftFactory","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l={},u=this;return l.startDraft=function(e){return r.startDraft(e).then(function(e){console.log(response)},function(e){console.log(e)})},l.isOnClock=function(){return u.currentLeague.onClock===u.currentUser._id},l.draftPlayer=function(e){return r.draftPlayer(e).then(function(e){return"OK"===e.statusText},function(e){console.log(e)})},l.undraftedPlayers=function(){},l.draftedPlayers=function(){},l.downloadPlayers=function(){r.downloadPlayers()},l.deleteAllChat=function(){ChatFactory.deleteAllChat()},l.deleteAllDrafts=function(){r.deleteAllDrafts()},l.deleteAllPlayers=function(e){r.deleteAllPlayers(function(t){e(t)})},l}]),angular.module("LeagueService",[]).service("LeagueService",["$window","$state","$stateParams","$q","$location","LeagueFactory","ChatFactory","AuthenticationService",function(e,t,n,r,o,a,l,u){var c={},i=this;r.defer();i.currentUser={},u.currentUser().then(function(e){i.currentUser=e},function(e){console.log(e)});var s={};return c.getLeague=function(){return a.getLeague(n.leagueID).then(function(e){if(e.data)return s=e.data,e.data},function(e){console.log(e)})},c.createNewLeague=function(e){return a.createLeague(e).then(function(e){return u.updateToken(e.data.token).then(function(){t.transitionTo("dashboard")},function(e){console.log(e)})},function(e){console.log(e)})},c.joinLeague=function(e){return a.joinLeague(e).then(function(e){return e.data.token?u.updateToken(e.data.token).then(function(){return"League Joined"},function(e){console.log(e)}):e.data.message},function(e){console.log(e)})},c.newLeagueMessage=function(e){return a.newLeagueMessage(e).then(function(e){return e},function(e){console.log(e)})},c.updateTeamPick=function(e){return a.updateTeamPick(e).then(function(e){return e},function(e){console.log(e)})},c}]),angular.module("DashboardController",[]).controller("DashboardController",["AuthenticationService",function(e){var t=this;t.currentUser={},e.currentUser().then(function(e){t.currentUser=e},function(e){console.log(e)})}]),angular.module("LeagueCommishController",[]).controller("LeagueCommishController",["$rootScope","$scope","$q","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.league={},a.getLeague().then(function(e){l.league=e,u(e)},function(e){console.log(e)}),l.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},l.leaguePickMaker=[];var u=function(e){e&&function(){for(var t={title:"Draft Order",teams:[]},n=e.size,r=e.teams,o=1;o<=n;o++)!function(e){var n={pick:e};r.forEach(function(t,o){t.pick==e&&(n=t,r.splice(o,1))}),t.teams.push(n)}(o);if(l.leaguePickMaker.push(t),r.length>0){var a={title:"Needs Pick",teams:[]};r.forEach(function(e){a.teams.push(e)}),l.leaguePickMaker.push(a)}}()};t.onDrop=function(e,t,n,r){n.splice(r,0,e[t]),e==n&&r<=t&&t++,e.splice(t,1);for(var o=0;o<n.length;o++)if(n[o]._id==this.team._id){var a=this.team;return c(a,o+1).then(function(){return!0},function(e){console.log(e)})}return!0};var c=function(e,t){var n={pick:t,team:e};return a.updateTeamPick(n).then(function(e){r.reload()},function(e){console.log(e)})}}]),angular.module("LeagueController",[]).controller("LeagueController",["$rootScope","$scope","$q","$view","$uibModal","$confirm","$location","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a,l,u,c,i){var s=this;s.message="",s.currentUser={},c.currentUser().then(function(e){return s.currentUser=e,e},function(e){console.log(e)}),s.league={},i.getLeague().then(function(e){s.league=e},function(e){console.log(e)}),s.isCommish=function(e,t){var n=!1;return e&&t?(t.forEach(function(t){t==e&&(n=!0)}),n):n},s.newMessage=function(){t.modalInstance=o.open({animation:!0,size:"lg",templateUrl:"newMessageModal.html",controller:"LeagueController",controllerAs:"vm",scope:t,backdrop:"static"})},s.sendMessage=function(){var e={leagueID:s.league._id,userID:s.currentUser._id,message:s.newLeagueMessage};return i.newLeagueMessage(e).then(function(e){console.log(e),"OK"==e.statusText&&u.reload(),console.log(e)},function(e){console.log(e)})},s.cancel=function(){t.modalInstance.dismiss("cancel")},s.dismissError=function(){s.message=""},s.startDraft=function(){console.log("Start Draft")}}]),angular.module("LeagueJoinController",[]).controller("LeagueJoinController",["$q","$rootScope","$scope","$state","AuthenticationService","LeagueService",function(e,t,n,r,o,a){var l=this;l.message="",l.currentUser={},o.currentUser().then(function(e){l.currentUser=e},function(e){console.log(e)}),l.joinLeague=function(){var e="";for(var t in l.data)e+=l.data[t];var n={user_id:l.currentUser._id,league_code:e};return a.joinLeague(n).then(function(e){"League Joined"==e?r.transitionTo("dashboard"):l.message=e},function(e){console.log(e)})},l.moveFocus=function(e){$("#"+e).focus()}}]),angular.module("LeagueNewController",[]).controller("LeagueNewController",["$q","AuthenticationService","LeagueService",function(e,t,n){var r=this;r.messsage="",r.currentUser={},t.currentUser().then(function(e){r.currentUser=e},function(e){console.log(e)}),r.createNewLeague=function(){var e={leagueName:r.newLeague.leagueName,leagueSize:r.newLeague.leagueSize,user_id:r.currentUser._id};return n.createNewLeague(e).then(function(e){$state.transitionTo("dashboard")},function(e){console.log(e)})}}]),angular.module("UserLoginController",[]).controller("UserLoginController",["$state","AuthenticationService",function(e,t){var n=this;n.message="",n.loginInfo={email:"",password:""},n.login=function(){return t.login(n.loginInfo).then(function(t){"Token Set!"==t?e.transitionTo("dashboard"):n.message=t},function(e){console.log(e)})},n.onSignIn=function(e){if(console.log("Fired onSign In"),e){var t=e.getBasicProfile();console.log("Email: "+t.getEmail())}},n.dismissError=function(){n.message=""}}]),angular.module("UserRegisterController",[]).controller("UserRegisterController",["$state","AuthenticationService",function(e,t){var n=this;n.message="",n.registerInfo={email:"",userName:"",firstName:"",password:""},n.registerNew=function(){return t.register(n.registerInfo).then(function(t){e.transitionTo("dashboard")},function(e){console.log(e)})},n.dismissError=function(){n.message=""}}]),angular.module("UserSettingsController",[]).controller("UserSettingsController",["AuthenticationService",function(e){var t=this;t.message="",t.currentUser={},e.currentUser().then(function(e){t.currentUser=e},function(e){console.log(e)}),t.tab=1,t.setTab=function(e){t.tab=e},t.isSet=function(e){return t.tab===e},t.dismissError=function(){t.message=""}}]);
//# sourceMappingURL=app.js.map
