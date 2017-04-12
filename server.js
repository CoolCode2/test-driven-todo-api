// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
 { _id: 1, task: 'Laundry', description: 'Wash clothes' },
 { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
 { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];


//no mongoose or mongo requests because there is NO DATABASE for this HW

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

//this enpoint loads the homepage views index.html file
// 
app.get('/', function homepage(req,res){
  res.sendFile(__dirname + '/views/index.html');
});//


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

//GET : get all
app.get('/api/todos', function index(req,res){
  //sends back all of the todos as a json response
  res.json({todos: todos});
});


//POST : create a new todo
app.post('/api/todos', function create(req, res) {
//store the body of the request in a variable
  var newTodoVar = req.body;
  //if the todos array length is > 0 ...
  if (todos.length >0){
    //get the _id: value of the todo that just came in,
    //increments the id number value by one each time one is created
    
    newTodoVar._id = todos[todos.length-1]._id + 1;
  } else {
    //only happens if the todos.length =  0 , we can create a new todo
    //as the first one in the array
    newTodoVar._id = 1;
  }
  //push the incoming todo object into the todos array
  todos.push(newTodoVar);
  //send the todo response as a json object
  res.json(newTodoVar);


});

app.get('/api/todos/:id', function show(req, res) {
      
    // /'req.params.id' is the query string number (:id)
    //that is coming in...
    res.json(todos[req.params.id-1]);
    
    
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

// PUT :  update a single todo by it's id
app.put('/api/todos/:id', function update(req, res) {
  // get url ('params') string, parse it, 
  //get the id of the parsed object and store it in variable
  var getIdofTodo = parseInt(req.params.id);
  console.log(req.params.id);

  // find todo to update by its id
  var putUpdate = todos.filter(function (todo) {
    return todo._id == getIdofTodo;
  })[0];

  // take the req's .task from its .body and store it in putUpdate
  putUpdate.task = req.body.task;

  // take the req's descript from its .body and store it in putUpdate
  putUpdate.description = req.body.description;

  // send back updated todo
  res.json(putUpdate);
});





// DELETE : delete todo
app.delete('/api/todos/:id', function destroy(req, res) {
  // get todo id from url params (`req.params`)
  // and store it in the idTdod var
  var idTodo = parseInt(req.params.id);

  // find todo to delete by its id
  var deleteTodo = todos.filter(function (todo) {
    //filter through all of the todos
    return todo._id == idTodo;
  })[0];

  // remove todo from the todo from the array
  //we are going to splice at the indx of todoDelete, and remove one item
  todos.splice(todos.indexOf(deleteTodo), 1);

  // send back deleted todo
  res.json(deleteTodo);
});

//
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
