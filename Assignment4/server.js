//099XI9MtcV54n3hs
const { MongoClient, ObjectId } = require("mongodb");
const url =
    "mongodb+srv://NedasSmigelskas:099XI9MtcV54n3hs@cluster0.6mzz2tw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

const db = client.db('store');
const customersDB = db.collection('customers');
const itemsDB = db.collection('items');
const ordersDB = db.collection('orders');

async function insertCustomer(details) {
    try {
        await customersDB.insertOne(details);
        console.log("Customer inserted successfully");
    } catch (err) {
        console.error("Error inserting customer:", err);
    }
}

async function insertItems(details) {
    try {
        await itemsDB.insertOne(details);
        console.log("item inserted successfully");
    } catch (err) {
        console.error("Error inserting customer:", err);
    }
}

async function placeOrder(customerID, itemIDs) {
    try {
        await ordersDB.insertOne({ customerID, items: itemIDs });
        console.log("Order placed successfully");
    } catch (err) {
        console.error("Error placing order")
    }
}

async function getCustomer(firstName) {
    try {
        return await customersDB.findOne({ firstName });
    } catch (err) {
        console.error("Error retrieving Customer:", err);
    }
}

async function getItem(id) {
    try {
        return await itemsDB.findOne({ _id });
    } catch (err) {
        console.error("Error retrieving item:", err);
    }
}

async function getOrder(id) {
    try {
        return await ordersDB.findOne({ _id });
    } catch (err) {
        console.error("Error retrieving Order:", err);
    }
}

async function updateCustomer(query, updatedDetails) {
    try {
        await customersDB.updateOne(query,{$set : updatedDetails});
        console.log("Customer updated successfully");
    } catch (err) {
        console.error("Error updating customer:", err);
    }
}

async function updateItem(itemId, updatedDetails) {
    try {
        await itemsDB.updateOne(query,{$set : updatedDetails});
        console.log("Item updated successfully");
    } catch (err) {
        console.error("Error updating item:", err);
    }
}

async function updateOrder(orderId, updatedDetails) {
    try {
        await ordersDB.updateOne(query,{$set : updatedDetails});
        console.log("order updated successfully");
    } catch (err) {
        console.error("Error updating order:", err);
    }
}

async function deleteCustomer(query) {
    try {
        const result = await customersDB.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log("Customer deleted successfully");
        } else {
            console.log("Customer not found");
        }
    } catch (err) {
        console.error("Error deleting customer:", err);
    }
}

async function deleteItems(query) {
    try {
        const result = await itemsDB.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log("Item deleted successfully");
        } else {
            console.log("Item not found");
        }
    } catch (err) {
        console.error("Error deleting item:", err);
    }
}

async function deleteOrder(query) {
    try {
        const result = await ordersDB.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log("Order deleted successfully");
        } else {
            console.log("Order not found");
        }
    } catch (err) {
        console.error("Error deleting order:", err);
    }
}

//code for customers items and orders is similar if not the same most of the time,
//so I only wrote in the examples for a customer being modified
//feel free to try out the others
connect().then(async () => {
    const customerdetails = {
        title: 'Mr',
        firstName: 'Test',
        surname: 'Test',
        mobile: '123456',
        email: 'randomemail@gmail.com',
        address: {
            addressLine1: 'Somewhere',
            town: 'Nowhere',
            county: 'Dublin',
            eircode: 'fdsh'
        }
    };
    const customerdetails2 = {
        title: 'Mr',
        firstName: 'Test0',
        surname: 'Test',
        mobile: '123456',
        email: 'randomemail@gmail.com',
        address: {
            addressLine1: 'Somewhere',
            town: 'Nowhere',
            county: 'Dublin',
            eircode: 'fdsh'
        }
    };
    const itemdetails = {
        manufacturer: 'Samsung',
        model: 'S24+',
        price: '1300'
    };
    await insertCustomer(customerdetails);
    await insertCustomer(customerdetails2);
    await insertItems(itemdetails);
    const customer = await customersDB.findOne({ firstName: 'Test' });
    const item = await itemsDB.findOne({ manufacturer: 'Samsung' });
    const order = {
        customerId: { id: customer._id },
        items: { 1: [item._id] }
    };
    await placeOrder(order);
    const newdetails = {firstName : "NewTest"};
    await updateCustomer({firstName : 'Test0'},newdetails);
    //await deleteCustomer({firstName : "Test"}); //uncomment to test delete
}).catch(console.error);
