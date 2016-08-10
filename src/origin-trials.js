let originTrialsTokens = document.querySelectorAll('meta[http-equiv="origin-trial"]');
chrome.runtime.sendMessage(null, { numOriginTrialsTokens: originTrialsTokens.length });
console.log(originTrialsTokens);
  