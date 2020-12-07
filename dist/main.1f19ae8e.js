// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('数据');
var bgColor = JSON.parse(localStorage.getItem('color'));
var xObject = JSON.parse(x);
var $body = $('body')[0];
window.URL = window.URL || window.webkitURL;
var colorArray = bgColor || ['#fff'];
var z;
var logoUrl = '/favicon.ico';
$body.style.backgroundColor = colorArray[colorArray.length - 1];
var hashMap = xObject || [{
  logo: '',
  url: 'https://www.acfun.cn',
  name: 'a站'
}, {
  logo: '',
  url: 'https://www.bilibili.com/',
  name: 'b站'
}, {
  logo: '',
  url: 'https://github.com/',
  name: 'github'
}, {
  logo: '',
  url: 'https://www.nowcoder.com/',
  name: '牛客'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    node.logo = node.url + logoUrl;
    var $li = $("<li >\n                <div class=\"site\">\n                    <div class=\"sel\">\n                        <div class=\"revise\">\u4FEE\u6539\u5FEB\u6377\u65B9\u5F0F</div>\n                        <div class=\"remove\">\u79FB\u9664</div>\n                    </div>\n                    \n                        <div class=\"icon-btn\" id='iconBtn'>\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#iconziyuan\"></use>\n                        </svg>\n                    </div>\n                        <div class=\"logo\"><img src=".concat(node.logo, " alt:'\u6CA1\u6709\u56FE\u7247'></div>\n                        <div class=\"link\">").concat(node.name, "</div>\n                    \n                </div>\n            </li>")).insertBefore($lastLi);
    $sel = $('.sel');
    $iconBtn = $('.icon-btn');
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.icon-btn', function (e) {
      e.stopPropagation();

      if ($sel[index].style.display === 'block') {
        $sel[index].style.display = 'none';
      } else {
        $sel[index].style.display = 'block';
      }
    });
    $li.on('click', '.remove', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    $li.on('click', '.revise', function (e) {
      e.stopPropagation();
      $dialogWapper.style.display = 'block';

      $finish.onclick = function () {
        var url = $input2.value;
        var name = $input1.value;

        if (!$input2.value) {
          $tips.innerText = '还没有填写网址哟~';
        } else if (url.indexOf('http') !== 0) {
          url = 'https://' + url;
          $tips.innerText = '';
          hashMap[index].url = url;

          if (!$input1.value) {
            $tips.innerText = '还没有填写名称哟~';
          } else if ($input1.value !== '') {
            $tips.innerText = '';
            hashMap[index].name = name;
          }
        }

        if (name && url) {
          $siteList.find('li:not(.last)').remove();
          render();
          $dialogWapper.style.display = 'none';
          $input1.value = '';
          $input2.value = '';
        }
      };

      $del.onclick = function () {
        $input1.value = '';
        $input2.value = '';
      };

      $cancel.onclick = function () {
        $dialogWapper.style.display = 'none';
      };

      render();
    });
  });
};

render();
var $dialogWapper = $('.dialogWapper')[0];
var $input1 = $('#input1')[0];
var $input2 = $('#input2')[0];
var $del = $('#del')[0];
var $cancel = $('#cancel')[0];
var $finish = $('#finish')[0];
var $tips = $('.tips')[0];
var $cover = $('#cover')[0];
var $sel = $('.sel');
var $iconBtn = $('#iconBtn');
var $dialogText1 = $('.dialogText')[0];
var $dialogText2 = $('.dialogText')[1];

colorElem.onchange = function () {
  $body.style.backgroundColor = colorElem.value;
  colorArray.push($body.style.backgroundColor);
  bgWapper.style.display = 'none';
};

$input1.onclick = function () {
  $dialogText1.style.color = 'blue';
  $dialogText2.style.color = '#808080';
};

$input2.onclick = function () {
  $dialogText2.style.color = 'blue';
  $dialogText1.style.color = '#808080';
};

$cover.onclick = function () {
  for (var i = 0; i < $sel.length; i++) {
    if ($sel[i].style.display === 'block') {
      $sel[i].style.display = 'none';
    }
  }
};

$('.siteAdd ').on('click', function () {
  $dialogWapper.style.display = 'block';

  $finish.onclick = function () {
    var url = $input2.value;
    var name = $input1.value;

    if (!$input2.value) {
      $tips.innerText = '还没有填写网址哟~';
    } else if (url.indexOf('http') !== 0) {
      url = 'https://' + url;
      $tips.innerText = '';

      if (!$input1.value) {
        $tips.innerText = '还没有填写名称哟~';
      } else if ($input1.value !== '') {
        $tips.innerText = '';
      }
    }

    if (name && url) {
      hashMap.push({
        logo: '',
        url: url,
        name: name
      });
      $siteList.find('li:not(.last)').remove();
      render();
      $dialogWapper.style.display = 'none';
      $input1.value = '';
      $input2.value = '';
    }
  };

  $del.onclick = function () {
    $input1.value = '';
    $input2.value = '';
  };

  $cancel.onclick = function () {
    $dialogWapper.style.display = 'none';
  };
});
filesWapperBtn.addEventListener('click', function (e) {
  if (fileElem) {
    fileElem.click();
  }

  e.preventDefault();
}, false);
colorWapperBtn.addEventListener('click', function (e) {
  if (colorElem) {
    colorElem.click();
  }

  e.preventDefault();
}, false);

handleFiles = function handleFiles(files) {
  if (!files.length) {
    backgroundImage.alt = '无图片';
  } else {
    backgroundImage.src = window.URL.createObjectURL(files[0]);

    backgroundImage.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };

    bgWapper.style.display = 'none';
  }
};

closeBg.onclick = function () {
  if (bgWapper.style.display !== 'none') {
    bgWapper.style.display = 'none';
  }
};

pen.onclick = function () {
  if (bgWapper.style.display !== 'block') {
    bgWapper.style.display = 'block';
  }
};

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('数据', string);
  var abc = JSON.stringify(colorArray);
  localStorage.setItem('color', abc);
};
},{}],"C:/Users/zzLw/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57003" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/zzLw/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map