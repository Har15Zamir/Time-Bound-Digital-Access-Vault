const BASE_URL = "http://127.0.0.1:5000";

function showMessage(elementId, message, isError = true) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = isError ? "error" : "success";
}

function saveToken(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", userId);
}

function getToken() {
    return localStorage.getItem("token");
}

function getUserId() {
    return localStorage.getItem("user_id");
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.status === 200) {
        saveToken(data.token, data.user_id);
        window.location.href = "dashboard.html";
    } else {
        showMessage("loginMessage", data.error);
    }
}

async function register(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.status === 201) {
        showMessage("registerMessage", "Registration successful!", false);
        setTimeout(() => window.location.href = "login.html", 1000);
    } else {
        showMessage("registerMessage", data.error);
    }
}

async function createVault(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const owner_id = getUserId();

    const res = await fetch(`${BASE_URL}/vault`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, content, owner_id })
    });

    const data = await res.json();
    if (res.status === 201) {
        showMessage("vaultMessage", "Vault item created!", false);
        document.getElementById("vaultForm").reset();
    } else {
        showMessage("vaultMessage", data.error);
    }
}

async function listVaults() {
    const owner_id = getUserId();
    const res = await fetch(`${BASE_URL}/vault?owner_id=${owner_id}`);
    const items = await res.json();
    const tableBody = document.getElementById("vaultTableBody");
    tableBody.innerHTML = "";

    items.forEach(item => {
        const row = `<tr>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}