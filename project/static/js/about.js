import * as userDB from './db/userDB.js'
// Animate features on scroll
document.addEventListener("DOMContentLoaded", async () => {
  let id = atob( localStorage.getItem("login"));
      let data = await userDB.get(id);
  
      if(id){
          document.getElementById('userLogin').innerText = data[0].name;
          document.getElementById('loginA').href = '../index.html'
      }
     document.getElementById('logOutA').addEventListener('click', function(e){
          userDB.logout();
          window.location.href = 'login.html';
      });

  // Simple animation when features come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

});
