document.getElementById('checkButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: checkCryptoAddresses
    }, (results) => {
      if (results && results[0] && results[0].result) {
        const addresses = results[0].result;
        const resultDiv = document.getElementById('result');
        if (addresses.length > 0) {
          resultDiv.innerHTML = `Found ${addresses.length} crypto addresses:<br>${addresses.join('<br>')}`;
        } else {
          resultDiv.innerHTML = 'No crypto addresses found in the user\'s bio.';
        }
      } else {
        document.getElementById('result').innerHTML = 'Error: Unable to check profile.';
      }
    });
  });
});