! function() {
    var a = document.querySelector(".options-save");
    var b = document.querySelector(".options-resume");
    var c = document.querySelector(".options-tips");
    var urls = document.getElementById("targetUrls");
    var origin = document.getElementById("allowOrigin");
    var headers = document.getElementById("allowHeaders");
    urls.value = localStorage.getItem("targetUrls") || "";
    origin.value = localStorage.getItem("allowOrigin");
    headers.value = localStorage.getItem("allowHeaders") || "";
    a.addEventListener("click", function(b) {
      b.preventDefault();
      a.disabled = !0;
      c.innerHTML = "";
      localStorage.setItem("targetUrls", urls.value);
      localStorage.setItem("allowOrigin", origin.value);
      localStorage.setItem("allowHeaders", headers.value);
      setTimeout(function() {
        a.disabled = !1;
        c.innerHTML = "Saved";
        chrome.extension.sendRequest({id:"updateConfig"});
      }, 100);
    });
    b.addEventListener("click", function(a) {
      a.preventDefault();
      b.disabled = !0;
      c.innerHTML = "";
      urls.value = urls.placeholder;
      origin.value = origin.placeholder;
      headers.value = headers.placeholder;
      localStorage.setItem("targetUrls", urls.value);
      localStorage.setItem("allowOrigin", origin.value);
      localStorage.setItem("allowHeaders", headers.value);
      setTimeout(function() {
        b.disabled = !1;
        chrome.extension.sendRequest({id:"updateConfig"});
      }, 100)
    })
}();