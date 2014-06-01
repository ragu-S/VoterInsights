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


    .controller('QuestionsCtrl', function($scope, $location){
        $scope.answers = [];
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");

        var Questions = Parse.Object.extend("Questions");
        var query = new Parse.Query(Questions);
        var counter = 0;
        query.limit(1);
        query.find({
            success:function(results){
                $scope.questions = results[0].attributes.question_txt;
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
                            $scope.answers.push(answer[0].attributes.answer_txt);
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

        $scope.registerAnswer = function(){
//        $location.path('/app/candidate');

            counter++;
            console.log(counter, "counter");
//        $scope.answers = [];
//        $scope.$apply();
            var Questions = Parse.Object.extend("Questions");
            var query = new Parse.Query(Questions);
//        var counter = 0;
            query.skip(counter);
            query.limit(1);
            query.find({
                success:function(results){
                    if(results.length > 0){
                        $scope.questions = results[0].attributes.question_txt;
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
                                    $scope.answers.push(answer[0].attributes.answer_txt);
                                    $scope.$apply();

                                    console.log("answers", answer);
                                }
                            });


                        }


                        console.log(results);
                    } else {
                        console.log("hehehe");
                    }


                },
                error:function(errors){
                    console.log(errors);
                }
            });


//        $scope.questions = "hi";

//        $scope.$apply();
//    console.log($scope.questions);


        };


    })

    .controller('DemographicsCtrl', function($scope){
//// Declare the types.
//        var Voters = Parse.Object.extend("Voters");
//        var Responses = Parse.Object.extend("Responses");
//
//// Create the post
//
//
//// Create the comment
//        var response = new Responses();
////        myComment.set("content", "Let's do Sushirrito.");
//
//// Add the post as a value in the comment
//        response.set("parent", myPost);
//
//// This will save both myPost and myComment
//        myComment.save();
    })

    .controller('CandidateCtrl', function($scope){
//      var canId = $routeParams;
        Parse.initialize("zBM5YlWVFLzniWJu0R2d3lCiIVlSSBHSzglEMPoT", "aLchgyAqmuKVvHQdBXdiFFfKqP06eBIhJgaSGJEU");

        var Candidate = Parse.Object.extend("Candidates");
//        console.log(Candidate);
        var canQuery = new Parse.Query(Candidate);
        canQuery.equalTo("objectId", "tA9Ho1CxBk");
        canQuery.find({
            success: function(candidate){
                var canData = candidate[0].attributes;
                $scope.candidate = {
                    name: canData.Name,
                    email: canData.email,
                    party_url: canData.party_url,
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
