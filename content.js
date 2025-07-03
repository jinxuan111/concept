function checkCryptoAddresses() {
  // Regular expressions for various crypto addresses
  const cryptoAddressRegexes = [
    /[1-9A-HJ-NP-Za-km-z]{32,44}/g, // Solana/Base58
    /0x[a-fA-F0-9]{40}/g,            // Ethereum
    /[13][a-km-zA-HJ-NP-Z1-9]{26,35}/g // Bitcoin
  ];

  // Collect text from multiple potential bio elements and links
  let allText = '';
  const bioElements = document.querySelectorAll('div[data-testid="UserDescription"], article div, span');
  bioElements.forEach(el => {
    if (el.innerText) allText += el.innerText + ' ';
  });
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (link.innerText) allText += link.innerText + ' ';
  });

  // Debug log
  console.log('Analyzing text:', allText);

  // Find matches
  let allMatches = [];
  cryptoAddressRegexes.forEach(regex => {
    const matches = allText.match(regex);
    if (matches) allMatches = allMatches.concat(matches);
  });

  if (allMatches.length > 0) {
    // Remove duplicates
    const uniqueMatches = [...new Set(allMatches)];
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
      max-width: 300px;
    `;
    alertDiv.innerHTML = `Found Crypto Address(es):<br><strong>${uniqueMatches.join('<br>')}</strong>`;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 10000);
  } else {
    console.log('No crypto addresses found in bio or links.');
  }
}

// Run the check when the page is fully loaded
window.addEventListener('load', checkCryptoAddresses);

// Handle dynamic content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      checkCryptoAddresses();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });