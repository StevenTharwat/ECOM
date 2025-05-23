import * as userDB from './userDB.js'
import * as productDB from './productDB.js'

const f = function(){

}
/*
get all orders from all users => getOrders();
get orders by userId => getOrders(userId);
get orders by sellerId => getOrders(null,sellerId);
get orders in specific user and sellerId => getOrders(userId,sellerId);
*/
export const get = async function(userId=null, sellerId=null){
    debugger
    let role = atob( localStorage.getItem(btoa('role')));
    let localStorageId = atob( localStorage.getItem('login'));
    if(role == 'seller'){
        sellerId = localStorageId;
    }else if(role == 'buyer'){
        userId = localStorageId;
    }
    let allOrders = []; 
    let allProducts = await productDB.get();
    let allUsers = await userDB.get();debugger;
    let users = allUsers.filter(us => us.id == userId);
    for (const user of users) {
        let userOlders =user.orders;
        //fileter by sellerId if not null
        if(sellerId) userOlders = userOlders.filter(order=>order.sellerId == sellerId);
        for (const order of userOlders) {
            debugger
            let product = allProducts.find(pr=>pr.id == order.productId);
            let seller = allUsers.find(us=>us.id == product.sellerId);
            allOrders.push(new Order(order.id, product.id, product.name, order.quantity, order.status, product.sellerId, seller.name,user.id,user.name));
        }
    }
    return allOrders;
}

const EditOrder =async function(order, method){
    //search for user
    let user = await userDB.getUserByOrderId(order.id);
    if(!user) {
        let id = atob( localStorage.getItem("login"));
        user = await userDB.getUserById(id);
    }
    if(user){
        debugger
        //delete order
        if(method == 'd' || method == 'u')user.orders = user.orders.filter(or=>or.id !== order.id);
        
        if(method == 'u' || method == 'a') user.orders.push(order);
  
        await userDB.Update(user);
    }
}
export const add = async function(order){
    if(order instanceof Order)
        await EditOrder(order, 'a');
}

export const Update = async function(order){
    
    if(order instanceof Order)
        await EditOrder(order, 'u');
}

export const Delete = async function(order){
   
    if(order instanceof Order)
        await EditOrder(order, 'd');
}

export const getStatus = function(){
    return ['Pending', 'shipped', 'delivered', 'canceled'];
}

export class Order {
    id; //generated by server
    productId;
    productName;
    quantity;
    status;
    sellerId; //d
    sellerName; //d
    userId;
    buyerUser; //d
    CreatedAt;
    constructor(_id,_productId,_productName,_quantity,_status=null,_sellerId,_sellerName,_userId,_buyerUser, _createdAt = null){
        debugger
        if(!_status || _status == null){
            _status = getStatus()[0]; 
        }
        if(!_createdAt || _createdAt == null){
            _createdAt = new Date().toLocaleDateString('en-GB');
        }
        debugger
        this.id = _id == null?crypto.randomUUID():_id;
        this.productId = _productId;
        this.productName = _productName;
        this.quantity = _quantity;
        this.status = _status;
        this.sellerId = _sellerId;
        this.sellerName = _sellerName;
        this.userId = _userId;
        this.buyerUser = _buyerUser;
        this.CreatedAt = _createdAt;
    }

    toJSON() {
        return {
          id: this.id,
          productId: this.productId,
          quantity: this.quantity.toString(),
          sellerId: this.sellerId,
          status: this.status,
          createdAt: this.CreatedAt
        };
    }
}