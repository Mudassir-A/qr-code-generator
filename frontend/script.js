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
	fetch("/api/generate-qr", {
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
