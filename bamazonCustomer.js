var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Lucky1330!",
  database: "bamazon_db"
});

// // connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the show products function after the connection is made to prompt the user
  show_products();
});

function show_products () {
    connection.query("select * from products", function (err, res) {
        if (err) throw err;
console.table (res);
start (res);
});
}

// function which prompts the user for what action they should take
function start(inventory) {
  inquirer
    .prompt({
      name: "purchase choice",
      type: "input",
      message: "What is the ID of the product you would like to purchase?"
    })
    .then(function(answer) {
      // based on their answer,
      var choiceID = parseInt (answer.choice)
      var product = checkInventory (choiceID, inventory)
      if (product) {
        askQuantity (product);
      }
      else {
        console.log ("Sorry, we don't have that item in stock.")
         show_products();  
      }
        console.log (answer);
    });
}
function askQuantity(product) {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many of this item would you like to purchase?"
    })
    .then(function(answer) {
      // based on their answer,
      var quantity = parseInt (answer.quantity)
      if (quantity > product.stock_quantity) {
        console.log ("Sorry, this quantity is not in stock.");
        show_products();
      }
      else {
        purchase (product, quantity)
      }
        
    });
  }

    function purchase (product, quantity) {
    connection.query("Update products Set stock_quantity=stock_quantity - ? where item_id = ?"[quantity, product.item_id] , function (err, res){
      console.log ("Successfully purchased!")
      if (err) throw err;
    show_products ();
  });
  }

  function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
    return null;
 }



// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
