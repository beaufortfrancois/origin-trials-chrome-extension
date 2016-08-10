// Show page action icon when origin trials token are detected.
chrome.runtime.onMessage.addListener((message, sender) => {
  
  if (message.numOriginTrialsTokens && message.numOriginTrialsTokens > 0) {
    chrome.pageAction.show(sender.tab.id);
    
    let title = 'An Origin Trials token has been found.';
    if (message.numOriginTrialsTokens > 1) {
      title = message.numOriginTrialsTokens + ' Origin Trials tokens have been found.';
    }
    
    chrome.pageAction.setTitle({ tabId: sender.tab.id, title: title });
  }
});