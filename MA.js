
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const saveUsers = users => localStorage.setItem("users", JSON.stringify(users));
const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));
const setCurrentUser = user => localStorage.setItem("currentUser", JSON.stringify(user));


(async () => {
    let users = getUsers();
    if (!users.some(u => u.role === "admin")) {
        users.push({
            name: "Administrator",
            email: "admin@manutd.com",
            password: await hashPassword("admin123"),
            role: "admin"
        });
        saveUsers(users);
    }
})();

const themeBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
}

themeBtn.onclick = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
};


document.body.insertAdjacentHTML("beforeend", `
<div class="modal" id="loginModal">
 <div class="modal-box">
  <h2>Login</h2>
  <input id="loginEmail" placeholder="Email">
  <input id="loginPassword" type="password" placeholder="Password">
  <button id="loginSubmit">Login</button>
  <p><span id="forgotPass" class="link">Forgot password?</span></p>
  <p>New fan? <span id="openRegister" class="link">Register</span></p>
  <span class="close">×</span>
 </div>
</div>

<div class="modal" id="registerModal">
 <div class="modal-box">
  <h2>Register</h2>
  <input id="regName" placeholder="Full Name">
  <input id="regEmail" placeholder="Email">
  <input id="regPass" type="password" placeholder="Password">
  <button id="registerSubmit">Join</button>
  <span class="close">×</span>
 </div>
</div>

<div class="modal" id="resetModal">
 <div class="modal-box">
  <h2>Reset Password</h2>
  <input id="resetEmail" placeholder="Email">
  <input id="resetPass" type="password" placeholder="New Password">
  <button id="resetSubmit">Reset</button>
  <span class="close">×</span>
 </div>
</div>

<div class="modal" id="profileModal">
 <div class="modal-box">
  <h2>Profile</h2>
  <input id="editName">
  <input id="editPassword" type="password" placeholder="New Password">
  <button id="saveProfile">Save</button>
  <button id="logoutBtn">Logout</button>
  <div id="adminArea"></div>
  <span class="close">×</span>
 </div>
</div>

<div class="modal" id="adminModal">
 <div class="modal-box">
  <h2>Admin Panel</h2>
  <ul id="userList"></ul>
  <span class="close">×</span>
 </div>
</div>
`);


const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => loginModal.style.display = "flex";

document.querySelectorAll(".close").forEach(btn =>
    btn.onclick = () => btn.closest(".modal").style.display = "none"
);

openRegister.onclick = () => {
    loginModal.style.display = "none";
    registerModal.style.display = "flex";
};

forgotPass.onclick = () => {
    loginModal.style.display = "none";
    resetModal.style.display = "flex";
};


registerSubmit.onclick = async () => {
    let users = getUsers();
    if (users.some(u => u.email === regEmail.value))
        return alert("User already exists");

    users.push({
        name: regName.value,
        email: regEmail.value,
        password: await hashPassword(regPass.value),
        role: "fan"
    });

    saveUsers(users);
    alert("Registration successful 🔴");
    registerModal.style.display = "none";
};


loginSubmit.onclick = async () => {
    const users = getUsers();
    const pass = await hashPassword(loginPassword.value);

    const user = users.find(
        u => u.email === loginEmail.value && u.password === pass
    );

    if (!user) return alert("Invalid credentials");

    setCurrentUser(user);
    loginModal.style.display = "none";
    updateUI();
};


resetSubmit.onclick = async () => {
    let users = getUsers();
    const user = users.find(u => u.email === resetEmail.value);

    if (!user) return alert("Email not found");

    user.password = await hashPassword(resetPass.value);
    saveUsers(users);
    alert("Password reset successful");
    resetModal.style.display = "none";
};


function updateUI() {
    const user = getCurrentUser();
    if (!user) return;

    loginBtn.textContent = user.name;
    loginBtn.onclick = () => openProfile(user);
}

function openProfile(user) {
    profileModal.style.display = "flex";
    editName.value = user.name;
    adminArea.innerHTML = "";

    if (user.role === "admin") {
        const btn = document.createElement("button");
        btn.textContent = "Open Admin Panel";
        btn.onclick = openAdminPanel;
        adminArea.appendChild(btn);
    }
}

saveProfile.onclick = async () => {
    let users = getUsers();
    let user = getCurrentUser();

    user.name = editName.value;
    if (editPassword.value)
        user.password = await hashPassword(editPassword.value);

    users = users.map(u => u.email === user.email ? user : u);
    saveUsers(users);
    setCurrentUser(user);

    alert("Profile updated");
    location.reload();
};


function openAdminPanel() {
    adminModal.style.display = "flex";
    userList.innerHTML = "";

    getUsers().forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.name} (${u.email})`;

        if (u.role !== "admin") {
            const del = document.createElement("button");
            del.textContent = "Delete";
            del.onclick = () => {
                if (confirm("Delete user?")) {
                    saveUsers(getUsers().filter(x => x.email !== u.email));
                    openAdminPanel();
                }
            };
            li.appendChild(del);
        }
        userList.appendChild(li);
    });
}


logoutBtn.onclick = () => {
    localStorage.removeItem("currentUser");
    location.reload();
};

// ============================
// DARK MODE + MODAL STYLES (FIXED)
// ============================
const style = document.createElement("style");
style.innerHTML = `
body.dark-mode {
    background:#0f0f0f;
    color:#f5f5f5;
}

body.dark-mode .hair {
    background: linear-gradient(to right, #111, #000);
}

body.dark-mode section,
body.dark-mode footer {
    background:#121212;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode p,
body.dark-mode span,
body.dark-mode li {
    color:#f5f5f5 !important;
}

body.dark-mode .trophy-item,
body.dark-mode .testimonial-item {
    background:#1e1e1e;
}

.modal {
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.7);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:999;
}

.modal-box {
    background:white;
    padding:2em;
    border-radius:15px;
    width:320px;
}

body.dark-mode .modal-box {
    background:#1e1e1e;
    color:white;
}

.modal-box input,
.modal-box button {
    width:100%;
    margin:8px 0;
    padding:10px;
}

.close {
    position:absolute;
    top:15px;
    right:20px;
    cursor:pointer;
}
`;
document.head.appendChild(style);

// ============================
updateUI();

