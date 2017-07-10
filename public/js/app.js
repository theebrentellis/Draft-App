"use strict";var DraftApp=angular.module("DraftApp",["ngRoute","ngMessages","ngAnimate","ui.router","ui.bootstrap","angular-confirm","AppController","AuthenticationService","ChatController","DashboardController","DraftService","LeagueController","LeagueService","PlayerController","UserController","ChatFactory","DraftFactory","LeagueFactory","UserFactory"]);DraftApp.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/dashboard"),e.state("welcome",{url:"/",views:{content:{templateProvider:["$templateCache",function(e){return e.get("welcome.html")}],controller:"AppController",controllerAs:"vm"}}}).state("login",{url:"/login",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("login.html")}],controller:"UserController",controllerAs:"vm"}}}).state("register",{url:"/register",views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm"},content:{templateProvider:["$templateCache",function(e){return e.get("register.html")}],controller:"UserController",controllerAs:"vm"}}}).state("dashboard",{url:"/dashboard",authenticate:!0,views:{header:{templateProvider:["$templateCache",function(e){return e.get("app.html")}],controller:"AppController",controllerAs:"vm",authenticate:!0},content:{templateProvider:["$templateCache",function(e){return e.get("dashboard.html")}],controller:"UserController",controllerAs:"vm",authenticate:!0}}}).state("settings",{url:"/settings",authenticate:!0,views:{header:{templateUrl:"/partials/app.html",controller:"AppController",controllerAs:"vm",authenticate:!0},content:{templateUrl:"/partials/settings.html",controller:"UserController",controllerAs:"vm",authenticate:!0}}}).state("commish",{url:"/commish",views:{header:{templateUrl:"/partials/app.html",controller:"AppController",controllerAs:"vm"},content:{templateUrl:"/partials/commish.html",controller:"LeagueController",controllerAs:"vm",authenticate:!0}}}).state("availablePlayers",{url:"/availablePlayers",views:{header:{templateUrl:"/partials/app.html",controller:"AppController",controllerAs:"vm"},content:{templateUrl:"/partials/availablePlayers.html",controller:"PlayerController",controllerAs:"vm",authenticate:!0}}}).state("draftboard",{url:"/draftboard",authenticate:!0,views:{header:{templateUrl:"/partials/app.html",controller:"AppController",controllerAs:"vm"},content:{templateUrl:"/partials/draftBoard.html",controller:"PlayerController",controllerAs:"vm",authenticate:!0}}}).state("chatroom",{url:"/chat",views:{header:{templateUrl:"/partials/app.html",controller:"AppController",controllerAs:"vm"},content:{templateUrl:"/partials/chat.html",controller:"ChatController",controllerAs:"vm",authenticate:!0}}})}]),DraftApp.run(["$rootScope","$location","$state","AuthenticationService",function(e,t,r,n){e.$on("$stateChangeStart",function(e,t,o,l,a){t.authenticate&&!n.isLoggedIn()&&(console.log("Go To Login!"),r.transitionTo("login"))})}]),DraftApp.run(["$templateCache",function(e){}]),angular.module("AppController",[]).controller("AppController",["$scope","$location","$q","$state","AuthenticationService","DraftService","LeagueService",function(e,t,r,n,o,l,a){var u=this;u.isLoggedIn=o.isLoggedIn(),u.currentUser=o.currentUser(),u.currentLeague=a.currentLeague(),u.appViewChange=function(e){!0===u.isLoggedIn?t.path(e):t.path("/login")},u.setCurrentLeague=function(e){return a.setCurrentLeagueId(e).then(function(){return a.getLeague().then(function(){n.reload()},function(e){console.log(e)})},function(e){console.log(e)})},u.setColor=function(e){if(a.currentLeague()._id===e._id)return{"font-weight":"bold"}},u.deleteAllDBs=function(){l.deleteAllPlayers(),o.deleteAllUsers(),a.deleteAllChat(),l.deleteAllDrafts()},u.downloadPlayers=function(){l.downloadPlayers(function(e){console.log(e)})},u.deleteAllPlayers=function(){l.deleteAllPlayers(function(e){console.log(e)})},u.deleteAllUsers=function(){o.deleteAllUsers(),t.path("/login")},u.deleteAllChat=function(){a.deleteAllChat()},u.deleteAllLeagues=function(){a.deleteAllLeagues()},u.deleteAllDrafts=function(){l.deleteAllDrafts()},u.currentUserLogOut=function(){o.currentUserLogOut()}}]),angular.module("ngEnter",[]).directive("ngEnter",["$scope","element","attrs",function(e,t,r){t.bind("keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(r.ngEnter)}),t.preventDefault())})}]),angular.module("ChatController",[]).controller("ChatController",["$scope","AuthenticationService","LeagueService","ChatFactory",function(e,t,r,n){var o=this;o.currentUser=t.currentUser(),o.currentLeague=r.currentLeague(),o.messages=[],o.message="",o.filterText="";var l=io.connect();l.on("pastMessages",function(t){e.$apply(function(){o.messages=t.reverse()})}),l.on("receiveMessage",function(t){e.$apply(function(){o.messages.unshift(t)})}),o.sendMessage=function(){r.postMessage(o.message,function(e,t){t&&window.alert("Error!")})}}]),angular.module("DashboardController",[]).controller("DashboardController",["$scope","$view","$location","$state",function(e,t,r,n){}]),angular.module("LeagueController",[]).controller("LeagueController",["$scope","$q","$confirm","$location","AuthenticationService","LeagueService",function(e,t,r,n,o,l){var a=this;a.allLeagues=[],a.currentUser=o.currentUser(),a.currentLeague=l.currentLeague(),a.createNewLeagueView=!1,a.findLeagueView=!1;var u=function(){return l.getAllLeagues().then(function(e){a.allLeagues=e},function(e){console.log(e)})};a.leagueViewChange=function(e){if("createNew"===e&&(a.createNewLeagueView=!0,a.findLeagueView=!1),"findLeague"===e)return u().then(function(){a.findLeagueView=!0,a.createNewLeagueView=!1},function(e){console.log(e)})},a.createNewLeague=function(){var e={leagueName:a.newLeague.leagueName,userId:a.currentUser._id};l.createNewLeague(e)},a.joinLeague=function(e,t){l.joinLeague(e,function(e){"Success"==e?console.log("Success!"):console.log("Error")})}}]),angular.module("PlayerController",[]).controller("PlayerController",["$scope","$location","$confirm","$timeout","$q","DraftFactory","AuthenticationService","DraftService","LeagueService",function(e,t,r,n,o,l,a,u,c){var s=this;s.available_players=[],s.allDraftedPlayers=[],s.message="",s.currentUser=a.currentUser(),s.currentLeague=c.currentLeague(),s.setColorOnClock=function(e){if(s.currentLeague.onClock===e._id)return{"font-weight":"bold"}},s.getPlayers=function(e){l.getPlayers(e,function(e){s.available_players=e})},s.startDraft=function(e){var t={draftId:s.currentLeague.draft._id,draftOrder:s.currentLeague.draftOrder};return u.startDraft(t).then(function(e){console.log(e)},function(e){console.log(e)})},s.draftPlayer=function(e){if(!0===u.isOnClock()){var r={draftId:s.currentLeague.draft._id,leagueId:s.currentLeague._id,team:s.currentUser._id,pick:e};return u.draftPlayer(r).then(function(e){console.log(e),!0===e&&t.path("/draftBoard"),!1===e&&console.log("Error in PlayerControiller draftPlayer")},function(e){console.log(e)})}!1===u.isOnClock()&&(s.message="You Are Not On The Clock!",s.checkBox.value=!1,n(function(){s.message=!1},5e3))};l.getDraftedPlayers(function(e){s.allDraftedPlayers=e})}]),angular.module("UserController",[]).controller("UserController",["$scope","$q","$view","$location","$state","AuthenticationService","LeagueService",function(e,t,r,n,o,l,a){var u=this;u.currentUser=l.currentUser(),u.currentLeague=a.currentLeague(),u.message="",u.loginView=!0,u.registerView=!1,u.tab=1,u.setTab=function(e){u.tab=e},u.isSet=function(e){return u.tab===e},u.userViewChange=function(e){!0===e?(u.loginView=!1,u.registerView=!0):(u.loginView=!0,u.registerView=!1)},u.registerInfo={email:"",userName:"",firstName:"",password:""},u.loginInfo={email:"",password:""},u.registerNew=function(){l.register(u.registerInfo,function(e){"Success"===e?n.path("/dashboard"):u.message=e})},u.login=function(){return l.login(u.loginInfo).then(function(e){"Success"==e?n.path("/dashboard"):(u.message=e,console.log(e))},function(e){u.message="Error: "+e.status,console.log(e)})},u.dismissError=function(){console.log("Dismiss"),u.message=""}}]),angular.module("ChatFactory",[]).factory("ChatFactory",["$http",function(e){var t={};return t.postMessage=function(t,r){e.post("/message",t).success(function(e,t){r(e,!1)}).error(function(e,t){r(e,!0)})},t.deleteAllChat=function(){e.post("/deleteAllChat").success(function(e){console.log(e)})},t}]),angular.module("DraftFactory",[]).factory("DraftFactory",["$http","$q",function(e,t){var r={};return r.downloadPlayers=function(){e.post("/downloadPlayers").success(function(e){console.log(e)})},r.getPlayers=function(t,r){e.get("/getPlayers/",{params:{position:t}}).success(function(e){r(e)})},r.deleteAllPlayers=function(t){e.post("/deleteAllPlayers").success(function(e){t(e)})},r.startDraft=function(t){return e.post("/startDraft",t).then(function(e){console.log(e)},function(e){console.log(e)})},r.draftPlayer=function(t){return e.post("/draftPlayer",t).then(function(e){return e},function(e){console.log(e)})},r.getDraftedPlayers=function(t){e.get("/getDraftedPlayers").success(function(e){t(e)})},r.deleteAllDrafts=function(){return e.post("/deleteAllDrafts")},r}]),angular.module("LeagueFactory",[]).factory("LeagueFactory",["$http",function(e){var t={};return t.createLeague=function(t){return e.post("/createLeague",t).then(function(e){return e},function(e){return console.log(e),e})},t.getLeague=function(t){return e.get("/getLeague/",{params:{_id:t}}).then(function(e){return e},function(e){console.log(e)})},t.getAllLeagues=function(){return e.get("/getAllLeagues").then(function(e){return e.data},function(e){console.log(e)})},t.joinLeague=function(t){return e.patch("/joinLeague/",t).then(function(e){return e.data.token},function(e){console.log(e)})},t.deleteAllLeagues=function(){return e.post("/leaguesClearAll").then(function(e){},function(e){console.log(e)})},t}]),angular.module("UserFactory",[]).factory("UserFactory",["$http","$q",function(e,t){var r={};return r.register=function(t,r){e.post("/register",t).success(function(e){r(e)},function(e){console.log(e)})},r.login=function(t){return e.post("/login",t).then(function(e){return e},function(e){return e})},r.deleteAllUsers=function(t){e.post("/deleteAllUsers").success(function(e){console.log(e),t(e)})},r.getUserLeague=function(t){e.get("/getUserLeagues").success(function(e){console.log(e),t(e)})},r}]),angular.module("AuthenticationService",[]).service("AuthenticationService",["$window","$state","$rootScope","$location","$q","UserFactory",function(e,t,r,n,o,l){var a={},u=function(t){e.localStorage["user-token"]=t},c=function(){return e.localStorage["user-token"]};return a.isLoggedIn=function(){var t,r=c();return!!r&&(t=r.split(".")[1],t=e.atob(t),(t=JSON.parse(t)).exp>Date.now()/1e3)},a.currentUser=function(){if(a.isLoggedIn()){var t=c().split(".")[1];return t=e.atob(t),t=JSON.parse(t),{_id:t._id,userName:t.userName,firstName:t.firstName,email:t.email,leagues:t.leagues}}},a.updateToken=function(t){o.resolve(e.localStorage.removeItem("user-token")).then(function(){return u(t),"Done"},function(e){console.log(e)})},a.register=function(e,t){l.register(e,function(e){e.token&&(u(e.token),t("Success")),t(e.message?e.message:"Unknown Error!")})},a.login=function(e){return l.login(e).then(function(e){return e.data.token?(u(e.data.token),"Success"):401==e.status?"Incorrect Username or Password!":"Unknown Error!"},function(e){console.log(e)})},a.currentUserLogOut=function(){e.localStorage.clear(),r=r.$new(!0),n.path("/login"),console.log("Logout")},a.deleteAllUsers=function(){l.deleteAllUsers(),e.localStorage.clear(),r=r.$new(!0),n.path("/login")},a}]),angular.module("DraftService",[]).service("DraftService",["$window","$state","$q","DraftFactory","AuthenticationService","LeagueService",function(e,t,r,n,o,l){var a={},u=this;return u.currentUser=o.currentUser(),u.isLoggedIn=o.isLoggedIn(),u.currentLeague=l.currentLeague(),a.startDraft=function(e){return n.startDraft(e).then(function(e){console.log(response)},function(e){console.log(e)})},a.isOnClock=function(){return u.currentLeague.onClock===u.currentUser._id},a.draftPlayer=function(e){return n.draftPlayer(e).then(function(e){return"OK"===e.statusText},function(e){console.log(e)})},a.undraftedPlayers=function(){},a.draftedPlayers=function(){},a.downloadPlayers=function(){n.downloadPlayers()},a.deleteAllChat=function(){ChatFactory.deleteAllChat()},a.deleteAllDrafts=function(){n.deleteAllDrafts()},a.deleteAllPlayers=function(e){n.deleteAllPlayers(function(t){e(t)})},a}]),angular.module("LeagueService",[]).service("LeagueService",["$window","$state","$q","$location","LeagueFactory","ChatFactory","AuthenticationService",function(e,t,r,n,o,l,a){var u={},c=this;c.currentUser=a.currentUser(),c.isLoggedIn=a.isLoggedIn();var s=function(t){r.resolve(e.localStorage["current-league-id"]=t)},i=function(){return!!e.localStorage["current-league-id"]&&e.localStorage["current-league-id"]},g=function(t){e.localStorage["current-league"]?(e.localStorage.removeItem("current-league"),e.localStorage.setItem("current-league",JSON.stringify(t))):e.localStorage.setItem("current-league",JSON.stringify(t))};return u.currentLeague=function(){return JSON.parse(e.localStorage.getItem("current-league"))},u.setCurrentLeagueId=function(e){if(e)return r.when(s(e))},u.getCurrentLeagueId=function(){if(i)return i},u.getLeague=function(){var e=i();return o.getLeague(e).then(function(e){r.resolve(g(e.data)).then(function(){return"Done"},function(e){console.log(e)})},function(e){console.log(e)})},u.createNewLeague=function(e){r.when(o.createLeague(e)).then(function(e){r.when(a.updateToken(e.data.token)).then(function(){currentUser=a.currentUser(),r.when(u.setCurrentLeagueId(currentUser.leagues[0]._id)).then(function(){r.when(u.getLeague()).then(function(e){return n.path("/availablePlayers"),e},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},u.joinLeague=function(e){currentUser=a.currentUser();var t={userId:currentUser._id,leagueId:e};return o.joinLeague(t).then(function(e){r.when(a.updateToken(e)).then(function(){updatedCurrentUser=a.currentUser(),r.when(u.setCurrentLeagueId(updatedCurrentUser.leagues[0]._id)).then(function(){r.when(u.getLeague()).then(function(){n.path("/availablePlayers")},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},function(e){console.log(e)})},u.getAllLeagues=function(){return currentUser=a.currentUser(),void 0===currentUser.leagues[0]?o.getAllLeagues().then(function(e){return e},function(e){console.log(e)}):o.getAllLeagues().then(function(e){for(var t in e)for(var r in currentUser.leagues)e[t]._id==currentUser.leagues[r]._id&&e.splice(t,1);return e},function(e){console.log(e)})},u.postMessage=function(e){var t={_id:u.currentLeague().chat._id,userName:c.currentUser.firstName,message:e};l.postMessage(t,function(e,t){t&&console.log(t),e&&console.log(e)})},u.deleteAllLeagues=function(){o.deleteAllLeagues()},u.deleteAllChat=function(){l.deleteAllChat()},u}]);
//# sourceMappingURL=app.js.map