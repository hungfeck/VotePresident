const MongoClient  = require('mongodb').MongoClient ;

class ManageMogodb{
    constructor(){
        this.url = "mongodb://10.103.18.35:27017/";
    }

    GetData(callback) {
        MongoClient.connect(this.url, (err, db)=>{
            if (err) 
            {
                throw err;
            }
            else{
                var dbo = db.db("vote");
                dbo.collection('voting2018').find().toArray( (err,item)=>{
                    callback(item);
                });
            }
            db.close();
        })
    }

    Vote(data,callback){
        MongoClient.connect(this.url, (err, db)=>{
            if (err) throw err;
            else{
                var dbo = db.db("vote");
                dbo.collection('voting2018').update({"name":data.name}, { $inc: { value: 1 }});
                callback();
            }
            db.close();
        })
    }

}

module.exports = new ManageMogodb();