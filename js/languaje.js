

async function detectLanguage() {
    if (localStorage.getItem("preferredLanguage")) {
        return localStorage.getItem("preferredLanguage");
    }

    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const spanishSpeakingCountries = [
            "ES", "MX", "AR", "CO", "CL", "PE", "VE", "UY", "PY", "BO", "EC", "GT", "CU", "HN", "SV", "NI", "CR", "PA", "DO"
        ];
        const language = spanishSpeakingCountries.includes(data.country_code) ? "es" : "en";
        localStorage.setItem("preferredLanguage", language);
        return language;
    } catch (error) {
        console.error("Error detecting country:", error);
        return "en"; // Default to English if detection fails
    }
}
async function toggleLanguage() {
    const language = await detectLanguage();

    const englishContent = document.getElementById("content-en");
    const spanishContent = document.getElementById("content-es");

    if (language === "es" && spanishContent) {
        spanishContent.style.display = "block";
        if (englishContent) englishContent.style.display = "none";
    } else if (englishContent) {
        englishContent.style.display = "block";
        if (spanishContent) spanishContent.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", toggleLanguage);