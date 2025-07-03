function checkCryptoAddresses() {
  // Regular expression for Solana addresses (Base58, 32-44 chars)
  const cryptoAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

  // Get user bio from the profile page
  const bioElement = document.querySelector('div[data-testid="UserDescription"]');
  const bioText = bioElement ? bioElement.innerText : '';

  // Find matches in the bio
  const matches = bioText.match(cryptoAddressRegex);
  if (matches && matches.length > 0) {
    // Create a floating alert to display the result
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      z-index: 1000;
    `;
    alertDiv.innerHTML = `Found Crypto Address: <strong>${matches[0]}</strong>`;
    document.body.appendChild(alertDiv);

    // Auto-remove alert after 5 seconds
    setTimeout(() => alertDiv.remove(), 5000);
  }
}

// Run the check when the page loads
window.addEventListener('load', checkCryptoAddresses);