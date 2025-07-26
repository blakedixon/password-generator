const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// Get DOM elements
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const generateBtn = document.getElementById("generate-btn");
const copyBtn1 = document.getElementById("copy-btn-1");
const copyBtn2 = document.getElementById("copy-btn-2");

// Function to generate a random password
function generatePassword() {
    let password = "";
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (fallbackErr) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Function to show copy feedback
function showCopyFeedback(button) {
    button.classList.add('copied');
    setTimeout(() => {
        button.classList.remove('copied');
    }, 1000);
}

// Function to copy password
async function copyPassword(passwordElement, copyButton) {
    const password = passwordElement.textContent;
    if (password && password !== "•••••••••••••••") {
        const success = await copyToClipboard(password);
        if (success) {
            showCopyFeedback(copyButton);
        }
    }
}

// Function to generate and display two passwords
function generatePasswords() {
    const password1 = generatePassword();
    const password2 = generatePassword();
    
    password1El.textContent = password1;
    password2El.textContent = password2;
}

// Add event listeners
generateBtn.addEventListener("click", generatePasswords);

// Add copy functionality to buttons
copyBtn1.addEventListener("click", () => copyPassword(password1El, copyBtn1));
copyBtn2.addEventListener("click", () => copyPassword(password2El, copyBtn2));

// Add copy functionality to password fields (clicking on the field itself)
password1El.addEventListener("click", () => copyPassword(password1El, copyBtn1));
password2El.addEventListener("click", () => copyPassword(password2El, copyBtn2));




