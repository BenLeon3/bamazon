var mysql = require("mysql");
var inquirer = require("inquirer");

// require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
});

function queryAllProducts() {
connection.query("SELECT * FROM products", function(err, res) {
    console.log("item_id " + "product_name " + "department_name " + "price " + "stock_quantity")
    for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");

    productChoice();
});

}

function productChoice() {
    inquirer
        .prompt([{
            name: "chooseProduct",
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
            }
        },
        {
            name: "chooseQuantity",
            type: "input",
            message: "How many would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
            }
        }])
        .then(function(answer) {
            var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.chooseProduct }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                console.log("You chose: " + res[i].product_name + " @ Price: " + res[i].price + " Pesos." + " We have " + res[i].stock_quantity + " in stock.");
            
                    if (res[i].stock_quantity >= answer.chooseQuantity){
                        console.log("Your total is: " + "$" + (answer.chooseQuantity * res[i].price) + "." + " Thank you for shopping at Bamazon!");
                        var updateStock = res[i].stock_quantity - answer.chooseQuantity;
                            // console.log("We have " + updateStock + " " + res[i].product_name + " left in stock");
                            
                            var query = connection.query(
                                "UPDATE products SET ? WHERE ?", 
                                [
                                    {
                                        stock_quantity: updateStock 
                                    },
                                    {
                                        item_id: answer.chooseProduct
                                    }
                                ],
                                function(err, res) {
                                    // console.log(res.affectedRows + " Products updated!");
                                }
                                
                            )
                            
                            function whatNext() {
                                inquirer
                                    .prompt({
                                        name: "action",
                                        type: "rawlist",
                                        message: "What would you like to do next?",
                                        choices: [
                                            "Shop some more deals!",
                                            "Nah I'm good I hate saving money"
                                        ]
                                    })
                                    .then(function(answer) {
                                        switch (answer.action) {
                                        case "Shop some more deals!":
                                            queryAllProducts();
                                            break;
                                        
                                        case "Nah I'm good I hate saving money":
                                            queryAllProducts();
                                            break;
                                        }
                                    })
                            }
                            whatNext();
                    } else if (res[i].stock_quantity <= answer.chooseQuantity){
                        console.log("Sorry there are only " + res[i].stock_quantity + " in stock! Please choose a different quantity.");
                        productChoice();
                    }

            }
                // connection.query(query, { stock_quantity: answer.chooseQuantity }, function(err, res) {
                //     for (var j = 0; j < res.length; j++) {
                //         if(res[j].stock_quantity >= res[j].chooseQuantity){
                //             conosle.log("Processing order...");
                //         }
                //     }
                // })
            // chooseQuantity();
            });
            // for (var i = 0; i < res.length; i++) {
            //             if(res[i].stock_quantity >= res[i].answer){
                                            
            //             }

        });
}

// function chooseQuantity() {
// inquirer
//     .prompt({
//     name: "chooseQuantity",
//     type: "input",
//     message: "How many would you like?",
//     validate: function(value) {
//         if (isNaN(value) === false) {
//         return true;
//         }
//         return false;
//     }
//     })
// .then(function(answer) {
//     var query = "SELECT stock_quantity FROM products WHERE ?";
//     connection.query(query, { stock_quantity: answer.chooseQuantity }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//         if(res[i].stock_quantity >= res[i].answer){
                            
//         }

//         // console.log("You Chose: " + res[i].product_name + " || Price: " + res[i].price + " Pesos");
//         }
//         updateQuantity();
//     });
//     });
// }


                

queryAllProducts();


