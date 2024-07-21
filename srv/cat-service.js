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
}