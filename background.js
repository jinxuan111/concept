chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.includes('/i/api/graphql/')) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ['content.js']
      });
    }
  },
  { urls: ["https://x.com/i/api/graphql/*"] }
);