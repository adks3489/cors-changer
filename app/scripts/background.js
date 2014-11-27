function getTargetUrls() {
  var strUrls = localStorage.getItem("targetUrls") || "";
  return strUrls ? strUrls.split(",") : ["<all_urls>"];
}
function getAllowOrign() {
  var origin = localStorage.getItem("allowOrigin") || "";
  return origin ? origin : "*";
}
function getAllowHeaders() {
  var headers = localStorage.getItem("allowHeaders") || "";
  return headers.split(",");
}

function handleRequest(a) {
  for (var b, c = 0; c < a.requestHeaders.length; ++c){
    if (b = a.requestHeaders[c], "Origin" === b.name && !b.value) {
      b.value = a.url || "";
      break;
    }
  }
  return {requestHeaders: a.requestHeaders};
}

function handleRespone(a) {
  for (var b = null, c = getAllowHeaders(), d = !1, e = !1, f = 0, g = a.responseHeaders.length; g > f && (b = a.responseHeaders[f], !d || !e); ++f) "Access-Control-Allow-Origin" === b.name ? d = !0 : "Access-Control-Allow-Headers" === b.name && (e = !0);
  return d || a.responseHeaders.push({
    name: "Access-Control-Allow-Origin",
    value: getAllowOrign()
  }), e || a.responseHeaders.push({
    name: "Access-Control-Allow-Headers",
    value: c.join(",")
  }), { responseHeaders: a.responseHeaders };
}

function setOn() {
  chrome.browserAction.setBadgeText({
    text: "On"
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: [0, 0, 0, 0]
  });

  var urls = getTargetUrls();
  chrome.webRequest.onBeforeSendHeaders.addListener(handleRequest, {
    urls: urls,
    types: ["xmlhttprequest"]
  }, ["blocking", "requestHeaders"]);
  chrome.webRequest.onHeadersReceived.addListener(handleRespone, {
    urls: urls,
    types: ["xmlhttprequest"]
  }, ["blocking", "responseHeaders"]);
}

function setOff() {
  chrome.browserAction.setBadgeText({
    text: "Off"
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: [128, 128, 128, 200]
  });
  chrome.webRequest.onBeforeSendHeaders.removeListener(handleRequest);
  chrome.webRequest.onHeadersReceived.removeListener(handleRespone);
}

chrome.extension.onRequest.addListener(function(request) {
  if (request && (request.id == "updateConfig")){
    setOff();
    setOn();
  }        
});

localStorage.getItem("on") ? setOn() : setOff(), chrome.browserAction.onClicked.addListener(function() {
  localStorage.getItem("on") ? (localStorage.setItem("on", ""), setOff()) : (localStorage.setItem("on", "1"), setOn())
});