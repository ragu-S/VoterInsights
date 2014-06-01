angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope) {

    })

    .controller('PlaylistsCtrl', function($scope) {
//        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");
//        // Declare the types.
//        var Post = Parse.Object.extend("Post");
//        var Comment = Parse.Object.extend("Comment");
//
//// Create the post
//        var myPost = new Post();
//        myPost.set("title", "I'm Hungry");
//        myPost.set("content", "Where should we go for lunch?");
//
//// Create the comment
//        var myComment = new Comment();
//        myComment.set("content", "Let's do Sushirrito.");
//
//// Add the post as a value in the comment
//        myComment.set("parent", myPost);
//
//// This will save both myPost and myComment
//        myComment.save();
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })
    .controller('MainMenuCtrl', function($scope, $stateParams) {
    })
    .controller('ResultsCtrl', function($scope, $stateParams) {
    })
    .controller('PostalCodeCtrl', function($scope, $rootScope, $location, $http) {
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $scope.sendPostal = function(pcode) {

//            voter.set("data_age", 31222);




            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

            var dataa = "pcode="+pcode;
            console.log("ee", pcode);
            $http({
                url: '/testing.php',
                method: "POST",
                data: dataa
            })
                .then(function(response) {
                    // success
                    console.log(response.data);
                    var Voters = Parse.Object.extend("Voters");

                    var voter = new Voters();
                    voter.set("postal_code", pcode);
                    voter.set("district_name", response.data);
                    voter.save({
                        success:function(results){
                            console.log("eee");
                            $rootScope.id = results.id;
                            $rootScope.$apply(function(){
                                $location.path("/app/mainmenu");
                            });
                        }
                    })
                },
                function(response) { // optional
                    // failed
                }
            );
        }


    })
    .controller('CandidateListCtrl', function($scope, $location, $stateParams) {

        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");
        $scope.candidates = [];
        var Candidate = Parse.Object.extend("Candidates");
//        console.log(Candidate);
        var canQuery = new Parse.Query(Candidate);
        var candidate;
        canQuery.select("party_url", "photo_url", "Name");
        canQuery.find({
            success: function(candidate){
                $scope.candidates = candidate;
                console.log($scope.candidates);


                $scope.$apply();


            },
            error: function(){

            }
        });





    })

    .controller('QuestionsCtrl', function($scope, $location, $rootScope, $timeout, $ionicScrollDelegate){
        if(!$rootScope.id){
            $location.path('/app/postalcode');
        }
        $scope.answers = [];
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");
//$scope.relnumber;

        var Relevance = Parse.Object.extend("relevance");
        var relevance = new Parse.Query(Relevance);
        relevance.find({
            success:function(results){
                $scope.relevances = results;
                console.log($scope.relevances);
            }

        });



        var Questions = Parse.Object.extend("Questions");
        var query = new Parse.Query(Questions);

        $scope.counter = 0;
        query.limit(1);
        query.find({
            success:function(results){
                $scope.questions = results[0].attributes;
                $scope.question_id = results[0].id;
                console.log($scope.questions);
                $scope.$apply();
                var currentId;
                for(var i = 0; i < results[0].attributes.answer_ids.length; i++){
                    currentId = results[0].attributes.answer_ids[i];
                    console.log(currentId);
                    var Answers = Parse.Object.extend("Answers");
                    var queryAnswers = new Parse.Query(Answers);
                    queryAnswers.equalTo("objectId", currentId);
                    queryAnswers.find({
                        success:function(answer){
                            $scope.answers.push({id: currentId, text: answer[0].attributes.answer_txt});
                            $scope.$apply();

                            console.log("answers", answer);
                        }
                    });
                }

                console.log(results);
            },
            error:function(errors){
                console.log(errors);
            }
        });

        $scope.setRel = function(abc){
            $scope.relnumber=abc.toString();
//            $scope.$apply();

        };
        $scope.setAnswer = function(abc){
            $scope.answerId=abc;

        };
        $scope.registerAnswer = function(){
            $ionicScrollDelegate.scrollTop();

//        $location.path('/app/candidate');
//            $scope.$apply();
            $scope.counter++;
            console.log($scope.counter, "counter", $scope.relnumber);


            var userId = $rootScope.id;

            var Voters = Parse.Object.extend("Voters");
            var Responses = Parse.Object.extend("Responses");

            var response = new Responses();
            console.log($scope.question_id, $scope.answerId, $scope.relnumber);

            response.set({
                question_id: $scope.question_id,
                answer_id: $scope.answerId,
                relevance: $scope.relnumber
            });

            var currentVoter = new Voters();
            currentVoter.id = userId;

            response.set("parent", currentVoter);

            response.save(null,{
                success:function(results){

                    var Relevance = Parse.Object.extend("relevance");
                    var relevance = new Parse.Query(Relevance);
                    relevance.find({
                        success:function(results){
                            $scope.relevances = results;
                            console.log($scope.relevances);
                        }

                    });


                    var Questions = Parse.Object.extend("Questions");
                    var query = new Parse.Query(Questions);
//        var counter = 0;

                    query.skip($scope.counter);
                    query.limit(1);
                    query.find({
                        success:function(results){
                            if(results.length > 0){
                                $scope.questions = results[0].attributes;
                                $scope.question_id = results[0].id;

                                console.log($scope.questions);
//                $scope.$apply();
                                var currentId;
                                $scope.answers = [];

                                for(var i = 0; i < results[0].attributes.answer_ids.length; i++){
                                    currentId = results[0].attributes.answer_ids[i];
                                    console.log(currentId);
                                    var Answers = Parse.Object.extend("Answers");
                                    var queryAnswers = new Parse.Query(Answers);
                                    queryAnswers.equalTo("objectId", currentId);
                                    queryAnswers.find({
                                        success:function(answer){
                                            $scope.answers.push({id: currentId, text: answer[0].attributes.answer_txt});
                                            $scope.$apply();

                                            console.log("answers", answer);
                                        }
                                    });


                                }


                                console.log(results);
                            } else {
                                console.log("hehehe");
//                                $rootScope.$apply(function(){
                                $timeout(function() {
                                    $location.path("/app/demographics");

                                }, 100);
//                                });
                            }


                        },
                        error:function(errors){
                            console.log(errors);
                        }
                    });
                    $scope.$apply();
                }

            });
//        $scope.answers = [];
//        $scope.$apply();


//        $scope.questions = "hi";

//        $scope.$apply();
//    console.log($scope.questions);


        };


    })

    .controller('DemographicsCtrl', function($scope, $rootScope, $location, $timeout){
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");
//        $scope.voter;
        $scope.sendVoterData = function(voterData){
            var Voters = Parse.Object.extend("Voters");
            var voter = new Voters();
            console.log($rootScope.id);
            var userId = $rootScope.id;
            voter.id = userId;
            voter.set({
                data_gender: voterData.data_gender,
                data_age: voterData.data_age,
                data_education: voterData.data_education,
                data_politicalView: voterData.data_politicalView
            });
            voter.save(null,{
                success: function()
            {
                $timeout(function() {
                    $location.path("/app/results");
                }, 100);
            }});

//            console.log(voter);
        };
//        var Voters = Parse.Object.extend("Voters");
//        var Responses = Parse.Object.extend("Responses");
//
//        var voter = new Voters();
//
//
//        voter.set("postal_code", "L2B3V3");
//        voter.set("data_age", 31222);
//
//
//        var response = new Responses();
//        response.set("question_id", "rsPzi4C3en");
//        response.set("answer_id", "urz2Y2d924");
//        response.set("relevance", "322");
//        response.set("parent", voter);
//
//        response.save(null, {
//            success: function (results) {
//
//                //Store the id of the user
//                $rootScope.id = results.attributes.parent.id;
//                $rootScope.$apply(function(){
//                    $location.path('/app/question');
//                });
//
//            }
//        });

    })

    .controller('CandidateCtrl', function($scope, $location, $rootScope, $stateParams){
        console.log($stateParams);
        var canId = $stateParams.candidateId;
        var serachObject = $location.search();
        console.log(serachObject);
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");

        var Candidate = Parse.Object.extend("Candidates");
//        console.log(Candidate);
        var canQuery = new Parse.Query(Candidate);
        canQuery.equalTo("objectId", canId);
        canQuery.find({
            success: function(candidate){
                var canData = candidate[0].attributes;
                $scope.candidate = {
                    name: canData.Name,
                    email: canData.email,
                    party_url: canData.party_url,
                    party_color: canData.party_color,
                    photo_url: canData.photo_url,
                    txt_About: canData.txt_About,
                    url_Donate: canData.url_Donate,
                    url_FB: canData.url_FB,
                    url_Site: canData.url_Site,
                    url_Twitter: canData.url_Twitter,
                    url_Youtube: canData.url_Youtube
                };
                $scope.$apply();


            },
            error: function(){

            }
        });
//console.log($scope.testingg);
//        var Candidates = Parse.Object.extend()

    });
