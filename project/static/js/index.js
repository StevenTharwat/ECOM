import * as userDB from './db/userDB.js'


window.addEventListener('load', async function(e) {
    debugger
    let id = atob( localStorage.getItem("login"));
    let data = await userDB.get(id);

    if(id){
        document.getElementById('userLogin').innerText = data[0].name;
        document.getElementById('loginA').href = 'index.html'
        this.document.getElementById('loginNow').innerText = 'Go To Shopping';
        this.document.getElementById('loginNow').href = 'screens/products.html';
    }
   document.getElementById('logOutA').addEventListener('click', function(e){
        userDB.logout();
        window.location.href = 'login.html';
    });
    

    document.body.style.backgroundColor = "var(--background)";
    document.body.style.color = "var(--text-primary)";
});

var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";

function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
        MenuItems.style.backgroundColor = "var(--card-bg)";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

// Ensure menu items have correct text color
document.querySelectorAll('nav ul li a').forEach(link => {
    link.style.color = 'var(--text-primary)';
});

// Make menutoggle function globally available
window.menutoggle = menutoggle;