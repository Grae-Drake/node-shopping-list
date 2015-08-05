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
    for (var i = 0 ; i < storage.items.length ; i++) {
        if (storage.items[i].id === itemId) {
            var item = storage.items[i];
            response.status(201).json(item);
            storage.items.splice(i, 1);
            return response;
        }
    }

    return response.sendStatus(404);

});

app.put('/items/:id', jsonParser, function(request, response) {

    itemId = parseInt(request.params.id, 10);
    for (var i = 0 ; i < storage.items.length ; i++) {
        if (storage.items[i].id === itemId) {
            storage.items[i].name = request.body.name;
            response.status(201).json(storage.items[i]);
            return response;
        }
    }

    return response.sendStatus(404);

    // if (itemId in storage.items) {
    //     console.log(request.body);
    //     // storage.items[itemId] = request.body[name];
    //     // response.status(201).json(storage.items.items);
    // } else {
    //     return response.sendStatus(404);
    // }
});



app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;


