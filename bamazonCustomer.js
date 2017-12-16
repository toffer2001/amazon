var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Goldgold3056",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    listInventory();
    
});

function listInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        // connection.end();
        start(res);
    });
}


function start(res) {
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "Enter product ID you are interested in?"
            },
            {
                type: "input",
                name: "units",
                message: "How many units would you like to buy?"
            }
        ])
        .then(function (answer) {
            
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.item_id },function (err, data) {
                if (err) throw err;
                
                // console.log(data);
                console.log("You selected " + data[0].product_name);
                // console.log("there are " + data[0].stock_quantity + " left.");

                if (answer.units <= data[0].stock_quantity) {
                    data[0].stock_quantity -= answer.units;
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: data[0].stock_quantity
                            },
                            {
                                item_id: answer.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw error;

                        }
                    );
                    console.log("You ordered " + answer.units + " items and there are now " + data[0].stock_quantity + " left.");
                var orderTotal = data[0].price * answer.units;
                console.log("Your total order is $" + orderTotal);
                console.log("--------------------------");
                start(res);
                }
                
                else {
                console.log("Insufficient quantity! Please place order again");
                console.log("--------------------------");
                start(res);
                };
            });
        });
    }


                // answer.item_id -= 1;
                // for (var i = 0; i < res.length; i++) {
                //     if (res[i].item_id == (answer.item_id) ) {
                //     var productID = answer.item_id;
                //     }
                // }
            
//                 // console.log("You want " + res[productID].stock_quantity);

//             if (answer.units <= res[answer.item_id].stock_quantity) {
//                 res[answer.item_id].stock_quantity -= answer.units;
//                 connection.query("UPDATE products SET ? WHERE ?",
//                         [
//                             {
//                                 stock_quantity: res[answer.item_id].stock_quantity
//                             },
//                             {
//                                 item_id: answer.item_id
//                             }
//                         ],
//                         function (error) {
//                             if (error) throw err;

//                         }
//                 );
//                 console.log("You ordered " + answer.units + " items and there are now " + res[answer.item_id].stock_quantity + " left.");
//                 var orderTotal = res[answer.item_id].price * answer.units;
//                 console.log("Your total order is $" + orderTotal);
//                 console.log("--------------------------");
//                 start(res);
//                 }
            
//             else {
//                 console.log("Insufficient quantity! Please place order again");
//                 console.log("--------------------------");
//                 start(res);
//             };
//          });
// }





//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }


// function bidAuction() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM auctions", function (err, results) {
//         if (err) throw err;
//         // once you have the items, prompt the user for which they'd like to bid on
//         inquirer
//             .prompt([
//                 {
//                     name: "choice",
//                     type: "rawlist",
//                     choices: function () {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].item_name);
//                         }
//                         return choiceArray;
//                     },
//                     message: "What auction would you like to place a bid in?"
//                 },
//                 {
//                     name: "bid",
//                     type: "input",
//                     message: "How much would you like to bid?"
//                 }
//             ])
//             .then(function (answer) {
//                 // get the information of the chosen item
//                 var chosenItem;
//                 for (var i = 0; i < results.length; i++) {
//                     if (results[i].item_name === answer.choice) {
//                         chosenItem = results[i];
//                     }
//                 }

//                 // determine if bid was high enough
//                 if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                     // bid was high enough, so update db, let the user know, and start over
//                     connection.query(
//                         "UPDATE auctions SET ? WHERE ?",
//                         [
//                             {
//                                 highest_bid: answer.bid
//                             },
//                             {
//                                 id: chosenItem.id
//                             }
//                         ],
//                         function (error) {
//                             if (error) throw err;
//                             console.log("Bid placed successfully!");
//                             start();
//                         }
//                     );
//                 }
//                 else {
//                     // bid wasn't high enough, so apologize and start over
//                     console.log("Your bid was too low. Try again...");
//                     start();
//                 }
//             });
//     });
// }
