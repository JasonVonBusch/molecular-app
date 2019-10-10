const moleculer =  require("moleculer");
const HTTPServer = require("moleculer-web");

const brokerNode1 = new moleculer.ServiceBroker({
    nodeID:      "node-1",
    transporter: "NATS"
});

brokerNode1.createService({
    name: "gateway",
    mixins: [HTTPServer],
    settings: {
        routes: [
            {
                aliases: {
                    "GET /products": "products.listProducts",
                    "GET /add":      "math.add",
                    "GET /subtract": "math.subtract",
                    "GET /multiply": "math.multiply",
                    "GET /divide":   "math.divide",
                }
            }
        ]
    }
});

const brokerNode2 = new moleculer.ServiceBroker({
    nodeID:      "node-2",
    transporter: "NATS"
})

brokerNode2.createService({
    name: "products",
    actions: {
        listProducts(ctx) {
            return [
                {name: "Apples",       price: 5},
                {name: "Oranges",      price: 3},
                {name: "Bananas",      price: 2},
                {name: "Watermelons",  price: 4},
                {name: "Strawberries", price: 3},
            ];
        }
    },
});

const brokerNode3 = new moleculer.ServiceBroker({
    nodeID:      "node-3",
    transporter: "NATS"
});

brokerNode3.createService({
    name: "math",
    actions: {
        add(ctx) {      //http://localhost:3000/math/add?a=1&b=2      or use the alias: http://localhost:3000/add?a=1&b=2
            return Number(ctx.params.a) + Number(ctx.params.b);
        },
        subtract(ctx) { //http://localhost:3000/math/subtract?a=2&b=1 or use the alias: http://localhost:3000/subtract?a=2&b=1
            return Number(ctx.params.a) - Number(ctx.params.b);
        },
        multiply(ctx) { //http://localhost:3000/math/multiply?a=2&b=3 or use the alias: http://localhost:3000/multiply?a=2&b=3
            return Number(ctx.params.a) * Number(ctx.params.b);
        },
        divide(ctx) {   //http://localhost:3000/math/divide?a=10&b=5  or use the alias: http://localhost:3000/divide?a=10&b=5
            return Number(ctx.params.a) / Number(ctx.params.b);
        }
    },
});

Promise.all(brokerNode1.start()
          , brokerNode2.start()
          , brokerNode3.start().then(() => brokerNode3.call("math.add", {a: 1, b: 2}))
                               .then(res => console.log("1 + 2 =", res))
                               .then(() => brokerNode3.call("math.subtract", {a: 2, b: 1}))
                               .then(res => console.log("2 - 1 =", res))
                               .then(() => brokerNode3.call("math.multiply", {a: 2, b: 3}))
                               .then(res => console.log("2 * 3 =", res))
                               .then(() => brokerNode3.call("math.divide", {a: 10, b: 5}))
                               .then(res => console.log("10 / 5 =", res)));