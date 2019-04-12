webpackJsonp([11],{

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Messenger" tabIcon="chatbubbles"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Notifications" tabIcon="notifications"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="User" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_chat_service_chat_service__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessagesPage = /** @class */ (function () {
    function MessagesPage(navCtrl, navParams, authServiceProvider, userServiceProvider, chatServiceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.chatServiceProvider = chatServiceProvider;
        this.chats_messages_data = [];
        this.userServiceProvider.getUserRealTime(this.authServiceProvider.getLoggedUID()).then(function (user_snapshot) {
            user_snapshot.subscribe(function (user_event_data) {
                _this.chats_messages_data = [];
                console.log(user_event_data.payload.data());
                var user_data = user_event_data.payload.data();
                var chats = user_data.chats;
                if (chats != undefined) {
                    chats.forEach(function (chat_element) {
                        console.log(chat_element);
                        _this.chatServiceProvider.getChats(chat_element.id).then(function (chat_snapshot) {
                            chat_snapshot.subscribe(function (chat_event_data) {
                                var char_data = chat_event_data.payload.data();
                                console.log(char_data);
                                char_data.chatUserInfo.forEach(function (cui) {
                                    if (cui.uid != _this.authServiceProvider.getLoggedUID()) {
                                        var messages = char_data.messages;
                                        console.log(messages.length);
                                        console.log(messages[messages.length - 1]);
                                        _this.chatServiceProvider.getMessages(messages[messages.length - 1]).then(function (message_data) {
                                            var chats_list_data = {
                                                chat_id: chat_element.id,
                                                target_info: cui,
                                                last_message: message_data
                                            };
                                            var updated = false;
                                            for (var i = 0; i < _this.chats_messages_data.length; i++) {
                                                if (_this.chats_messages_data[i].chat_id == chat_element.id) {
                                                    _this.chats_messages_data.splice(i, 1, chats_list_data);
                                                    updated = true;
                                                    break;
                                                }
                                            }
                                            if (!updated)
                                                _this.chats_messages_data.push(chats_list_data);
                                            console.log(_this.chats_messages_data);
                                        });
                                    }
                                });
                            });
                        });
                    });
                }
            });
        });
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagesPage');
    };
    MessagesPage.prototype.startChat = function (member) {
        this.navCtrl.push('MessageDetailPage', member);
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/messages/messages.html"*/'<!--\n  Generated template for the MessagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Messages</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let chat_data of chats_messages_data" >\n          <ion-avatar item-start>\n            <img src="{{chat_data.target_info.img}}">\n          </ion-avatar>\n          <h2>{{chat_data.target_info.name}}</h2>\n          <p>{{chat_data.last_message.content}}</p>\n          <ion-icon name="chatbubbles" item-end (click)="startChat(chat_data.target_info)"></ion-icon>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/messages/messages.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_chat_service_chat_service__["a" /* ChatServiceProvider */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_database__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChatServiceProvider = /** @class */ (function () {
    function ChatServiceProvider(afd, fireStore, fireStorage, authServiceProvider) {
        this.afd = afd;
        this.fireStore = fireStore;
        this.fireStorage = fireStorage;
        this.authServiceProvider = authServiceProvider;
        console.log('Hello ChatServiceProvider Provider');
    }
    ChatServiceProvider.prototype.checkChatBefore = function (target_uid, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var result, userRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        userRef = this.fireStore.firestore.collection("Users").doc(uid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRef.get().then(function (doc) {
                                if (doc.data().chats == undefined) {
                                    console.log("isUndef");
                                    return result;
                                }
                                else {
                                    var chats = doc.data().chats;
                                    chats.forEach(function (element) {
                                        console.log(element);
                                        if (element.target_id == target_uid) {
                                            result = element.id;
                                        }
                                    });
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatServiceProvider.prototype.checkChatBeforeRealTime = function (target_uid, uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.doc('Users/' + uid).snapshotChanges()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatServiceProvider.prototype.createChat = function (target, user) {
        return __awaiter(this, void 0, void 0, function () {
            var doc_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(target);
                        console.log(user);
                        return [4 /*yield*/, this.fireStore.firestore.collection("Chats").add({
                                chatUserInfo: [target, user],
                                messages: []
                            })
                                .then(function (docRef) {
                                console.log("Document written with ID: ", docRef.id);
                                doc_id = docRef.id;
                            })
                                .catch(function (error) {
                                console.error("Error adding document: ", error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc_id];
                }
            });
        });
    };
    ChatServiceProvider.prototype.setUserChats = function (chatID, target_id, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRef = this.fireStore.firestore.collection("Users").doc(uid);
                        // User side
                        return [4 /*yield*/, userRef.get().then(function (doc) {
                                if (doc.data().chats == undefined) {
                                    console.log("user isUndef");
                                    userRef.set({ chats: [{ id: chatID, target_id: target_id }] }, { merge: true });
                                }
                                else {
                                    var chats = doc.data().chats;
                                    chats.push({ id: chatID, target_id: target_id });
                                    userRef.update({
                                        chats: chats
                                    });
                                }
                            })
                                .then(function () {
                                var userRef = _this.fireStore.firestore.collection("Users").doc(target_id);
                                userRef.get().then(function (doc) {
                                    if (doc.data().chats == undefined) {
                                        console.log("target isUndef");
                                        userRef.set({ chats: [{ id: chatID, target_id: uid }] }, { merge: true });
                                    }
                                    else {
                                        var chats = doc.data().chats;
                                        chats.push({ id: chatID, target_id: uid });
                                        userRef.update({
                                            chats: chats
                                        });
                                    }
                                });
                            })];
                    case 1:
                        // User side
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatServiceProvider.prototype.createMessage = function (target, user, chat_id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatRef = this.fireStore.firestore.collection("Chats").doc(chat_id);
                        return [4 /*yield*/, this.fireStore.firestore.collection("Messages").add({
                                content: content,
                                sender: user,
                                receiver: target,
                                timestamp: new Date()
                            }).then(function (docRef) {
                                console.log("Create message successfully: " + docRef.id);
                                chatRef.get().then(function (doc) {
                                    var messages = doc.data().messages;
                                    console.log(doc.data());
                                    messages.push(docRef.id);
                                    console.log(messages);
                                    chatRef.update({
                                        messages: messages
                                    });
                                });
                            })
                                .catch(function (error) {
                                console.error("Error adding document: ", error);
                            })];
                    case 1:
                        _a.sent();
                        ;
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatServiceProvider.prototype.getChatMessages = function (chat_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // return await this.fireStore.firestore.collection("Chats").doc(chat_id).collection("Messages").doc()
                // .onSnapshot(function(querySnapshot) {
                //     console.log("Current data: ", querySnapshot.data());
                // });
                return [2 /*return*/, this.fireStore.doc('Chats/' + chat_id).valueChanges()];
            });
        });
    };
    ChatServiceProvider.prototype.getChats = function (chat_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.doc('Chats/' + chat_id).snapshotChanges()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatServiceProvider.prototype.getMessages = function (message_id) {
        return __awaiter(this, void 0, void 0, function () {
            var docData, messageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageRef = this.fireStore.firestore.collection("Messages").doc(message_id);
                        return [4 /*yield*/, messageRef.get().then(function (doc) {
                                //console.log(doc.data());
                                docData = doc.data();
                                docData.id = doc.id;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, docData];
                }
            });
        });
    };
    ChatServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], ChatServiceProvider);
    return ChatServiceProvider;
}());

//# sourceMappingURL=chat-service.js.map

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-event/create-event.module": [
		529,
		8
	],
	"../pages/event-detail/event-detail.module": [
		530,
		7
	],
	"../pages/group-add/group-add.module": [
		531,
		6
	],
	"../pages/group-detail/group-detail.module": [
		532,
		5
	],
	"../pages/message-detail/message-detail.module": [
		533,
		4
	],
	"../pages/messages/messages.module": [
		536,
		10
	],
	"../pages/register-select-categories/register-select-categories.module": [
		534,
		3
	],
	"../pages/register-select-groups/register-select-groups.module": [
		535,
		2
	],
	"../pages/register/register.module": [
		537,
		1
	],
	"../pages/user/user.module": [
		538,
		9
	],
	"../pages/users-list/users-list.module": [
		539,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 249;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider) {
        // this.authServiceProvider.login("17200083@life.hkbu.edu.hk", "aaaa1111").then((currentUser)=>{
        //   this.init();
        //   this.userImg = this.authServiceProvider.userData.img;
        // });
        this.navCtrl = navCtrl;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.groups = [];
        this.init();
        this.userImg = this.authServiceProvider.userData.img;
        /** Old method -> not real time */
        // this.groupServiceProvider.getUserJoindedGroups(this.authServiceProvider.userData.joinedGroups).then((data)=>{
        //   //console.log(data);
        //   this.groups = data;
        // });
    }
    HomePage.prototype.init = function () {
        var _this = this;
        try {
            this.userServiceProvider.getUserJoinedGroupRealTime(this.authServiceProvider.getLoggedUID()).then(function (ubs) {
                ubs.subscribe(function (uwt) {
                    var userData = uwt.payload.data();
                    //console.log(userData.joinedGroups);
                    userData.joinedGroups.forEach(function (groupID) {
                        _this.groups = [];
                        console.log(groupID);
                        _this.groupServiceProvider.getUserJoinedGroupsRealTime(groupID).then(function (gbs) {
                            gbs.subscribe(function (gwt) {
                                console.log(gwt.payload.data());
                                var g = gwt.payload.data();
                                g.id = gwt.payload.id;
                                if (g.eventsSnapshot != undefined) {
                                    if (g.eventsSnapshot.length > 0) {
                                        g.eventsSnapshot.forEach(function (eventsSp) {
                                            eventsSp.date_from = eventsSp.date_from.toDate();
                                        });
                                    }
                                }
                                // check new updated element add to groups
                                var updated = false;
                                for (var i = 0; i < _this.groups.length; i++) {
                                    if (_this.groups[i].id == g.id) {
                                        _this.groups.splice(i, 1, g);
                                        updated = true;
                                        break;
                                    }
                                }
                                if (!updated)
                                    _this.groups.push(g);
                            });
                        });
                    });
                });
            }).then(function () {
                //this.groups.ev.sortBy(function(o){ return new Date( o.date ) });
            });
        }
        catch (error) {
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.createNewGroup = function () {
        this.navCtrl.push('GroupAddPage');
    };
    HomePage.prototype.joinNewGroup = function () {
        this.navCtrl.push('RegisterSelectCategoriesPage');
    };
    HomePage.prototype.groupDetail = function (group) {
        this.navCtrl.push('GroupDetailPage', group);
    };
    HomePage.prototype.eventDetail = function (event) {
        this.navCtrl.push('EventDetailPage', event);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar >\n    <ion-title>Home</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-start class="avatar_holder" >\n            <ion-avatar>\n                <img src="{{userImg}}">\n              </ion-avatar>\n          </button>\n        </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding >\n  <div>\n    <h3 style="display: inline;">Your groups</h3>\n    <span class="greyFont" style="float:right; padding-top:10px;" (click)="joinNewGroup()">+ Join new group</span>\n  </div>\n\n  \n  <ion-scroll scrollX="true" style="white-space: nowrap; height: 200px;" class="card-background-page" >\n    <div class="scroll-item" *ngFor="let group of groups">\n        <ion-card (click)="groupDetail(group)">\n          <img src="{{group.img}}">\n          <div class="card-title">{{group.id}}</div>\n          </ion-card>\n    </div>\n  </ion-scroll>\n  \n  <h3>Upcoming Events</h3>\n<div *ngFor="let group of groups">\n    <ion-card class="adv-map" *ngFor="let event of group.eventsSnapshot">\n        <div style="position: relative" (click)="eventDetail(event)">\n          <img src="{{event.img}}">\n          <ion-fab right top>\n            <button ion-fab class="fab-map">\n              <ion-icon name=\'pin\'></ion-icon>\n            </button>\n          </ion-fab>\n        </div>\n        <ion-item>\n          <h2 padding-top>{{event.id}}</h2>\n          <p text-wrap>{{event.description}}</p>\n        </ion-item>\n       \n        <ion-item actions>\n          <ion-note item-start class="item-bold">{{event.date_from | date: \'fullDate\'}}</ion-note>\n          \n        </ion-item>\n      </ion-card>\n</div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.authServiceProvider.logout();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push('RegisterSelectCategoriesPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.email == null || this.password == null) {
            this.shareServiceProvider.showAlert("Please enter email and password");
        }
        else {
            this.authServiceProvider.login(this.email, this.password).then(function (currentUser) {
                console.log(_this.authServiceProvider.isLoggedIn());
                console.log(_this.authServiceProvider.userData);
                if (_this.authServiceProvider.isLoggedIn()) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                    _this.navCtrl.popToRoot();
                }
            });
        }
    };
    // Fast login function for debugging
    LoginPage.prototype.initLogin = function () {
        var _this = this;
        this.authServiceProvider.login("17200083@life.hkbu.edu.hk", "aaaa1111").then(function (currentUser) {
            if (_this.authServiceProvider.isLoggedIn()) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                _this.navCtrl.popToRoot();
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Welcome to Wegather</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <img src="../../assets/imgs/wegather_logo.png">\n  <div>\n    <form #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input [(ngModel)]="email" type="text" placeholder="Email" name="email" required></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input [(ngModel)]="password" type="password" placeholder="Password" name="password" required></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button block color="skyblue" outline (click)="login()">Login</button>\n          <button ion-button block color="skyblue" outline (click)="initLogin()">Init Login</button>\n          <button ion-button block color="skyblue" outline (click)="createAccount()">Create New Account</button>\n          <button ion-button block color="orange" clear (click)="resetPassword()">Reset Password</button>\n        </ion-col>\n      </ion-row>\n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_database__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EventServiceProvider = /** @class */ (function () {
    function EventServiceProvider(afd, fireStore, fireStorage, authServiceProvider) {
        this.afd = afd;
        this.fireStore = fireStore;
        this.fireStorage = fireStorage;
        this.authServiceProvider = authServiceProvider;
        console.log('Hello EventServiceProvider Provider');
    }
    EventServiceProvider.prototype.uploadEventImage = function (imagesString, eventName, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef, ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageRef = this.fireStorage.ref('Events/' + uid + eventName);
                        return [4 /*yield*/, storageRef.putString(imagesString, 'data_url')];
                    case 1:
                        _a.sent();
                        ref = this.fireStorage.ref('Events/' + uid + eventName);
                        return [2 /*return*/, ref.getDownloadURL()];
                }
            });
        });
    };
    EventServiceProvider.prototype.downloadingFiles = function (eventName, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            return __generator(this, function (_a) {
                ref = this.fireStorage.ref('Events/' + uid + eventName);
                return [2 /*return*/, ref.getDownloadURL()];
            });
        });
    };
    EventServiceProvider.prototype.createEvent = function (event, uid, groupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.collection('Events').doc(event.name).set({
                            attendedMembers: [uid],
                            comments: [],
                            date_from: new Date(event.dateStarts),
                            date_to: new Date(event.dateEnd),
                            description: event.description,
                            groupID: groupID,
                            img: event.img,
                            location: event.location,
                            organizerID: uid,
                            photos: []
                        })
                            .then(function () {
                            console.log("User successfully Created");
                        })
                            .catch(function (error) {
                            console.error("Error create user: ", error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventServiceProvider.prototype.createEventSnapShot = function (event, uid, groupID) {
        return __awaiter(this, void 0, void 0, function () {
            var ess, groupRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ess = {
                            date_from: new Date(event.dateStarts),
                            date_to: new Date(event.dateEnd),
                            description: event.description,
                            id: event.name,
                            img: event.img
                        };
                        groupRef = this.fireStore.firestore.collection("Groups").doc(groupID);
                        return [4 /*yield*/, groupRef.get().then(function (doc) {
                                if (doc.exists) {
                                    var data = doc.data();
                                    console.log(data);
                                    console.log(ess);
                                    var eventsSnapshot = data.eventsSnapshot;
                                    eventsSnapshot.push(ess);
                                    groupRef.update({
                                        eventsSnapshot: eventsSnapshot
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventServiceProvider.prototype.getEvent = function (eventID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(eventID);
                this.obs = this.fireStore.doc('Events/' + eventID).valueChanges();
                this.obs.subscribe(function (evt) {
                    console.log(evt);
                });
                return [2 /*return*/, this.obs];
            });
        });
    };
    EventServiceProvider.prototype.addMemeberToEvent = function (user, joinEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var eventRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventRef = this.fireStore.firestore.collection("Events").doc(joinEvent);
                        return [4 /*yield*/, eventRef.get().then(function (doc) {
                                if (doc.exists) {
                                    var data = doc.data();
                                    var array = data.attendedMembers;
                                    array.push(user);
                                    eventRef.update({
                                        attendedMembers: array,
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventServiceProvider.prototype.removeMemberFromEvent = function (userID, joinedEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var eventRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventRef = this.fireStore.firestore.collection("Events").doc(joinedEvent);
                        return [4 /*yield*/, eventRef.get().then(function (doc) {
                                if (doc.exists) {
                                    var data = doc.data();
                                    var array = data.attendedMembers;
                                    var position = array.indexOf(userID);
                                    if (~position)
                                        array.splice(position, 1);
                                    eventRef.update({
                                        attendedMembers: array,
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], EventServiceProvider);
    return EventServiceProvider;
}());

//# sourceMappingURL=event-service.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserPage = /** @class */ (function () {
    function UserPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.userData = authServiceProvider.userData;
        console.log(this.userData);
    }
    UserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserPage');
    };
    UserPage.prototype.logOut = function () {
        this.authServiceProvider.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        this.navCtrl.popAll();
        window.location.reload();
        // this.navCtrl.popToRoot();
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/user/user.html"*/'<!--\n  Generated template for the UserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>User Information</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="avatar_holder">\n      <ion-avatar>\n        <img src="{{ userData.img }}">\n        <h3>\n          {{ userData.name }}\n        </h3>\n      </ion-avatar>\n  </div>\n  <br>\n  <ion-list>\n    <button ion-item (click)="viewUserDetail()">\n      <ion-icon name="person" item-start></ion-icon>\n      My Details\n    </button>\n    <button ion-item (click)="viewBooking()">\n      <ion-icon name="calendar" item-start></ion-icon>\n      My Groups\n    </button>\n    <button ion-item>\n      <ion-icon name="heart" item-start></ion-icon>\n      My Events\n    </button>\n    <button ion-item>\n      <ion-icon name="card" item-start></ion-icon>\n      My Wallet\n    </button>\n    <button ion-item>\n      <ion-icon name="settings" item-start></ion-icon>\n      Settings\n    </button>\n    <button ion-item>\n      <ion-icon name="bulb" item-start></ion-icon>\n      About\n    </button>\n    <button ion-item (click)="logOut()">\n      <ion-icon name="log-out" item-start></ion-icon>\n      Logout\n    </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/user/user.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */]) === "function" && _f || Object])
    ], UserPage);
    return UserPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(446);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(firebaseAuth, shareServiceProvider, userServiceProvider) {
        this.firebaseAuth = firebaseAuth;
        this.shareServiceProvider = shareServiceProvider;
        this.userServiceProvider = userServiceProvider;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.signup = function (email, password) {
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    };
    AuthServiceProvider.prototype.sendEmailVerification = function () {
        var _this = this;
        this.firebaseAuth.authState.subscribe(function (user) {
            user.sendEmailVerification()
                .then(function () {
                console.log('email sent');
                _this.logout();
            });
        });
    };
    AuthServiceProvider.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(function (value) {
                            console.log('Nice, it worked!');
                        })
                            .catch(function (err) {
                            console.log('Something went wrong:', err.code);
                            switch (err.code) {
                                case "auth/invalid-email":
                                    _this.shareServiceProvider.showAlert(err.message);
                                    break;
                                case "auth/user-not-found":
                                    _this.shareServiceProvider.showAlert("user not find");
                                    break;
                                case "auth/wrong-password":
                                    _this.shareServiceProvider.showAlert("worng password");
                                    break;
                                default:
                                    _this.shareServiceProvider.showAlert(err.message);
                                    break;
                            }
                        })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (!(this.firebaseAuth.auth.currentUser != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userServiceProvider.getUser(this.firebaseAuth.auth.currentUser.uid).then(function (u) {
                                console.log(u);
                                _this.userData = u;
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, this.firebaseAuth.auth.currentUser];
                }
            });
        });
    };
    AuthServiceProvider.prototype.logout = function () {
        this.userData = null;
        this.userServiceProvider.user = null;
        this.firebaseAuth.auth.signOut();
    };
    AuthServiceProvider.prototype.isLoggedIn = function () {
        if (this.firebaseAuth.auth.currentUser != null) {
            return true;
        }
        else {
            return false;
            ;
        }
    };
    AuthServiceProvider.prototype.getLoggedUID = function () {
        return this.firebaseAuth.auth.currentUser.uid;
    };
    AuthServiceProvider.prototype.getVerifyState = function () {
        return this.firebaseAuth.auth.currentUser.emailVerified;
    };
    AuthServiceProvider.prototype.recover = function (email) {
        this.firebaseAuth.auth.sendPasswordResetEmail(email);
    };
    AuthServiceProvider.prototype.currentUserInfo = function () {
        console.log(this.firebaseAuth.auth.currentUser);
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]) === "function" && _c || Object])
    ], AuthServiceProvider);
    return AuthServiceProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_user_user__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_fire__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_fire_database__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire_auth__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_group_service_group_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_fire_firestore__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_camera__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_event_service_event_service__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_chat_service_chat_service__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAECqVG3OgN2RkGG2xgYt8grTgj5kQ4VSs",
    authDomain: "wegather-dcb52.firebaseapp.com",
    databaseURL: "https://wegather-dcb52.firebaseio.com",
    projectId: "wegather-dcb52",
    storageBucket: "wegather-dcb52.appspot.com",
    messagingSenderId: "95186879284"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_fire__["a" /* AngularFireModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_fire_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_fire_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_17__angular_fire_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_fire__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create-event/create-event.module#CreateEventPageModule', name: 'CreateEventPage', segment: 'create-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-detail/event-detail.module#EventDetailPageModule', name: 'EventDetailPage', segment: 'event-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/group-add/group-add.module#GroupAddPageModule', name: 'GroupAddPage', segment: 'group-add', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/group-detail/group-detail.module#GroupDetailPageModule', name: 'GroupDetailPage', segment: 'group-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/message-detail/message-detail.module#MessageDetailPageModule', name: 'MessageDetailPage', segment: 'message-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register-select-categories/register-select-categories.module#RegisterSelectCategoriesPageModule', name: 'RegisterSelectCategoriesPage', segment: 'register-select-categories', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register-select-groups/register-select-groups.module#RegisterSelectGroupsPageModule', name: 'RegisterSelectGroupsPage', segment: 'register-select-groups', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/messages/messages.module#MessagesPageModule', name: 'MessagesPage', segment: 'messages', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user/user.module#UserPageModule', name: 'UserPage', segment: 'user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/users-list/users-list.module#UsersListPageModule', name: 'UsersListPage', segment: 'users-list', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_group_service_group_service__["a" /* GroupServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_19__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_21__providers_share_service_share_service__["a" /* ShareServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_user_service_user_service__["a" /* UserServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_event_service_event_service__["a" /* EventServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_chat_service_chat_service__["a" /* ChatServiceProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_database__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserServiceProvider = /** @class */ (function () {
    function UserServiceProvider(afd, fireStore, fireStorage) {
        this.afd = afd;
        this.fireStore = fireStore;
        this.fireStorage = fireStorage;
        console.log('Hello UserServiceProvider Provider');
    }
    UserServiceProvider.prototype.createUser = function (user, uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.user = user;
                this.fireStore.collection('Users').doc(uid).set({
                    img: user.img,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    joinedGroups: user.joinedGroups
                })
                    .then(function () {
                    console.log("User successfully Created");
                })
                    .catch(function (error) {
                    console.error("Error create user: ", error);
                });
                return [2 /*return*/];
            });
        });
    };
    UserServiceProvider.prototype.getUser = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var uData, userRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRef = this.fireStore.firestore.collection("Users").doc(uid);
                        return [4 /*yield*/, userRef.get().then(function (doc) {
                                var data = doc.data();
                                var chats = [];
                                if (doc.data().chats != undefined) {
                                    chats = doc.data().chats;
                                }
                                var u = {
                                    uid: doc.id,
                                    email: doc.data().email,
                                    img: doc.data().img,
                                    joinedGroups: doc.data().joinedGroups,
                                    name: doc.data().name,
                                    phone: doc.data().phone,
                                    chats: chats
                                };
                                uData = u;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, uData];
                }
            });
        });
    };
    UserServiceProvider.prototype.getUserRealTime = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.doc('Users/' + uid).snapshotChanges()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserServiceProvider.prototype.getUserJoinedGroupRealTime = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.doc('Users/' + uid).snapshotChanges()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserServiceProvider.prototype.addGroupToUser = function (uid, joinedGroups, auth) {
        return __awaiter(this, void 0, void 0, function () {
            var userRef;
            return __generator(this, function (_a) {
                userRef = this.fireStore.firestore.collection("Users").doc(uid);
                userRef.get().then(function (doc) {
                    var data = doc.data();
                    var array = data.joinedGroups;
                    var processed = 0;
                    joinedGroups.forEach(function (groupID) {
                        auth.userData.joinedGroups.push(groupID);
                        array.push(groupID);
                        processed++;
                        if (processed == joinedGroups.length) {
                            userRef.update({
                                joinedGroups: array,
                            });
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    UserServiceProvider.prototype.removeGroupFromUser = function (uid, groupID, auth) {
        return __awaiter(this, void 0, void 0, function () {
            var userRef;
            return __generator(this, function (_a) {
                userRef = this.fireStore.firestore.collection("Users").doc(uid);
                userRef.get().then(function (doc) {
                    var data = doc.data();
                    var array = data.joinedGroups;
                    var position = array.indexOf(groupID);
                    var positionInAuthUserData = auth.userData.joinedGroups.indexOf(groupID);
                    if (~positionInAuthUserData)
                        auth.userData.joinedGroups.splice(positionInAuthUserData, 1);
                    if (~position)
                        array.splice(position, 1);
                    userRef.update({
                        joinedGroups: array,
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    UserServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */]])
    ], UserServiceProvider);
    return UserServiceProvider;
}());

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ShareServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ShareServiceProvider = /** @class */ (function () {
    function ShareServiceProvider(loadingCtrl, toastCtrl, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
    }
    ShareServiceProvider.prototype.showLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: 'Please Wait...'
        });
        this.loader.present();
    };
    ShareServiceProvider.prototype.hideLoading = function () {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    ShareServiceProvider.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    };
    ShareServiceProvider.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    ShareServiceProvider.prototype.showConfirm = function (msg, title) {
        var confirm = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        confirm.dismiss();
                        console.log('Disagree clicked');
                        return false;
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                        return true;
                    }
                }
            ]
        });
        confirm.present();
        return false;
    };
    ShareServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ShareServiceProvider);
    return ShareServiceProvider;
}());

//# sourceMappingURL=share-service.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_database__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





/*
  Generated class for the GroupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GroupServiceProvider = /** @class */ (function () {
    function GroupServiceProvider(afd, fireStore, fireStorage, authServiceProvider) {
        this.afd = afd;
        this.fireStore = fireStore;
        this.fireStorage = fireStorage;
        this.authServiceProvider = authServiceProvider;
        this.categories = [];
        console.log('Hello GroupServiceProvider Provider');
    }
    GroupServiceProvider.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cateDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //This code can getting all doc data inside a collection
                        console.log("GroupServiceProvider getCategories");
                        this.categories = [];
                        cateDoc = this.fireStore.firestore.collection("Categories");
                        return [4 /*yield*/, cateDoc.get().then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    var data = doc.data();
                                    var cate = {
                                        name: doc.id,
                                        img: data.img,
                                        selected: false,
                                        groups: data.groups,
                                    };
                                    _this.categories.push(cate);
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.categories];
                }
            });
        });
    };
    GroupServiceProvider.prototype.getUserJoinedGroupsRealTime = function (groupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fireStore.doc('Groups/' + groupID).snapshotChanges()];
                    case 1: 
                    // var uid = this.authServiceProvider.getLoggedUID();
                    // this.userJoinedGroup = this.fireStore.doc('Users/' + uid ).valueChanges();
                    // await this.userJoinedGroup.subscribe(evt => {
                    //   console.log(evt.joinedGroups);
                    //   evt.joinedGroups.forEach(groupID => {
                    //     this.groupObserver = this.fireStore.doc('Groups/' + groupID ).snapshotChanges();
                    //     this.groupObserver.subscribe(groupEvt=>{
                    //       console.log(groupEvt.payload.data());
                    //       console.log(groupEvt.payload.id);
                    //     })
                    //   });
                    // });
                    // this.groupObserver = this.fireStore.doc('Groups/' + "新手媽媽谷" ).snapshotChanges();
                    // return this.groupObserver;
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GroupServiceProvider.prototype.getUserJoindedGroups = function (joinedGroups) {
        return __awaiter(this, void 0, void 0, function () {
            var groupData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupData = [];
                        return [4 /*yield*/, this.fireStore.firestore.collection("Groups").get().then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    // doc.data() is never undefined for query doc snapshots
                                    //console.log(doc.id, " => ", doc.data());
                                    joinedGroups.forEach(function (element) {
                                        if (element == doc.id) {
                                            try {
                                                // async () => {
                                                //   await doc.data().eventsSnapshot.forEach(element => {
                                                //     element.date = element.date.toDate();
                                                //     //console.log(element.date);
                                                //     return element;
                                                //   });
                                            }
                                            catch (error) {
                                            }
                                            var g = {
                                                id: doc.id,
                                                img: doc.data().img,
                                                numberOfMembers: doc.data().members.length,
                                                owner: doc.data().owner,
                                                members: doc.data().members,
                                                isPublic: doc.data().isPublic,
                                                shortDescription: doc.data().shortDescription,
                                                organizers: doc.data().organizers,
                                                eventsSnapshot: doc.data().eventsSnapshot,
                                            };
                                            groupData.push(g);
                                        }
                                    });
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, groupData.forEach(function (group) {
                                try {
                                    group.eventsSnapshot.forEach(function (element) {
                                        element.date_from = element.date_from.toDate();
                                        //console.log(element.date_from);
                                    });
                                }
                                catch (error) {
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, groupData];
                }
            });
        });
    };
    GroupServiceProvider.prototype.getAllGroups = function () {
        //return this.afd.list('/Groups').valueChanges();
        return this.fireStore.collection('Groups').valueChanges();
    };
    /*
    addGroup(group):boolean{
      this.afd.list('./groups').push(group).then(res => {
        console.log(res);
      });
        return true;
    }*/
    GroupServiceProvider.prototype.getGroup = function (cateName, group) {
        return __awaiter(this, void 0, void 0, function () {
            var retrunGroup, docRef, auth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retrunGroup = null;
                        docRef = this.fireStore.firestore.collection("Groups").doc(group);
                        auth = this.authServiceProvider;
                        return [4 /*yield*/, docRef.get().then(function (doc) {
                                if (doc.exists) {
                                    //console.log("Document data:", doc.data());
                                    var data = doc.data();
                                    var group = null;
                                    group = {
                                        id: doc.id,
                                        img: data.img,
                                        numberOfMembers: data.members.length,
                                        shortDescription: data.shortDescription,
                                        joined: false
                                    };
                                    // logined user get new group 
                                    if (auth.isLoggedIn()) {
                                        if (!data.members.includes(auth.getLoggedUID())) {
                                            retrunGroup = group;
                                        }
                                        else {
                                            retrunGroup = null;
                                        }
                                    }
                                    else {
                                        retrunGroup = group;
                                    }
                                }
                                else {
                                    // doc.data() will be undefined in this case
                                    console.log("No such document!");
                                }
                            }).catch(function (error) {
                                console.log("Error getting document:", error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, retrunGroup];
                }
            });
        });
    };
    GroupServiceProvider.prototype.removeGroup = function () {
    };
    // sleep time expects milliseconds
    GroupServiceProvider.prototype.sleep = function (time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    };
    GroupServiceProvider.prototype.createGroup = function (image) {
        var picture = this.fireStorage.ref('Groups/myphoto.jpg');
        picture.putString(image, 'data_url').then(function (snapshot) {
        });
        ;
    };
    GroupServiceProvider.prototype.addMemberToGroup = function (uid, joinedGroups) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, joinedGroups.forEach(function (id) {
                            var userRef = _this.fireStore.firestore.collection("Users").doc(uid);
                            var groupRef = _this.fireStore.firestore.collection("Groups").doc(id);
                            groupRef.get().then(function (doc) {
                                if (doc.exists) {
                                    console.log("Document data:", doc.data());
                                    var data = doc.data();
                                    //console.log("group: " + group);
                                    var array = data.members;
                                    array.push(uid);
                                    groupRef.update({
                                        members: array,
                                    });
                                }
                                else {
                                    // doc.data() will be undefined in this case
                                    console.log("No such document!");
                                }
                            }).catch(function (error) {
                                console.log("Error getting document:", error);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupServiceProvider.prototype.removeMebmerFromGroup = function (uid, groupID) {
        return __awaiter(this, void 0, void 0, function () {
            var groupRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupRef = this.fireStore.firestore.collection("Groups").doc(groupID);
                        return [4 /*yield*/, groupRef.get().then(function (doc) {
                                if (doc.exists) {
                                    var data = doc.data();
                                    var array = data.members;
                                    var position = array.indexOf(uid);
                                    if (~position)
                                        array.splice(position, 1);
                                    groupRef.update({
                                        members: array,
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], GroupServiceProvider);
    return GroupServiceProvider;
}());

//# sourceMappingURL=group-service.js.map

/***/ })

},[313]);
//# sourceMappingURL=main.js.map