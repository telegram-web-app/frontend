let WebApp = window.Telegram.WebApp;

WebApp.showAlert(`Добро пожаловать, @${WebApp.WebAppUser.username}.`);

let username = document.getElementById("username")
username.innerHTML = `${WebApp.WebAppUser.username}`