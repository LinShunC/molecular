"use strict";
var fs = require('fs');
var firebase = require('firebase')



var firebaseConfig = {

    apiKey: "AIzaSyCN8JWCxd8uItbuI29raUTeHxBzaijIcCA",
    authDomain: "crossplatform-b527e.firebaseapp.com",
    databaseURL: "https://crossplatform-b527e.firebaseio.com",
    projectId: "crossplatform-b527e",
    storageBucket: "crossplatform-b527e.appspot.com",
    messagingSenderId: "893106616972",
    appId: "1:893106616972:web:0c3ce733827b6d231099a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
    name: "userValidation",

    /**
     * Service settings
     */
    settings: {



    },

    /**
     * Service dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {

        validate: {
            params: {
                username: "string",
                password: "string"
            },
            handler(ctx) {
                return this.validateUser(ctx);
            }
        },

        signup: {
            params: {
                username: "string",
                password: "string"
            },
            handler(ctx) {
                return this.signupUser(ctx);
            }
        },
        signout: {
            handler() {
                return this.signoutUser();
            }
        },
        currentUser: {
            handler() {
                return this.currentUser();
            }
        },
        getInfo: {

            handler() {
                return this.getInformation();
            }
        },
        getCartInfo: {

            handler() {
                return this.getCartInfo();
            }
        },
        AddToCart: {
            params: {
                id: "string",
                price: "string",
                name: "string",
                url: "string",


            },
            handler(ctx) {
                return this.AddToCart(ctx);
            }
        },
        RemoveFromCart: {
            params: {
                id: "string",
            },
            handler(ctx) {
                return this.RemoveFromCart(ctx);
            }
        },

    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {
        RemoveFromCart(ctx) {
            var ref = firebase.database().ref();
            var userid = firebase.auth().currentUser.uid;
            var messageref = ref.child("cart").child(userid);
            return new Promise(function(resolve) {

                let userRef = messageref.child(ctx.params.id);
                userRef.remove();

                resolve({ valid: true });

            });
        },

        AddToCart(ctx) {
            var ref = firebase.database().ref();
            var userid = firebase.auth().currentUser.uid;


            var messageref = ref.child("cart").child(userid).child(ctx.params.id);
            return new Promise(function(resolve) {
                messageref.set({
                    id: ctx.params.id,
                    price: ctx.params.price,
                    name: ctx.params.name,
                    url: ctx.params.url
                });
                resolve({ valid: true });

            });

            /*  messageref.on('child_added', function(data) {
                  console.log(data.key + "id" + data.val().id);
                  if (data.val().id == ctx.params.id) {
                      console.log(data.key);
                      let userRef = messageref.child(data.key);
                      userRef.remove();
                  }
              });*/

            //var userid = firebase.auth().currentUser.uid;
            /* fs.readFile('./cart.json', (err, data) => {
                 if (err) throw err;
                 let student = JSON.parse(data)['table'];
                 console.log('value' + student.val());
                 var obj = {
                     table: []
                 };
                 obj.table.push(student);
                 obj.table.push({ id: ctx.params.id, square: 6 });
                 var json = JSON.stringify(obj);
                 fs.writeFile('./cart.json', json, function(err) {
                     if (err) throw err;
                     console.log('complete');
                 });

             });*/




        },

        getCartInfo() {
            var a;
            return new Promise(function(resolve) {
                var ref = firebase.database().ref();

                var userid = firebase.auth().currentUser.uid;
                var messageref = ref.child("cart").child(userid);

                messageref.on('value', function(snapshot) {


                    let arrry = [];

                    snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;

                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                        a += childData;


                        console.log(childData);
                        arrry.push(childData)


                    });

                    resolve({ arrry });


                    //console.log(data.child.val());


                });




            });
        },
        getInformation() {
            //var realFile = Buffer.from(ctx.params.image, "base64");
            return new Promise(function(resolve) {


                /* resolve({
                     "name": "name",
                     "url": "https://firebasestorage.googleapis.com/v0/b/crossplatform-b527e.appspot.com/o/download.png?alt=media&token=2723e4c9-b83d-4bb8-a36b-1235379dc202"
                 });*/
                resolve(JSON.parse(fs.readFileSync('./items.json', 'utf8')));

            });
        },

        currentUser() {
            return new Promise(function(resolve) {
                resolve({ userid: firebase.auth().currentUser.uid });
            });
        },

        signoutUser() {
            return new Promise(function(resolve) {

                firebase.auth().signOut().then(function() {
                    resolve({ valid: true });
                }).catch(function(error) {
                    // An error happened.
                    resolve({ valid: false });
                });
            });
        },
        signupUser(ctx) {

            return new Promise(function(resolve) {

                firebase.auth().createUserWithEmailAndPassword(ctx.params.username, ctx.params.password).then(function() {

                    resolve({ valid: true });

                }).catch(function(error) {
                    resolve({ valid: false });

                    // An error happened.
                });
            });
        },

        // private funtions are delcared here
        validateUser(ctx) {
            return new Promise(function(resolve) {

                firebase.auth()
                    .signInWithEmailAndPassword(ctx.params.username, ctx.params.password)
                    .then(() => {
                        resolve({ valid: true, userid: firebase.auth().currentUser.uid });
                    }).catch((err) => {
                        resolve({ valid: false });
                    })



            });

        },



    },

    /**
     * Service created lifecycle event handler
     */
    created() {


        // this.settings.validUserList = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    },

    /**
     * Service started lifecycle event handler
     */
    started() {

    },

    /**
     * Service stopped lifecycle event handler
     */
    stopped() {

    }
};