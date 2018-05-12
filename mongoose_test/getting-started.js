const util = require('util');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!');
  var kittySchema = mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  const a1 = Object.getOwnPropertyNames(silence);
  const a2 = Object.getOwnPropertyNames(Object.getPrototypeOf(silence));
  const a21 = Object.getPrototypeOf(silence).constructor;
  // const a3 = Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(silence)));
  // const a31 = Object.getPrototypeOf(Object.getPrototypeOf(silence)).constructor;
  console.log(silence.name, "\n", a1, "\n", a2, "\n", a21, "\n"); // 'Silence'
  const b1 = util.inspect(silence, {
    showHidden: false,
    depth: 2,
    colors: true,
    showProxy:true,
    maxArrayLength: 100,
    breakLength:60
  });
  console.log(b1);
  // silence.save((err, fluffy) => {
  //   if (err) return console.error(err);
  // });

  var fluffy = new Kitten({ name: 'fluffy' });
  // fluffy.speak(); // "Meow name is fluffy"

  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   fluffy.speak();
  // });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

  Kitten.find({ name: /^fluff/ }, (err, kittens) => {
    if (err) return console.error(err);
    console.log(kittens);
  });
});
