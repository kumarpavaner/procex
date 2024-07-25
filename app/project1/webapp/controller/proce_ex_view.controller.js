sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Label",
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/m/Text",
    "sap/m/Input",
	"sap/m/TextArea"
],
function (Controller, HorizontalLayout, VerticalLayout, Dialog, Button, Label, mobileLibrary, MessageToast, Text,Input, TextArea) {
    "use strict";
	// shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;
    return Controller.extend("ex.project1.controller.proce_ex_view", {
        onInit: function () {

 
           
        },

        makePostCall: function (url) { // here the data and url are not hardcoded anymore
                
             
            return $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                contentType: "application/json;charset=utf-8"
            });
        },

        onPressBtn: function () {
            var oThis = this;

            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/addRandomBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();

            request.onload = async function () {
                var data = JSON.parse(this.response);
                oThis.getView().byId("idProductsTable").getModel().refresh();
                console.log(data); // depending on your response targert your desired property.
            }

        },

        onPressBtn2: function () {
            var oThis = this;
            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/deleteAllBooks'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();

            request.onload = async function () {
                var data = JSON.parse(this.response);
                oThis.getView().byId("idProductsTable").getModel().refresh();
                console.log(data); // depending on your response targert your desired property.
            }

            
        },

        onPressBtn3: function (oEvent) {
            var oThis = this;
            var ID = oEvent.getSource().getBindingContext().getObject().ID;
            var params = { 'ID':ID };

            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/deleteBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(params));

            request.onload = async function () {
                var data = JSON.parse(this.response);
                oThis.getView().byId("idProductsTable").getModel().refresh();
                console.log(data); // depending on your response targert your desired property.
            }

            
        },

        createDailog: function () {

			if (!this.oConfirmDialog) {
				this.oConfirmDialog = new Dialog({
					type: DialogType.Message,
					title: "Create",
					content: [
						new HorizontalLayout({
							content: [
								new VerticalLayout({class:"sapUiContentPadding", 
									content: [
                                        new Label({id:"lbl-idcr",labelFor:"idcr",text:"Id"}),
										new Input({ id: "idcr",type:"Number" }),
                                        new Label({id:"lbl-idcr2",labelFor:"idcr2",text:"Title"}),
										new Input({ id: "idcr2" }),
                                        new Label({id:"lbl-idcr3",labelFor:"idcr3",text:"Stock"}),
										new Input({ id: "idcr3" })
									]
								})
							]
						})
					],
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Submit",
						press: function (oEvent) {
                            var Id = sap.ui.getCore().byId("idcr").getValue();
                            var Title = sap.ui.getCore().byId("idcr2").getValue();
                            var Stock = sap.ui.getCore().byId("idcr3").getValue();
                            if(Id !="" && Title != "" && Stock != ""){
                                this.runCreate(Id,Title,Stock);
							    this.oConfirmDialog.close();
                                sap.ui.getCore().byId("idcr").setValue("");
                                sap.ui.getCore().byId("idcr2").setValue("");
                                sap.ui.getCore().byId("idcr3").setValue("");
                            } else {
                                MessageToast.show("Please enter all values");
                            }

						}.bind(this)
					}),
					endButton: new Button({
						text: "Cancel",
						press: function () {
							this.oConfirmDialog.close();
                            sap.ui.getCore().byId("idcr").setValue("");
                            sap.ui.getCore().byId("idcr2").setValue("");
                            sap.ui.getCore().byId("idcr3").setValue("");
						}.bind(this)
					})
				});
			}

			this.oConfirmDialog.open();

        },

        runCreate: function(Id,Title,Stock) {
 
            var oThis = this;
            Id = parseInt(Id,10);
            Stock = parseInt(Stock,10)
            var params = { 'ID':Id,'TITLE':Title, 'STOCK':Stock };

            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/addBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(params));

            request.onload = async function () {
                var data = JSON.parse(this.response);
                oThis.getView().byId("idProductsTable").getModel().refresh();
                console.log(data); // depending on your response targert your desired property.
            }

        },

        updateDailog: function (oEvent) {

			if (!this.oUpdateDialog) {
				this.oUpdateDialog = new Dialog({
					type: DialogType.Message,
					title: "Create",
					content: [
						new HorizontalLayout({
							content: [
								new VerticalLayout({class:"sapUiContentPadding", 
									content: [
                                        new Label({id:"lbl-idcr4",labelFor:"idcr4",text:"Id"}),
										new Input({ id: "idcr4",type:"Number", editable:false }),
                                        new Label({id:"lbl-idcr5",labelFor:"2idcr5",text:"Title"}),
										new Input({ id: "idcr5" }),
                                        new Label({id:"lbl-idcr6",labelFor:"2idcr6",text:"Stock"}),
										new Input({ id: "idcr6" })
									]
								})
							]
						})
					],
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Submit",
						press: function (oEvent) {
                            var Id = sap.ui.getCore().byId("idcr4").getValue();
                            var Title = sap.ui.getCore().byId("idcr5").getValue();
                            var Stock = sap.ui.getCore().byId("idcr6").getValue();
                            if(Id !="" && Title != "" && Stock != ""){
                                this.runUpdate(Id,Title,Stock);
							    this.oUpdateDialog.close();
                                sap.ui.getCore().byId("idcr4").setValue("");
                                sap.ui.getCore().byId("idcr5").setValue("");
                                sap.ui.getCore().byId("idcr6").setValue("");
                            } else {
                                MessageToast.show("Please enter all values");
                            }

						}.bind(this)
					}),
					endButton: new Button({
						text: "Cancel",
						press: function () {
							this.oUpdateDialog.close();
                            sap.ui.getCore().byId("idcr4").setValue("");
                            sap.ui.getCore().byId("idcr5").setValue("");
                            sap.ui.getCore().byId("idcr6").setValue("");
						}.bind(this)
					})
				});
			}

            sap.ui.getCore().byId("idcr4").setValue(oEvent.getSource().getBindingContext().getObject().ID);
            sap.ui.getCore().byId("idcr5").setValue(oEvent.getSource().getBindingContext().getObject().TITLE);
            sap.ui.getCore().byId("idcr6").setValue(oEvent.getSource().getBindingContext().getObject().STOCK);

			this.oUpdateDialog.open();

        },

        runUpdate: function(Id,Title,Stock) {
 
            var oThis = this;
            Id = parseInt(Id,10);
            Stock = parseInt(Stock,10)
            var params = { 'ID':Id,'TITLE':Title, 'STOCK':Stock };

            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('POST', '/odata/v4/catalog/updateBook'); // Open a new connection, using the GET request on the URL endpoint
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(params));

            request.onload = async function () {
                var data = JSON.parse(this.response);
                oThis.getView().byId("idProductsTable").getModel().refresh();
                console.log(data); // depending on your response targert your desired property.
            }

        },


    });
});
