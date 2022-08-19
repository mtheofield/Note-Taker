const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const { v4: uuidv4 } = require('uuid');

module.exports = (app) =>{

    app.get("/api/notes", (req, res) => {
       
        res.json(data);

    });

    app.get("/api/notes/:id", (req, res) =>{

        res.json(data[Number(req.params.id)]);

    });


    app.post("/api/notes", (req, res) =>{

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uuidv4();
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) =>{
            if (err) throw (err);        
        }); 

        res.json(data);    

    });
    
    app.delete("/api/notes/:id", (req, res) =>{

        let noteId = req.params.id;
        console.log(`Deleting note and the unique id ${noteId}`);
        data = data.filter(thisNote => {
           return thisNote.id != noteId;
        });
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 
    
}


