// Invoke 'strict' JavaScript mode
//'use strict';

var app = angular.module("quizApp",['ngMaterial','ngNewRouter','firebase']);
app.constant("fbUrl","https://saylaniquizapp.firebaseio.com");
app.controller("quizCtrl",function($scope,$router,$location,fbUrl){
    $router.config([
        {path:'/',redirectTo:'regster'},
        {path:'/home',component:'home'},
        {path:'/login',component:'login'},
        {path:'/create',component:'create'},
        {path:'/quiz',component:'quiz'},
        {path:'/regster',component:'regster'},
        {path:'/result',component:'result'}
    ]);

    //Declarations
    $scope.users = [];
    $scope.answers=[];
    $scope.rightAns = [];
    $scope.wrongAns = [];
    var marksObt, totalMarks, per;
    $scope.quiz = [
        {
            quesNo:"Ques. No 1",ques:"HTML stands for?",options:[
            "HyperText Manual Language","HyperText Mark-up Language","Hybrid Mark-up Language"
        ],answer:"HyperText Mark-up Language"
        },
        {
            quesNo:"Ques. No 2",ques:"which is correct HTML declartion?",options:[
            "!DOCTYPE html","DOCTYPE !html","DOCTYPE html"
        ],answer:"!DOCTYPE html"
        },
        {
            quesNo:"Ques. No 3",ques:"HTML stands for?",options:[
            "HyperText Manual Language","HyperText Mark-up Language","Hybrid Mark-up Language"
        ],answer:"HyperText Mark-up Language"
        },
        {
            quesNo:"Ques. No 4",ques:"which is correct HTML declartion?",options:[
            "!DOCTYPE html","DOCTYPE !html","DOCTYPE html"
        ],answer:"!DOCTYPE html"
        },
        {
            quesNo:"Ques. No 5",ques:"HTML stands for?",options:[
            "HyperText Manual Language","HyperText Mark-up Language","Hybrid Mark-up Language"
        ],answer:"HyperText Mark-up Language"
        },
        {
            quesNo:"Ques. No 6",ques:"which is correct HTML declartion?",options:[
            "!DOCTYPE html","DOCTYPE !html","DOCTYPE html"
        ],answer:"!DOCTYPE html"
        },
        {
            quesNo:"Ques. No 7",ques:"HTML stands for?",options:[
            "HyperText Manual Language","HyperText Mark-up Language","Hybrid Mark-up Language"
        ],answer:"HyperText Mark-up Language"
        },
        {
            quesNo:"Ques. No 8",ques:"which is correct HTML declartion?",options:[
            "!DOCTYPE html","DOCTYPE !html","DOCTYPE html"
        ],answer:"!DOCTYPE html"
        },
        {
            quesNo:"Ques. No 9",ques:"HTML stands for?",options:[
            "HyperText Manual Language","HyperText Mark-up Language","Hybrid Mark-up Language"
        ],answer:"HyperText Mark-up Language"
        },
        {
            quesNo:"Ques. No 10",ques:"which is correct HTML declartion?",options:[
            "!DOCTYPE html","DOCTYPE !html","DOCTYPE html"
        ],answer:"!DOCTYPE html"
        }
    ];

    //Functions

    $scope.loginPage1 = function(path){
        $scope.userlogin = true;
        $scope.adminlogin = false;
        $location.path(path);
    };

    $scope.loginPage2 = function(path){
        $scope.adminlogin = true;
        $scope.userlogin = false;
        $location.path(path);
    };

    $scope.signUp = function(user,path){
        $scope.users.push(user);
        $scope.userlogin = true;
        //console.log($scope.users[0].user);
        $location.path(path);
    };

    $scope.adminLogin = function(admin,path){

        if(admin.username == "admin" && admin.pwd == "admin"){
            $scope.startbtn = true;
            $location.path(path);
        }
        else{
            alert("wrong username or password..");
        }

    };

    $scope.userLogin = function(user,path){

        for(var i=0; i<$scope.users.length; i++){
            if($scope.users[i].name == user.name && $scope.users[i].pwd == user.pwd){
                alert("welcome "+user.name);
                $scope.startbtn = true;
                $location.path(path);
            }
            else{
                alert("please Register first..");
                $location.path('/regster')
            }
        }
    };

    $scope.fbLogin = function(){
        var ref = new Firebase(fbUrl);
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $location.path('/create');
            }
        });
    };

    $scope.fbLogout = function(path){
        var ref = new Firebase(fbUrl);
        ref.onAuth(function(authData) {
            if (authData) {
                console.log("Logged in");
            } else {
                console.log("Logged out");
                $location.path(path);
            }
        });
    };

    $scope.startQuiz = function(){
        $scope.myIndex = 0;
        $scope.startbtn = false;
        $scope.quizDiv = true;
        //alert($scope.quiz[myIndex].quesNo);
    };

    $scope.nextQues = function() {
        if($scope.answers.length == $scope.quiz.length) {
            $location.path('/result');
        }
        else {
            $scope.myIndex += 1;
            //alert($scope.myIndex);
        }
    };

    $scope.userAns = function(ans){
        $scope.answers.push(ans);
        //alert($scope.answers.length);
    };

    $scope.showResult = function(){
        for(var i=0; i<$scope.quiz.length; i++){
            if($scope.answers[i] == $scope.quiz[i].answer){
                $scope.rightAns.push($scope.answers[i]);
                //      alert($scope.rightAns.length);
            }
            else{
                $scope.wrongAns.push($scope.answers[i]);
                //    alert($scope.wrongAns.length);
            }
        }
        $scope.resultPara = true;
        var resultPer = document.getElementById("resultPer");
        totalMarks = $scope.quiz.length;
        marksObt = $scope.rightAns.length;
        per = marksObt / totalMarks * 100;
        alert("total ques = "+totalMarks+" rights = "+marksObt+" wrongs = "+$scope.wrongAns.length);
        //alert("your percentage is = "+per+"%");
        if(per >= 50){
            resultPer.innerHTML = "Congratulations you are passed, your percentage is "+per+"%";
            resultPer.style ='color : green';
        }

        else{
            resultPer.innerHTML = "Sorry you are failed, your percentage is "+per+"%";
            resultPer.style ="color : red";
        }
    };

});

//"$localStorage" as dependency
app.controller('ToolbarHomeController', ['$scope', '$location',
    "$sessionStorage", "authService",
    function($scope, $location, $sessionStorage, authService) {
        $scope.showLoginPage = function($event) {
            $location.path("/pages/login");
        };

        $scope.showSignupPage = function($event) {
            $location.path("/pages/signup");
        };

        $scope.logout = function() {
            authService.logout();
        };

        $scope.loggedIn = function($event){
            if($sessionStorage.loggedInUser) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.getLoggedInUserObj = function(){
            if($sessionStorage.loggedInUser){
                return $sessionStorage.loggedInUser;
            }
            else {
                return null;
            }

        }
    }
]);