import * as dbGate from './dbGate.js'
let mainURL = 'http://localhost:3000/users';


////////////////////////////////////////////////////////////////////// main functions
export const get = async function (id =null) {
    let users = []
    let data = await dbGate.get(mainURL, id);
    let address = '';
    
        if(id){
    if(data.address){
        address = data.address;
    }
            users.push(new User(data.name, data.email, data.pass, data.role, data.id,data.orders,false, address));
    }else{
        for (const el of data) {
            if(el.address){
                address = el.address;
            }
            users.push(new User(el.name, el.email, el.pass, el.role, el.id,el.orders,false, address))
        }
    }
    return users;
}

export const add = async function (user) {
    if(user instanceof User)
        await dbGate.post(mainURL,user)
}

export const Update = async function (user) {
    if(user instanceof User)
        await dbGate.update(mainURL,user.id,user)
}

export const Delete = async function (user) {
    if(user instanceof User)
        await dbGate.del(mainURL,user.id)
}

////////////////////////////////////////////////////////////////////// derived functions

export const isFound = async function (email, pass) {
    let data = await get();
    for (const user of data) {
        if(user.email == email && user.pass == pass){
            return user;
        }
    }
    return null;
}

export const getUserById = async function (id) {
    let data = await get(id);
    if(data){
        let user = data[0];
        return user;
    }
    return null;
}

export const getUserByOrderId = async function (orderID) {
    debugger
    let data = await get();
    for (const user of data) {
        for (const order of user.orders) {
            if(order.id == orderID){
                return user;
            }
        }
    }
    return null;
}

export const getUserByemail = async function (email, exclude) {
    let data = await get();
    for (const user of data) {
        if(user.email === exclude) continue;
        if(user.email == email.trim()){
            return user;
        }
    }
    return null;
}

export const login = function (usr,rm = null) {
    localStorage.setItem('login', btoa(usr.id));
    localStorage.removeItem('rm');
    if(rm == true)localStorage.setItem('rm', 'true');
    localStorage.removeItem(btoa('role'));
    localStorage.setItem(btoa('role'), btoa(usr.role));
}

export const logout= function () {
    localStorage.removeItem('login');
    localStorage.removeItem('rm');
    localStorage.removeItem(btoa('role'));
    window.location.href = '../../screens/login.html';
}

export const isLogged= async function () {
    debugger
    let id = localStorage.getItem('login');
    let rememberMe = localStorage.getItem('rm');
    if(id != null && await getUserById(atob(id)) != null){
        if(rememberMe == 'true') return 1;
        return 0;
    }
}

////////////////////////////////////////////////////////////////////// class
export class User {
    id;
    name; 
    email; 
    _pass;
    role; 
    address; 
    orders = [];

    constructor(_name, _email, _password, _role, _id = null, _orders = [], incript = true, _address = '') {
        this.id = _id == null ? crypto.randomUUID() : _id;
        this.name = _name;
        this.email = _email;
        this.pass = incript ? _password : atob(_password);
        this.role = _role;
        this.orders = _orders;
        this.address = _address;
    }

    set pass(_pass) {
        
        this._pass = btoa(_pass);
    }

    get pass() {
        
        return atob(this._pass);
    }

    toJSON() {
        return {
          id: this.id,
          name: this.name,
          email: this.email,
          pass: this._pass,
          role: this.role,
          address: this.address,
          orders: this.orders
        };
    }
}

