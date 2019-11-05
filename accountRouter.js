const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    const { limit, sortby, sortdir } = req.query
    db('accounts').orderBy(sortby || 'id', sortdir).limit(limit)
        .then(accounts => {
            res.json(accounts);
        })
        .catch(error => {
            res.status(500).json ({ message: 'something went wrong accessing data' + error.message });
        });
});

router.get('/:id', async (req, res) => {
    try {
        const account = await db('accounts').where({ id: req.params.id });
        res.json(account[0]);
    } catch (error) {
        res.status(500).json ({ message: 'something went wrong accessing data' + error.message });
    }
})

router.post('/', (req, res) => {
    db('accounts').insert({ name: req.body.name, budget: req.body.budget })
        .then(newId => {
            res.json('New account created with id of ' + newId);
        })
        .catch(error => {
            res.status(500).json ({ message: 'something went wrong accessing data' + error.message });
        })
})

router.put('/:id', async (req, res) => {
    try {
        const result = await db('accounts').where({ id: req.params.id }).update({
                            name: req.body.name,
                            budget: req.body.budget
                        });
        res.json(result + ' account(s) got updated');
    } catch (error) {
        res.status(500).json ({ message: 'something went wrong accessing data' + error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await db('accounts').where({ id: req.params.id }).del();
        res.json(result + ' succeeded');
    } catch (error) {
        res.status(500).json ({ message: 'something went wrong accessing data' + error.message });
    }
})

module.exports = router;