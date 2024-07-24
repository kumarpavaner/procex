sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("ex.project1.controller.proce_ex_view", {
        onInit: function () {

        },

        onPressBtn: function () {
            
            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/addRandomBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();

            request.onload = async function () {
                var data = JSON.parse(this.response);
                console.log(data); // depending on your response targert your desired property.
            }
            
        },

        onPressBtn2: function () {
            
            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/deleteBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();

            request.onload = async function () {
                var data = JSON.parse(this.response);
                console.log(data); // depending on your response targert your desired property.
            }
            
        }


    });
});
