const express = require('express');
const app = express();
const port = 8000; 

const pokemonData = {
    normal: {
        weakTo: ['fighting'],
        resistantTo: [],
        imuneTo: ['ghost'],
        color: '#A8A77A',
    },
    fighting: {
        weakTo: ['flying', 'psychic', 'fairy'],
        resistantTo: ['rock', 'bug', 'dark'],
        imuneTo: [],
        color: '#C22E28',
    },
    flying: {
        weakTo: ['rock', 'electric', 'ice'],
        resistantTo: ['fighting', 'bug', 'grass'],
        imuneTo: ['ground'],
        color: '#A98FF3',
    },
    poison: {
        weakTo: ['ground', 'psychic'],
        resistantTo: ['fighting', 'bug', 'grass', 'poison', 'fairy'],
        imuneTo: [],
        color: '#A33EA1',
    },
    ground: {
        weakTo: ['water', 'grass', 'ice'],
        resistantTo: ['poison', 'rock'],
        imuneTo: ['electric'],
        color: '#E2BF65',
    },
    rock: {
        weakTo: ['water', 'grass', 'steel', 'ice', 'fighting'],
        resistantTo: ['normal', 'flying', 'poison', 'fire'],
        imuneTo: [],
        color: '#B6A136',
    },
    bug: {
        weakTo: ['flying', 'fire', 'rock'],
        resistantTo: ['grass', 'fighting', 'ground'],
        imuneTo: [],
        color: '#A6B91A',
    },
    ghost: {
        weakTo: ['ghost', 'dark'],
        resistantTo: ['poison', 'bug'],
        imuneTo: ['normal', 'fighting'],
        color: '#735797',
    },
    steel: {
        weakTo: ['fighting', 'fire', 'ground'],
        resistantTo: ['psychic', 'bug', 'normal', 'flying', 'rock', 'dragon', 'steel', 'grass', 'ice', 'fairy'],
        imuneTo: ['poison'],
        color: '#B7B7CE',
    },
    fire: {
        weakTo: ['water', 'ground', 'rock'],
        resistantTo: ['grass', 'ice', 'fire', 'fairy', 'steel', 'bug'],
        imuneTo: [],
        color: '#EE8130',
    },
    water: {
        weakTo: ['electric', 'grass'],
        resistantTo: ['fire', 'water', 'ice', 'steel'],
        imuneTo: [],
        color:'#6390F0',
    },
    grass: {
        weakTo: ['poison', 'flying', 'bug', 'fire', 'ice'],
        resistantTo: ['ground', 'water', 'grass', 'electric'],
        imuneTo: [],
        color: '#7AC74C',
    },
    electric: {
        weakTo: ['ground'],
        resistantTo: ['flying', 'steel', 'electric'],
        imuneTo: [],
        color: '#F7D02C',
    },
    psychic: {
        weakTo: ['dark', 'ghost', 'bug'],
        resistantTo: ['fighting', 'psychic'],
        imuneTo: [],
        color: '#F95587',
    },
    ice: {
        weakTo: ['fire', 'steel', 'rock', 'fighting'],
        resistantTo: ['ice'],
        imuneTo: [],
        color: '#96D9D6',
    },
    dragon: {
        weakTo: ['ice', 'dragon', 'fairy'],
        resistantTo: ['fire', 'water', 'grass', 'electric'],
        imuneTo: [],
        color: '#6F35FC',
    },
    dark: {
        weakTo: ['fighting', 'bug', 'fairy'],
        resistantTo: ['ghost', 'dark'],
        imuneTo: ['psychic'],
        color: '#705746',
    },
    fairy: {
        weakTo: ['poison', 'steel'],
        resistantTo: ['bug', 'dark', 'fighting'],
        imuneTo: ['dragon'],
        color: '#D685AD',
    },
    null: {
        weakTo: [],
        resistantTo: [],
        imuneTo: [],
        color: '#777',
    },
};

const validApiKey = 'myKey';

function verifyApiKey(req, res, next) {
    const apiKey = req.query.apiKey || req.headers['x-api-key'];
    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
}
//http://localhost:8000/api?apiKey=myKey
app.use('/api', verifyApiKey);

app.get('/api', (req, res) => {
    res.send({ data: 'ola' });
});

app.get('/pokemon/types', (req, res) => {
    const allTypes = Object.keys(pokemonData);
    res.json({ types: allTypes });
});

app.get('/pokemon/:type', (req, res) => {
    const type = req.params.type.toLowerCase();

    if (pokemonData[type]) {
        res.json(pokemonData[type]);
    } else {
        res.status(404).json({ error: 'Pokemon type not found' });
    }
});

app.get('/pokemon/:type/weaknesses', (req, res) => {
    const type = req.params.type.toLowerCase();
    if (pokemonData[type]) {
        const weaknesses = pokemonData[type].weakTo;
        res.json({ weaknesses });
    } else {
        res.status(404).json({ error: 'Pokemon type not found' });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

