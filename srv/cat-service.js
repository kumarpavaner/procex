const cds = require('@sap/cds')
module.exports = async function(){
    const db = await cds.connect.to('db')

    this.on('addRandomBook', async() => {
        try {
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null ,'NEWRECORD')
            const output = await dbConn.callProcedurePromisified(sp,[])
            console.log(output.results)
            return output.results
        } catch(error) {
            console.error(error)
            return {}
        }
    })

    this.on('deleteAllBooks', async() => {
        try {
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null ,'DELETEALL')
            const output = await dbConn.callProcedurePromisified(sp,[])
            console.log(output.results)
            return output.results
        } catch(error) {
            console.error(error)
            return {}
        }
    })

    this.on('deleteBook', async(req) => {
        try {
            const ID = req.data.ID
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null ,'DELETERECORD')
            const output = await dbConn.callProcedurePromisified(sp,[ID])
            console.log(output.results)
            return output.results
        } catch(error) {
            console.error(error)
            return {}
        }
    })

    this.on('addBook', async(req) => {
        try {
            const ID = req.data.ID
            const TITLE = req.data.TITLE
            const STOCK = req.data.STOCK
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null ,'ADDRECORD')
            const output = await dbConn.callProcedurePromisified(sp,[ID,TITLE,STOCK])
            //output = await cds.run('ADDRECORD(?,?,?,?)',[ID,TITLE,STOCK]);
            console.log(output.results)
            return output.results
        } catch(error) {
            console.error(error)
            return {}
        }
    })

    this.on('updateBook', async(req) => {
        try {
            const ID = req.data.ID
            const TITLE = req.data.TITLE
            const STOCK = req.data.STOCK
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null ,'UPDATERECORD')
            const output = await dbConn.callProcedurePromisified(sp,[ID,TITLE,STOCK])
            //output = await cds.run('ADDRECORD(?,?,?,?)',[ID,TITLE,STOCK]);
            console.log(output.results)
            return output.results
        } catch(error) {
            console.error(error)
            return {}
        }
    })

}