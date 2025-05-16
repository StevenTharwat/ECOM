import * as dbGate from './dbGate.js'
import * as userDB from './userDB.js'
let mainURL = 'http://localhost:3000/products';

export const get = async function(id=null, method='s'){
    let role = atob( localStorage.getItem(btoa('role')));
    let localStorageId = atob( localStorage.getItem('login'));
    let users = await userDB.get();
    let products = []
    let data = await dbGate.get(mainURL,id);
    for (const el of data) {
        let sellerName = (users.find(us => us.id === el.sellerId))?.name;
        if(!sellerName) sellerName = '';
        products.push(new Product(el.id, el.name, el.price, el.cat, el.img, el.sellerId , sellerName, el.status, el.CreatedAt));
    }
    if(role == 'seller' && method=='s'){
        products = products.filter(pr=>pr.sellerId == localStorageId);
    }
    return products
}

export const add = async function(product){
    if(product instanceof Product)
        await dbGate.post(mainURL,product);
}

export const Update = async function(product){
    if(product instanceof Product)
        await dbGate.update(mainURL,product.id,product);
}

export const Delete = async function(product){
    if(product instanceof Product)
        await dbGate.del(mainURL,product.id);
}
export const getStatus = function(){
    return ['Pending', 'Approved', 'not Approved'];
}

export const getCat = function(){
    return [ 'electronics', 'furniture', 'clothing', 'toys', 'books', 'sports', 'food','Phones', 'health', 'beauty', 'automotive', 'jewelry', 'home', 'garden', 'office', 'pet supplies', 'baby', 'music', 'movies', 'video games', 'software', 'tools', 'hardware', 'outdoor', 'travel', 'gifts', 'seasonal', 'collectibles', 'art', 'crafts', 'hobbies', 'photography', 'watches', 'accessories', 'shoes', 'bags', 'luggage', 'sunglasses', 'eyewear', 'headphones', 'speakers', 'cameras', 'drones', 'smartphones', 'tablets', 'computers', 'laptops', 'desktops', 'monitors', 'printers', 'scanners', 'routers', 'modems', 'networking devices', 'smart home devices', 'wearable technology', 'fitness trackers', 'smartwatches', 'virtual reality', 'augmented reality', '3D printing', 'robotics', 'diy electronics', 'arduino', 'raspberry pi', 'iot devices', 'home automation', 'home security', 'home entertainment', 'home theater', 'home audio', 'home video', 'home appliances', 'kitchen appliances', 'laundry appliances', 'cleaning appliances', 'heating and cooling appliances', 'air conditioning', 'heating systems', 'ventilation systems', 'water heaters', 'water filtration', 'water softeners', 'plumbing fixtures', 'bathroom fixtures', 'kitchen fixtures', 'lighting fixtures', 'ceiling fans', 'outdoor lighting', 'landscaping', 'gardening tools', 'lawn care', 'pest control', 'fertilizers', 'soil amendments', 'plant food', 'plant care', 'plant protection', 'plant support', 'plant containers', 'plant pots', 'plant stands', 'plant shelves', 'plant hangers'];
}

export class Product {
    id; //code
    name;
    price;
    cat;
    img;
    sellerId;
    sellerName;
    status;
    CreatedAt;
    constructor(_id, _name, _price, _cat, _img, _sellerId, _sellerName = null, _status =null , _createdAt = null) {
        if(!_status || _status == null){
            _status = getStatus()[0]; 
        }
        if(!_createdAt || _createdAt == null){
            _createdAt = new Date().toLocaleDateString('en-GB');
        }
        this.id = _id == null ? crypto.randomUUID() : _id;
        this.name = _name;
        this.price = _price;
        this.cat = _cat;
        this.img = _img;
        this.sellerId = _sellerId == null ? atob(localStorage.getItem('login')) : _sellerId;
        this.sellerName = _sellerName;
        this.status = _status; 
        this.CreatedAt = _createdAt;
    }

    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            cat: this.cat,
            img: this.img,
            sellerId: this.sellerId,
            status: this.status,
            CreatedAt: this.CreatedAt,
        };
    }
}