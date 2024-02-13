const pool = require('../models/dbModel');

const entryController = {
  postEntry: (req, res, next) => {
    const { content } = req.body;
    console.log(req.body);
    // const newEntry = Entry.create(content);

    pool.create({ content })
      .then((entry) => {
        // TODO: decide if send status here or store on locals
        // res.status(200).json(entry);
        res.locals.newEntry = entry;
        next();
      })
      .catch((err) => {
        next(err);
      });
  },

  getEntries: (req, res, next) => {
    pool.find({})
      .then((entries) => {
        res.locals.entries = entries;
        next();
      })
      .catch((err) => {
        next(err);
      });
  },

  deleteEntry: (req, res, next) => {
    // TODO: figure out if id will be sent as params
    const { id } = req.params;
    
    pool.findByIdAndDelete(id)
      .then((deletedEnt) => {
        if (deletedEnt !== null) {
          res.status(200).json({ message: 'Deleted successfully' });
        } else {
          res.status(404).json({ error: 'Entry not found' });
        }
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

};

module.exports = entryController;
