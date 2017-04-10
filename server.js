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

app.get('/', function homepage(req,res){
  res.sendFile(__dirname + '/views/index.html');
});


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

app.get('/api/todos', function index(req,res){
  res.json({todos: todos});
});


//make a new todo 
app.post('/api/todos', function create(req, res) {
  todos.push(req.body);
  var id = todos.length;

  req.body._id = id;
  res.json(req.body);
  
  // assign an id 


});

app.get('/api/todos/:id', function show(req, res) {
  
    res.json(todos[req.params._id-1]);
    
    
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   var todosPut = parseInt(req.params.id);
   
   //filter through all of the todos and find its id#
   var putNewTodo = todos.filter(function (todo){
    return todo._id == todosPut;
   });
    putNewTodo = req.body.task;
    putNewTodo.description = req.body.description;
    res.json(putNewTodo);

});


//todos[req.params._id-1] = req.body;
//res.json(todos[req.params._id-1]);

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
    var todoId = parseInt(req.params.id);
    var deleteTodo = todos.filter(function(todo){
      return todo._id == todoId;
    })[0];
    //allows items to be deleted off of the web page
    todos.splice(todos.indexOf(deleteTodo),1);

    res.json(deleteTodo);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
