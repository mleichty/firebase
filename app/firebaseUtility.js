var FIREBASE_UTILITY = (function () {

    var userImageURL;

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyAITwe3n4aAweuIBVeCMu1b5oa9nfPSvIc",
        authDomain: "crud-365d5.firebaseapp.com",
        databaseURL: "https://crud-365d5.firebaseio.com",
        projectId: "crud-365d5",
        storageBucket: "crud-365d5.appspot.com",
        messagingSenderId: "34558744611"
    };
    firebase.initializeApp(config);

// this is a reference to Firebase storage for uploading images
    var storageRef = firebase.storage().ref();

// this is used to write the users information to the database.
    function writeUserData(userId, name, email, imageUrl) {
        var newKey = firebase
            .database()
            .ref()
            .child('users')
            .push().key;

        firebase
            .database()
            .ref('users/' + newKey)
            .set({
                username: 'Susan',
                email: 'hotness@hotness.com',
                profile_picture: userImageURL
            });
    }

// this is used to write the recipe information to the database.
    var _writeRecipe = function (recipeArray, ingArray, instArray) {
        //will automatically create recipes table if not there
        var newrecipeKey = firebase.database().ref().child('recipes').push().key;
        //firebase is declared above, then looks through db
        //then referencing a specific table, then setting it
        //sets a new key
        let ingArray2 = [];
        $.each(ingArray, function(idx, value){
            ingArray2.push(value.value);
            // console.log(idx, value);
            // console.log(value.value);
        });
        console.log(ingArray2);
        let instArray2 = [];
        $.each(instArray, function(idx, value){
            instArray2.push(value.value);
            // console.log(idx, value);
            // console.log(value.value);
        });
        console.log(instArray2);
        firebase.database().ref('recipes/' + newrecipeKey).set({
            image: recipeArray[0].value,
            name: recipeArray[1].value,
            description: recipeArray[2].value,
            time: {hour: recipeArray[3].value, min: recipeArray[4].value},
            servingSize: recipeArray[5].value,
            ingredients: ingArray2,
            instructions: instArray2
        }, function(error) {
            if (error) {
                // How do I send this back to app.js?
            //    Do I use a callback? How does that work if I'm sending
            //    parameters to this function?
                alert("There was a database error.");
            } else {
                // Data saved successfully!
                alert(recipeArray[1].value + " was successfully added.");
                document.location.reload(true);
            }
        });
    };

// this will get all the data in the database once
    function getOnce() {
        firebase
            .database()
            .ref('users/')
            .once('value')
            .then(function (snapshot) {
                // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                console.log(snapshot.val());
                var userArray = snapshot.val();

                $.each(userArray, function (idx, value) {
                    $('body').append(
                        '<p>Username: ' +
                        value.username +
                        ' Email: ' +
                        value.email +
                        '</p><div><img src="' +
                        value.profile_picture +
                        '"/></div>'
                    );

                    console.log(value.profile_picture);
                    console.log(value.username);
                    console.log(value.email);
                });
            });
    }

// this will get all the data in the database once
    var _getAllRecipes = function(callback) {
        console.log('Show');
        firebase.database().ref('recipes/').once('value').then(function (snapshot) {
                // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                console.log(snapshot.val());
                var recipesArray = snapshot.val();
                //send back function with data
                return callback(recipesArray);
            });
    };

// this will get the data for one recipe, should do callback instead?
//     var _getRecipe = function(recipeKey) {
//         console.log('One Recipe to rule them all');
//         firebase
//             .database()
//             .ref('recipes/' + recipeKey)
//             .once('value')
//             .then(function (snapshot) {
//                 // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//                 console.log(snapshot.val());
//                 var recipe = snapshot.val();
//                 //send back function with data
//                 return recipe;
//             });
//     };


// this will delete a user. You will need the key reference
    function deleteUser() {
        firebase
            .database()
            .ref('users/1234')
            .remove();
    }

// this will delete a recipe. You will need the key reference
    var _deleteRecipe = function(recipeKey) {
        firebase.database().ref('recipes/' + recipeKey).remove(
            function(error) {
                if (error) {
                    alert("There was a database error.");
                } else {
                    alert("Your recipe was successfully deleted.");
                    document.location.reload(true);
                }
            })
    };

// function used to update a user
    function updateUsers() {
        var user = {
            username: 'Tom',
            email: 'tom@tom.com',
            profile_picture: 'images/tom.jpg'
        };

        // var newKey = firebase.database().ref().child('users').push().key;

        firebase
            .database()
            .ref('users/12345')
            .update(user);
    }

// function used to update a user
    var _updateRecipe = function(recipeKey, recipeArray, ingArray, instArray) {
        // var recipe = {
        //     time: {
        //         hour: "4"
        //     }
        // };

        // var newKey = firebase.database().ref().child('users').push().key;
        let ingArray2 = [];
        $.each(ingArray, function(idx, value){
            ingArray2.push(value.value);
        });
        console.log(ingArray2);
        let instArray2 = [];
        $.each(instArray, function(idx, value){
            instArray2.push(value.value);
        });
        console.log(instArray2);

        firebase.database().ref('recipes/' + recipeKey).update({
            image: recipeArray[0].value,
            name: recipeArray[1].value,
            description: recipeArray[2].value,
            time: {hour: recipeArray[3].value, min: recipeArray[4].value},
            servingSize: recipeArray[5].value,
            ingredients: ingArray2,
            instructions: instArray2
        }, function(error) {
            if (error) {
                // How do I send this back to app.js?
                //    Do I use a callback? How does that work if I'm sending
                //    parameters to this function?
                alert("There was a database error.");
            } else {
                // Data saved successfully!
                alert(recipeArray[1].value + " was successfully updated.");
                document.location.reload(true);
            }
        });
    };

// this function will create the user. You will need the full name and email as well as their password and callback.
    function createUser(name, email, pw, callback) {
        console.log(name);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, pw)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                $('.error').html(errorMessage);
            })
            .then(function (res) {
                console.log(res);
                firebase
                    .database()
                    .ref('users/' + res.user.uid)
                    .set({
                        username: name,
                        email: email,
                        profile_picture: ''
                    });
            });
    }

// This will login a user and store their info locally. You will need email and password and callback.
    function loginUser(email, pw, callback) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                $('.error').html('This email is not signed up');
            })
            .then(function (res) {
                console.log(res);
            });
    }

    return {
        writeRecipe: _writeRecipe,
        deleteRecipe: _deleteRecipe,
        updateRecipe: _updateRecipe,
        getAllRecipes: _getAllRecipes,
        // getRecipe: _getRecipe
    };
})();
