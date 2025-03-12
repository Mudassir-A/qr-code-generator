// DOM elements
const urlInput = document.getElementById("url-input");
const generateBtn = document.getElementById("generate-btn");
const errorMessage = document.getElementById("error-message");
const qrResult = document.getElementById("qr-result");
const qrImage = document.getElementById("qr-image");

// URL validation function
function isValidURL(string) {
	try {
		new URL(string);
		return true;
	} catch (_) {
		// If the URL doesn't start with http:// or https://, try adding https://
		if (!string.startsWith("http://") && !string.startsWith("https://")) {
			try {
				new URL("https://" + string);
				urlInput.value = "https://" + string;
				return true;
			} catch (_) {
				return false;
			}
		}
		return false;
	}
}

function generateQR() {
	const url = urlInput.value.trim();

	// Reset previous error state
	errorMessage.style.display = "none";

	if (!url) {
		errorMessage.textContent = "Please enter a URL";
		errorMessage.style.display = "block";
		return;
	}

	if (!isValidURL(url)) {
		errorMessage.textContent = "Please enter a valid URL";
		errorMessage.style.display = "block";
		return;
	}

	// Call our Python serverless function
	fetch("/.netlify/functions/generate-qr", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ url: url }),
	})
		.then((response) => response.json())
		.then((data) => {
			qrImage.src = data.image;
			qrResult.classList.add("active");
		})
		.catch((error) => {
			console.error("Error:", error);
			errorMessage.textContent = "Failed to generate QR code";
			errorMessage.style.display = "block";
		});
}

// Event listeners
generateBtn.addEventListener("click", generateQR);
urlInput.addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		generateQR();
	}
});
