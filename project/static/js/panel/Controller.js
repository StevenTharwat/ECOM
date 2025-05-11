import * as productDB from "../db/productDB.js";
import * as userDB from "../db/userDB.js";
import * as ordersDB from "../db/ordersDB.js";

export let root = {
    users: {
        module: userDB,
        class: userDB.User,
        c:"admin",
        r:"admin",
        u:"admin",
        d:"admin",
        fields: [{
                name: "name",
                type: "text",
                hidden: false,
                enable: true,
                regex: /^.{3,}$/

            },
            {
                name: "email",
                type: "email",
                hidden: false,
                enable: true,
                regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                customValidation: async function(newEmail, oldEmail) {
                    if (await userDB.getUserByemail(newEmail, oldEmail) instanceof userDB.User) {
                        return 'this email is taken';
                    }
                }
            },
            {
                name: "pass",
                type: "password",
                hidden: true,
                enable: true,
                regex: /^.{3,}$/,
            },
            {
                name: "role",
                type: "options",
                hidden: false,
                enable: true,
                regex: /^.{1,}$/,
                getOptions: function() {
                    return ['admin', 'seller', 'buyer'];
                }
            }
        ],
        GetData: async function() {
            return await userDB.get()
        }
    },
    products: {
        module: productDB,
        class: productDB.Product,
        c:"seller",
        r:"admin-seller-buyer",
        u:"admin-seller",
        d:"admin-seller",
        fields: [{
                name: "name",
                type: "text",
                hidden: false,
                enable: true,
                regex: /^.{3,}$/
            },
            {
                name: "price",
                type: "number",
                hidden: false,
                enable: true,
                regex: /^\d+(\.\d{1,2})?$/
            },
            {
                name: "cat",
                type: "options",
                hidden: false,
                enable: true,
                regex: /^.{1,}$/,
                getOptions: function() {
                    return productDB.getCat();
                }
            },
            {
                name: "img",
                type: "file",
                hidden: true,
                enable: true,
                regex: /^.*\.(jpg|jpeg|png|gif)$/i
            },
            {
                name: "sellerId",
                type: "text",
                hidden: true,
                enable: false,
                regex: /^[\w\-]+$/
            },
            {
                name: "sellerName",
                type: "text",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            },
            {
                name: "status",
                type: "options",
                hidden: false,
                enable: atob( localStorage.getItem(btoa('role')))== 'admin'? true : false,

                regex: /^.{1,}$/,
                getOptions: function() {
                    return productDB.getStatus();
                }
            },
            {
                name: "CreatedAt",
                type: "date",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            }
        ],
        GetData: async function() {
            return await productDB.get();
        }
    },
    orders: {
        c:"",
        r:"admin-seller-buyer",
        u:"seller",
        d:"admin-seller",
        module: ordersDB,
        class: ordersDB.Order,
        fields: [{
                name: "productId",
                type: "text",
                hidden: true,
                enable: false,
                regex: /^[\w\-]+$/,
            },
            {
                name: "productName",
                type: "text",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            },
            {
                name: "quantity",
                type: "number",
                hidden: false,
                enable: false,
                regex: /^\d+$/
            },
            {
                name: "status",
                type: "options",
                hidden: false,
                enable: true,
                regex: /^.{1,}$/,
                getOptions: function() {
                    return ordersDB.getStatus();
                }
            },
            {
                name: "sellerId",
                type: "text",
                hidden: true,
                enable: false,
                regex: /^[\w\-]+$/,
            },
            {
                name: "sellerName",
                type: "text",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            },
            {
                name: "userId",
                type: "text",
                hidden: true,
                enable: false,
                regex: /^[\w\-]+$/,
            },
            {
                name: "buyerUser",
                type: "text",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            },
            {
                name: "CreatedAt",
                type: "text",
                hidden: false,
                enable: false,
                regex: /^.{1,}$/,
            }
        ],
        GetData: async function() {
            return await ordersDB.get();
        }
    }

}