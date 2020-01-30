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

        AddToCart(ctx) {
            var ref = firebase.database().ref();
            //var userid = firebase.auth().currentUser.uid;
            var messageref = ref.child("message").child("testid86");
            return new Promise(function(resolve) {
                messageref.push({
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

            //var userid = firebase.auth().currentUser.uid;

            /* var id = ctx.params.id;
             messageref.push({
                 id: ctx.params.id
             }); */

            /* messageref.once('value').then(function(snapshot) {

                 console.log("snap.val()", snapshot.key);
                 return new Promise(function(resolve) {
                     resolve({ valid: snapshot.val() })
                 });

                 // ...
             });*/
            /* messageref.set({
                 id: ctx.params.id
             });*/


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

                    resolve({ valid: true, userid: firebase.auth().currentUser.uid });

                }).catch(function(error) {
                    resolve({ valid: false });

                    // An error happened.
                });
            });
        },

        // private funtions are delcared here
        validateUser(ctx) {
            return new Promise(function(resolve) {
                /* firebase.auth().createUserWithEmailAndPassword("test5@gmail.com", "aaaaaa").then(function() {
                     resolve({ valid: true, userid: firebase.auth().currentUser.uid });
                 }).catch(function(error) {
                     resolve({ valid: false });
                     // An error happened.
                 });*/

                firebase.auth()
                    .signInWithEmailAndPassword(ctx.params.username, ctx.params.password)
                    .then(() => {
                        resolve({ valid: true, userid: firebase.auth().currentUser.uid });
                    }).catch((err) => {
                        resolve({ valid: false });
                    })

                /*  firebase.auth().signInWithEmailAndPassword("test5@gmail.com", "aaaaaa").then(function() {
                      resolve({ valid: true, userid: firebase.auth().currentUser.uid });
                  }).catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      resolve({ valid: false });
                      // ...
                  });*/


            });

        },

        updateMessage() {
            var ref = firebase.database().ref();

            var messageref = ref.child("message")
            messageref.once("value")
                .then(function(snapshot) {
                    console.log("snap.val()", snapshot.val());
                });
            messageref.push({
                name: 'chi',
                admin: true,
                count: 1,
                text: "asdas"
            });
            let THIS = this;
            return new Promise(function(resolve) {
                resolve({ valid: true })
            });
        }

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