// Show / Hide Password
const password = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        toggleBtn.textContent = "🙈";
    } else {
        password.type = "password";
        toggleBtn.textContent = "👁";
    }
});

// Strength Meter + Live Validation
const bar = document.getElementById("strength-bar");
const percentage = document.getElementById("percentage");

const historyList = document.getElementById("historyList");

password.addEventListener("input", () => {

    let value = password.value;
    let score = 0;

    const rules = {
        length: value.length >= 8,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*]/.test(value)
    };

    for (let key in rules) {

        const item = document.getElementById(key);

        if (rules[key]) {
            item.innerHTML = "✅ " + item.textContent.replace("❌ ", "").replace("✅ ", "");
            score++;
        } else {
            item.innerHTML = "❌ " + item.textContent.replace("❌ ", "").replace("✅ ", "");
        }

    }

    let percent = score * 20;

    bar.style.width = percent + "%";

    percentage.innerHTML = "Strength : " + percent + "%";

    if (percent <= 40) {

        bar.style.background = "red";

    } else if (percent <= 80) {

        bar.style.background = "orange";

    } else {

        bar.style.background = "green";

    }

});

// Password Generator
document.getElementById("generateBtn").onclick = function(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

let pass="";

for(let i=0;i<12;i++){

pass+=chars.charAt(Math.floor(Math.random()*chars.length));

}

password.value=pass;

password.dispatchEvent(new Event("input"));

};

// Copy Password
document.getElementById("copyBtn").onclick=function(){

navigator.clipboard.writeText(password.value);

alert("Password Copied!");

};

// Save Password History
document.querySelector("form").addEventListener("submit",function(){

if(password.value!=""){

const li=document.createElement("li");

li.textContent=password.value;

historyList.prepend(li);

}

});

// Dark Mode
document.getElementById("themeBtn").onclick=function(){

document.body.classList.toggle("dark");

};