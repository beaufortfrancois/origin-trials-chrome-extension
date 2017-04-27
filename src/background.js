// Show page action icon when origin trials token are detected.
chrome.runtime.onMessage.addListener((message, sender) => {

  if (message.numOriginTrialsTokens && message.numOriginTrialsTokens > 0) {
    chrome.pageAction.show(sender.tab.id);

    let title = 'An Origin Trial token has been found.';
    if (message.numOriginTrialsTokens > 1) {
      title = message.numOriginTrialsTokens + ' Origin Trial tokens have been found.';
    }

    chrome.pageAction.setTitle({ tabId: sender.tab.id, title: title });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeWebRequest.onRequest.removeRules(null, registerRules);
});

function registerRules() {
  let rules = [{
    conditions: [
      new chrome.declarativeWebRequest.RequestMatcher(
        {
          stages: ['onHeadersReceived'],
          responseHeaders: [{ nameEquals: 'Origin-Trial' }],
        })
    ],
    actions: [
      new chrome.declarativeWebRequest.SendMessageToExtension(
        { message: 'WOOHOO' })
    ],
  }];
  chrome.declarativeWebRequest.onRequest.addRules(rules);
}

chrome.declarativeWebRequest.onMessage.addListener(details => {
  chrome.pageAction.show(details.tabId);

  let title = 'An Origin Trial token has been found in a Response Header.';
  chrome.pageAction.setTitle({ tabId: details.tabId, title: title });
});
