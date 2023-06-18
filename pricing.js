async function loadTWBuyerContent () {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [ tab ] = await chrome.tabs.query(queryOptions);

  if (!isSupportedHost(tab.url)) {
    return
  }

  const settings = {
    "url": "https://search.twbuyer.info/querybyurl",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
    },
    "data": JSON.stringify({
      "url": tab.url
    }),
  };

  $.ajax(settings).done(function (response) {
    const iframe = document.getElementById('twBuyerIframe');
    if ('ID' in response) {
      iframe.src = "https://twbuyer.info/ec_item/" + response.ID
    } else {
      iframe.src = ''
    }
  });
}

const supportedDomains = [ "www.momoshop.com.tw", "24h.pchome.com.tw", "tw.buy.yahoo.com" ];

function isSupportedHost (urlString) {
  return supportedDomains.includes(new URL(urlString).hostname);
}

window.addEventListener("DOMContentLoaded", loadTWBuyerContent)
