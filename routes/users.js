const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

router.post('/', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const users = JSON.parse(data);
            const newUser = {
                id: uuidv4(),
                name: req.body.name,
                score: req.body.score,
            };
            users.push(newUser);
            fs.writeFile(
                './data/users.json',
                JSON.stringify(users),
                (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send(newUser);
                    }
                }
            );
        }
    });
});

router.patch('/:id', (req, res) => {
    // const abc = req;
    console.log(req.body);
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const users = JSON.parse(data);
            const index = users.findIndex(
                (user) => user.id == req.params.id
            );
            if (index === -1) {
                res.status(404).send(
                    `User Not Found ${req.params.id}`
                );
            } else {
                const updatedUser = {
                    id: req.params.id,
                    name: req.body.userData.name,
                    score: req.body.userData.score,
                };
                users[index] = {
                    ...updatedUser,
                };
                fs.writeFile(
                    './data/users.json',
                    JSON.stringify(users),
                    (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send(
                                'Internal Server Error'
                            );
                        } else {
                            res.send(users[index]);
                        }
                    }
                );
            }
        }
    });
});

module.exports = router;
