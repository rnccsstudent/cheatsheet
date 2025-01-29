function copyCode(button) {
    const codeElement = button.previousElementSibling.querySelector("code").textContent;
    navigator.clipboard.writeText(codeElement).then(() => {
        alert("Code copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

// Function to download code as a file
function downloadCode(button, language) {
    const codeElement = button.previousElementSibling.previousElementSibling.querySelector("code").textContent;
    
    // Determine file extension based on language
    let extension = "";
    if (language === "python") extension = ".py";
    else if (language === "php") extension = ".php";
    else if (language === "c") extension = ".c";

    // Create a downloadable link
    const blob = new Blob([codeElement], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code-snippet${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const themeStyle = document.getElementById("theme-style");

// Check if user has a preference saved
if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.textContent = "☀️ Light Mode";
    themeStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-twilight.min.css"; // Dark theme
}

function disableDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.textContent = "🌙 Dark Mode";
    themeStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"; // Light theme
}
//// পেজ লোড হলে আগের মোড ধরে রাখবে
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }
});

// Search Feature
const searchBox = document.getElementById("search-box");
const codeBlocks = document.querySelectorAll(".code-block");

searchBox.addEventListener("input", () => {
    const searchText = searchBox.value.toLowerCase();

    codeBlocks.forEach(block => {
        const headingText = block.querySelector("h2").textContent.toLowerCase();
        const codeText = block.querySelector("code").textContent.toLowerCase();

        if (headingText.includes(searchText) || codeText.includes(searchText)) {
            block.style.display = "block";
        } else {
            block.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    Prism.highlightAll();
});
