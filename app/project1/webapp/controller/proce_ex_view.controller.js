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

        onPressBtn3: function () {
            
            return new Promise((resolve, reject) => { 

                //const sender = this.getView().byId('sender').getSelectedItem().getKey();
                const oActionODataContextBinding = this.oDataModel.bindContext("/addRandomBook()");
                //oActionODataContextBinding.setParameter("sender", sender);
                oActionODataContextBinding.execute().then(()=> {
                    //const oActionContext = oActionODataContextBinding.getBoundContext();
                    //console.log(oActionContext.getObject());
                    MessageToast.show("Record added successfully!")                
                    resolve();
                });        });
            
        },

        onPressBtn2: function () {
            
            this.getView().bindElement("/Books");
            const bindingContext = this.getView();

            const oAction = this.getView().getModel().bindContext( "my.bookshop.srv.CatalogService.addRandomBook()", bindingContext );

            
            console.log(oAction);
        }
    });
});
