var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const FormData = require('form-data');

router.get('/', (req, res, next) => {
    res.status(200).json("OAuth is running...")
});

router.post('/generate', async  (req, res) => {
    const clientId = 'eeb23c3c212d4e0098049e4c8cf06444';
    const clientSecret = '2Hg1dzb9WFKa6o7tVaJ38MMEd4tQdq0C';

    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    try {
        const response = await fetch('https://eu.battle.net/oauth/token', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        res.status(200).json({ message: 'Success', data: data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
})

module.exports = router;