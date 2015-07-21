var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function () {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', function(request, response) {

    itemId = parseInt(request.params.id, 10);
    console.log(itemId, typeof(itemId));
    if (itemId in storage.items) {
        var item = storage.items[itemId];
        response.status(201).json(item);
        delete storage.items[itemId];
        console.log(storage.items);
        return response;
    } else {
        return response.sendStatus(404);
    }

});

app.put('/items/:id', function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    var itemId = request.params.id;

    if (itemId in storage.items) {
        console.log(request.body);
        // storage.items[itemId] = request.body[name];
        // response.status(201).json(storage.items.items);
    } else {
        return response.sendStatus(404);
    }
});

app.listen(process.env.PORT || 8080);
