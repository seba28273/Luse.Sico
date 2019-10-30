/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b65518505f58f34c1ef6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "app/" + chunkId + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/main/webapp/app/app.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/webapp/app/app.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../../../node_modules/css-loader!bootstrap/dist/css/bootstrap.min.css */ "./node_modules/css-loader/index.js!./node_modules/bootstrap/dist/css/bootstrap.min.css"), "");

// module
exports.push([module.i, "/* ==============================================================\nBootstrap tweaks\n===============================================================*/\n\nbody,\nh1,\nh2,\nh3,\nh4 {\n  font-weight: 300;\n}\n\nbody {\n  /*background: #e4e5e6;*/\n  height: 457px;\n  width: 100%;\n  border-radius: 32px;\n  background-color: #fafafa;\n  box-shadow: 0 12px 32px 0 rgba(48, 94, 222, 0.16);\n}\n\na {\n  color: #533f03;\n  font-weight: bold;\n}\n\n/* ==========================================================================\nBrowser Upgrade Prompt\n========================================================================== */\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/* ==========================================================================\nGeneric styles\n========================================================================== */\n\n/* Temporary workaround for availity-reactstrap-validation */\n.invalid-feedback {\n  display: inline;\n}\n\n/* other generic styles */\n\n.jh-card {\n  padding: 1.5%;\n  margin-top: 20px;\n  border: none;\n}\n\n.error {\n  color: white;\n  background-color: red;\n}\n\n.pad {\n  padding: 10px;\n}\n\n.w-40 {\n  width: 40% !important;\n}\n\n.w-60 {\n  width: 60% !important;\n}\n\n.break {\n  white-space: normal;\n  word-break: break-all;\n}\n\n.preserve-space {\n  white-space: pre-wrap;\n}\n\n.readonly {\n  background-color: #eee;\n  opacity: 1;\n}\n\n.footer {\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n/* ==========================================================================\nmake sure browsers use the pointer cursor for anchors, even with no href\n========================================================================== */\na:hover {\n  cursor: pointer;\n}\n\n.hand,\n[jhisortby] {\n  cursor: pointer;\n}\n\n/* ==========================================================================\nCustom alerts for notification\n========================================================================== */\n.alerts .alert {\n  text-overflow: ellipsis;\n}\n.alert pre {\n  background: none;\n  border: none;\n  font: inherit;\n  color: inherit;\n  padding: 0;\n  margin: 0;\n}\n\n.alert .popover pre {\n  font-size: 10px;\n}\n\n.alerts .toast {\n  position: fixed;\n  width: 100%;\n}\n\n.alerts .toast.left {\n  left: 5px;\n}\n\n.alerts .toast.right {\n  right: 5px;\n}\n\n.alerts .toast.top {\n  top: 55px;\n}\n\n.alerts .toast.bottom {\n  bottom: 55px;\n}\n\n@media screen and (min-width: 480px) {\n  .alerts .toast {\n    width: 50%;\n  }\n}\n\n/* ==========================================================================\nentity tables helpers\n========================================================================== */\n/* Remove Bootstrap padding from the element\nhttp://stackoverflow.com/questions/19562903/remove-padding-from-columns-in-bootstrap-3 */\n.no-padding-left {\n  padding-left: 0 !important;\n}\n.no-padding-right {\n  padding-right: 0 !important;\n}\n.no-padding-top {\n  padding-top: 0 !important;\n}\n.no-padding-bottom {\n  padding-bottom: 0 !important;\n}\n.no-padding {\n  padding: 0 !important;\n}\n\n/* bootstrap 3 input-group 100% width\nhttp://stackoverflow.com/questions/23436430/bootstrap-3-input-group-100-width */\n.width-min {\n  width: 1% !important;\n}\n\n/* Fix checkbox alignment\nhttps://github.com/jhipster/generator-jhipster/issues/8463 */\n.form-check-input {\n  margin-top: -0.5rem;\n}\n\n/* Makes toolbar not wrap on smaller screens\nhttp://www.sketchingwithcss.com/samplechapter/cheatsheet.html#right */\n.flex-btn-group-container {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  -webkit-justify-content: flex-end;\n  justify-content: flex-end;\n}\n\n/* ==========================================================================\nentity detail page css\n========================================================================== */\n.row.jh-entity-details > dd {\n  margin-bottom: 15px;\n}\n\n@media screen and (min-width: 768px) {\n  .row.jh-entity-details > dt {\n    margin-bottom: 15px;\n  }\n\n  .row.jh-entity-details > dd {\n    border-bottom: 1px solid #eee;\n    padding-left: 180px;\n    margin-left: 0;\n  }\n}\n\n/* ==========================================================================\nui bootstrap tweaks\n========================================================================== */\n.nav,\n.pagination,\n.carousel,\n.card-title a {\n  cursor: pointer;\n}\n\n.datetime-picker-dropdown > li.date-picker-menu div > table .btn-secondary,\n.uib-datepicker-popup > li > div.uib-datepicker > table .btn-secondary {\n  border: 0;\n}\n\n.datetime-picker-dropdown > li.date-picker-menu div > table:focus,\n.uib-datepicker-popup > li > div.uib-datepicker > table:focus {\n  outline: none;\n}\n\n.thread-dump-modal-lock {\n  max-width: 450px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.btnFacebook {\n  /*width: 165px;*/\n  height: 53px;\n  /*border-radius: 25px;*/\n  background: darkblue;\n  color: white;\n  /* border: 0px transparent;*/\n  text-align: center;\n  margin: 5px;\n  font-weight: bold;\n  font-size: medium;\n  width: 100%;\n  display: inline-block;\n  box-sizing: border-box;\n  height: 53px;\n  width: 100%;\n  border: 1px solid #ecece4;\n}\n\n.btnGoogle {\n  margin: 4px;\n  width: 100%;\n  height: 51px;\n  font-weight: bold;\n  text-align: center;\n  border: 5px transparent;\n  display: inline-block;\n  box-sizing: border-box;\n  border: 1px solid #ecece4;\n  border-radius: 26px;\n}\n.btnFacebook:hover {\n  background: #3b5998;\n  opacity: 0.6;\n}\n.btnGoogle:hover {\n  background: #db3236;\n  opacity: 0.6;\n}\n\n@media only screen and (max-width: 399px) {\n  .btnFacebook,\n  .btnGoogle {\n    width: 100%;\n  }\n}\n.divsubtitulos {\n  position: absolute;\n  float: left;\n}\n.subtitulos {\n  position: relative;\n  left: 30px;\n  bottom: 15px;\n  z-index: 5;\n  display: inline-block;\n  background-color: white;\n  padding: 3px;\n  font-weight: bold;\n}\n.bg {\n  height: 56px;\n  width: 280px;\n  border: 1px solid rgba(25, 25, 25, 0.32);\n  border-radius: 28px;\n  border-color: #105cb6;\n}\n.title {\n  height: 50px;\n  width: 280px;\n  color: #313131;\n  font-family: Assistant;\n  font-size: 25.36px;\n  font-weight: bold;\n  line-height: 25px;\n  text-align: center;\n}\n.bg:hover {\n  border-color: darkgreen;\n}\n.rectangle-3 {\n  height: 24px;\n  width: 24px;\n  background-color: #ffffff;\n}\n.texto-inicio {\n  height: 28px;\n  width: 228px;\n  color: rgba(0, 0, 0, 0.87);\n  font-family: Assistant;\n  font-size: 16.91px;\n  letter-spacing: 0.5px;\n  line-height: 28px;\n}\n\n.bg-btninicio {\n  height: 40px;\n  width: 40px;\n  background-color: #ff531f;\n}\n\n/* jhipster-needle-css-add-main JHipster will add new css style */\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/webapp/app/modules/home/home.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/webapp/app/modules/home/home.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ==========================================================================\nMain page styles\n========================================================================== */\n.hipster {\n  display: inline-block;\n  width: 100%;\n  height: 497px;\n  background: url(" + escape(__webpack_require__(/*! ../../../static/images/jhipster_family_member_2.svg */ "./src/main/webapp/static/images/jhipster_family_member_2.svg")) + ") no-repeat center top;\n  background-size: contain;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/footer/footer.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/webapp/app/shared/layout/footer/footer.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".footer {\n  height: 50px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/header/header.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/webapp/app/shared/layout/header/header.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ==========================================================================\nDevelopement Ribbon\n========================================================================== */\n.ribbon {\n  background-color: rgba(170, 0, 0, 0.5);\n  left: -3.5em;\n  -moz-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  -o-transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n  overflow: hidden;\n  position: absolute;\n  top: 30px;\n  white-space: nowrap;\n  width: 15em;\n  z-index: 99999;\n  pointer-events: none;\n  opacity: 0.75;\n}\n.ribbon a {\n  color: #fff;\n  display: block;\n  font-weight: 400;\n  margin: 1px 0;\n  padding: 10px 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 0 5px #444;\n  pointer-events: none;\n}\n/* ==========================================================================\nNavbar styles\n========================================================================== */\n.jh-navbar {\n  background-color: #353d47;\n  padding: 0.2em 1em;\n}\n.jh-navbar .profile-image {\n  margin: -10px 0px;\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n}\n.jh-navbar .dropdown-item.active,\n.jh-navbar .dropdown-item.active:focus,\n.jh-navbar .dropdown-item.active:hover {\n  background-color: #353d47;\n}\n.jh-navbar .dropdown-toggle::after {\n  margin-left: 0.15em;\n}\n.jh-navbar ul.navbar-nav {\n  padding: 0.5em;\n}\n.jh-navbar ul.navbar-nav .nav-item {\n  margin-left: 1.5rem;\n}\n.jh-navbar a.nav-link {\n  font-weight: 400;\n}\n.jh-navbar a.nav-link > span {\n  margin-left: 5px;\n}\n.jh-navbar .jh-navbar-toggler {\n  color: #ccc;\n  font-size: 1.5em;\n  padding: 10px;\n}\n.jh-navbar .jh-navbar-toggler:hover {\n  color: #fff;\n}\n.navbar-version {\n  font-size: 10px;\n  color: #bbb;\n  padding: 0 0 0 10px;\n}\n.brand-logo:hover {\n  text-decoration: none;\n}\n.brand-logo .brand-icon {\n  height: 35px;\n  width: auto;\n  display: inline-block;\n}\n.brand-logo .brand-icon img {\n  height: 45px;\n}\n.brand-title {\n  font-size: 24px;\n  color: #fff;\n}\n.brand-title:hover {\n  color: #ccc;\n  text-decoration: none;\n}\n.loading-bar {\n  height: 3px;\n  background-color: #009cd8;\n  position: absolute;\n  top: 0px;\n  z-index: 1031;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/password/password-strength-bar.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/main/webapp/app/shared/layout/password/password-strength-bar.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ==========================================================================\nstart Password strength bar style\n========================================================================== */\nul#strengthBar {\n  display: inline;\n  list-style: none;\n  margin: 0;\n  margin-left: 15px;\n  padding: 0;\n  vertical-align: 2px;\n}\n\n.point:last-child {\n  margin: 0 !important;\n}\n.point {\n  background: #ddd;\n  border-radius: 2px;\n  display: inline-block;\n  height: 5px;\n  margin-right: 1px;\n  width: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/main/webapp/app/app.css":
/*!*************************************!*\
  !*** ./src/main/webapp/app/app.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!./app.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/app.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../node_modules/css-loader!./app.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/app.css", function() {
		var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader!./app.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/app.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/app.tsx":
/*!*************************************!*\
  !*** ./src/main/webapp/app/app.tsx ***!
  \*************************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.css */ "./src/main/webapp/app/app.css");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var app_shared_reducers_application_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/reducers/application-profile */ "./src/main/webapp/app/shared/reducers/application-profile.ts");
/* harmony import */ var app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/shared/reducers/locale */ "./src/main/webapp/app/shared/reducers/locale.ts");
/* harmony import */ var app_shared_layout_header_header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/shared/layout/header/header */ "./src/main/webapp/app/shared/layout/header/header.tsx");
/* harmony import */ var app_shared_layout_footer_footer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/shared/layout/footer/footer */ "./src/main/webapp/app/shared/layout/footer/footer.tsx");
/* harmony import */ var app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/shared/auth/private-route */ "./src/main/webapp/app/shared/auth/private-route.tsx");
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_routes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/routes */ "./src/main/webapp/app/routes.tsx");

















var App = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentDidMount = function () {
        this.props.getSession();
        this.props.getProfile();
    };
    App.prototype.render = function () {
        var paddingTop = '60px';
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["HashRouter"], null,
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: "app-container", style: { paddingTop: paddingTop } },
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_7__["ToastContainer"], { position: react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].POSITION.TOP_LEFT, className: "toastify-container", toastClassName: "toastify-toast" }),
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_14__["default"], null,
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(app_shared_layout_header_header__WEBPACK_IMPORTED_MODULE_11__["default"], { isAuthenticated: this.props.isAuthenticated, isAdmin: this.props.isAdmin, currentLocale: this.props.currentLocale, onLocaleChange: this.props.setLocale, ribbonEnv: this.props.ribbonEnv, isInProduction: this.props.isInProduction, isSwaggerEnabled: this.props.isSwaggerEnabled })),
                react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: "container-fluid view-container", id: "app-view-container" },
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Card"], { className: "jh-card" },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_14__["default"], null,
                            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(app_routes__WEBPACK_IMPORTED_MODULE_16__["default"], null))),
                    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(app_shared_layout_footer_footer__WEBPACK_IMPORTED_MODULE_12__["default"], null)))));
    };
    return App;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component));

var mapStateToProps = function (_a) {
    var authentication = _a.authentication, applicationProfile = _a.applicationProfile, locale = _a.locale;
    return ({
        currentLocale: locale.currentLocale,
        isAuthenticated: authentication.isAuthenticated,
        isAdmin: Object(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_13__["hasAnyAuthority"])(authentication.account.authorities, [app_config_constants__WEBPACK_IMPORTED_MODULE_15__["AUTHORITIES"].ADMIN]),
        ribbonEnv: applicationProfile.ribbonEnv,
        isInProduction: applicationProfile.inProduction,
        isSwaggerEnabled: applicationProfile.isSwaggerEnabled
    });
};
var mapDispatchToProps = { setLocale: app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_10__["setLocale"], getSession: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_8__["getSession"], getProfile: app_shared_reducers_application_profile__WEBPACK_IMPORTED_MODULE_9__["getProfile"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(App));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\app.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\app.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/axios-interceptor.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/config/axios-interceptor.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");



var TIMEOUT = 1 * 60 * 1000;
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.timeout = TIMEOUT;
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.baseURL = app_config_constants__WEBPACK_IMPORTED_MODULE_2__["SERVER_API_URL"];
var setupAxiosInterceptors = function (onUnauthenticated) {
    var onRequestSuccess = function (config) {
        var token = react_jhipster__WEBPACK_IMPORTED_MODULE_1__["Storage"].local.get('jhi-authenticationToken') || react_jhipster__WEBPACK_IMPORTED_MODULE_1__["Storage"].session.get('jhi-authenticationToken');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };
    var onResponseSuccess = function (response) { return response; };
    var onResponseError = function (err) {
        var status = err.status || err.response.status;
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.request.use(onRequestSuccess);
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.response.use(onResponseSuccess, onResponseError);
};
/* harmony default export */ __webpack_exports__["default"] = (setupAxiosInterceptors);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\axios-interceptor.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\axios-interceptor.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/constants.ts":
/*!*************************************************!*\
  !*** ./src/main/webapp/app/config/constants.ts ***!
  \*************************************************/
/*! exports provided: default, SERVER_API_URL, AUTHORITIES, messages, APP_DATE_FORMAT, APP_TIMESTAMP_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_WHOLE_NUMBER_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_API_URL", function() { return SERVER_API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHORITIES", function() { return AUTHORITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messages", function() { return messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_DATE_FORMAT", function() { return APP_DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_TIMESTAMP_FORMAT", function() { return APP_TIMESTAMP_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATE_FORMAT", function() { return APP_LOCAL_DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATETIME_FORMAT", function() { return APP_LOCAL_DATETIME_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATETIME_FORMAT_Z", function() { return APP_LOCAL_DATETIME_FORMAT_Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_WHOLE_NUMBER_FORMAT", function() { return APP_WHOLE_NUMBER_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT", function() { return APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT; });
var config = {
    VERSION: '0.0.1-SNAPSHOT'
};
/* harmony default export */ __webpack_exports__["default"] = (config);
var SERVER_API_URL = '';
var AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
    PERSON: 'ROLE_PERSON'
};
var messages = {
    DATA_ERROR_ALERT: 'Internal Error'
};
var APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
var APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
var APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
var APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
var APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
var APP_WHOLE_NUMBER_FORMAT = '0,0';
var APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\constants.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\constants.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/devtools.tsx":
/*!*************************************************!*\
  !*** ./src/main/webapp/app/config/devtools.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools */ "./node_modules/redux-devtools/lib/index.js");
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-log-monitor */ "./node_modules/redux-devtools-log-monitor/lib/index.js");
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-devtools-dock-monitor */ "./node_modules/redux-devtools-dock-monitor/lib/index.js");
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__);




// You can toggle visibility of devTools with ctrl + H
// and change their position with ctrl + Q
/* harmony default export */ __webpack_exports__["default"] = (Object(redux_devtools__WEBPACK_IMPORTED_MODULE_1__["createDevTools"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default.a, { toggleVisibilityKey: "ctrl-h", changePositionKey: "ctrl-q", defaultIsVisible: false },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default.a, null))));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\devtools.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\devtools.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/error-middleware.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/config/error-middleware.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_0__);

var getErrorMessage = function (errorData) {
    var message = errorData.message;
    if (errorData.fieldErrors) {
        errorData.fieldErrors.forEach(function (fErr) {
            message += "\nfield: " + fErr.field + ",  Object: " + fErr.objectName + ", message: " + fErr.message + "\n";
        });
    }
    return message;
};
/* harmony default export */ __webpack_exports__["default"] = (function () { return function (next) { return function (action) {
    // If not a promise, continue on
    if (!Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(action.payload)) {
        return next(action);
    }
    /**
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     * It need not run in production
     */
    if (true) {
        // Dispatch initial pending promise, but catch any errors
        return next(action).catch(function (error) {
            console.error(action.type + " caught at middleware with reason: " + JSON.stringify(error.message) + ".");
            if (error && error.response && error.response.data) {
                var message = getErrorMessage(error.response.data);
                console.error("Actual cause: " + message);
            }
            return Promise.reject(error);
        });
    }
    return next(action);
}; }; });


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\error-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\error-middleware.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/icon-loader.ts":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/config/icon-loader.ts ***!
  \***************************************************/
/*! exports provided: loadIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadIcons", function() { return loadIcons; });
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSort */ "./node_modules/@fortawesome/free-solid-svg-icons/faSort.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faEye */ "./node_modules/@fortawesome/free-solid-svg-icons/faEye.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSync */ "./node_modules/@fortawesome/free-solid-svg-icons/faSync.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBan */ "./node_modules/@fortawesome/free-solid-svg-icons/faBan.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTrash */ "./node_modules/@fortawesome/free-solid-svg-icons/faTrash.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faArrowLeft */ "./node_modules/@fortawesome/free-solid-svg-icons/faArrowLeft.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSave */ "./node_modules/@fortawesome/free-solid-svg-icons/faSave.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPlus */ "./node_modules/@fortawesome/free-solid-svg-icons/faPlus.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPencilAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faPencilAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faUser */ "./node_modules/@fortawesome/free-solid-svg-icons/faUser.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHdd */ "./node_modules/@fortawesome/free-solid-svg-icons/faHdd.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTachometerAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faTachometerAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHeart */ "./node_modules/@fortawesome/free-solid-svg-icons/faHeart.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faList */ "./node_modules/@fortawesome/free-solid-svg-icons/faList.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTasks */ "./node_modules/@fortawesome/free-solid-svg-icons/faTasks.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBook */ "./node_modules/@fortawesome/free-solid-svg-icons/faBook.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faClock__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faClock */ "./node_modules/@fortawesome/free-solid-svg-icons/faClock.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faClock__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faClock__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSignInAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faSignInAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSignOutAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faSignOutAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faThList */ "./node_modules/@fortawesome/free-solid-svg-icons/faThList.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faUserPlus */ "./node_modules/@fortawesome/free-solid-svg-icons/faUserPlus.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faWrench */ "./node_modules/@fortawesome/free-solid-svg-icons/faWrench.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faAsterisk */ "./node_modules/@fortawesome/free-solid-svg-icons/faAsterisk.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faFlag */ "./node_modules/@fortawesome/free-solid-svg-icons/faFlag.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBell */ "./node_modules/@fortawesome/free-solid-svg-icons/faBell.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHome */ "./node_modules/@fortawesome/free-solid-svg-icons/faHome.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTimesCircle */ "./node_modules/@fortawesome/free-solid-svg-icons/faTimesCircle.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSearch */ "./node_modules/@fortawesome/free-solid-svg-icons/faSearch.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faRoad */ "./node_modules/@fortawesome/free-solid-svg-icons/faRoad.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faCloud */ "./node_modules/@fortawesome/free-solid-svg-icons/faCloud.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");































var loadIcons = function () {
    _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_30__["library"].add(_fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__["faSort"], _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__["faEye"], _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__["faSync"], _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__["faBan"], _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__["faTrash"], _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__["faArrowLeft"], _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__["faSave"], _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__["faPlus"], _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__["faPencilAlt"], _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__["faUser"], _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__["faTachometerAlt"], _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__["faHeart"], _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__["faList"], _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__["faTasks"], _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__["faBook"], _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__["faHdd"], _fortawesome_free_solid_svg_icons_faClock__WEBPACK_IMPORTED_MODULE_16__["faClock"], _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__["faSignInAlt"], _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__["faSignOutAlt"], _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__["faWrench"], _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__["faThList"], _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__["faUserPlus"], _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__["faAsterisk"], _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__["faFlag"], _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__["faBell"], _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__["faHome"], _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__["faRoad"], _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__["faCloud"], _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__["faTimesCircle"], _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__["faSearch"]);
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\icon-loader.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\icon-loader.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/logger-middleware.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/config/logger-middleware.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony default export */ __webpack_exports__["default"] = (function () { return function (next) { return function (action) {
    if (true) {
        var type = action.type, payload = action.payload, meta = action.meta;
        console.groupCollapsed(type);
        // tslint:disable-next-line
        console.log('Payload:', payload);
        // tslint:disable-next-line
        console.log('Meta:', meta);
        console.groupEnd();
    }
    return next(action);
}; }; });


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\logger-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\logger-middleware.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/notification-middleware.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/config/notification-middleware.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_1__);


var addErrorAlert = function (message, key, data) {
    key = key ? key : message;
    react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["translate"])(key, data));
};
/* harmony default export */ __webpack_exports__["default"] = (function () { return function (next) { return function (action) {
    // If not a promise, continue on
    if (!Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(action.payload)) {
        return next(action);
    }
    /**
     *
     * The notification middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `then` and `catch.
     */
    return next(action)
        .then(function (response) {
        if (action.meta && action.meta.successMessage) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].success(action.meta.successMessage);
        }
        else if (response && response.action && response.action.payload && response.action.payload.headers) {
            var headers = response.action.payload.headers;
            var alert_1 = null;
            var alertParams_1 = null;
            Object.entries(headers).forEach(function (_a) {
                var k = _a[0], v = _a[1];
                if (k.toLowerCase().endsWith('app-alert')) {
                    alert_1 = v;
                }
                else if (k.toLowerCase().endsWith('app-params')) {
                    alertParams_1 = v;
                }
            });
            if (alert_1) {
                var alertParam = alertParams_1;
                react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].success(Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["translate"])(alert_1, { param: alertParam }));
            }
        }
        return Promise.resolve(response);
    })
        .catch(function (error) {
        if (action.meta && action.meta.errorMessage) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(action.meta.errorMessage);
        }
        else if (error && error.response) {
            var response = error.response;
            var data = response.data;
            if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
                var i = void 0;
                switch (response.status) {
                    // connection refused, server not reachable
                    case 0:
                        addErrorAlert('Server not reachable', 'error.server.not.reachable');
                        break;
                    case 400:
                        var headers = Object.entries(response.headers);
                        var errorHeader_1 = null;
                        var entityKey_1 = null;
                        headers.forEach(function (_a) {
                            var k = _a[0], v = _a[1];
                            if (k.toLowerCase().endsWith('app-error')) {
                                errorHeader_1 = v;
                            }
                            else if (k.toLowerCase().endsWith('app-params')) {
                                entityKey_1 = v;
                            }
                        });
                        if (errorHeader_1) {
                            var entityName = Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["translate"])('global.menu.entities.' + entityKey_1);
                            addErrorAlert(errorHeader_1, errorHeader_1, { entityName: entityName });
                        }
                        else if (data !== '' && data.fieldErrors) {
                            var fieldErrors = data.fieldErrors;
                            for (i = 0; i < fieldErrors.length; i++) {
                                var fieldError = fieldErrors[i];
                                if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                    fieldError.message = 'Size';
                                }
                                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                var convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                var fieldName = Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["translate"])("sicoApp." + fieldError.objectName + "." + convertedField);
                                addErrorAlert("Error on field \"" + fieldName + "\"", "error." + fieldError.message, { fieldName: fieldName });
                            }
                        }
                        else if (data !== '' && data.message) {
                            addErrorAlert(data.message, data.message, data.params);
                        }
                        else {
                            addErrorAlert(data);
                        }
                        break;
                    case 404:
                        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info(response.data.title);
                        break;
                    case 303:
                        addErrorAlert(response.data.title, 'msn');
                        break;
                    default:
                        if (data !== '' && data.message) {
                            addErrorAlert(data.message);
                        }
                        else {
                            addErrorAlert(data);
                        }
                }
            }
        }
        else if (error && error.message) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(error.message);
        }
        else {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error('Unknown error!');
        }
        return Promise.reject(error);
    });
}; }; });


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\notification-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\notification-middleware.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/store.ts":
/*!*********************************************!*\
  !*** ./src/main/webapp/app/config/store.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_promise_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-promise-middleware */ "./node_modules/redux-promise-middleware/dist/es/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var app_shared_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers */ "./src/main/webapp/app/shared/reducers/index.ts");
/* harmony import */ var _devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./devtools */ "./src/main/webapp/app/config/devtools.tsx");
/* harmony import */ var _error_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error-middleware */ "./src/main/webapp/app/config/error-middleware.ts");
/* harmony import */ var _notification_middleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification-middleware */ "./src/main/webapp/app/config/notification-middleware.ts");
/* harmony import */ var _logger_middleware__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logger-middleware */ "./src/main/webapp/app/config/logger-middleware.ts");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__);









var defaultMiddlewares = [
    redux_thunk__WEBPACK_IMPORTED_MODULE_2__["default"],
    _error_middleware__WEBPACK_IMPORTED_MODULE_5__["default"],
    _notification_middleware__WEBPACK_IMPORTED_MODULE_6__["default"],
    Object(redux_promise_middleware__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    Object(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__["loadingBarMiddleware"])(),
    _logger_middleware__WEBPACK_IMPORTED_MODULE_7__["default"]
];
var composedMiddlewares = function (middlewares) {
    return  true
        ? Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, defaultMiddlewares.concat(middlewares)), _devtools__WEBPACK_IMPORTED_MODULE_4__["default"].instrument())
        : undefined;
};
var initialize = function (initialState, middlewares) {
    if (middlewares === void 0) { middlewares = []; }
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(app_shared_reducers__WEBPACK_IMPORTED_MODULE_3__["default"], initialState, composedMiddlewares(middlewares));
};
/* harmony default export */ __webpack_exports__["default"] = (initialize);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\store.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\store.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/translation.ts":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/config/translation.ts ***!
  \***************************************************/
/*! exports provided: languages, locales, registerLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "languages", function() { return languages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locales", function() { return locales; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerLocale", function() { return registerLocale; });
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/locale */ "./src/main/webapp/app/shared/reducers/locale.ts");


react_jhipster__WEBPACK_IMPORTED_MODULE_0__["TranslatorContext"].setDefaultLocale('es');
react_jhipster__WEBPACK_IMPORTED_MODULE_0__["TranslatorContext"].setRenderInnerTextForMissingKeys(false);
var languages = {
    en: { name: 'English' },
    es: { name: 'Español' }
    // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};
var locales = Object.keys(languages).sort();
var registerLocale = function (store) {
    store.dispatch(Object(app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_1__["setLocale"])(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["Storage"].session.get('locale', 'es')));
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\translation.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\config\\translation.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/banco-delete-dialog.tsx":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/banco-delete-dialog.tsx ***!
  \********************************************************************/
/*! exports provided: BancoDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BancoDeleteDialog", function() { return BancoDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _banco_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");







var BancoDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BancoDeleteDialog, _super);
    function BancoDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.bancoEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    BancoDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    BancoDeleteDialog.prototype.render = function () {
        var bancoEntity = this.props.bancoEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.banco.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.banco.delete.question", interpolate: { id: bancoEntity.id } }, "Are you sure you want to delete this Banco?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-banco", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return BancoDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var banco = _a.banco;
    return ({
        bancoEntity: banco.entity
    });
};
var mapDispatchToProps = { getEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(BancoDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/banco-detail.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/banco-detail.tsx ***!
  \*************************************************************/
/*! exports provided: BancoDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BancoDetail", function() { return BancoDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _banco_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var BancoDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BancoDetail, _super);
    function BancoDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BancoDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    BancoDetail.prototype.render = function () {
        var bancoEntity = this.props.bancoEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.banco.detail.title" }, "Banco"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, bancoEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "bancoName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.banco.bancoName" }, "Banco Name"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, bancoEntity.bancoName)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/banco", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/banco/" + bancoEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return BancoDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var banco = _a.banco;
    return ({
        bancoEntity: banco.entity
    });
};
var mapDispatchToProps = { getEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(BancoDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/banco-update.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/banco-update.tsx ***!
  \*************************************************************/
/*! exports provided: BancoUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BancoUpdate", function() { return BancoUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _banco_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");






// tslint:disable-next-line:no-unused-variable



var BancoUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BancoUpdate, _super);
    function BancoUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            if (errors.length === 0) {
                var bancoEntity = _this.props.bancoEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, bancoEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/banco');
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    BancoUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    BancoUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    };
    BancoUpdate.prototype.render = function () {
        var _a = this.props, bancoEntity = _a.bancoEntity, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.banco.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.banco.home.createOrEditLabel" }, "Create or edit a Banco")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : bancoEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "banco-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "bancoNameLabel", for: "bancoName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.banco.bancoName" }, "Banco Name")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "banco-bancoName", type: "text", name: "bancoName" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/banco", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return BancoUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    bancoEntity: storeState.banco.entity,
    loading: storeState.banco.loading,
    updating: storeState.banco.updating,
    updateSuccess: storeState.banco.updateSuccess
}); };
var mapDispatchToProps = {
    getEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntity"],
    updateEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_8__["updateEntity"],
    createEntity: _banco_reducer__WEBPACK_IMPORTED_MODULE_8__["createEntity"],
    reset: _banco_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(BancoUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/banco.reducer.ts":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/banco.reducer.ts ***!
  \*************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_banco_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/banco.model */ "./src/main/webapp/app/shared/model/banco.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_BANCO_LIST: 'banco/FETCH_BANCO_LIST',
    FETCH_BANCO: 'banco/FETCH_BANCO',
    CREATE_BANCO: 'banco/CREATE_BANCO',
    UPDATE_BANCO: 'banco/UPDATE_BANCO',
    DELETE_BANCO: 'banco/DELETE_BANCO',
    RESET: 'banco/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_banco_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_BANCO_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_BANCO_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_BANCO_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_BANCO):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_BANCO):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/bancos';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_BANCO_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_BANCO,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_BANCO,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_BANCO,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_BANCO,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/banco.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/banco.tsx ***!
  \******************************************************/
/*! exports provided: Banco, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Banco", function() { return Banco; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _banco_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var Banco = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Banco, _super);
    function Banco() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Banco.prototype.componentDidMount = function () {
        this.props.getEntities();
    };
    Banco.prototype.render = function () {
        var _a = this.props, bancoList = _a.bancoList, match = _a.match;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "banco-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.banco.home.title" }, "Bancos"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.banco.home.createLabel" }, "Create new Banco"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.banco.bancoName" }, "Banco Name")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, bancoList.map(function (banco, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + banco.id, color: "link", size: "sm" }, banco.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, banco.bancoName),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + banco.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + banco.id + "/edit", color: "primary", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + banco.id + "/delete", color: "danger", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "trash" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.delete" }, "Delete"))))))); }))))));
    };
    return Banco;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var banco = _a.banco;
    return ({
        bancoList: banco.entities
    });
};
var mapDispatchToProps = {
    getEntities: _banco_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Banco));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\banco.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/banco/index.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/banco/index.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _banco__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./banco */ "./src/main/webapp/app/entities/banco/banco.tsx");
/* harmony import */ var _banco_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./banco-detail */ "./src/main/webapp/app/entities/banco/banco-detail.tsx");
/* harmony import */ var _banco_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./banco-update */ "./src/main/webapp/app/entities/banco/banco-update.tsx");
/* harmony import */ var _banco_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./banco-delete-dialog */ "./src/main/webapp/app/entities/banco/banco-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _banco_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _banco_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _banco_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _banco__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _banco_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\banco\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/cliente-delete-dialog.tsx":
/*!************************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/cliente-delete-dialog.tsx ***!
  \************************************************************************/
/*! exports provided: ClienteDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteDeleteDialog", function() { return ClienteDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _cliente_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");







var ClienteDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ClienteDeleteDialog, _super);
    function ClienteDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.clienteEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    ClienteDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    ClienteDeleteDialog.prototype.render = function () {
        var clienteEntity = this.props.clienteEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.cliente.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.cliente.delete.question", interpolate: { id: clienteEntity.id } }, "Are you sure you want to delete this Cliente?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-cliente", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return ClienteDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var cliente = _a.cliente;
    return ({
        clienteEntity: cliente.entity
    });
};
var mapDispatchToProps = { getEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ClienteDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/cliente-detail.tsx":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/cliente-detail.tsx ***!
  \*****************************************************************/
/*! exports provided: ClienteDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteDetail", function() { return ClienteDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var ClienteDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ClienteDetail, _super);
    function ClienteDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClienteDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    ClienteDetail.prototype.render = function () {
        var clienteEntity = this.props.clienteEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.detail.title" }, "Cliente"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, clienteEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "firstName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.firstName" }, "First Name"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.firstName),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "lastName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.lastName" }, "Last Name"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.lastName),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "telefono" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.telefono" }, "Telefono"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.telefono),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "mail" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.mail" }, "Mail"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.mail),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "sexo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.sexo" }, "Sexo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.sexo),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "salary" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.salary" }, "Salary"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.salary),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "scoringCredit" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.scoringCredit" }, "Scoring Credit"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.scoringCredit),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.department" }, "Department")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, clienteEntity.department ? clienteEntity.department.id : '')),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/cliente", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/cliente/" + clienteEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return ClienteDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var cliente = _a.cliente;
    return ({
        clienteEntity: cliente.entity
    });
};
var mapDispatchToProps = { getEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ClienteDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/cliente-update.tsx":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/cliente-update.tsx ***!
  \*****************************************************************/
/*! exports provided: ClienteUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteUpdate", function() { return ClienteUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/entities/banco/banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");
/* harmony import */ var app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/entities/department/department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");
/* harmony import */ var _cliente_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");
/* harmony import */ var app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/shared/util/date-utils */ "./src/main/webapp/app/shared/util/date-utils.ts");






// tslint:disable-next-line:no-unused-variable





// tslint:disable-next-line:no-unused-variable

var ClienteUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ClienteUpdate, _super);
    function ClienteUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            values.fechaNacimiento = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_11__["convertDateTimeToServer"])(values.fechaNacimiento);
            if (errors.length === 0) {
                var clienteEntity = _this.props.clienteEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, clienteEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/cliente');
        };
        _this.state = {
            departmentId: '0',
            bancoId: '0',
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    ClienteUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    ClienteUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
        this.props.getDepartments();
        this.props.getBancos();
    };
    ClienteUpdate.prototype.render = function () {
        var _a = this.props, clienteEntity = _a.clienteEntity, departments = _a.departments, bancos = _a.bancos, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.cliente.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.home.createOrEditLabel" }, "Create or edit a Cliente")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : clienteEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "cliente-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "firstNameLabel", for: "firstName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.firstName" }, "First Name")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-firstName", type: "text", name: "firstName", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "lastNameLabel", for: "lastName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.lastName" }, "Last Name")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-lastName", type: "text", name: "lastName", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "dniLabel", for: "dni" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.dni" }, "Dni")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-dni", type: "text", name: "dni", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cuitLabel", for: "cuit" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.cuit" }, "Cuit")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-cuit", type: "text", name: "cuit", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaNacimientoLabel", for: "fechaNacimiento" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.fechaNacimiento" }, "Fecha Nacimiento")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "cliente-fechaNacimiento", type: "date", className: "form-control", name: "fechaNacimiento", placeholder: 'YYYY-MM-DD', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_11__["convertDateTimeFromServer"])(this.props.clienteEntity.fechaNacimiento) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "direccionLabel", for: "direccion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.direccion" }, "Direccion")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-direccion", type: "text", name: "direccion" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "numeroLabel", for: "numero" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.numero" }, "Numero")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-numero", type: "string", className: "form-control", name: "numero" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "department.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.department" }, "Department")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "cliente-department", type: "select", className: "form-control", name: "department.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "", key: "0" }),
                            departments
                                ? departments.map(function (otherEntity) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.departmentName)); })
                                : null)),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "telefonoLabel", for: "telefono" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.telefono" }, "Telefono")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-telefono", type: "text", name: "telefono" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "mailLabel", for: "mail" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.mail" }, "Mail")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-mail", type: "text", name: "mail" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "sexoLabel" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.sexo" }, "Sexo")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "cliente-sexo", type: "select", className: "form-control", name: "sexo", value: (!isNew && clienteEntity.sexo) || 'MASCULINO' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "MASCULINO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.SEXO.MASCULINO" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "FEMENINO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.SEXO.FEMENINO" })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "salaryLabel", for: "nroCbu" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.nroCbu" }, "Nro CBU")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-nroCbu", type: "string", className: "form-control", name: "nroCbu" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "salaryLabel", for: "salary" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.numeroCuenta" }, "Numero Cuenta")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-numeroCuenta", type: "string", className: "form-control", name: "numeroCuenta" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "salaryLabel", for: "salary" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.salary" }, "Salary")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-salary", type: "string", className: "form-control", name: "salary" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "scoringCreditLabel", for: "scoringCredit" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.scoringCredit" }, "Scoring Credit")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "cliente-scoringCredit", type: "string", className: "form-control", name: "scoringCredit" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "banco.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.cliente.banco" }, "Banco")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "cliente-banco", type: "select", className: "form-control", name: "banco.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "", key: "0" }),
                            bancos
                                ? bancos.map(function (otherEntity) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.bancoName)); })
                                : null)),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/cliente", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return ClienteUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    departments: storeState.department.entities,
    bancos: storeState.banco.entities,
    clienteEntity: storeState.cliente.entity,
    loading: storeState.cliente.loading,
    updating: storeState.cliente.updating,
    updateSuccess: storeState.cliente.updateSuccess
}); };
var mapDispatchToProps = {
    getDepartments: app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_9__["getEntities"],
    getBancos: app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntities"],
    getEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_10__["getEntity"],
    updateEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_10__["updateEntity"],
    createEntity: _cliente_reducer__WEBPACK_IMPORTED_MODULE_10__["createEntity"],
    reset: _cliente_reducer__WEBPACK_IMPORTED_MODULE_10__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ClienteUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/cliente.reducer.ts ***!
  \*****************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, getEntityByEmail, createEntity, createEntityMisDatos, updateEntityMisDatos, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityByEmail", function() { return getEntityByEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityMisDatos", function() { return createEntityMisDatos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntityMisDatos", function() { return updateEntityMisDatos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_cliente_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/shared/model/cliente.model */ "./src/main/webapp/app/shared/model/cliente.model.ts");
var _this = undefined;






var ACTION_TYPES = {
    FETCH_CLIENTE_LIST: 'cliente/FETCH_CLIENTE_LIST',
    FETCH_CLIENTE: 'cliente/FETCH_CLIENTE',
    CREATE_CLIENTE: 'cliente/CREATE_CLIENTE',
    UPDATE_CLIENTE: 'cliente/UPDATE_CLIENTE',
    DELETE_CLIENTE: 'cliente/DELETE_CLIENTE',
    RESET: 'cliente/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    cuenta: {},
    entity: app_shared_model_cliente_model__WEBPACK_IMPORTED_MODULE_5__["defaultValue"],
    updating: false,
    totalItems: 0,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])(ACTION_TYPES.FETCH_CLIENTE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])(ACTION_TYPES.FETCH_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])(ACTION_TYPES.CREATE_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])(ACTION_TYPES.UPDATE_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])(ACTION_TYPES.DELETE_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["FAILURE"])(ACTION_TYPES.FETCH_CLIENTE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["FAILURE"])(ACTION_TYPES.FETCH_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["FAILURE"])(ACTION_TYPES.CREATE_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["FAILURE"])(ACTION_TYPES.UPDATE_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["FAILURE"])(ACTION_TYPES.DELETE_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"])(ACTION_TYPES.FETCH_CLIENTE_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, totalItems: action.payload.headers['x-total-count'], entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"])(ACTION_TYPES.FETCH_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"])(ACTION_TYPES.CREATE_CLIENTE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"])(ACTION_TYPES.UPDATE_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"])(ACTION_TYPES.DELETE_CLIENTE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/clientes';
// Actions
var getEntities = function (page, size, sort) {
    var requestUrl = "" + apiUrl + (sort ? "?page=" + page + "&size=" + size + "&sort=" + sort : '');
    return {
        type: ACTION_TYPES.FETCH_CLIENTE_LIST,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("" + requestUrl + (sort ? '&' : '?') + "cacheBuster=" + new Date().getTime())
    };
};
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_CLIENTE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var getEntityByEmail = function () {
    var requestUrl = "api/ByEmail/" + react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get('email', '');
    return {
        type: ACTION_TYPES.FETCH_CLIENTE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_CLIENTE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_3__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var createEntityMisDatos = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                entity.mail = react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get('email', '');
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.CREATE_CLIENTE,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_3__["cleanEntity"])(entity))
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntityMisDatos = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                entity.mail = react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get('email', '');
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.UPDATE_CLIENTE,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_3__["cleanEntity"])(entity))
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_CLIENTE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_3__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_CLIENTE,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/cliente.tsx":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/cliente.tsx ***!
  \**********************************************************/
/*! exports provided: Cliente, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cliente", function() { return Cliente; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/pagination.constants */ "./src/main/webapp/app/shared/util/pagination.constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable


var Cliente = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Cliente, _super);
    function Cliente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getSortState"])(_this.props.location, app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__["ITEMS_PER_PAGE"]));
        _this.sort = function (prop) { return function () {
            _this.setState({
                order: _this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            }, function () { return _this.sortEntities(); });
        }; };
        _this.handlePagination = function (activePage) { return _this.setState({ activePage: activePage }, function () { return _this.sortEntities(); }); };
        _this.getEntities = function () {
            var _a = _this.state, activePage = _a.activePage, itemsPerPage = _a.itemsPerPage, sort = _a.sort, order = _a.order;
            _this.props.getEntities(activePage - 1, itemsPerPage, sort + "," + order);
        };
        return _this;
    }
    Cliente.prototype.componentDidMount = function () {
        this.getEntities();
    };
    Cliente.prototype.sortEntities = function () {
        this.getEntities();
        this.props.history.push(this.props.location.pathname + "?page=" + this.state.activePage + "&sort=" + this.state.sort + "," + this.state.order);
    };
    Cliente.prototype.render = function () {
        var _a = this.props, clienteList = _a.clienteList, match = _a.match, totalItems = _a.totalItems;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "cliente-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.home.title" }, "Clientes"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.home.createLabel" }, "Create new Cliente"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('id') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('firstName') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.firstName" }, "First Name"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('lastName') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.lastName" }, "Last Name"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('dni') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.dni" }, "Dni"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cuit') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.cuit" }, "Dni"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('fechaNacimiento') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.fechaNacimiento" }, "Fecha Nacimiento"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('direccion') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.direccion" }, "Direccion"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('numero') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.numero" }, "Numero"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('telefono') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.telefono" }, "Telefono"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('mail') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.mail" }, "Mail"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('sexo') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.sexo" }, "Sexo"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('salary') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.salary" }, "Salary"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('scoringCredit') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.scoringCredit" }, "Scoring Credit"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.cliente.department" }, "Department"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, clienteList.map(function (cliente, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + cliente.id, color: "link", size: "sm" }, cliente.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.firstName),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.lastName),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.dni),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.cuit),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { type: "date", value: cliente.fechaNacimiento, format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_LOCAL_DATE_FORMAT"] })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.direccion),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.numero),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.telefono),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.mail),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.SEXO." + cliente.sexo })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.salary),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.scoringCredit),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, cliente.department ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "department/" + cliente.department.id }, cliente.department.departmentName) : ''),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + cliente.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + cliente.id + "/edit", color: "primary", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + cliente.id + "/delete", color: "danger", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "trash" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.delete" }, "Delete"))))))); })))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["JhiPagination"], { items: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getPaginationItemsNumber"])(totalItems, this.state.itemsPerPage), activePage: this.state.activePage, onSelect: this.handlePagination, maxButtons: 5 }))));
    };
    return Cliente;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var cliente = _a.cliente;
    return ({
        clienteList: cliente.entities,
        totalItems: cliente.totalItems
    });
};
var mapDispatchToProps = {
    getEntities: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Cliente));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\cliente.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/clientemisdatos.tsx":
/*!******************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/clientemisdatos.tsx ***!
  \******************************************************************/
/*! exports provided: ClienteMisDatos, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteMisDatos", function() { return ClienteMisDatos; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/entities/banco/banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");
/* harmony import */ var app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/entities/department/department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");
/* harmony import */ var _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/date-utils */ "./src/main/webapp/app/shared/util/date-utils.ts");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");












var ClienteMisDatos = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ClienteMisDatos, _super);
    function ClienteMisDatos(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            values.fechaNacimiento = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaNacimiento);
            if (errors.length === 0) {
                var clienteEntity = _this.props.clienteEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, clienteEntity, values);
                /* if (this.state.isNew) {
                   this.props.createEntityMisDatos(entity);
                 } else {
                   this.props.updateEntityMisDatos(entity);
                 }*/
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/clientemisdatosmensajes');
        };
        _this.state = {
            departmentId: '0',
            bancoId: '0',
            isNew: !_this.props.clienteEntity || !_this.props.clienteEntity.id
        };
        return _this;
    }
    ClienteMisDatos.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    ClienteMisDatos.prototype.componentDidMount = function () {
        this.props.reset();
        this.props.getDepartments();
        this.props.getBancos();
    };
    ClienteMisDatos.prototype.render = function () {
        var _a = this.props, clienteEntity = _a.clienteEntity, departments = _a.departments, bancos = _a.bancos, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.cliente.home.createOrEditLabel", className: "title" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.home.actualizarmisdatos" }, "Actualizar mis Datos")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { model: isNew ? {} : clienteEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "cliente-id", type: "text", className: "bg", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "firstNameLabel", for: "firstName", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.firstName" }, "First Name"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-firstName", type: "text", name: "firstName", className: "bg", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "lastNameLabel", for: "lastName", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.lastName" }, "Last Name"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-lastName", type: "text", name: "lastName", className: "bg", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "mailLabel", for: "mail", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.mail" }, "Mail"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-mail", className: "bg", required: true, type: "text", name: "mail" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "dniLabel", for: "dni", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.dni" }, "Dni"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-dni", type: "text", name: "dni", className: "bg", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "fechaNacimientoLabel", for: "fechaNacimiento", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.fechaNacimiento" }, "Fecha Nacimiento"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "cliente-fechaNacimiento", type: "date", name: "fechaNacimiento", className: "bg", placeholder: 'DD-MM-YYYY', value: Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeFromServer"])(this.props.clienteEntity.fechaNacimiento) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "direccionLabel", for: "direccion", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.direccion" }, "Direccion"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-direccion", className: "bg", type: "text", name: "direccion" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "numeroLabel", for: "numero", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.numero" }, "Numero"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-numero", type: "string", className: "bg", name: "numero" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { for: "department.id", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.department" }, "Department"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "cliente-department", type: "select", className: "bg", name: "department.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "", key: "0" }),
                            departments
                                ? departments.map(function (otherEntity) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.departmentName)); })
                                : null)),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "telefonoLabel", for: "telefono", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.telefono" }, "Telefono"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-telefono", className: "bg", type: "text", name: "telefono" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "sexoLabel", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.sexo" }, "Sexo"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "cliente-sexo", type: "select", className: "bg", name: "sexo", value: clienteEntity.sexo },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "MASCULINO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.SEXO.MASCULINO" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "FEMENINO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.SEXO.FEMENINO" })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "salaryLabel", for: "nroCbu", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.nroCbu" }, "Nro CBU"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-nroCbu", type: "string", className: "bg", name: "nroCbu" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { id: "salaryLabel", for: "numeroCuenta", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.numeroCuenta" }, "Numero Cuenta"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "cliente-numeroCuenta", type: "string", className: "bg", name: "numeroCuenta" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "divsubtitulos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Label"], { for: "banco.id", className: "subtitulos" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "sicoApp.cliente.banco" }, "Banco"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "cliente-banco", type: "select", className: "bg", name: "banco.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "", key: "0" }),
                            bancos
                                ? bancos.map(function (otherEntity) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.bancoName)); })
                                : null)),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/cliente", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_11__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_11__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_10__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return ClienteMisDatos;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    departments: storeState.department.entities,
    bancos: storeState.banco.entities,
    clienteEntity: storeState.cliente.entity,
    loading: storeState.cliente.loading,
    updating: storeState.cliente.updating,
    updateSuccess: storeState.cliente.updateSuccess
}); };
var mapDispatchToProps = {
    getEntityByEmail: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntityByEmail"],
    getDepartments: app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntities"],
    getBancos: app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntities"],
    createEntityMisDatos: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["createEntityMisDatos"],
    updateEntityMisDatos: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["updateEntityMisDatos"],
    reset: _cliente_reducer__WEBPACK_IMPORTED_MODULE_7__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ClienteMisDatos));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\clientemisdatos.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\clientemisdatos.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/clientemisdatosmensajes.tsx":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/clientemisdatosmensajes.tsx ***!
  \**************************************************************************/
/*! exports provided: Clientemisdatosmensajes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clientemisdatosmensajes", function() { return Clientemisdatosmensajes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/modules/account/activate/activate.reducer */ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts");






var Clientemisdatosmensajes = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Clientemisdatosmensajes, _super);
    function Clientemisdatosmensajes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clientemisdatosmensajes.prototype.componentWillUnmount = function () {
        this.props.reset();
    };
    Clientemisdatosmensajes.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "actualization.title" }, "Actualizacion de Tus Datos")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "success" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "actualization.messages.success" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Sus Datos fueron actualizados con exito"),
                            " Please"))))));
    };
    return Clientemisdatosmensajes;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var activate = _a.activate;
    return ({
        activationSuccess: activate.activationSuccess,
        activationFailure: activate.activationFailure
    });
};
var mapDispatchToProps = { activateAction: app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_5__["activateAction"], reset: app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_5__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Clientemisdatosmensajes));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\clientemisdatosmensajes.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\clientemisdatosmensajes.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/cliente/index.tsx":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/entities/cliente/index.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _cliente__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cliente */ "./src/main/webapp/app/entities/cliente/cliente.tsx");
/* harmony import */ var _cliente_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cliente-detail */ "./src/main/webapp/app/entities/cliente/cliente-detail.tsx");
/* harmony import */ var _cliente_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cliente-update */ "./src/main/webapp/app/entities/cliente/cliente-update.tsx");
/* harmony import */ var _cliente_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliente-delete-dialog */ "./src/main/webapp/app/entities/cliente/cliente-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _cliente_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _cliente_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _cliente_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _cliente__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _cliente_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\cliente\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/country/country.reducer.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/entities/country/country.reducer.ts ***!
  \*****************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_country_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/country.model */ "./src/main/webapp/app/shared/model/country.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_COUNTRY_LIST: 'country/FETCH_COUNTRY_LIST',
    FETCH_COUNTRY: 'country/FETCH_COUNTRY',
    CREATE_COUNTRY: 'country/CREATE_COUNTRY',
    UPDATE_COUNTRY: 'country/UPDATE_COUNTRY',
    DELETE_COUNTRY: 'country/DELETE_COUNTRY',
    RESET: 'country/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_country_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_COUNTRY_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_COUNTRY_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_COUNTRY_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_COUNTRY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_COUNTRY):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/countries';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_COUNTRY_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_COUNTRY,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_COUNTRY,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_COUNTRY,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_COUNTRY,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\country\\country.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\country\\country.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit-detalle/credit-detalle.reducer.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/webapp/app/entities/credit-detalle/credit-detalle.reducer.ts ***!
  \*******************************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_credit_detalle_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/credit-detalle.model */ "./src/main/webapp/app/shared/model/credit-detalle.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_CREDITDETALLE_LIST: 'creditDetalle/FETCH_CREDITDETALLE_LIST',
    FETCH_CREDITDETALLE: 'creditDetalle/FETCH_CREDITDETALLE',
    CREATE_CREDITDETALLE: 'creditDetalle/CREATE_CREDITDETALLE',
    UPDATE_CREDITDETALLE: 'creditDetalle/UPDATE_CREDITDETALLE',
    DELETE_CREDITDETALLE: 'creditDetalle/DELETE_CREDITDETALLE',
    RESET: 'creditDetalle/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_credit_detalle_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_CREDITDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_CREDITDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/credit-detalles';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_CREDITDETALLE_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_CREDITDETALLE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_CREDITDETALLE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_CREDITDETALLE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_CREDITDETALLE,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit-detalle\\credit-detalle.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit-detalle\\credit-detalle.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/credit-delete-dialog.tsx":
/*!**********************************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/credit-delete-dialog.tsx ***!
  \**********************************************************************/
/*! exports provided: CreditDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditDeleteDialog", function() { return CreditDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _credit_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./credit.reducer */ "./src/main/webapp/app/entities/credit/credit.reducer.ts");







var CreditDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreditDeleteDialog, _super);
    function CreditDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.creditEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    CreditDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    CreditDeleteDialog.prototype.render = function () {
        var creditEntity = this.props.creditEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.credit.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.credit.delete.question", interpolate: { id: creditEntity.id } }, "Are you sure you want to delete this Credit?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-credit", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return CreditDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var credit = _a.credit;
    return ({
        creditEntity: credit.entity
    });
};
var mapDispatchToProps = { getEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CreditDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/credit-detail.tsx":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/credit-detail.tsx ***!
  \***************************************************************/
/*! exports provided: CreditDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditDetail", function() { return CreditDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _credit_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./credit.reducer */ "./src/main/webapp/app/entities/credit/credit.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var CreditDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreditDetail, _super);
    function CreditDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreditDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    CreditDetail.prototype.render = function () {
        var creditEntity = this.props.creditEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.detail.title" }, "Credit"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, creditEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "periodicidad" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.periodicidad" }, "Periodicidad"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.periodicidad),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "diaHoraEjecucion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.diaHoraEjecucion" }, "Dia Hora Ejecucion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.diaHoraEjecucion),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "tipoCobro" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.tipoCobro" }, "Tipo Cobro"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.tipoCobro),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "monto" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.monto" }, "Monto"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.monto),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "observaciones" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.observaciones" }, "Observaciones"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.observaciones),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "activo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.activo" }, "Activo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.activo ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cantCuotas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cantCuotas" }, "Cant Cuotas"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.cantCuotas),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaCobrada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cuotaCobrada" }, "Cuota Cobrada"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.cuotaCobrada),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaCreacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.fechaCreacion" }, "Fecha Creacion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: creditEntity.fechaCreacion, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaInicio" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.fechaInicio" }, "Fecha Inicio"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: creditEntity.fechaInicio, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaVencimiento" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.fechaVencimiento" }, "Fecha Vencimiento"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: creditEntity.fechaVencimiento, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "excluirFindeSemanas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.excluirFindeSemanas" }, "Excluir Finde Semanas"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.excluirFindeSemanas ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "porcParticipacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.porcParticipacion" }, "Porc Participacion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.porcParticipacion),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "capitalPrestamo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.capitalPrestamo" }, "Capital Prestamo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.capitalPrestamo),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "interesesPrestamos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.interesesPrestamos" }, "Intereses Prestamos"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.interesesPrestamos),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaPura" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cuotaPura" }, "Cuota Pura"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.cuotaPura),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "interesesCuota" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.interesesCuota" }, "Intereses Cuota"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.interesesCuota),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaRecuperoCapital" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cuotaRecuperoCapital" }, "Cuota Recupero Capital"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.cuotaRecuperoCapital),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cantidadRenegociado" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cantidadRenegociado" }, "Cantidad Renegociado"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.cantidadRenegociado),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "incobrable" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.incobrable" }, "Incobrable"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.incobrable ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "pagoManual" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.pagoManual" }, "Pago Manual"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.pagoManual ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "esPersonal" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.esPersonal" }, "Es Personal"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, creditEntity.esPersonal ? 'true' : 'false')),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/credit", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/credit/" + creditEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return CreditDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var credit = _a.credit;
    return ({
        creditEntity: credit.entity
    });
};
var mapDispatchToProps = { getEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CreditDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/credit-update.tsx":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/credit-update.tsx ***!
  \***************************************************************/
/*! exports provided: CreditUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditUpdate", function() { return CreditUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _credit_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./credit.reducer */ "./src/main/webapp/app/entities/credit/credit.reducer.ts");
/* harmony import */ var app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/date-utils */ "./src/main/webapp/app/shared/util/date-utils.ts");






// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var CreditUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreditUpdate, _super);
    function CreditUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            values.fechaCreacion = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaCreacion);
            values.fechaInicio = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaInicio);
            values.fechaVencimiento = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaVencimiento);
            if (errors.length === 0) {
                var creditEntity = _this.props.creditEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, creditEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/credit');
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    CreditUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    CreditUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    };
    CreditUpdate.prototype.render = function () {
        var _a = this.props, creditEntity = _a.creditEntity, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.credit.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.credit.home.createOrEditLabel" }, "Create or edit a Credit")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : creditEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "credit-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "capitalPrestamoLabel", for: "capitalPrestamo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.credit.capitalPrestamo" }, "Capital Prestamo")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "credit-capitalPrestamo", type: "string", className: "form-control", name: "capitalPrestamo" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cantCuotasLabel", for: "cantCuotas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.credit.cantCuotas" }, "Cant Cuotas")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "credit-cantCuotas", type: "string", className: "form-control", name: "cantCuotas" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/credit", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return CreditUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    creditEntity: storeState.credit.entity,
    loading: storeState.credit.loading,
    updating: storeState.credit.updating,
    updateSuccess: storeState.credit.updateSuccess
}); };
var mapDispatchToProps = {
    getEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntity"],
    updateEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_8__["updateEntity"],
    createEntity: _credit_reducer__WEBPACK_IMPORTED_MODULE_8__["createEntity"],
    reset: _credit_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CreditUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/credit.reducer.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/credit.reducer.ts ***!
  \***************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_credit_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/credit.model */ "./src/main/webapp/app/shared/model/credit.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_CREDIT_LIST: 'credit/FETCH_CREDIT_LIST',
    FETCH_CREDIT: 'credit/FETCH_CREDIT',
    CREATE_CREDIT: 'credit/CREATE_CREDIT',
    UPDATE_CREDIT: 'credit/UPDATE_CREDIT',
    DELETE_CREDIT: 'credit/DELETE_CREDIT',
    RESET: 'credit/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_credit_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    totalItems: 0,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_CREDIT_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_CREDIT_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_CREDIT_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, totalItems: action.payload.headers['x-total-count'], entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_CREDIT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_CREDIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/credits';
// Actions
var getEntities = function (page, size, sort) {
    var requestUrl = "" + apiUrl + (sort ? "?page=" + page + "&size=" + size + "&sort=" + sort : '');
    return {
        type: ACTION_TYPES.FETCH_CREDIT_LIST,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("" + requestUrl + (sort ? '&' : '?') + "cacheBuster=" + new Date().getTime())
    };
};
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_CREDIT,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_CREDIT,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_CREDIT,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_CREDIT,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/credit.tsx":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/credit.tsx ***!
  \********************************************************/
/*! exports provided: Credit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Credit", function() { return Credit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _credit_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./credit.reducer */ "./src/main/webapp/app/entities/credit/credit.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/pagination.constants */ "./src/main/webapp/app/shared/util/pagination.constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable


var Credit = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Credit, _super);
    function Credit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getSortState"])(_this.props.location, app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__["ITEMS_PER_PAGE"]));
        _this.sort = function (prop) { return function () {
            _this.setState({
                order: _this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            }, function () { return _this.sortEntities(); });
        }; };
        _this.handlePagination = function (activePage) { return _this.setState({ activePage: activePage }, function () { return _this.sortEntities(); }); };
        _this.getEntities = function () {
            var _a = _this.state, activePage = _a.activePage, itemsPerPage = _a.itemsPerPage, sort = _a.sort, order = _a.order;
            _this.props.getEntities(activePage - 1, itemsPerPage, sort + "," + order);
        };
        return _this;
    }
    Credit.prototype.componentDidMount = function () {
        this.getEntities();
    };
    Credit.prototype.sortEntities = function () {
        this.getEntities();
        this.props.history.push(this.props.location.pathname + "?page=" + this.state.activePage + "&sort=" + this.state.sort + "," + this.state.order);
    };
    Credit.prototype.render = function () {
        var _a = this.props, creditList = _a.creditList, match = _a.match, totalItems = _a.totalItems;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "credit-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.home.title" }, "Credits"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.home.createLabel" }, "Create new Credit"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('id') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('periodicidad') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.periodicidad" }, "Periodicidad"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('diaHoraEjecucion') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.diaHoraEjecucion" }, "Dia Hora Ejecucion"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('monto') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.monto" }, "Monto"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('capitalPrestamo') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.capitalPrestamo" }, "Capital Prestamo"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cantCuotas') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cantCuotas" }, "Cant Cuotas"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cuotaCobrada') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.cuotaCobrada" }, "Cuota Cobrada"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('fechaVencimiento') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.credit.fechaVencimiento" }, "Fecha Vencimiento"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, creditList.map(function (credit, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + credit.id, color: "link", size: "sm" }, credit.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.Periodicidad." + credit.periodicidad })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, credit.diaHoraEjecucion),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, credit.capitalPrestamo),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, credit.monto),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, credit.cantCuotas),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, credit.cuotaCobrada),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { type: "date", value: credit.fechaVencimiento, format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + credit.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))))))); })))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["JhiPagination"], { items: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getPaginationItemsNumber"])(totalItems, this.state.itemsPerPage), activePage: this.state.activePage, onSelect: this.handlePagination, maxButtons: 5 }))));
    };
    return Credit;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var credit = _a.credit;
    return ({
        creditList: credit.entities,
        totalItems: credit.totalItems
    });
};
var mapDispatchToProps = {
    getEntities: _credit_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Credit));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\credit.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/credit/index.tsx":
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/entities/credit/index.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _credit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./credit */ "./src/main/webapp/app/entities/credit/credit.tsx");
/* harmony import */ var _credit_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./credit-detail */ "./src/main/webapp/app/entities/credit/credit-detail.tsx");
/* harmony import */ var _credit_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./credit-update */ "./src/main/webapp/app/entities/credit/credit-update.tsx");
/* harmony import */ var _credit_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./credit-delete-dialog */ "./src/main/webapp/app/entities/credit/credit-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _credit_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _credit_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _credit_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _credit__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _credit_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\credit\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/department-delete-dialog.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/entities/department/department-delete-dialog.tsx ***!
  \******************************************************************************/
/*! exports provided: DepartmentDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentDeleteDialog", function() { return DepartmentDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _department_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");







var DepartmentDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DepartmentDeleteDialog, _super);
    function DepartmentDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.departmentEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    DepartmentDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    DepartmentDeleteDialog.prototype.render = function () {
        var departmentEntity = this.props.departmentEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.department.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.department.delete.question", interpolate: { id: departmentEntity.id } }, "Are you sure you want to delete this Department?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-department", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return DepartmentDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var department = _a.department;
    return ({
        departmentEntity: department.entity
    });
};
var mapDispatchToProps = { getEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DepartmentDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/department-detail.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/department/department-detail.tsx ***!
  \***********************************************************************/
/*! exports provided: DepartmentDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentDetail", function() { return DepartmentDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _department_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var DepartmentDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DepartmentDetail, _super);
    function DepartmentDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepartmentDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    DepartmentDetail.prototype.render = function () {
        var departmentEntity = this.props.departmentEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.department.detail.title" }, "Department"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, departmentEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "departmentName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.department.departmentName" }, "Department Name"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, departmentEntity.departmentName)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/department", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/department/" + departmentEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return DepartmentDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var department = _a.department;
    return ({
        departmentEntity: department.entity
    });
};
var mapDispatchToProps = { getEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DepartmentDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/department-update.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/department/department-update.tsx ***!
  \***********************************************************************/
/*! exports provided: DepartmentUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentUpdate", function() { return DepartmentUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _department_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");






// tslint:disable-next-line:no-unused-variable



var DepartmentUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DepartmentUpdate, _super);
    function DepartmentUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            if (errors.length === 0) {
                var departmentEntity = _this.props.departmentEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, departmentEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/department');
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    DepartmentUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    DepartmentUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    };
    DepartmentUpdate.prototype.render = function () {
        var _a = this.props, departmentEntity = _a.departmentEntity, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.department.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.department.home.createOrEditLabel" }, "Create or edit a Department")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : departmentEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "department-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "departmentNameLabel", for: "departmentName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.department.departmentName" }, "Department Name")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "department-departmentName", type: "text", name: "departmentName", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["translate"])('entity.validation.required') }
                            } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/department", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return DepartmentUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    departmentEntity: storeState.department.entity,
    loading: storeState.department.loading,
    updating: storeState.department.updating,
    updateSuccess: storeState.department.updateSuccess
}); };
var mapDispatchToProps = {
    getEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntity"],
    updateEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_8__["updateEntity"],
    createEntity: _department_reducer__WEBPACK_IMPORTED_MODULE_8__["createEntity"],
    reset: _department_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DepartmentUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/department.reducer.ts":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/department/department.reducer.ts ***!
  \***********************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_department_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/department.model */ "./src/main/webapp/app/shared/model/department.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_DEPARTMENT_LIST: 'department/FETCH_DEPARTMENT_LIST',
    FETCH_DEPARTMENT: 'department/FETCH_DEPARTMENT',
    CREATE_DEPARTMENT: 'department/CREATE_DEPARTMENT',
    UPDATE_DEPARTMENT: 'department/UPDATE_DEPARTMENT',
    DELETE_DEPARTMENT: 'department/DELETE_DEPARTMENT',
    RESET: 'department/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_department_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_DEPARTMENT):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_DEPARTMENT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/departments';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_DEPARTMENT_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_DEPARTMENT,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_DEPARTMENT,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_DEPARTMENT,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_DEPARTMENT,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/department.tsx":
/*!****************************************************************!*\
  !*** ./src/main/webapp/app/entities/department/department.tsx ***!
  \****************************************************************/
/*! exports provided: Department, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Department", function() { return Department; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _department_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var Department = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Department, _super);
    function Department() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Department.prototype.componentDidMount = function () {
        this.props.getEntities();
    };
    Department.prototype.render = function () {
        var _a = this.props, departmentList = _a.departmentList, match = _a.match;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "department-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.department.home.title" }, "Departments"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.department.home.createLabel" }, "Create new Department"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.department.departmentName" }, "Department Name")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, departmentList.map(function (department, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + department.id, color: "link", size: "sm" }, department.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, department.departmentName),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + department.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + department.id + "/edit", color: "primary", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + department.id + "/delete", color: "danger", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "trash" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.delete" }, "Delete"))))))); }))))));
    };
    return Department;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var department = _a.department;
    return ({
        departmentList: department.entities
    });
};
var mapDispatchToProps = {
    getEntities: _department_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Department));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\department.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/department/index.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/entities/department/index.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _department__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./department */ "./src/main/webapp/app/entities/department/department.tsx");
/* harmony import */ var _department_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./department-detail */ "./src/main/webapp/app/entities/department/department-detail.tsx");
/* harmony import */ var _department_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./department-update */ "./src/main/webapp/app/entities/department/department-update.tsx");
/* harmony import */ var _department_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./department-delete-dialog */ "./src/main/webapp/app/entities/department/department-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _department_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _department_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _department_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _department__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _department_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\department\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/index.tsx":
/*!************************************************!*\
  !*** ./src/main/webapp/app/entities/index.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _department__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./department */ "./src/main/webapp/app/entities/department/index.tsx");
/* harmony import */ var _banco__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./banco */ "./src/main/webapp/app/entities/banco/index.tsx");
/* harmony import */ var _credit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./credit */ "./src/main/webapp/app/entities/credit/index.tsx");
/* harmony import */ var _cliente__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliente */ "./src/main/webapp/app/entities/cliente/index.tsx");
/* harmony import */ var _cliente_clientemisdatos__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cliente/clientemisdatos */ "./src/main/webapp/app/entities/cliente/clientemisdatos.tsx");
/* harmony import */ var _cliente_clientemisdatosmensajes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cliente/clientemisdatosmensajes */ "./src/main/webapp/app/entities/cliente/clientemisdatosmensajes.tsx");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/shared/auth/private-route */ "./src/main/webapp/app/shared/auth/private-route.tsx");
/* harmony import */ var _recaudador__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./recaudador */ "./src/main/webapp/app/entities/recaudador/index.tsx");
/* harmony import */ var _recaudador_detalle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./recaudador-detalle */ "./src/main/webapp/app/entities/recaudador-detalle/index.tsx");
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./token */ "./src/main/webapp/app/entities/token/index.tsx");


// tslint:disable-next-line:no-unused-variable












/* jhipster-needle-add-route-import - JHipster will add routes here */
var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/department", component: _department__WEBPACK_IMPORTED_MODULE_3__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/banco", component: _banco__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/credit", component: _credit__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/clientemisdatos", component: _cliente_clientemisdatos__WEBPACK_IMPORTED_MODULE_7__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/clientemisdatosmensajes", component: _cliente_clientemisdatosmensajes__WEBPACK_IMPORTED_MODULE_8__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_10__["default"], { path: match.url + "/cliente", component: _cliente__WEBPACK_IMPORTED_MODULE_6__["default"], hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_9__["AUTHORITIES"].ADMIN] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/recaudador", component: _recaudador__WEBPACK_IMPORTED_MODULE_11__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/recaudador-detalle", component: _recaudador_detalle__WEBPACK_IMPORTED_MODULE_12__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/token", component: _token__WEBPACK_IMPORTED_MODULE_13__["default"] }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/location/location.reducer.ts":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/entities/location/location.reducer.ts ***!
  \*******************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_location_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/location.model */ "./src/main/webapp/app/shared/model/location.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_LOCATION_LIST: 'location/FETCH_LOCATION_LIST',
    FETCH_LOCATION: 'location/FETCH_LOCATION',
    CREATE_LOCATION: 'location/CREATE_LOCATION',
    UPDATE_LOCATION: 'location/UPDATE_LOCATION',
    DELETE_LOCATION: 'location/DELETE_LOCATION',
    RESET: 'location/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_location_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_LOCATION_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_LOCATION_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_LOCATION_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_LOCATION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_LOCATION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/locations';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_LOCATION_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_LOCATION,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_LOCATION,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_LOCATION,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_LOCATION,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\location\\location.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\location\\location.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/index.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/index.tsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _recaudador_detalle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recaudador-detalle */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.tsx");
/* harmony import */ var _recaudador_detalle_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recaudador-detalle-detail */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-detail.tsx");
/* harmony import */ var _recaudador_detalle_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recaudador-detalle-update */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-update.tsx");
/* harmony import */ var _recaudador_detalle_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recaudador-detalle-delete-dialog */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _recaudador_detalle_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _recaudador_detalle_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _recaudador_detalle_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _recaudador_detalle__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _recaudador_detalle_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-delete-dialog.tsx":
/*!**********************************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-delete-dialog.tsx ***!
  \**********************************************************************************************/
/*! exports provided: RecaudadorDetalleDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDetalleDeleteDialog", function() { return RecaudadorDetalleDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recaudador-detalle.reducer */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts");







var RecaudadorDetalleDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDetalleDeleteDialog, _super);
    function RecaudadorDetalleDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.recaudadorDetalleEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    RecaudadorDetalleDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    RecaudadorDetalleDeleteDialog.prototype.render = function () {
        var recaudadorDetalleEntity = this.props.recaudadorDetalleEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.recaudadorDetalle.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.delete.question", interpolate: { id: recaudadorDetalleEntity.id } }, "Are you sure you want to delete this RecaudadorDetalle?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-recaudadorDetalle", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return RecaudadorDetalleDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudadorDetalle = _a.recaudadorDetalle;
    return ({
        recaudadorDetalleEntity: recaudadorDetalle.entity
    });
};
var mapDispatchToProps = { getEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDetalleDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-detail.tsx":
/*!***************************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-detail.tsx ***!
  \***************************************************************************************/
/*! exports provided: RecaudadorDetalleDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDetalleDetail", function() { return RecaudadorDetalleDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recaudador-detalle.reducer */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var RecaudadorDetalleDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDetalleDetail, _super);
    function RecaudadorDetalleDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecaudadorDetalleDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    RecaudadorDetalleDetail.prototype.render = function () {
        var recaudadorDetalleEntity = this.props.recaudadorDetalleEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.detail.title" }, "RecaudadorDetalle"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, recaudadorDetalleEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "ejecutada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.ejecutada" }, "Ejecutada"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorDetalleEntity.ejecutada),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaEjecucion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaEjecucion" }, "Fecha Ejecucion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: recaudadorDetalleEntity.fechaEjecucion, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaProgramada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaProgramada" }, "Fecha Programada"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: recaudadorDetalleEntity.fechaProgramada, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "nroCuota" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.nroCuota" }, "Nro Cuota"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorDetalleEntity.nroCuota),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "observaciones" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.observaciones" }, "Observaciones"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorDetalleEntity.observaciones),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "reintentos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.reintentos" }, "Reintentos"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorDetalleEntity.reintentos),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.recaudador" }, "Recaudador")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorDetalleEntity.recaudador ? recaudadorDetalleEntity.recaudador.id : '')),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/recaudador-detalle", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/recaudador-detalle/" + recaudadorDetalleEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return RecaudadorDetalleDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudadorDetalle = _a.recaudadorDetalle;
    return ({
        recaudadorDetalleEntity: recaudadorDetalle.entity
    });
};
var mapDispatchToProps = { getEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDetalleDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-update.tsx":
/*!***************************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle-update.tsx ***!
  \***************************************************************************************/
/*! exports provided: RecaudadorDetalleUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDetalleUpdate", function() { return RecaudadorDetalleUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_entities_recaudador_recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/entities/recaudador/recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");
/* harmony import */ var _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./recaudador-detalle.reducer */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts");
/* harmony import */ var app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/shared/util/date-utils */ "./src/main/webapp/app/shared/util/date-utils.ts");






// tslint:disable-next-line:no-unused-variable




// tslint:disable-next-line:no-unused-variable

var RecaudadorDetalleUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDetalleUpdate, _super);
    function RecaudadorDetalleUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            values.fechaEjecucion = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_10__["convertDateTimeToServer"])(values.fechaEjecucion);
            values.fechaProgramada = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_10__["convertDateTimeToServer"])(values.fechaProgramada);
            if (errors.length === 0) {
                var recaudadorDetalleEntity = _this.props.recaudadorDetalleEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, recaudadorDetalleEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/recaudador-detalle');
        };
        _this.state = {
            recaudadorId: '0',
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    RecaudadorDetalleUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    RecaudadorDetalleUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
        this.props.getRecaudadors();
    };
    RecaudadorDetalleUpdate.prototype.render = function () {
        var _a = this.props, recaudadorDetalleEntity = _a.recaudadorDetalleEntity, recaudadors = _a.recaudadors, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.recaudadorDetalle.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.home.createOrEditLabel" }, "Create or edit a RecaudadorDetalle")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : recaudadorDetalleEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-detalle-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "ejecutadaLabel", for: "ejecutada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.ejecutada" }, "Ejecutada")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-detalle-ejecutada", type: "string", className: "form-control", name: "ejecutada" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaEjecucionLabel", for: "fechaEjecucion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaEjecucion" }, "Fecha Ejecucion")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-detalle-fechaEjecucion", type: "datetime-local", className: "form-control", name: "fechaEjecucion", placeholder: 'YYYY-MM-DD HH:mm', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_10__["convertDateTimeFromServer"])(this.props.recaudadorDetalleEntity.fechaEjecucion) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaProgramadaLabel", for: "fechaProgramada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaProgramada" }, "Fecha Programada")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-detalle-fechaProgramada", type: "datetime-local", className: "form-control", name: "fechaProgramada", placeholder: 'YYYY-MM-DD HH:mm', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_10__["convertDateTimeFromServer"])(this.props.recaudadorDetalleEntity.fechaProgramada) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "nroCuotaLabel", for: "nroCuota" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.nroCuota" }, "Nro Cuota")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-detalle-nroCuota", type: "string", className: "form-control", name: "nroCuota" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "observacionesLabel", for: "observaciones" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.observaciones" }, "Observaciones")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-detalle-observaciones", type: "text", name: "observaciones" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "reintentosLabel", for: "reintentos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.reintentos" }, "Reintentos")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-detalle-reintentos", type: "string", className: "form-control", name: "reintentos" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "recaudador.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.recaudador" }, "Recaudador")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-detalle-recaudador", type: "select", className: "form-control", name: "recaudador.id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "", key: "0" }),
                            recaudadors
                                ? recaudadors.map(function (otherEntity) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.id)); })
                                : null)),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/recaudador-detalle", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return RecaudadorDetalleUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    recaudadors: storeState.recaudador.entities,
    recaudadorDetalleEntity: storeState.recaudadorDetalle.entity,
    loading: storeState.recaudadorDetalle.loading,
    updating: storeState.recaudadorDetalle.updating,
    updateSuccess: storeState.recaudadorDetalle.updateSuccess
}); };
var mapDispatchToProps = {
    getRecaudadors: app_entities_recaudador_recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntities"],
    getEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_9__["getEntity"],
    updateEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_9__["updateEntity"],
    createEntity: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_9__["createEntity"],
    reset: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_9__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDetalleUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts ***!
  \***************************************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_recaudador_detalle_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/recaudador-detalle.model */ "./src/main/webapp/app/shared/model/recaudador-detalle.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_RECAUDADORDETALLE_LIST: 'recaudadorDetalle/FETCH_RECAUDADORDETALLE_LIST',
    FETCH_RECAUDADORDETALLE: 'recaudadorDetalle/FETCH_RECAUDADORDETALLE',
    CREATE_RECAUDADORDETALLE: 'recaudadorDetalle/CREATE_RECAUDADORDETALLE',
    UPDATE_RECAUDADORDETALLE: 'recaudadorDetalle/UPDATE_RECAUDADORDETALLE',
    DELETE_RECAUDADORDETALLE: 'recaudadorDetalle/DELETE_RECAUDADORDETALLE',
    RESET: 'recaudadorDetalle/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_recaudador_detalle_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/recaudador-detalles';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_RECAUDADORDETALLE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_RECAUDADORDETALLE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_RECAUDADORDETALLE,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_RECAUDADORDETALLE,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.tsx":
/*!********************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.tsx ***!
  \********************************************************************************/
/*! exports provided: RecaudadorDetalle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDetalle", function() { return RecaudadorDetalle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recaudador-detalle.reducer */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var RecaudadorDetalle = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDetalle, _super);
    function RecaudadorDetalle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecaudadorDetalle.prototype.componentDidMount = function () {
        this.props.getEntities();
    };
    RecaudadorDetalle.prototype.render = function () {
        var _a = this.props, recaudadorDetalleList = _a.recaudadorDetalleList, match = _a.match;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "recaudador-detalle-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.home.title" }, "Recaudador Detalles"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.home.createLabel" }, "Create new Recaudador Detalle"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.ejecutada" }, "Ejecutada")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaEjecucion" }, "Fecha Ejecucion")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.fechaProgramada" }, "Fecha Programada")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.nroCuota" }, "Nro Cuota")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.observaciones" }, "Observaciones")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.reintentos" }, "Reintentos")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudadorDetalle.recaudador" }, "Recaudador")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, recaudadorDetalleList.map(function (recaudadorDetalle, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudadorDetalle.id, color: "link", size: "sm" }, recaudadorDetalle.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudadorDetalle.ejecutada),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { type: "date", value: recaudadorDetalle.fechaEjecucion, format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { type: "date", value: recaudadorDetalle.fechaProgramada, format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudadorDetalle.nroCuota),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudadorDetalle.observaciones),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudadorDetalle.reintentos),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudadorDetalle.recaudador ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "recaudador/" + recaudadorDetalle.recaudador.id }, recaudadorDetalle.recaudador.id)) : ('')),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudadorDetalle.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudadorDetalle.id + "/edit", color: "primary", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudadorDetalle.id + "/delete", color: "danger", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "trash" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.delete" }, "Delete"))))))); }))))));
    };
    return RecaudadorDetalle;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudadorDetalle = _a.recaudadorDetalle;
    return ({
        recaudadorDetalleList: recaudadorDetalle.entities
    });
};
var mapDispatchToProps = {
    getEntities: _recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDetalle));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador-detalle\\recaudador-detalle.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/index.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/index.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _recaudador__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recaudador */ "./src/main/webapp/app/entities/recaudador/recaudador.tsx");
/* harmony import */ var _recaudador_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recaudador-detail */ "./src/main/webapp/app/entities/recaudador/recaudador-detail.tsx");
/* harmony import */ var _recaudador_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recaudador-update */ "./src/main/webapp/app/entities/recaudador/recaudador-update.tsx");
/* harmony import */ var _recaudador_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recaudador-delete-dialog */ "./src/main/webapp/app/entities/recaudador/recaudador-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _recaudador_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _recaudador_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _recaudador_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _recaudador__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _recaudador_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/recaudador-delete-dialog.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/recaudador-delete-dialog.tsx ***!
  \******************************************************************************/
/*! exports provided: RecaudadorDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDeleteDialog", function() { return RecaudadorDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");







var RecaudadorDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDeleteDialog, _super);
    function RecaudadorDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.recaudadorEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    RecaudadorDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    RecaudadorDeleteDialog.prototype.render = function () {
        var recaudadorEntity = this.props.recaudadorEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.recaudador.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.recaudador.delete.question", interpolate: { id: recaudadorEntity.id } }, "Are you sure you want to delete this Recaudador?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-recaudador", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return RecaudadorDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudador = _a.recaudador;
    return ({
        recaudadorEntity: recaudador.entity
    });
};
var mapDispatchToProps = { getEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/recaudador-detail.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/recaudador-detail.tsx ***!
  \***********************************************************************/
/*! exports provided: RecaudadorDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorDetail", function() { return RecaudadorDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var RecaudadorDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorDetail, _super);
    function RecaudadorDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecaudadorDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    RecaudadorDetail.prototype.render = function () {
        var recaudadorEntity = this.props.recaudadorEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.detail.title" }, "Recaudador"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, recaudadorEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "activo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.activo" }, "Activo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.activo ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cantCuotas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cantCuotas" }, "Cant Cuotas"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.cantCuotas),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cantidadRenegociado" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cantidadRenegociado" }, "Cantidad Renegociado"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.cantidadRenegociado),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "capitalPrestamo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.capitalPrestamo" }, "Capital Prestamo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.capitalPrestamo),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaCobrada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cuotaCobrada" }, "Cuota Cobrada"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.cuotaCobrada),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaPura" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cuotaPura" }, "Cuota Pura"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.cuotaPura),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "cuotaRecuperoCapital" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cuotaRecuperoCapital" }, "Cuota Recupero Capital"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.cuotaRecuperoCapital),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "diaHoraEjecucion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.diaHoraEjecucion" }, "Dia Hora Ejecucion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.diaHoraEjecucion),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "esPersonal" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.esPersonal" }, "Es Personal"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.esPersonal ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "excluirFindeSemanas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.excluirFindeSemanas" }, "Excluir Finde Semanas"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.excluirFindeSemanas ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaCreacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.fechaCreacion" }, "Fecha Creacion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: recaudadorEntity.fechaCreacion, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaInicio" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.fechaInicio" }, "Fecha Inicio"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: recaudadorEntity.fechaInicio, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "fechaVencimiento" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.fechaVencimiento" }, "Fecha Vencimiento"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { value: recaudadorEntity.fechaVencimiento, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "incobrable" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.incobrable" }, "Incobrable"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.incobrable ? 'true' : 'false'),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "interesesCuota" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.interesesCuota" }, "Intereses Cuota"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.interesesCuota),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "interesesPrestamos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.interesesPrestamos" }, "Intereses Prestamos"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.interesesPrestamos),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "monto" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.monto" }, "Monto"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.monto),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "observaciones" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.observaciones" }, "Observaciones"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.observaciones),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "pagoManual" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.pagoManual" }, "Pago Manual"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.pagoManual),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "periodicidad" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.periodicidad" }, "Periodicidad"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.periodicidad),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "porcParticipacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.porcParticipacion" }, "Porc Participacion"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.porcParticipacion),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "tipoCobro" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.tipoCobro" }, "Tipo Cobro"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.tipoCobro),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "idCliente" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.idCliente" }, "Id Cliente"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, recaudadorEntity.idCliente)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/recaudador", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/recaudador/" + recaudadorEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return RecaudadorDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudador = _a.recaudador;
    return ({
        recaudadorEntity: recaudador.entity
    });
};
var mapDispatchToProps = { getEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/recaudador-update.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/recaudador-update.tsx ***!
  \***********************************************************************/
/*! exports provided: RecaudadorUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaudadorUpdate", function() { return RecaudadorUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");
/* harmony import */ var app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/date-utils */ "./src/main/webapp/app/shared/util/date-utils.ts");






// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable

var RecaudadorUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RecaudadorUpdate, _super);
    function RecaudadorUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            values.fechaCreacion = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaCreacion);
            values.fechaInicio = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaInicio);
            values.fechaVencimiento = Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeToServer"])(values.fechaVencimiento);
            if (errors.length === 0) {
                var recaudadorEntity = _this.props.recaudadorEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, recaudadorEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/recaudador');
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    RecaudadorUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    RecaudadorUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    };
    RecaudadorUpdate.prototype.render = function () {
        var _a = this.props, recaudadorEntity = _a.recaudadorEntity, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.recaudador.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.home.createOrEditLabel" }, "Create or edit a Recaudador")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : recaudadorEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "activoLabel", check: true },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-activo", type: "checkbox", className: "form-control", name: "activo" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.activo" }, "Activo"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cantCuotasLabel", for: "cantCuotas" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.cantCuotas" }, "Cant Cuotas")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-cantCuotas", type: "string", className: "form-control", name: "cantCuotas" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cantidadRenegociadoLabel", for: "cantidadRenegociado" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.cantidadRenegociado" }, "Cantidad Renegociado")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-cantidadRenegociado", type: "string", className: "form-control", name: "cantidadRenegociado" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "capitalPrestamoLabel", for: "capitalPrestamo" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.capitalPrestamo" }, "Capital Prestamo")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-capitalPrestamo", type: "string", className: "form-control", name: "capitalPrestamo" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cuotaCobradaLabel", for: "cuotaCobrada" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.cuotaCobrada" }, "Cuota Cobrada")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-cuotaCobrada", type: "string", className: "form-control", name: "cuotaCobrada" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cuotaPuraLabel", for: "cuotaPura" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.cuotaPura" }, "Cuota Pura")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-cuotaPura", type: "string", className: "form-control", name: "cuotaPura" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "cuotaRecuperoCapitalLabel", for: "cuotaRecuperoCapital" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.cuotaRecuperoCapital" }, "Cuota Recupero Capital")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-cuotaRecuperoCapital", type: "string", className: "form-control", name: "cuotaRecuperoCapital" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "diaHoraEjecucionLabel", for: "diaHoraEjecucion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.diaHoraEjecucion" }, "Dia Hora Ejecucion")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-diaHoraEjecucion", type: "string", className: "form-control", name: "diaHoraEjecucion" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "esPersonalLabel", check: true },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-esPersonal", type: "checkbox", className: "form-control", name: "esPersonal" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.esPersonal" }, "Es Personal"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "excluirFindeSemanasLabel", check: true },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-excluirFindeSemanas", type: "checkbox", className: "form-control", name: "excluirFindeSemanas" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.excluirFindeSemanas" }, "Excluir Finde Semanas"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaCreacionLabel", for: "fechaCreacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.fechaCreacion" }, "Fecha Creacion")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-fechaCreacion", type: "datetime-local", className: "form-control", name: "fechaCreacion", placeholder: 'YYYY-MM-DD HH:mm', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeFromServer"])(this.props.recaudadorEntity.fechaCreacion) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaInicioLabel", for: "fechaInicio" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.fechaInicio" }, "Fecha Inicio")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-fechaInicio", type: "datetime-local", className: "form-control", name: "fechaInicio", placeholder: 'YYYY-MM-DD HH:mm', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeFromServer"])(this.props.recaudadorEntity.fechaInicio) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "fechaVencimientoLabel", for: "fechaVencimiento" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.fechaVencimiento" }, "Fecha Vencimiento")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-fechaVencimiento", type: "datetime-local", className: "form-control", name: "fechaVencimiento", placeholder: 'YYYY-MM-DD HH:mm', value: isNew ? null : Object(app_shared_util_date_utils__WEBPACK_IMPORTED_MODULE_9__["convertDateTimeFromServer"])(this.props.recaudadorEntity.fechaVencimiento) })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "incobrableLabel", check: true },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-incobrable", type: "checkbox", className: "form-control", name: "incobrable" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.incobrable" }, "Incobrable"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "interesesCuotaLabel", for: "interesesCuota" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.interesesCuota" }, "Intereses Cuota")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-interesesCuota", type: "string", className: "form-control", name: "interesesCuota" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "interesesPrestamosLabel", for: "interesesPrestamos" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.interesesPrestamos" }, "Intereses Prestamos")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-interesesPrestamos", type: "string", className: "form-control", name: "interesesPrestamos" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "montoLabel", for: "monto" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.monto" }, "Monto")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-monto", type: "string", className: "form-control", name: "monto" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "observacionesLabel", for: "observaciones" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.observaciones" }, "Observaciones")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-observaciones", type: "text", name: "observaciones" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "pagoManualLabel", for: "pagoManual" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.pagoManual" }, "Pago Manual")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-pagoManual", type: "string", className: "form-control", name: "pagoManual" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "periodicidadLabel" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.periodicidad" }, "Periodicidad")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-periodicidad", type: "select", className: "form-control", name: "periodicidad", value: (!isNew && recaudadorEntity.periodicidad) || 'DIARIO' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "DIARIO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.Periodicidad.DIARIO" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "SEMANAL" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.Periodicidad.SEMANAL" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "MENSUAL" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.Periodicidad.MENSUAL" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "BIMENSUAL" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.Periodicidad.BIMENSUAL" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "SEMESTRAL" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.Periodicidad.SEMESTRAL" })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "porcParticipacionLabel", for: "porcParticipacion" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.porcParticipacion" }, "Porc Participacion")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-porcParticipacion", type: "string", className: "form-control", name: "porcParticipacion" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "tipoCobroLabel" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.tipoCobro" }, "Tipo Cobro")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "recaudador-tipoCobro", type: "select", className: "form-control", name: "tipoCobro", value: (!isNew && recaudadorEntity.tipoCobro) || 'PRESTAMO' },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "PRESTAMO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.TipoCobro.PRESTAMO" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { value: "INSUMOINFORMATICO" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.TipoCobro.INSUMOINFORMATICO" })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "idClienteLabel", for: "idCliente" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.recaudador.idCliente" }, "Id Cliente")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "recaudador-idCliente", type: "string", className: "form-control", name: "idCliente" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/recaudador", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return RecaudadorUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    recaudadorEntity: storeState.recaudador.entity,
    loading: storeState.recaudador.loading,
    updating: storeState.recaudador.updating,
    updateSuccess: storeState.recaudador.updateSuccess
}); };
var mapDispatchToProps = {
    getEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntity"],
    updateEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__["updateEntity"],
    createEntity: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__["createEntity"],
    reset: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(RecaudadorUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts ***!
  \***********************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, updateEntityWithTranferencia, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntityWithTranferencia", function() { return updateEntityWithTranferencia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_recaudador_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/recaudador.model */ "./src/main/webapp/app/shared/model/recaudador.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_RECAUDADOR_LIST: 'recaudador/FETCH_RECAUDADOR_LIST',
    FETCH_RECAUDADOR: 'recaudador/FETCH_RECAUDADOR',
    CREATE_RECAUDADOR: 'recaudador/CREATE_RECAUDADOR',
    UPDATE_RECAUDADOR: 'recaudador/UPDATE_RECAUDADOR',
    DELETE_RECAUDADOR: 'recaudador/DELETE_RECAUDADOR',
    RESET: 'recaudador/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_recaudador_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    totalItems: 0,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, totalItems: action.payload.headers['x-total-count'], entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_RECAUDADOR):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_RECAUDADOR):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/recaudadors';
// Actions
var getEntities = function (page, size, sort) {
    var requestUrl = "" + apiUrl + (sort ? "?page=" + page + "&size=" + size + "&sort=" + sort : '');
    return {
        type: ACTION_TYPES.FETCH_RECAUDADOR_LIST,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("" + requestUrl + (sort ? '&' : '?') + "cacheBuster=" + new Date().getTime())
    };
};
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_RECAUDADOR,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_RECAUDADOR,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_RECAUDADOR,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntityWithTranferencia = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + '/update' + "/" + entity.id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.UPDATE_RECAUDADOR,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_RECAUDADOR,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/recaudador/recaudador.tsx":
/*!****************************************************************!*\
  !*** ./src/main/webapp/app/entities/recaudador/recaudador.tsx ***!
  \****************************************************************/
/*! exports provided: Recaudador, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Recaudador", function() { return Recaudador; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _recaudador_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/util/pagination.constants */ "./src/main/webapp/app/shared/util/pagination.constants.ts");





// tslint:disable-next-line:no-unused-variable



// tslint:disable-next-line:no-unused-variable


var Recaudador = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Recaudador, _super);
    function Recaudador() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getSortState"])(_this.props.location, app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_9__["ITEMS_PER_PAGE"]));
        _this.sort = function (prop) { return function () {
            _this.setState({
                order: _this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            }, function () { return _this.sortEntities(); });
        }; };
        _this.handlePagination = function (activePage) { return _this.setState({ activePage: activePage }, function () { return _this.sortEntities(); }); };
        _this.getEntities = function () {
            var _a = _this.state, activePage = _a.activePage, itemsPerPage = _a.itemsPerPage, sort = _a.sort, order = _a.order;
            _this.props.getEntities(activePage - 1, itemsPerPage, sort + "," + order);
        };
        _this.toggleTransferido = function (recaudador) { return function () {
            _this.props.updateEntityWithTranferencia(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, recaudador, { transferido: !recaudador.transferido }));
        }; };
        return _this;
    }
    Recaudador.prototype.componentDidMount = function () {
        this.getEntities();
    };
    Recaudador.prototype.sortEntities = function () {
        this.getEntities();
        this.props.history.push(this.props.location.pathname + "?page=" + this.state.activePage + "&sort=" + this.state.sort + "," + this.state.order);
    };
    Recaudador.prototype.render = function () {
        var _this = this;
        var _a = this.props, recaudadorList = _a.recaudadorList, match = _a.match, totalItems = _a.totalItems;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "recaudador-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.home.title" }, "Recaudadors"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.home.createLabel" }, "Create new Recaudador"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('id') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('activo') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.activo" }, "Activo"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('transferido') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.transferido" }, "Transferido"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cantCuotas') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cantCuotas" }, "Cant Cuotas"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('capitalPrestamo') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.capitalPrestamo" }, "Capital Prestamo"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cuotaCobrada') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cuotaCobrada" }, "Cuota Cobrada"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('cuotaPura') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.cuotaPura" }, "Cuota Pura"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('diaHoraEjecucion') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.diaHoraEjecucion" }, "Dia Hora Ejecucion"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('fechaInicio') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.fechaInicio" }, "Fecha Inicio"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('interesesCuota') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.interesesCuota" }, "Intereses Cuota"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('interesesPrestamos') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.interesesPrestamos" }, "Intereses Prestamos"),
                                ' ',
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('monto') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.monto" }, "Monto"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { className: "hand", onClick: this.sort('periodicidad') },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.recaudador.periodicidad" }, "Periodicidad"),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "sort" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, recaudadorList.map(function (recaudador, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudador.id, color: "link", size: "sm" }, recaudador.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.activo ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Badge"], { color: "success" }, "SI"))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Badge"], { color: "danger" }, "NO")))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.transferido ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "success", disabled: false }, "Transferido")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "info", onClick: _this.toggleTransferido(recaudador) }, "Pendiente"))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.cantCuotas),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.capitalPrestamo),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.cuotaCobrada),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.cuotaPura),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.diaHoraEjecucion),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["TextFormat"], { type: "date", value: recaudador.fechaInicio, format: app_config_constants__WEBPACK_IMPORTED_MODULE_8__["APP_DATE_FORMAT"] })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.interesesCuota),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.interesesPrestamos),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, recaudador.monto),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.Periodicidad." + recaudador.periodicidad })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + recaudador.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))))))); })))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["JhiPagination"], { items: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getPaginationItemsNumber"])(totalItems, this.state.itemsPerPage), activePage: this.state.activePage, onSelect: this.handlePagination, maxButtons: 5 }))));
    };
    return Recaudador;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var recaudador = _a.recaudador;
    return ({
        recaudadorList: recaudador.entities,
        totalItems: recaudador.totalItems
    });
};
var mapDispatchToProps = {
    getEntities: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"], updateEntityWithTranferencia: _recaudador_reducer__WEBPACK_IMPORTED_MODULE_7__["updateEntityWithTranferencia"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Recaudador));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\recaudador\\recaudador.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/region/region.reducer.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/entities/region/region.reducer.ts ***!
  \***************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_region_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/region.model */ "./src/main/webapp/app/shared/model/region.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_REGION_LIST: 'region/FETCH_REGION_LIST',
    FETCH_REGION: 'region/FETCH_REGION',
    CREATE_REGION: 'region/CREATE_REGION',
    UPDATE_REGION: 'region/UPDATE_REGION',
    DELETE_REGION: 'region/DELETE_REGION',
    RESET: 'region/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_region_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_REGION_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_REGION_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_REGION_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_REGION):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_REGION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/regions';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_REGION_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_REGION,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_REGION,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_REGION,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_REGION,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\region\\region.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\region\\region.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/index.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/token/index.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./token */ "./src/main/webapp/app/entities/token/token.tsx");
/* harmony import */ var _token_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token-detail */ "./src/main/webapp/app/entities/token/token-detail.tsx");
/* harmony import */ var _token_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token-update */ "./src/main/webapp/app/entities/token/token-update.tsx");
/* harmony import */ var _token_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./token-delete-dialog */ "./src/main/webapp/app/entities/token/token-delete-dialog.tsx");







var Routes = function (_a) {
    var match = _a.match;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/new", component: _token_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id/edit", component: _token_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: match.url + "/:id", component: _token_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _token__WEBPACK_IMPORTED_MODULE_3__["default"] })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url + "/:id/delete", component: _token_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/token-delete-dialog.tsx":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/entities/token/token-delete-dialog.tsx ***!
  \********************************************************************/
/*! exports provided: TokenDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenDeleteDialog", function() { return TokenDeleteDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _token_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./token.reducer */ "./src/main/webapp/app/entities/token/token.reducer.ts");







var TokenDeleteDialog = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TokenDeleteDialog, _super);
    function TokenDeleteDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmDelete = function (event) {
            _this.props.deleteEntity(_this.props.tokenEntity.id);
            _this.handleClose(event);
        };
        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.props.history.goBack();
        };
        return _this;
    }
    TokenDeleteDialog.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    TokenDeleteDialog.prototype.render = function () {
        var tokenEntity = this.props.tokenEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], { id: "sicoApp.token.delete.question" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "sicoApp.token.delete.question", interpolate: { id: tokenEntity.id } }, "Are you sure you want to delete this Token?")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "jhi-confirm-delete-token", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    };
    return TokenDeleteDialog;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var token = _a.token;
    return ({
        tokenEntity: token.entity
    });
};
var mapDispatchToProps = { getEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"], deleteEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_6__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TokenDeleteDialog));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-delete-dialog.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/token-detail.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/token/token-detail.tsx ***!
  \*************************************************************/
/*! exports provided: TokenDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenDetail", function() { return TokenDetail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _token_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./token.reducer */ "./src/main/webapp/app/entities/token/token.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var TokenDetail = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TokenDetail, _super);
    function TokenDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TokenDetail.prototype.componentDidMount = function () {
        this.props.getEntity(this.props.match.params.id);
    };
    TokenDetail.prototype.render = function () {
        var tokenEntity = this.props.tokenEntity;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.token.detail.title" }, "Token"),
                    " [",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, tokenEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { id: "tokenName" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.token.token" }, "Token"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("dd", null, tokenEntity.token)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/token", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: "/entity/token/" + tokenEntity.id + "/edit", replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))))));
    };
    return TokenDetail;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var token = _a.token;
    return ({
        tokenEntity: token.entity
    });
};
var mapDispatchToProps = { getEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TokenDetail));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-detail.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/token-update.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/token/token-update.tsx ***!
  \*************************************************************/
/*! exports provided: TokenUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenUpdate", function() { return TokenUpdate; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _token_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./token.reducer */ "./src/main/webapp/app/entities/token/token.reducer.ts");






// tslint:disable-next-line:no-unused-variable



var TokenUpdate = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TokenUpdate, _super);
    function TokenUpdate(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            if (errors.length === 0) {
                var tokenEntity = _this.props.tokenEntity;
                var entity = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, tokenEntity, values);
                if (_this.state.isNew) {
                    _this.props.createEntity(entity);
                }
                else {
                    _this.props.updateEntity(entity);
                }
            }
        };
        _this.handleClose = function () {
            _this.props.history.push('/entity/token');
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id
        };
        return _this;
    }
    TokenUpdate.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    };
    TokenUpdate.prototype.componentDidMount = function () {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    };
    TokenUpdate.prototype.render = function () {
        var _a = this.props, tokenEntity = _a.tokenEntity, loading = _a.loading, updating = _a.updating;
        var isNew = this.state.isNew;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "sicoApp.token.home.createOrEditLabel" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.token.home.createOrEditLabel" }, "Create or edit a Token")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvForm"], { model: isNew ? {} : tokenEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvInput"], { id: "token-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Label"], { id: "tokenNameLabel", for: "token" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "sicoApp.token.token" }, "Token")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_5__["AvField"], { id: "token-token", type: "text", name: "token" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], id: "cancel-save", to: "/entity/token", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_6__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    };
    return TokenUpdate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    tokenEntity: storeState.token.entity,
    loading: storeState.token.loading,
    updating: storeState.token.updating,
    updateSuccess: storeState.token.updateSuccess
}); };
var mapDispatchToProps = {
    getEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_8__["getEntity"],
    updateEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_8__["updateEntity"],
    createEntity: _token_reducer__WEBPACK_IMPORTED_MODULE_8__["createEntity"],
    reset: _token_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TokenUpdate));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token-update.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/token.reducer.ts":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/token/token.reducer.ts ***!
  \*************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_token_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/token.model */ "./src/main/webapp/app/shared/model/token.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_TOKEN_LIST: 'token/FETCH_TOKEN_LIST',
    FETCH_TOKEN: 'token/FETCH_TOKEN',
    CREATE_TOKEN: 'token/CREATE_TOKEN',
    UPDATE_TOKEN: 'token/UPDATE_TOKEN',
    DELETE_TOKEN: 'token/DELETE_TOKEN',
    RESET: 'token/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_token_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_TOKEN_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_TOKEN_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_TOKEN_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/tokens';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_TOKEN_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_TOKEN,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_TOKEN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_TOKEN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_TOKEN,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/token/token.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/token/token.tsx ***!
  \******************************************************/
/*! exports provided: Token, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _token_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./token.reducer */ "./src/main/webapp/app/entities/token/token.reducer.ts");





// tslint:disable-next-line:no-unused-variable



var Token = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Token, _super);
    function Token() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Token.prototype.componentDidMount = function () {
        this.props.getEntities();
    };
    Token.prototype.render = function () {
        var _a = this.props, tokenList = _a.tokenList, match = _a.match;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { id: "token-heading" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.token.home.title" }, "Tokens"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: match.url + "/new", className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.token.home.createLabel" }, "Create new Token"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "table-responsive" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], { responsive: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "sicoApp.token.token" }, "Token")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, tokenList.map(function (token, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "entity-" + i },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + token.id, color: "link", size: "sm" }, token.id)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, token.token),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + token.id, color: "info", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "eye" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], to: match.url + "/" + token.id + "/delete", color: "danger", size: "sm" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "trash" }),
                                    ' ',
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "d-none d-md-inline" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.delete" }, "Delete"))))))); }))))));
    };
    return Token;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var token = _a.token;
    return ({
        tokenList: token.entities
    });
};
var mapDispatchToProps = {
    getEntities: _token_reducer__WEBPACK_IMPORTED_MODULE_7__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Token));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\token\\token.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/entities/transferencia/transferencia.reducer.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/webapp/app/entities/transferencia/transferencia.reducer.ts ***!
  \*****************************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_transferencia_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/transferencia.model */ "./src/main/webapp/app/shared/model/transferencia.model.ts");
var _this = undefined;





var ACTION_TYPES = {
    FETCH_TOKEN_LIST: 'transferencia/FETCH_TOKEN_LIST',
    FETCH_TOKEN: 'transferencia/FETCH_TOKEN',
    CREATE_TOKEN: 'transferencia/CREATE_TOKEN',
    UPDATE_TOKEN: 'transferencia/UPDATE_TOKEN',
    DELETE_TOKEN: 'transferencia/DELETE_TOKEN',
    RESET: 'transferencia/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_transferencia_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_TOKEN_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_TOKEN_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_TOKEN_LIST):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_TOKEN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_TOKEN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/transferencias';
// Actions
var getEntities = function (page, size, sort) { return ({
    type: ACTION_TYPES.FETCH_TOKEN_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "?cacheBuster=" + new Date().getTime())
}); };
var getEntity = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_TOKEN,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_TOKEN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateEntity = function (entity) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_TOKEN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
                })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteEntity = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_TOKEN,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getEntities());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\transferencia\\transferencia.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\entities\\transferencia\\transferencia.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/index.tsx":
/*!***************************************!*\
  !*** ./src/main/webapp/app/index.tsx ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_devtools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/devtools */ "./src/main/webapp/app/config/devtools.tsx");
/* harmony import */ var _config_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/store */ "./src/main/webapp/app/config/store.ts");
/* harmony import */ var _config_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/translation */ "./src/main/webapp/app/config/translation.ts");
/* harmony import */ var _config_axios_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config/axios-interceptor */ "./src/main/webapp/app/config/axios-interceptor.ts");
/* harmony import */ var _shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app */ "./src/main/webapp/app/app.tsx");
/* harmony import */ var _config_icon_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config/icon-loader */ "./src/main/webapp/app/config/icon-loader.ts");













var devTools =  true ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_config_devtools__WEBPACK_IMPORTED_MODULE_5__["default"], null) : undefined;
var store = Object(_config_store__WEBPACK_IMPORTED_MODULE_6__["default"])();
Object(_config_translation__WEBPACK_IMPORTED_MODULE_7__["registerLocale"])(store);
var actions = Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({ clearAuthentication: _shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_9__["clearAuthentication"] }, store.dispatch);
Object(_config_axios_interceptor__WEBPACK_IMPORTED_MODULE_8__["default"])(function () { return actions.clearAuthentication('login.error.unauthorized'); });
Object(_config_icon_loader__WEBPACK_IMPORTED_MODULE_12__["loadIcons"])();
var rootEl = document.getElementById('root');
var render = function (Component) {
    return react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_10__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["AppContainer"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], { store: store },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                    devTools,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, null))))), rootEl);
};
render(_app__WEBPACK_IMPORTED_MODULE_11__["default"]);
// This is quite unstable
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     const NextApp = require<{ default: typeof AppComponent }>('./app').default;
//     render(NextApp);
//   });
// }


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\index.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/activate/activate.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, activateAction, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activateAction", function() { return activateAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");



var ACTION_TYPES = {
    ACTIVATE_ACCOUNT: 'activate/ACTIVATE_ACCOUNT',
    RESET: 'activate/RESET'
};
var initialState = {
    activationSuccess: false,
    activationFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state);
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { activationFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { activationSuccess: true });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
// Actions
var activateAction = function (key) { return ({
    type: ACTION_TYPES.ACTIVATE_ACCOUNT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('api/activate?key=' + key)
}); };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\activate\\activate.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\activate\\activate.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/activate/activate.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/activate/activate.tsx ***!
  \*******************************************************************/
/*! exports provided: ActivatePage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivatePage", function() { return ActivatePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _activate_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./activate.reducer */ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts");







var successAlert = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], { color: "success" },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "activate.messages.success" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Your user account has been activated."),
        " Please"),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/login", className: "alert-link" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.messages.info.authenticated.link" }, "sign in")),
    "."));
var failureAlert = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], { color: "danger" },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "activate.messages.error" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Your user could not be activated."),
        " Please use the registration form to sign up.")));
var ActivatePage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ActivatePage, _super);
    function ActivatePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivatePage.prototype.componentWillUnmount = function () {
        this.props.reset();
    };
    ActivatePage.prototype.componentDidMount = function () {
        var key = Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getUrlParameter"])('key', this.props.location.search);
        this.props.activateAction(key);
    };
    ActivatePage.prototype.render = function () {
        var _a = this.props, activationSuccess = _a.activationSuccess, activationFailure = _a.activationFailure;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "activate.title" }, "Activation")),
                    activationSuccess ? successAlert : undefined,
                    activationFailure ? failureAlert : undefined))));
    };
    return ActivatePage;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var activate = _a.activate;
    return ({
        activationSuccess: activate.activationSuccess,
        activationFailure: activate.activationFailure
    });
};
var mapDispatchToProps = { activateAction: _activate_reducer__WEBPACK_IMPORTED_MODULE_6__["activateAction"], reset: _activate_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ActivatePage));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\activate\\activate.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\activate\\activate.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx":
/*!*********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx ***!
  \*********************************************************************************************/
/*! exports provided: PasswordResetFinishPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetFinishPage", function() { return PasswordResetFinishPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");
/* harmony import */ var app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/shared/layout/password/password-strength-bar */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx");








var PasswordResetFinishPage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PasswordResetFinishPage, _super);
    function PasswordResetFinishPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            password: '',
            key: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["getUrlParameter"])('key', _this.props.location.search)
        };
        _this.handleValidSubmit = function (event, values) {
            _this.props.handlePasswordResetFinish(_this.state.key, values.newPassword);
        };
        _this.updatePassword = function (event) {
            _this.setState({ password: event.target.value });
        };
        return _this;
    }
    PasswordResetFinishPage.prototype.componentWillUnmount = function () {
        this.props.reset();
    };
    PasswordResetFinishPage.prototype.getResetForm = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { onValidSubmit: this.handleValidSubmit },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "newPassword", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.newpassword'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.newpassword.placeholder'), type: "password", validate: {
                    required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.newpassword.required') },
                    minLength: { value: 4, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.newpassword.minlength') },
                    maxLength: { value: 50, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.newpassword.maxlength') }
                }, onChange: this.updatePassword }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_7__["default"], { password: this.state.password }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "confirmPassword", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.confirmpassword'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.confirmpassword.placeholder'), type: "password", validate: {
                    required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.confirmpassword.required') },
                    minLength: { value: 4, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.confirmpassword.minlength') },
                    maxLength: { value: 50, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.confirmpassword.maxlength') },
                    match: { value: 'newPassword', errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.error.dontmatch') }
                } }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "success", type: "submit" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "reset.finish.form.button" }, "Validate new password"))));
    };
    PasswordResetFinishPage.prototype.render = function () {
        var key = this.state.key;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "4" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "reset.finish.title" }, "Reset password")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, key ? this.getResetForm() : null)))));
    };
    return PasswordResetFinishPage;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapDispatchToProps = { handlePasswordResetFinish: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__["handlePasswordResetFinish"], reset: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(null, mapDispatchToProps)(PasswordResetFinishPage));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\finish\\password-reset-finish.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\finish\\password-reset-finish.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx":
/*!*****************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx ***!
  \*****************************************************************************************/
/*! exports provided: PasswordResetInit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetInit", function() { return PasswordResetInit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");







var PasswordResetInit = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PasswordResetInit, _super);
    function PasswordResetInit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleValidSubmit = function (event, values) {
            _this.props.handlePasswordResetInit(values.email);
            event.preventDefault();
        };
        return _this;
    }
    PasswordResetInit.prototype.componentWillUnmount = function () {
        this.props.reset();
    };
    PasswordResetInit.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "reset.request.title" }, "Reset your password")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "reset.request.messages.info" }, "Enter the email address you used to register"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { onValidSubmit: this.handleValidSubmit },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "email", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.email'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.email.placeholder'), type: "email", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.required') },
                                minLength: { value: 5, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.minlength') },
                                maxLength: { value: 254, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.maxlength') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], { color: "primary", type: "submit" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "reset.request.form.button" }, "Reset password")))))));
    };
    return PasswordResetInit;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapDispatchToProps = { handlePasswordResetInit: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__["handlePasswordResetInit"], reset: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(null, mapDispatchToProps)(PasswordResetInit));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\init\\password-reset-init.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\init\\password-reset-init.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts ***!
  \**************************************************************************************/
/*! exports provided: ACTION_TYPES, default, handlePasswordResetInit, handlePasswordResetFinish, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePasswordResetInit", function() { return handlePasswordResetInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePasswordResetFinish", function() { return handlePasswordResetFinish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");




var ACTION_TYPES = {
    RESET_PASSWORD_INIT: 'passwordReset/RESET_PASSWORD_INIT',
    RESET_PASSWORD_FINISH: 'passwordReset/RESET_PASSWORD_FINISH',
    RESET: 'passwordReset/RESET'
};
var initialState = {
    loading: false,
    resetPasswordSuccess: false,
    resetPasswordFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { loading: false, resetPasswordFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { loading: false, resetPasswordSuccess: true });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/account/reset-password';
// Actions
var handlePasswordResetInit = function (mail) {
    var _a;
    return ({
        type: ACTION_TYPES.RESET_PASSWORD_INIT,
        // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl + "/init", mail, { headers: (_a = {}, _a['Content-Type'] = 'text/plain', _a) }),
        meta: {
            successMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('reset.request.messages.success'),
            errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('reset.request.messages.notfound')
        }
    });
};
var handlePasswordResetFinish = function (key, newPassword) { return ({
    type: ACTION_TYPES.RESET_PASSWORD_FINISH,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl + "/finish", { key: key, newPassword: newPassword }),
    meta: {
        successMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('reset.finish.messages.success')
    }
}); };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\password-reset.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password-reset\\password-reset.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password/password.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password/password.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, savePassword, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "savePassword", function() { return savePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");




var ACTION_TYPES = {
    UPDATE_PASSWORD: 'account/UPDATE_PASSWORD',
    RESET: 'account/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_PASSWORD):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_PASSWORD):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { loading: false, updateSuccess: false, updateFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_PASSWORD):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { loading: false, updateSuccess: true, updateFailure: false });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
// Actions
var apiUrl = 'api/account';
var savePassword = function (currentPassword, newPassword) { return ({
    type: ACTION_TYPES.UPDATE_PASSWORD,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl + "/change-password", { currentPassword: currentPassword, newPassword: newPassword }),
    meta: {
        successMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('password.messages.success'),
        errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('password.messages.error')
    }
}); };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password\\password.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\password\\password.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/register/register.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/register/register.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, handleRegister, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleRegister", function() { return handleRegister; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");




var ACTION_TYPES = {
    CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
    RESET: 'register/RESET'
};
var initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { registrationFailure: true, errorMessage: action.payload.response.data.errorKey });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { registrationSuccess: true });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
// Actions
var handleRegister = function (login, email, password, langKey, firstName, lastName) {
    if (langKey === void 0) { langKey = 'es'; }
    return ({
        type: ACTION_TYPES.CREATE_ACCOUNT,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('api/register', { login: login, email: email, password: password, langKey: langKey, firstName: firstName, lastName: lastName }),
        meta: {
            successMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('register.messages.success')
        }
    });
};
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\register\\register.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\register\\register.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/register/register.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/register/register.tsx ***!
  \*******************************************************************/
/*! exports provided: RegisterPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/shared/layout/password/password-strength-bar */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx");
/* harmony import */ var _register_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./register.reducer */ "./src/main/webapp/app/modules/account/register/register.reducer.ts");








var RegisterPage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RegisterPage, _super);
    function RegisterPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            password: ''
        };
        _this.handleValidSubmit = function (event, values) {
            _this.props.handleRegister(values.username, values.email, values.firstPassword, _this.props.currentLocale, values.firstName, values.lastName);
            event.preventDefault();
        };
        _this.updatePassword = function (event) {
            _this.setState({ password: event.target.value });
        };
        return _this;
    }
    RegisterPage.prototype.componentWillUnmount = function () {
        this.props.reset();
    };
    RegisterPage.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", { id: "register-title" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "register.title" }, "Registration")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { id: "register-form", onValidSubmit: this.handleValidSubmit },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "firstName", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.name'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.name.placeholder'), type: "text", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.user.required') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "lastName", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.lastname'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.lastname.placeholder'), type: "text", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.user.required') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "email", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.email'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.email.placeholder'), type: "email", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.required') },
                                minLength: { value: 5, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.minlength') },
                                maxLength: { value: 254, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.email.maxlength') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "username", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.username'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.username.placeholder'), validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('register.messages.validate.login.required') },
                                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('register.messages.validate.login.pattern') },
                                minLength: { value: 8, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('register.messages.validate.login.minlength') },
                                maxLength: { value: 50, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('register.messages.validate.login.maxlength') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "firstPassword", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.newpassword'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.newpassword.placeholder'), type: "password", onChange: this.updatePassword, validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.newpassword.required') },
                                minLength: { value: 8, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.newpassword.minlength') },
                                maxLength: { value: 10, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.newpassword.maxlength') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__["default"], { password: this.state.password }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "secondPassword", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.confirmpassword'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.confirmpassword.placeholder'), type: "password", validate: {
                                required: { value: true, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.confirmpassword.required') },
                                minLength: { value: 8, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.confirmpassword.minlength') },
                                maxLength: { value: 10, errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.validate.confirmpassword.maxlength') },
                                match: { value: 'firstPassword', errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.messages.error.dontmatch') }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], { id: "register-submit", color: "primary", type: "submit" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "register.form.button" }, "Register"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u00A0")))));
    };
    return RegisterPage;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var locale = _a.locale;
    return ({
        currentLocale: locale.currentLocale
    });
};
var mapDispatchToProps = { handleRegister: _register_reducer__WEBPACK_IMPORTED_MODULE_7__["handleRegister"], reset: _register_reducer__WEBPACK_IMPORTED_MODULE_7__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(RegisterPage));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\register\\register.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\register\\register.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/account/settings/settings.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/settings/settings.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, saveAccountSettings, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveAccountSettings", function() { return saveAccountSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
var _this = undefined;





var ACTION_TYPES = {
    UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
    RESET: 'account/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updateSuccess: false, updateFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updateSuccess: true, updateFailure: false });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
// Actions
var apiUrl = 'api/account';
var saveAccountSettings = function (account) { return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_ACCOUNT,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, account),
                    meta: {
                        successMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('settings.messages.success')
                    }
                })];
            case 1:
                _a.sent();
                if (react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get("locale")) {
                    react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.remove("locale");
                }
                return [4 /*yield*/, dispatch(Object(app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__["getSession"])())];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\settings\\settings.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\account\\settings\\settings.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/administration.reducer.ts":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/administration.reducer.ts ***!
  \******************************************************************************/
/*! exports provided: ACTION_TYPES, default, systemHealth, systemMetrics, systemThreadDump, getLoggers, changeLogLevel, getConfigurations, getEnv, getAudits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemHealth", function() { return systemHealth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemMetrics", function() { return systemMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemThreadDump", function() { return systemThreadDump; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoggers", function() { return getLoggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeLogLevel", function() { return changeLogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfigurations", function() { return getConfigurations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnv", function() { return getEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAudits", function() { return getAudits; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
var _this = undefined;



var ACTION_TYPES = {
    FETCH_LOGS: 'administration/FETCH_LOGS',
    FETCH_LOGS_CHANGE_LEVEL: 'administration/FETCH_LOGS_CHANGE_LEVEL',
    FETCH_HEALTH: 'administration/FETCH_HEALTH',
    FETCH_METRICS: 'administration/FETCH_METRICS',
    FETCH_THREAD_DUMP: 'administration/FETCH_THREAD_DUMP',
    FETCH_CONFIGURATIONS: 'administration/FETCH_CONFIGURATIONS',
    FETCH_ENV: 'administration/FETCH_ENV',
    FETCH_AUDITS: 'administration/FETCH_AUDITS'
};
var initialState = {
    loading: false,
    errorMessage: null,
    logs: {
        loggers: []
    },
    health: {},
    metrics: {},
    threadDump: [],
    configuration: {
        configProps: {},
        env: {}
    },
    audits: [],
    totalItems: 0
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_METRICS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_THREAD_DUMP):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_LOGS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_ENV):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_AUDITS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_HEALTH):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_METRICS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_THREAD_DUMP):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_LOGS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_ENV):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_AUDITS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_HEALTH):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_METRICS):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, metrics: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_THREAD_DUMP):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, threadDump: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_LOGS):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, logs: {
                    loggers: action.payload.data
                } });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, configuration: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.configuration, { configProps: action.payload.data }) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_ENV):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, configuration: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.configuration, { env: action.payload.data }) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_AUDITS):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, audits: action.payload.data, totalItems: action.payload.headers['x-total-count'] });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_HEALTH):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, health: action.payload.data });
        default:
            return state;
    }
});
// Actions
var systemHealth = function () { return ({
    type: ACTION_TYPES.FETCH_HEALTH,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/health')
}); };
var systemMetrics = function () { return ({
    type: ACTION_TYPES.FETCH_METRICS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/jhi-metrics')
}); };
var systemThreadDump = function () { return ({
    type: ACTION_TYPES.FETCH_THREAD_DUMP,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/threaddump')
}); };
var getLoggers = function () { return ({
    type: ACTION_TYPES.FETCH_LOGS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/logs')
}); };
var changeLogLevel = function (name, level) {
    var body = {
        level: level,
        name: name
    };
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('management/logs', body)
                    })];
                case 1:
                    _a.sent();
                    dispatch(getLoggers());
                    return [2 /*return*/];
            }
        });
    }); };
};
var getConfigurations = function () { return ({
    type: ACTION_TYPES.FETCH_CONFIGURATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/configprops')
}); };
var getEnv = function () { return ({
    type: ACTION_TYPES.FETCH_ENV,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/env')
}); };
var getAudits = function (page, size, sort, fromDate, toDate) {
    var requestUrl = "management/audits" + (sort ? "?page=" + page + "&size=" + size + "&sort=" + sort : '');
    if (fromDate) {
        requestUrl += "&fromDate=" + fromDate;
    }
    if (toDate) {
        requestUrl += "&toDate=" + toDate;
    }
    return {
        type: ACTION_TYPES.FETCH_AUDITS,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\administration\\administration.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\administration\\administration.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts":
/*!***********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts ***!
  \***********************************************************************************************/
/*! exports provided: ACTION_TYPES, default, getUsers, getRoles, getUser, createUser, updateUser, deleteUser, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsers", function() { return getUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoles", function() { return getRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUser", function() { return createUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUser", function() { return updateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteUser", function() { return deleteUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/model/user.model */ "./src/main/webapp/app/shared/model/user.model.ts");
var _this = undefined;




var ACTION_TYPES = {
    FETCH_ROLES: 'userManagement/FETCH_ROLES',
    FETCH_USERS: 'userManagement/FETCH_USERS',
    FETCH_USER: 'userManagement/FETCH_USER',
    CREATE_USER: 'userManagement/CREATE_USER',
    UPDATE_USER: 'userManagement/UPDATE_USER',
    DELETE_USER: 'userManagement/DELETE_USER',
    RESET: 'userManagement/RESET'
};
var initialState = {
    loading: false,
    errorMessage: null,
    users: [],
    authorities: [],
    user: app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__["defaultValue"],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_ROLES):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state);
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_USERS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.UPDATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.DELETE_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_USERS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_ROLES):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.UPDATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.DELETE_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_ROLES):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { authorities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_USERS):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, users: action.payload.data, totalItems: action.payload.headers['x-total-count'] });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, user: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.UPDATE_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, user: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.DELETE_USER):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { updating: false, updateSuccess: true, user: app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__["defaultValue"] });
        case ACTION_TYPES.RESET:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState);
        default:
            return state;
    }
});
var apiUrl = 'api/users';
// Actions
var getUsers = function (page, size, sort) {
    var requestUrl = "" + apiUrl + (sort ? "?page=" + page + "&size=" + size + "&sort=" + sort : '');
    return {
        type: ACTION_TYPES.FETCH_USERS,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var getRoles = function () { return ({
    type: ACTION_TYPES.FETCH_ROLES,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(apiUrl + "/authorities")
}); };
var getUser = function (id) {
    var requestUrl = apiUrl + "/" + id;
    return {
        type: ACTION_TYPES.FETCH_USER,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
var createUser = function (user) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.CREATE_USER,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, user)
                })];
            case 1:
                result = _a.sent();
                dispatch(getUsers());
                return [2 /*return*/, result];
        }
    });
}); }; };
var updateUser = function (user) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.UPDATE_USER,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, user)
                })];
            case 1:
                result = _a.sent();
                dispatch(getUsers());
                return [2 /*return*/, result];
        }
    });
}); }; };
var deleteUser = function (id) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var requestUrl, result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                requestUrl = apiUrl + "/" + id;
                return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.DELETE_USER,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
                    })];
            case 1:
                result = _a.sent();
                dispatch(getUsers());
                return [2 /*return*/, result];
        }
    });
}); }; };
var reset = function () { return ({
    type: ACTION_TYPES.RESET
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management.reducer.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/home/home.css":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/modules/home/home.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!./home.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/modules/home/home.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader!./home.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/modules/home/home.css", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader!./home.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/modules/home/home.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/modules/home/home.tsx":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/modules/home/home.tsx ***!
  \***************************************************/
/*! exports provided: Home, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.css */ "./src/main/webapp/app/modules/home/home.css");
/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");








var Home = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.componentDidMount = function () {
        this.props.getSession();
    };
    Home.prototype.render = function () {
        var account = this.props.account;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], { md: "9" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.title" }, "Welcome, Java Hipster!")),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", { className: "lead" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.subtitle" }, "This is your homepage")),
                account && account.login ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Alert"], { color: "success" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.logged.message", interpolate: { username: account.firstName + ' ' + account.lastName } },
                            "You are logged in as user ",
                            account.firstName + ' ' + account.lastName,
                            ".")))) : (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.messages.info.authenticated.prefix" }, "If you want to "),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/login", className: "alert-link" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.messages.info.authenticated.link" }, " sign in")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.messages.info.authenticated.suffix" },
                            ", you can try the default accounts:",
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null),
                            "- Administrator (login=\"admin\" and password=\"admin\")",
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null),
                            "- User (login=\"user\" and password=\"user\").")),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.messages.info.register.noaccount" }, "You do not have an account yet?"),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/register", className: "alert-link" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.messages.info.register.link" }, "Register a new account"))))),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.question" }, "If you have any question on JHipster:")),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "https://www.jhipster.tech/", target: "_blank", rel: "noopener noreferrer" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.link.homepage" }, "JHipster homepage"))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "http://stackoverflow.com/tags/jhipster/info", target: "_blank", rel: "noopener noreferrer" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.link.stackoverflow" }, "JHipster on Stack Overflow"))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "https://github.com/jhipster/generator-jhipster/issues?state=open", target: "_blank", rel: "noopener noreferrer" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.link.bugtracker" }, "JHipster bug tracker"))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "https://gitter.im/jhipster/generator-jhipster", target: "_blank", rel: "noopener noreferrer" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.link.chat" }, "JHipster public chat room"))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "https://twitter.com/java_hipster", target: "_blank", rel: "noopener noreferrer" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.link.follow" }, "follow @java_hipster on Twitter")))),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "home.like" }, "If you like JHipster, do not forget to give us a star on"),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "https://github.com/jhipster/generator-jhipster", target: "_blank", rel: "noopener noreferrer" }, "Github"),
                    "!")),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], { md: "3", className: "pad" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "hipster rounded" }))));
    };
    return Home;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
}); };
var mapDispatchToProps = { getSession: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_7__["getSession"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(Home));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\home\\home.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\home\\home.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/login/login-modal.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/modules/login/login-modal.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");






var LoginModal = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LoginModal, _super);
    function LoginModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (event, errors, _a) {
            var username = _a.username, password = _a.password, rememberMe = _a.rememberMe;
            var handleLogin = _this.props.handleLogin;
            handleLogin(username, password, rememberMe);
        };
        return _this;
    }
    /*
      handleSubmitFacebook = (email, id, name, pictureurl) => {
        const { handleLoginFacebook } = this.props;
        handleLoginFacebook(email, id, name, pictureurl);
      };
    
      handleSubmitGoogle = (email, id, name, pictureurl) => {
        const { handleLoginGoogle } = this.props;
        handleLoginGoogle(email, id, name, pictureurl);
      };*/
    LoginModal.prototype.render = function () {
        var _a = this.props, loginError = _a.loginError, handleClose = _a.handleClose;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], { isOpen: this.props.showModal, toggle: handleClose, backdrop: "static", id: "login-page", autoFocus: false },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { onSubmit: this.handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], { id: "login-title", toggle: handleClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "login.title" }, "Sign in")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" }, loginError ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "danger" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "login.messages.error.authentication" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Failed to sign in!"),
                                " Please check your credentials and try again."))) : null),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "username", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.username'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('global.form.username.placeholder'), required: true, errorMessage: "Username cannot be empty!", autoFocus: true }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "password", type: "password", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('login.form.password'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["translate"])('login.form.password.placeholder'), required: true, errorMessage: "Password cannot be empty!" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], { check: true, inline: true },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { className: "form-check-label" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { type: "checkbox", name: "rememberMe" }),
                                    " ",
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "login.form.rememberme" }, "Remember me"))))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "mt-1" }, "\u00A0"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/reset/request" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "login.password.forgot" }, "Did you forget your password?"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "global.messages.info.register.noaccount" }, "You don't have an account yet?")),
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], { to: "/register" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "global.messages.info.register.link" }, "Register a new account")))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "secondary", onClick: handleClose, tabIndex: "1" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", type: "submit" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "login.form.button" }, "Sign in"))))));
    };
    return LoginModal;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (LoginModal);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\login-modal.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\login-modal.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/login/login.tsx":
/*!*****************************************************!*\
  !*** ./src/main/webapp/app/modules/login/login.tsx ***!
  \*****************************************************/
/*! exports provided: Login, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _login_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-modal */ "./src/main/webapp/app/modules/login/login-modal.tsx");






var Login = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showModal: _this.props.showModal
        };
        /*
        
              handleLoginFacebook = (email, id, username, picture) => {
                this.props.loginfacebook(email, id, username, picture);
              };
        
              handleLoginGoogle = (email, id, username, picture) => {
                this.props.logingoogle(email, id, username, picture);
              };
            */
        _this.handleLogin = function (username, password, rememberMe) {
            if (rememberMe === void 0) { rememberMe = false; }
            _this.props.login(username, password, rememberMe);
        };
        _this.handleClose = function () {
            _this.setState({ showModal: false });
        };
        return _this;
    }
    Login.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({ showModal: this.props.showModal });
        }
    };
    Login.prototype.render = function () {
        var _a = this.props, location = _a.location, isAuthenticated = _a.isAuthenticated;
        var from = (location.state || { from: { pathname: '/', search: location.search } }).from;
        var showModal = this.state.showModal;
        if (isAuthenticated) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: from });
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_login_modal__WEBPACK_IMPORTED_MODULE_5__["default"], { showModal: showModal, loginError: this.props.loginError, handleLogin: this.handleLogin, handleClose: this.handleClose }));
    };
    return Login;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (_a) {
    var authentication = _a.authentication;
    return ({
        isAuthenticated: authentication.isAuthenticated,
        loginError: authentication.loginError,
        showModal: authentication.showModalLogin
    });
};
var mapDispatchToProps = {
    login: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__["login"] /*,
    loginfacebook,
    logingoogle*/
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Login));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\login.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\login.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/modules/login/logout.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/modules/login/logout.tsx ***!
  \******************************************************/
/*! exports provided: Logout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logout", function() { return Logout; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");




var Logout = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Logout, _super);
    function Logout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logout.prototype.componentDidMount = function () {
        this.props.logout();
    };
    Logout.prototype.render = function () {
        var logoutUrl = this.props.logoutUrl;
        if (logoutUrl) {
            // if Keycloak, logoutUrl has protocol/openid-connect in it
            window.location.href =
                logoutUrl.indexOf('/protocol') > -1
                    ? logoutUrl + '?redirect_uri=' + window.location.origin
                    : logoutUrl + '?id_token_hint=' + this.props.idToken + '&post_logout_redirect_uri=' + window.location.origin;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "p-5" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Logged out successfully!")));
    };
    return Logout;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

var mapStateToProps = function (storeState) { return ({
    logoutUrl: storeState.authentication.logoutUrl,
    idToken: storeState.authentication.idToken
}); };
var mapDispatchToProps = { logout: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__["logout"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Logout));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\logout.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\modules\\login\\logout.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/routes.tsx":
/*!****************************************!*\
  !*** ./src/main/webapp/app/routes.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_modules_login_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/modules/login/login */ "./src/main/webapp/app/modules/login/login.tsx");
/* harmony import */ var app_modules_account_register_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/modules/account/register/register */ "./src/main/webapp/app/modules/account/register/register.tsx");
/* harmony import */ var app_modules_account_activate_activate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/modules/account/activate/activate */ "./src/main/webapp/app/modules/account/activate/activate.tsx");
/* harmony import */ var app_modules_account_password_reset_init_password_reset_init__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/modules/account/password-reset/init/password-reset-init */ "./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx");
/* harmony import */ var app_modules_account_password_reset_finish_password_reset_finish__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/modules/account/password-reset/finish/password-reset-finish */ "./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx");
/* harmony import */ var app_modules_login_logout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/modules/login/logout */ "./src/main/webapp/app/modules/login/logout.tsx");
/* harmony import */ var app_modules_home_home__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/modules/home/home */ "./src/main/webapp/app/modules/home/home.tsx");
/* harmony import */ var app_entities__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/entities */ "./src/main/webapp/app/entities/index.tsx");
/* harmony import */ var app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/shared/auth/private-route */ "./src/main/webapp/app/shared/auth/private-route.tsx");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");














// tslint:disable:space-in-parens
var Account = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
    loader: function () { return __webpack_require__.e(/*! import() | account */ "account").then(__webpack_require__.bind(null, /*! app/modules/account */ "./src/main/webapp/app/modules/account/index.tsx")); },
    loading: function () { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "loading ..."); }
});
var Admin = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
    loader: function () { return __webpack_require__.e(/*! import() | administration */ "administration").then(__webpack_require__.bind(null, /*! app/modules/administration */ "./src/main/webapp/app/modules/administration/index.tsx")); },
    loading: function () { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "loading ..."); }
});
// tslint:enable
var Routes = function () { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "view-routes" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/login", component: app_modules_login_login__WEBPACK_IMPORTED_MODULE_3__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/logout", component: app_modules_login_logout__WEBPACK_IMPORTED_MODULE_8__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/register", component: app_modules_account_register_register__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/activate/:key?", component: app_modules_account_activate_activate__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/reset/request", component: app_modules_account_password_reset_init_password_reset_init__WEBPACK_IMPORTED_MODULE_6__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/reset/finish/:key?", component: app_modules_account_password_reset_finish_password_reset_finish__WEBPACK_IMPORTED_MODULE_7__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/admin", component: Admin, hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_13__["AUTHORITIES"].ADMIN] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/account", component: Account, hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_13__["AUTHORITIES"].ADMIN, app_config_constants__WEBPACK_IMPORTED_MODULE_13__["AUTHORITIES"].USER] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/entity", component: app_entities__WEBPACK_IMPORTED_MODULE_10__["default"], hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_13__["AUTHORITIES"].USER] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/", component: app_modules_home_home__WEBPACK_IMPORTED_MODULE_9__["default"] })))); };
/* harmony default export */ __webpack_exports__["default"] = (Routes);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\routes.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\routes.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/auth/private-route.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/shared/auth/private-route.tsx ***!
  \***********************************************************/
/*! exports provided: PrivateRouteComponent, hasAnyAuthority, PrivateRoute, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateRouteComponent", function() { return PrivateRouteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAnyAuthority", function() { return hasAnyAuthority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateRoute", function() { return PrivateRoute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");






var PrivateRouteComponent = function (_a) {
    var Component = _a.component, isAuthenticated = _a.isAuthenticated, sessionHasBeenFetched = _a.sessionHasBeenFetched, isAuthorized = _a.isAuthorized, _b = _a.hasAnyAuthorities, hasAnyAuthorities = _b === void 0 ? [] : _b, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["component", "isAuthenticated", "sessionHasBeenFetched", "isAuthorized", "hasAnyAuthorities"]);
    var checkAuthorities = function (props) {
        return isAuthorized ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_5__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props)))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "insufficient-authority" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert alert-danger" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "error.http.403" }, "You are not authorized to access this page."))));
    };
    var renderRedirect = function (props) {
        if (!sessionHasBeenFetched) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null);
        }
        else {
            return isAuthenticated ? (checkAuthorities(props)) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: {
                    pathname: '/login',
                    search: props.location.search,
                    state: { from: props.location }
                } }));
        }
    };
    if (!Component)
        throw new Error("A component needs to be specified for private route for path " + rest.path);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rest, { render: renderRedirect }));
};
var hasAnyAuthority = function (authorities, hasAnyAuthorities) {
    if (authorities && authorities.length !== 0) {
        if (hasAnyAuthorities.length === 0) {
            return true;
        }
        return hasAnyAuthorities.some(function (auth) { return authorities.includes(auth); });
    }
    return false;
};
var mapStateToProps = function (_a, _b) {
    var _c = _a.authentication, isAuthenticated = _c.isAuthenticated, account = _c.account, sessionHasBeenFetched = _c.sessionHasBeenFetched;
    var _d = _b.hasAnyAuthorities, hasAnyAuthorities = _d === void 0 ? [] : _d;
    return ({
        isAuthenticated: isAuthenticated,
        isAuthorized: hasAnyAuthority(account.authorities, hasAnyAuthorities),
        sessionHasBeenFetched: sessionHasBeenFetched
    });
};
/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
var PrivateRoute = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);
/* harmony default export */ __webpack_exports__["default"] = (PrivateRoute);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\auth\\private-route.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\auth\\private-route.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/error/error-boundary-route.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/shared/error/error-boundary-route.tsx ***!
  \*******************************************************************/
/*! exports provided: ErrorBoundaryRoute, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundaryRoute", function() { return ErrorBoundaryRoute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");




var ErrorBoundaryRoute = function (_a) {
    var Component = _a.component, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["component"]);
    var encloseInErrorBoundary = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_3__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props)))); };
    if (!Component)
        throw new Error("A component needs to be specified for path " + rest.path);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rest, { render: encloseInErrorBoundary }));
};
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundaryRoute);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\error\\error-boundary-route.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\error\\error-boundary-route.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/error/error-boundary.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/error/error-boundary.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ErrorBoundary = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { error: undefined, errorInfo: undefined };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };
    ErrorBoundary.prototype.render = function () {
        var _a = this.state, error = _a.error, errorInfo = _a.errorInfo;
        if (errorInfo) {
            var errorDetails =  true ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("details", { className: "preserve-space" },
                error && error.toString(),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                errorInfo.componentStack)) : (undefined);
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { className: "error" }, "An unexpected error has occurred."),
                errorDetails));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\error\\error-boundary.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\error\\error-boundary.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/footer/footer.css":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/footer/footer.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./footer.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/footer/footer.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader!./footer.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/footer/footer.css", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./footer.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/footer/footer.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/footer/footer.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/footer/footer.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.css */ "./src/main/webapp/app/shared/layout/footer/footer.css");
/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_footer_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");




var Footer = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "footer page-content" },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "footer" }, "Your footer")))))); };
/* harmony default export */ __webpack_exports__["default"] = (Footer);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\footer\\footer.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\footer\\footer.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header-components.tsx":
/*!************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header-components.tsx ***!
  \************************************************************************/
/*! exports provided: NavDropdown, BrandIcon, Brand, Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavDropdown", function() { return NavDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandIcon", function() { return BrandIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Brand", function() { return Brand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");







var NavDropdown = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["UncontrolledDropdown"], { nav: true, inNavbar: true, id: props.id },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["DropdownToggle"], { nav: true, caret: true, className: "d-flex align-items-center" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: props.icon }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, props.name)),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["DropdownMenu"], { right: true, style: props.style }, props.children))); };
var BrandIcon = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { className: "brand-icon" }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "content/images/logo-jhipster.png", alt: "Logo" }))); };
var Brand = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["NavbarBrand"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/", className: "brand-logo" },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(BrandIcon, null),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "brand-title" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "global.title" }, "Sico")),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "navbar-version" }, app_config_constants__WEBPACK_IMPORTED_MODULE_6__["default"].VERSION))); };
var Home = function (props) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["NavItem"], null,
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["NavLink"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/", className: "d-flex align-items-center" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "home" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "global.menu.home" }, "Home"))))); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\header-components.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\header-components.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header.css":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/header/header.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/header/header.css", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/header/header.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _header_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.css */ "./src/main/webapp/app/shared/layout/header/header.css");
/* harmony import */ var _header_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_header_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menus */ "./src/main/webapp/app/shared/layout/header/menus/index.ts");








var Header = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            menuOpen: false
        };
        _this.handleLocaleChange = function (event) {
            var langKey = event.target.value;
            react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Storage"].session.set('locale', langKey);
            _this.props.onLocaleChange(langKey);
        };
        _this.renderDevRibbon = function () {
            return _this.props.isInProduction === false ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "ribbon dev" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: "" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.ribbon." + _this.props.ribbonEnv })))) : null;
        };
        _this.toggleMenu = function () {
            _this.setState({ menuOpen: !_this.state.menuOpen });
        };
        return _this;
    }
    Header.prototype.render = function () {
        var _a = this.props, currentLocale = _a.currentLocale, isAuthenticated = _a.isAuthenticated, isAdmin = _a.isAdmin, isSwaggerEnabled = _a.isSwaggerEnabled, isInProduction = _a.isInProduction;
        /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { id: "app-header" },
            this.renderDevRibbon(),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_5___default.a, { className: "loading-bar" }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Navbar"], { dark: true, expand: "sm", fixed: "top", className: "jh-navbar" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["NavbarToggler"], { "aria-label": "Menu", onClick: this.toggleMenu }),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_6__["Brand"], null),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { isOpen: this.state.menuOpen, navbar: true },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Nav"], { id: "header-tabs", className: "ml-auto", navbar: true },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_6__["Home"], null),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_7__["PrestamosMenu"], { isAuthenticated: isAuthenticated }),
                        isAuthenticated && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_7__["EntitiesMenu"], null),
                        isAuthenticated && isAdmin && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_7__["AdminMenu"], { showSwagger: isSwaggerEnabled }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_7__["LocaleMenu"], { currentLocale: currentLocale, onClick: this.handleLocaleChange }),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_7__["AccountMenu"], { isAuthenticated: isAuthenticated }))))));
    };
    return Header;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (Header);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\header.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\header.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/account.tsx":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/account.tsx ***!
  \********************************************************************/
/*! exports provided: AccountMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountMenu", function() { return AccountMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");






var accountMenuItemsAuthenticated = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/account/clienteregister-update" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "wrench", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.menu.account.settings" }, "Settings")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/account/password" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "clock", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.menu.account.password" }, "Password")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/logout" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "sign-out-alt", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.menu.account.logout" }, "Sign out"))));
var accountMenuItems = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { id: "login-item", tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/login" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "sign-in-alt", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.menu.account.login" }, "Sign in")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/register" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "sign-in-alt", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.menu.account.register" }, "Register"))));
var AccountMenu = function (_a) {
    var _b = _a.isAuthenticated, isAuthenticated = _b === void 0 ? false : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_5__["NavDropdown"], { icon: "user", name: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["translate"])('global.menu.account.main'), id: "account-menu" }, isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems));
};
/* harmony default export */ __webpack_exports__["default"] = (AccountMenu);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\account.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\account.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/admin.tsx":
/*!******************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/admin.tsx ***!
  \******************************************************************/
/*! exports provided: AdminMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminMenu", function() { return AdminMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);






var adminMenuItems = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/user-management" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "user", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.userManagement" }, "User management")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/metrics" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "tachometer-alt", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.metrics" }, "Metrics")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/health" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "heart", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.health" }, "Health")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/configuration" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "list", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.configuration" }, "Configuration")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/audits" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "bell", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.audits" }, "Audits")),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/logs" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "tasks", fixedWidth: true }),
        " ",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.logs" }, "Logs"))));
var swaggerItem = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], to: "/admin/docs" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "book", fixedWidth: true }),
    " ",
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.menu.admin.apidocs" }, "API")));
var AdminMenu = function (_a) {
    var showSwagger = _a.showSwagger;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_4__["NavDropdown"], { icon: "user-plus", name: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.menu.admin.main'), style: { width: '140%' }, id: "admin-menu" },
        adminMenuItems,
        showSwagger && swaggerItem));
};
/* harmony default export */ __webpack_exports__["default"] = (AdminMenu);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\admin.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\admin.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/entities.tsx":
/*!*********************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/entities.tsx ***!
  \*********************************************************************/
/*! exports provided: EntitiesMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntitiesMenu", function() { return EntitiesMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");






var EntitiesMenu = function (props) { return (
// tslint:disable-next-line:jsx-self-close
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_5__["NavDropdown"], { icon: "th-list", name: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["translate"])('global.menu.entities.main'), id: "entity-menu" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/department" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.department" })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/banco" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.banco" })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/cliente" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.cliente" })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/clientemisdatos" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.clientemisdatos" })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/token" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.token" })))); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\entities.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\entities.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/index.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/index.ts ***!
  \*****************************************************************/
/*! exports provided: AccountMenu, AdminMenu, LocaleMenu, EntitiesMenu, PrestamosMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/main/webapp/app/shared/layout/header/menus/account.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccountMenu", function() { return _account__WEBPACK_IMPORTED_MODULE_0__["AccountMenu"]; });

/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin */ "./src/main/webapp/app/shared/layout/header/menus/admin.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdminMenu", function() { return _admin__WEBPACK_IMPORTED_MODULE_1__["AdminMenu"]; });

/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locale */ "./src/main/webapp/app/shared/layout/header/menus/locale.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocaleMenu", function() { return _locale__WEBPACK_IMPORTED_MODULE_2__["LocaleMenu"]; });

/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities */ "./src/main/webapp/app/shared/layout/header/menus/entities.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntitiesMenu", function() { return _entities__WEBPACK_IMPORTED_MODULE_3__["EntitiesMenu"]; });

/* harmony import */ var _prestamos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prestamos */ "./src/main/webapp/app/shared/layout/header/menus/prestamos.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrestamosMenu", function() { return _prestamos__WEBPACK_IMPORTED_MODULE_4__["PrestamosMenu"]; });








 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\index.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/locale.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/locale.tsx ***!
  \*******************************************************************/
/*! exports provided: LocaleMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocaleMenu", function() { return LocaleMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");
/* harmony import */ var app_config_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/config/translation */ "./src/main/webapp/app/config/translation.ts");




var LocaleMenu = function (_a) {
    var currentLocale = _a.currentLocale, onClick = _a.onClick;
    return Object.keys(app_config_translation__WEBPACK_IMPORTED_MODULE_3__["languages"]).length > 1 && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], { icon: "flag", name: currentLocale ? app_config_translation__WEBPACK_IMPORTED_MODULE_3__["languages"][currentLocale].name : undefined }, app_config_translation__WEBPACK_IMPORTED_MODULE_3__["locales"].map(function (locale) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { key: locale, value: locale, onClick: onClick }, app_config_translation__WEBPACK_IMPORTED_MODULE_3__["languages"][locale].name)); })));
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\locale.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\locale.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/menus/prestamos.tsx":
/*!**********************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/menus/prestamos.tsx ***!
  \**********************************************************************/
/*! exports provided: PrestamosMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrestamosMenu", function() { return PrestamosMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/dist/reactstrap.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");






var PrestamosMenu = function (props) { return (
// tslint:disable-next-line:jsx-self-close
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_5__["NavDropdown"], { icon: "th-list", name: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["translate"])('global.menu.prestamos.main'), id: "prestamos-menu" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/recaudador" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.recaudador" })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"], to: "/entity/transferencias" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: "asterisk", fixedWidth: true }),
        "\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "global.menu.entities.transferencias" })))); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\prestamos.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\header\\menus\\prestamos.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/password/password-strength-bar.css":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/password/password-strength-bar.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./password-strength-bar.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/password/password-strength-bar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader!./password-strength-bar.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/password/password-strength-bar.css", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader!./password-strength-bar.css */ "./node_modules/css-loader/index.js!./src/main/webapp/app/shared/layout/password/password-strength-bar.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx ***!
  \******************************************************************************/
/*! exports provided: PasswordStrengthBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordStrengthBar", function() { return PasswordStrengthBar; });
/* harmony import */ var _password_strength_bar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-strength-bar.css */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.css");
/* harmony import */ var _password_strength_bar_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_password_strength_bar_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);



var PasswordStrengthBar = function (_a) {
    var password = _a.password;
    var colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
    var measureStrength = function (p) {
        var force = 0;
        var regex = /[$-/:-?{-~!"^_`\[\]]/g;
        var flags = {
            lowerLetters: /[a-z]+/.test(p),
            upperLetters: /[A-Z]+/.test(p),
            numbers: /[0-9]+/.test(p),
            symbols: regex.test(p)
        };
        var passedMatches = Object.values(flags).filter(function (isMatchedFlag) { return !!isMatchedFlag; }).length;
        force += 2 * p.length + (p.length >= 10 ? 1 : 0);
        force += passedMatches * 10;
        // penalty (short password)
        force = p.length <= 6 ? Math.min(force, 10) : force;
        // penalty (poor variety of characters)
        force = passedMatches === 1 ? Math.min(force, 10) : force;
        force = passedMatches === 2 ? Math.min(force, 20) : force;
        force = passedMatches === 3 ? Math.min(force, 40) : force;
        return force;
    };
    var getColor = function (s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return { idx: idx + 1, col: colors[idx] };
    };
    var getPoints = function (force) {
        var pts = [];
        for (var i = 0; i < 5; i++) {
            pts.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { key: i, className: "point", style: i < force.idx ? { backgroundColor: force.col } : { backgroundColor: '#DDD' } }));
        }
        return pts;
    };
    var strength = getColor(measureStrength(password));
    var points = getPoints(strength);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "strength" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "global.messages.validate.newpassword.strength" }, "Password strength:")),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { id: "strengthBar" }, points)));
};
/* harmony default export */ __webpack_exports__["default"] = (PasswordStrengthBar);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\password\\password-strength-bar.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\layout\\password\\password-strength-bar.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/banco.model.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/banco.model.ts ***!
  \*********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\banco.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\banco.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/cliente.model.ts":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/cliente.model.ts ***!
  \***********************************************************/
/*! exports provided: SEXO, defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEXO", function() { return SEXO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var SEXO;
(function (SEXO) {
    SEXO["MASCULINO"] = "MASCULINO";
    SEXO["FEMENINO"] = "FEMENINO";
})(SEXO || (SEXO = {}));
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\cliente.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\cliente.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/country.model.ts":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/country.model.ts ***!
  \***********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\country.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\country.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/credit-detalle.model.ts":
/*!******************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/credit-detalle.model.ts ***!
  \******************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {
    ejecutada: false
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\credit-detalle.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\credit-detalle.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/credit.model.ts":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/credit.model.ts ***!
  \**********************************************************/
/*! exports provided: Periodicidad, TipoCobro, defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Periodicidad", function() { return Periodicidad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoCobro", function() { return TipoCobro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var Periodicidad;
(function (Periodicidad) {
    Periodicidad["DIARIO"] = "DIARIO";
    Periodicidad["SEMANAL"] = "SEMANAL";
    Periodicidad["MENSUAL"] = "MENSUAL";
    Periodicidad["BIMENSUAL"] = "BIMENSUAL";
    Periodicidad["SEMESTRAL"] = "SEMESTRAL";
})(Periodicidad || (Periodicidad = {}));
var TipoCobro;
(function (TipoCobro) {
    TipoCobro["PRESTAMO"] = "PRESTAMO";
    TipoCobro["INSUMOINFORMATICO"] = "INSUMOINFORMATICO";
})(TipoCobro || (TipoCobro = {}));
var defaultValue = {
    activo: false,
    excluirFindeSemanas: false,
    incobrable: false,
    pagoManual: false,
    esPersonal: false
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\credit.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\credit.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/department.model.ts":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/department.model.ts ***!
  \**************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\department.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\department.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/location.model.ts":
/*!************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/location.model.ts ***!
  \************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\location.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\location.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/recaudador-detalle.model.ts":
/*!**********************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/recaudador-detalle.model.ts ***!
  \**********************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\recaudador-detalle.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\recaudador-detalle.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/recaudador.model.ts":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/recaudador.model.ts ***!
  \**************************************************************/
/*! exports provided: Periodicidad, TipoCobro, defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Periodicidad", function() { return Periodicidad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoCobro", function() { return TipoCobro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var Periodicidad;
(function (Periodicidad) {
    Periodicidad["DIARIO"] = "DIARIO";
    Periodicidad["SEMANAL"] = "SEMANAL";
    Periodicidad["MENSUAL"] = "MENSUAL";
    Periodicidad["BIMENSUAL"] = "BIMENSUAL";
    Periodicidad["SEMESTRAL"] = "SEMESTRAL";
})(Periodicidad || (Periodicidad = {}));
var TipoCobro;
(function (TipoCobro) {
    TipoCobro["PRESTAMO"] = "PRESTAMO";
    TipoCobro["INSUMOINFORMATICO"] = "INSUMOINFORMATICO";
})(TipoCobro || (TipoCobro = {}));
var defaultValue = {
    activo: false,
    esPersonal: false,
    excluirFindeSemanas: false,
    incobrable: false
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\recaudador.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\recaudador.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/region.model.ts":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/region.model.ts ***!
  \**********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\region.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\region.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/token.model.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/token.model.ts ***!
  \*********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\token.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\token.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/transferencia.model.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/transferencia.model.ts ***!
  \*****************************************************************/
/*! exports provided: EstadoTransferencia, defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadoTransferencia", function() { return EstadoTransferencia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var EstadoTransferencia;
(function (EstadoTransferencia) {
    EstadoTransferencia["COMPLETA"] = "COMPLETA";
    EstadoTransferencia["PENDIENTE"] = "PENDIENTE";
    EstadoTransferencia["CANCELADA"] = "CANCELADA";
})(EstadoTransferencia || (EstadoTransferencia = {}));
var defaultValue = {};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\transferencia.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\transferencia.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/model/user.model.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/user.model.ts ***!
  \********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
var defaultValue = {
    id: '',
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    activated: false,
    langKey: '',
    authorities: [],
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null,
    password: ''
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\user.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\model\\user.model.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/action-type.util.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/action-type.util.ts ***!
  \*****************************************************************/
/*! exports provided: REQUEST, SUCCESS, FAILURE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST", function() { return REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCESS", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAILURE", function() { return FAILURE; });
/**
 * Appends REQUEST async action type
 */
var REQUEST = function (actionType) { return actionType + "_PENDING"; };
/**
 * Appends SUCCESS async action type
 */
var SUCCESS = function (actionType) { return actionType + "_FULFILLED"; };
/**
 * Appends FAILURE async action type
 */
var FAILURE = function (actionType) { return actionType + "_REJECTED"; };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\action-type.util.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\action-type.util.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/application-profile.ts":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/application-profile.ts ***!
  \********************************************************************/
/*! exports provided: ACTION_TYPES, default, getProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfile", function() { return getProfile; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");



var ACTION_TYPES = {
    GET_PROFILE: 'applicationProfile/GET_PROFILE'
};
var initialState = {
    ribbonEnv: '',
    inProduction: true,
    isSwaggerEnabled: false
};
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.GET_PROFILE):
            var data = action.payload.data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { ribbonEnv: data['display-ribbon-on-profiles'], inProduction: data.activeProfiles.includes('prod'), isSwaggerEnabled: data.activeProfiles.includes('swagger') });
        default:
            return state;
    }
});
var getProfile = function () { return ({
    type: ACTION_TYPES.GET_PROFILE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/info')
}); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\application-profile.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\application-profile.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/authentication.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/authentication.ts ***!
  \***************************************************************/
/*! exports provided: ACTION_TYPES, default, displayAuthError, getSession, login, loginfacebook, logingoogle, clearAuthToken, logout, clearAuthentication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayAuthError", function() { return displayAuthError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSession", function() { return getSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginfacebook", function() { return loginfacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logingoogle", function() { return logingoogle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAuthToken", function() { return clearAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAuthentication", function() { return clearAuthentication; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/locale */ "./src/main/webapp/app/shared/reducers/locale.ts");
var _this = undefined;





var ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH',
    ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};
var AUTH_TOKEN_KEY = 'jhi-authenticationToken';
var initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false,
    showModalLogin: false,
    account: {},
    errorMessage: null,
    redirectMessage: null,
    sessionHasBeenFetched: false,
    idToken: null,
    logoutUrl: null
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.LOGIN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.GET_SESSION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.LOGIN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { errorMessage: action.payload, showModalLogin: true, loginError: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.GET_SESSION):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, isAuthenticated: false, sessionHasBeenFetched: true, showModalLogin: true, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.LOGIN):
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, loginError: false, showModalLogin: false, loginSuccess: true });
        case ACTION_TYPES.LOGOUT:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { showModalLogin: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.GET_SESSION): {
            var isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { isAuthenticated: isAuthenticated, loading: false, sessionHasBeenFetched: true, account: action.payload.data });
        }
        case ACTION_TYPES.ERROR_MESSAGE:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, initialState, { showModalLogin: true, redirectMessage: action.message });
        case ACTION_TYPES.CLEAR_AUTH:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { loading: false, showModalLogin: true, isAuthenticated: false });
        default:
            return state;
    }
});
var displayAuthError = function (message) { return ({ type: ACTION_TYPES.ERROR_MESSAGE, message: message }); };
var getSession = function () { return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var account, langKey;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.GET_SESSION,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('api/account')
                })];
            case 1:
                _a.sent();
                account = getState().authentication.account;
                if (!(account && account.langKey)) return [3 /*break*/, 3];
                langKey = react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get('locale', account.langKey);
                react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.set('email', account.email);
                return [4 /*yield*/, dispatch(Object(app_shared_reducers_locale__WEBPACK_IMPORTED_MODULE_4__["setLocale"])(langKey))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }; };
var login = function (username, password, rememberMe) {
    if (rememberMe === void 0) { rememberMe = false; }
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var result, bearerToken, jwt;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatch({
                        type: ACTION_TYPES.LOGIN,
                        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('api/authenticate', { username: username, password: password, rememberMe: rememberMe })
                    })];
                case 1:
                    result = _a.sent();
                    bearerToken = result.value.headers.authorization;
                    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                        jwt = bearerToken.slice(7, bearerToken.length);
                        if (rememberMe) {
                            react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.set(AUTH_TOKEN_KEY, jwt);
                        }
                        else {
                            react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.set(AUTH_TOKEN_KEY, jwt);
                        }
                    }
                    return [4 /*yield*/, dispatch(getSession())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
};
var loginfacebook = function (email, password, username, imageUrl) { return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.LOGIN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('api/userbyemailsocialnetwork', { email: email, password: password, username: username, imageUrl: imageUrl })
                })];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, dispatch(login(email, password, false))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }; };
var logingoogle = function (email, password, username, imageUrl) { return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var result;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dispatch({
                    type: ACTION_TYPES.LOGIN,
                    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('api/userbyemailsocialnetwork', { email: email, password: password, username: username, imageUrl: imageUrl })
                })];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, dispatch(login(email, password, false))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }; };
var clearAuthToken = function () {
    if (react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.get(AUTH_TOKEN_KEY)) {
        react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.remove(AUTH_TOKEN_KEY);
    }
    if (react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get(AUTH_TOKEN_KEY)) {
        react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.remove(AUTH_TOKEN_KEY);
    }
};
var logout = function () { return function (dispatch) {
    clearAuthToken();
    dispatch({
        type: ACTION_TYPES.LOGOUT
    });
}; };
var clearAuthentication = function (messageKey) { return function (dispatch, getState) {
    clearAuthToken();
    dispatch(displayAuthError(messageKey));
    dispatch({
        type: ACTION_TYPES.CLEAR_AUTH
    });
}; };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\authentication.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\authentication.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/index.ts":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/index.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locale */ "./src/main/webapp/app/shared/reducers/locale.ts");
/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _application_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./application-profile */ "./src/main/webapp/app/shared/reducers/application-profile.ts");
/* harmony import */ var app_modules_administration_administration_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/modules/administration/administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");
/* harmony import */ var app_modules_administration_user_management_user_management_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/modules/administration/user-management/user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");
/* harmony import */ var app_modules_account_register_register_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/modules/account/register/register.reducer */ "./src/main/webapp/app/modules/account/register/register.reducer.ts");
/* harmony import */ var app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/modules/account/activate/activate.reducer */ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts");
/* harmony import */ var app_modules_account_password_password_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/modules/account/password/password.reducer */ "./src/main/webapp/app/modules/account/password/password.reducer.ts");
/* harmony import */ var app_modules_account_settings_settings_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/modules/account/settings/settings.reducer */ "./src/main/webapp/app/modules/account/settings/settings.reducer.ts");
/* harmony import */ var app_modules_account_password_reset_password_reset_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/modules/account/password-reset/password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");
/* harmony import */ var app_entities_region_region_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/entities/region/region.reducer */ "./src/main/webapp/app/entities/region/region.reducer.ts");
/* harmony import */ var app_entities_country_country_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/entities/country/country.reducer */ "./src/main/webapp/app/entities/country/country.reducer.ts");
/* harmony import */ var app_entities_location_location_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/entities/location/location.reducer */ "./src/main/webapp/app/entities/location/location.reducer.ts");
/* harmony import */ var app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/entities/department/department.reducer */ "./src/main/webapp/app/entities/department/department.reducer.ts");
/* harmony import */ var app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/entities/banco/banco.reducer */ "./src/main/webapp/app/entities/banco/banco.reducer.ts");
/* harmony import */ var app_entities_credit_detalle_credit_detalle_reducer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! app/entities/credit-detalle/credit-detalle.reducer */ "./src/main/webapp/app/entities/credit-detalle/credit-detalle.reducer.ts");
/* harmony import */ var app_entities_credit_credit_reducer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! app/entities/credit/credit.reducer */ "./src/main/webapp/app/entities/credit/credit.reducer.ts");
/* harmony import */ var app_entities_cliente_cliente_reducer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! app/entities/cliente/cliente.reducer */ "./src/main/webapp/app/entities/cliente/cliente.reducer.ts");
/* harmony import */ var app_entities_recaudador_recaudador_reducer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! app/entities/recaudador/recaudador.reducer */ "./src/main/webapp/app/entities/recaudador/recaudador.reducer.ts");
/* harmony import */ var app_entities_recaudador_detalle_recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! app/entities/recaudador-detalle/recaudador-detalle.reducer */ "./src/main/webapp/app/entities/recaudador-detalle/recaudador-detalle.reducer.ts");
/* harmony import */ var app_entities_token_token_reducer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! app/entities/token/token.reducer */ "./src/main/webapp/app/entities/token/token.reducer.ts");
/* harmony import */ var app_entities_transferencia_transferencia_reducer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! app/entities/transferencia/transferencia.reducer */ "./src/main/webapp/app/entities/transferencia/transferencia.reducer.ts");












// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore



var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    authentication: _authentication__WEBPACK_IMPORTED_MODULE_3__["default"],
    locale: _locale__WEBPACK_IMPORTED_MODULE_2__["default"],
    applicationProfile: _application_profile__WEBPACK_IMPORTED_MODULE_4__["default"],
    administration: app_modules_administration_administration_reducer__WEBPACK_IMPORTED_MODULE_5__["default"],
    userManagement: app_modules_administration_user_management_user_management_reducer__WEBPACK_IMPORTED_MODULE_6__["default"],
    register: app_modules_account_register_register_reducer__WEBPACK_IMPORTED_MODULE_7__["default"],
    activate: app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_8__["default"],
    passwordReset: app_modules_account_password_reset_password_reset_reducer__WEBPACK_IMPORTED_MODULE_11__["default"],
    password: app_modules_account_password_password_reducer__WEBPACK_IMPORTED_MODULE_9__["default"],
    settings: app_modules_account_settings_settings_reducer__WEBPACK_IMPORTED_MODULE_10__["default"],
    region: app_entities_region_region_reducer__WEBPACK_IMPORTED_MODULE_12__["default"],
    country: app_entities_country_country_reducer__WEBPACK_IMPORTED_MODULE_13__["default"],
    location: app_entities_location_location_reducer__WEBPACK_IMPORTED_MODULE_14__["default"],
    department: app_entities_department_department_reducer__WEBPACK_IMPORTED_MODULE_15__["default"],
    banco: app_entities_banco_banco_reducer__WEBPACK_IMPORTED_MODULE_16__["default"],
    creditDetalle: app_entities_credit_detalle_credit_detalle_reducer__WEBPACK_IMPORTED_MODULE_17__["default"],
    credit: app_entities_credit_credit_reducer__WEBPACK_IMPORTED_MODULE_18__["default"],
    cliente: app_entities_cliente_cliente_reducer__WEBPACK_IMPORTED_MODULE_19__["default"],
    recaudador: app_entities_recaudador_recaudador_reducer__WEBPACK_IMPORTED_MODULE_20__["default"],
    recaudadorDetalle: app_entities_recaudador_detalle_recaudador_detalle_reducer__WEBPACK_IMPORTED_MODULE_21__["default"], token: app_entities_token_token_reducer__WEBPACK_IMPORTED_MODULE_22__["default"], transferencia: app_entities_transferencia_transferencia_reducer__WEBPACK_IMPORTED_MODULE_23__["default"],
    /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
    loadingBar: react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__["loadingBarReducer"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\index.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/locale.ts":
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/locale.ts ***!
  \*******************************************************/
/*! exports provided: ACTION_TYPES, default, setLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return setLocale; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
var _this = undefined;



var ACTION_TYPES = {
    SET_LOCALE: 'locale/SET_LOCALE'
};
var initialState = {
    currentLocale: undefined
};
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ACTION_TYPES.SET_LOCALE:
            var currentLocale = action.locale;
            if (state.currentLocale !== currentLocale) {
                react_jhipster__WEBPACK_IMPORTED_MODULE_2__["TranslatorContext"].setLocale(currentLocale);
            }
            return {
                currentLocale: currentLocale
            };
        default:
            return state;
    }
});
var setLocale = function (locale) { return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
    var response;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!Object.keys(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["TranslatorContext"].context.translations).includes(locale)) return [3 /*break*/, 2];
                return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("i18n/" + locale + ".json?buildTimestamp=" + '1572440825613', { baseURL: '' })];
            case 1:
                response = _a.sent();
                react_jhipster__WEBPACK_IMPORTED_MODULE_2__["TranslatorContext"].registerTranslations(locale, response.data);
                _a.label = 2;
            case 2:
                dispatch({
                    type: ACTION_TYPES.SET_LOCALE,
                    locale: locale
                });
                return [2 /*return*/];
        }
    });
}); }; };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\locale.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\reducers\\locale.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/util/date-utils.ts":
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/shared/util/date-utils.ts ***!
  \*******************************************************/
/*! exports provided: convertDateTimeFromServer, convertDateTimeToServer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDateTimeFromServer", function() { return convertDateTimeFromServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDateTimeToServer", function() { return convertDateTimeToServer; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");


var convertDateTimeFromServer = function (date) { return (date ? moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(app_config_constants__WEBPACK_IMPORTED_MODULE_1__["APP_LOCAL_DATETIME_FORMAT"]) : null); };
var convertDateTimeToServer = function (date) { return (date ? moment__WEBPACK_IMPORTED_MODULE_0___default()(date, app_config_constants__WEBPACK_IMPORTED_MODULE_1__["APP_LOCAL_DATETIME_FORMAT_Z"]).toDate() : null); };


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\date-utils.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\date-utils.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/util/entity-utils.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/shared/util/entity-utils.ts ***!
  \*********************************************************/
/*! exports provided: cleanEntity, mapIdList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntity", function() { return cleanEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapIdList", function() { return mapIdList; });
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/pick */ "./node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
var cleanEntity = function (entity) {
    var keysToKeep = Object.keys(entity).filter(function (k) { return !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1); });
    return lodash_pick__WEBPACK_IMPORTED_MODULE_0___default()(entity, keysToKeep);
};
/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
var mapIdList = function (idList) {
    return idList.filter(function (entityId) { return entityId !== ''; }).map(function (entityId) { return ({ id: entityId }); });
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\entity-utils.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\entity-utils.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/shared/util/pagination.constants.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/util/pagination.constants.ts ***!
  \*****************************************************************/
/*! exports provided: ITEMS_PER_PAGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEMS_PER_PAGE", function() { return ITEMS_PER_PAGE; });
var ITEMS_PER_PAGE = 20;


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\pagination.constants.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "E:\\Proyectos\\JHipster\\sico\\src\\main\\webapp\\app\\shared\\util\\pagination.constants.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/static/images/jhipster_family_member_2.svg":
/*!********************************************************************!*\
  !*** ./src/main/webapp/static/images/jhipster_family_member_2.svg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "content/4335d5f923e59343903e1b055ef4570c.svg";

/***/ }),

/***/ 0:
/*!**********************************************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:9060 (webpack)/hot/dev-server.js react-hot-loader/patch ./src/main/webapp/app/index ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Proyectos\JHipster\sico\node_modules\webpack-dev-server\client\index.js?http://localhost:9060 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9060");
__webpack_require__(/*! E:\Proyectos\JHipster\sico\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! react-hot-loader/patch */"./node_modules/react-hot-loader/patch.js");
module.exports = __webpack_require__(/*! ./src/main/webapp/app/index */"./src/main/webapp/app/index.tsx");


/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!***********************!*\
  !*** chalk (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map