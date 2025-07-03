chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle background tasks if needed (e.g., API calls)
  console.log('Background script received message:', message);
});