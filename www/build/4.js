webpackJsonp([4],{

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDetailPageModule", function() { return MessageDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_detail__ = __webpack_require__(544);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MessageDetailPageModule = /** @class */ (function () {
    function MessageDetailPageModule() {
    }
    MessageDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__message_detail__["a" /* MessageDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__message_detail__["a" /* MessageDetailPage */]),
            ],
        })
    ], MessageDetailPageModule);
    return MessageDetailPageModule;
}());

//# sourceMappingURL=message-detail.module.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDetailPage; });
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
 * Generated class for the MessageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessageDetailPage = /** @class */ (function () {
    function MessageDetailPage(navCtrl, navParams, authServiceProvider, userServiceProvider, chatServiceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.chatServiceProvider = chatServiceProvider;
        this.messages = [];
        this.target = this.navParams.data;
        this.uid = this.authServiceProvider.getLoggedUID();
        // console.log(this.target);
        // console.log(this.authServiceProvider.userData);
        try {
            this.chatServiceProvider.checkChatBeforeRealTime(this.target.uid, this.authServiceProvider.getLoggedUID()).then(function (user_event) {
                user_event.subscribe(function (user_data) {
                    console.log(user_data.payload.data());
                    var payload_data = user_data.payload.data();
                    var chats = payload_data.chats;
                    var result = null;
                    chats.forEach(function (element) {
                        console.log(element);
                        if (element.target_id == _this.target.uid) {
                            result = element.id;
                        }
                    });
                    if (result == null) {
                        _this.isChated = false;
                    }
                    else {
                        _this.isChated = true;
                        _this.chat_id = result;
                        _this.chatServiceProvider.getChatMessages(_this.chat_id).then(function (cm) {
                            // console.log(cm);
                            _this.chat_messages = cm;
                            _this.chat_messages.subscribe(function (data) {
                                //this.messages = [];
                                // console.log(data);
                                data.messages.forEach(function (element) {
                                    _this.chatServiceProvider.getMessages(element).then(function (m) {
                                        // console.log(m);
                                        m.date = m.timestamp.toDate().toDateString();
                                        var updated = false;
                                        for (var i = 0; i < _this.messages.length; i++) {
                                            if (_this.messages[i].id == m.id) {
                                                _this.messages.splice(i, 1, m);
                                                updated = true;
                                                break;
                                            }
                                        }
                                        if (!updated)
                                            _this.messages.push(m);
                                        console.log(_this.messages);
                                    });
                                });
                            });
                        });
                    }
                }); // end user subscribe
            });
            // this.chatServiceProvider.checkChatBefore(this.target.uid, this.authServiceProvider.getLoggedUID()).then(result => {
            //   // console.log(result);
            // });
        }
        catch (error) {
        }
    }
    MessageDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessageDetailPage');
    };
    MessageDetailPage.prototype.sendMsg = function () {
        var _this = this;
        var user = this.authServiceProvider.userData;
        // console.log(this.isChated);
        if (this.isChated == false) {
            // console.log(this.msg_content);
            this.chatServiceProvider.createChat(this.target, user).then(function (chat_id) {
                console.log(chat_id);
                _this.chatServiceProvider.setUserChats(chat_id, _this.target.uid, _this.authServiceProvider.getLoggedUID()).then(function () {
                    console.log("After setUserChats");
                    _this.chatServiceProvider.createMessage(_this.target, user, chat_id, _this.msg_content).then(function () {
                        _this.msg_content = "";
                    });
                });
            });
        }
        else {
            this.chatServiceProvider.createMessage(this.target, user, this.chat_id, this.msg_content);
        }
        this.msg_content = "";
    };
    MessageDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-message-detail',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/message-detail/message-detail.html"*/'<!--\n  Generated template for the MessageDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{target.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list no-lines>\n      <div *ngFor="let message of messages"> \n          <ion-item *ngIf="message.sender.uid != uid">\n              <ion-avatar item-start>\n                  <img src="{{message.sender.img}}">\n                </ion-avatar>\n                <h2>{{message.content}}<span class="greyFont small" padding-left>{{message.date}}</span></h2>\n         \n        </ion-item>\n        <ion-item *ngIf="message.sender.uid == uid">\n            <h2 item-end>{{message.content}}<span class="greyFont small" padding-left>{{message.date}}</span></h2>\n            <ion-avatar item-end>\n                <img src="{{message.sender.img}}">\n            </ion-avatar>\n         \n        </ion-item>\n      </div>       \n\n      </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-item>\n    <ion-textarea placeholder="text here" [(ngModel)]="msg_content"></ion-textarea>\n    <button ion-button clear icon-only item-end (click)="sendMsg()">\n      <ion-icon name="ios-send" ios="ios-send" md="md-send" id="send"></ion-icon>\n    </button>\n  </ion-item>\n</ion-footer>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/message-detail/message-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_chat_service_chat_service__["a" /* ChatServiceProvider */]])
    ], MessageDetailPage);
    return MessageDetailPage;
}());

//# sourceMappingURL=message-detail.js.map

/***/ })

});
//# sourceMappingURL=4.js.map