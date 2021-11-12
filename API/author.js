const OurApp = require("express").Router();
const AuthorModel = require("../schema/author");

// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// Route     /author/new
// Description add new author
// Access PUBLIC
// Parameters NONE
// METHOD POST
OurApp.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;

    AuthorModel.create(newAuthor);

    return res.json({ message: "Author added to the database" });
});


// Route       /author/updateName
// Description Update name of the author
// Access      Public
// Parameters  id
// Method      Put
// Params in the req.body are always in string format
OurApp.put("/update/name/:id/:name", async(req, res) => {
    try{
      const updatedAuthor = await AuthorModel.findOneAndUpdate(
          {
              id : req.params.id,
          },
          {
              name : req.params.name,
          },
          {
              new : true
          }
      )
      res.json({ author: updatedAuthor });
      }catch(error){
        res.json({error : error})
      }
    });



/*
Route               /author/delete
Description         delete an author
Access              PUBLIC
Parameters          id
Method              DELETE
*/
OurApp.delete("/author/delete/:id", (req, res) => {
    const { id } = req.params;

    const filteredAuthors = Database.Author.filter(
        (author) => author.id !== parseInt(id)
    );

    Database.Author = filteredAuthors;

    return res.json(Database.Author);
});

module.exports = OurApp;