function checkCryptoAddresses() {
  try {
    console.log('checkCryptoAddresses started');
    const cryptoAddressRegexes = [
      /(?:^|\s)([1-9A-HJ-NP-Za-km-z]{32,44})(?!\w)/g, // Solana/Base58, with word boundary
      /(?:^|\s)(0x[a-fA-F0-9]{40})(?!\w)/g,           // Ethereum, with word boundary
      /(?:^|\s)([13][a-km-zA-HJ-NP-Z1-9]{26,35})(?!\w)/g // Bitcoin, with word boundary
    ];

    // Check if alert is already active
    if (document.hasFocus() && window.alertActive) return;

    setTimeout(() => {
      let allText = '';
      const bioElements = document.querySelectorAll('div[data-testid="UserDescription"], article div');
      bioElements.forEach(el => {
        if (el.innerText) {
          let cleanText = el.innerText
            .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
            .replace(/[^\w\s]/g, ' ') // Remove special characters
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
          allText += cleanText + ' ';
        }
      });

      console.log('Analyzing text:', allText);

      let allMatches = [];
      cryptoAddressRegexes.forEach(regex => {
        const matches = allText.match(regex);
        if (matches) allMatches = allMatches.concat(...matches.filter(m => m.length > 32)); // Filter short matches
      });

      if (allMatches.length > 0) {
        const uniqueMatches = [...new Set(allMatches)];
        window.alertActive = true; // Set flag to prevent re-trigger
        alert(`Found Crypto Address(es):\n${uniqueMatches.join('\n')}`);
        window.alertActive = false; // Reset flag after alert
        console.log('Detected addresses:', uniqueMatches);
      } else {
        console.log('No crypto addresses found in bio or links.');
      }
      // Prevent duplicate alerts within 10 seconds
      let lastAlertTime = sessionStorage.getItem('lastAlertTime');
      let currentTime = Date.now();
      if (lastAlertTime && (currentTime - lastAlertTime < 10000)) return;
      sessionStorage.setItem('lastAlertTime', currentTime);
    }, 1000);
  } catch (error) {
    console.error('Error in checkCryptoAddresses:', error);
  }
}

window.addEventListener('load', checkCryptoAddresses);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      console.log('DOM mutation detected, re-running check');
      checkCryptoAddresses();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true, attributes: false });