import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { Observable } from 'rxjs';

/**
 * Generated class for the MessageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  target: any;
  isChated: boolean;
  msg_content: string;
  chat_id: string;
  uid: string;
  messages = [];
  chat_messages: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public chatServiceProvider: ChatServiceProvider,
    public shareServiceProvider: ShareServiceProvider
  ) {
    this.target = this.navParams.data;
    this.uid = this.authServiceProvider.getLoggedUID();
    // console.log(this.target);
    // console.log(this.authServiceProvider.userData);

    try {

      
      this.chatServiceProvider.checkChatBeforeRealTime(this.target.uid, this.authServiceProvider.getLoggedUID()).then(user_event => {
        user_event.subscribe(user_data => {
          console.log(user_data.payload.data());
          var payload_data: any = user_data.payload.data();
          var chats = payload_data.chats;
          var result = null;
          chats.forEach(element => {
            console.log(element);
            if (element.target_id == this.target.uid) {
              result = element.id;
            }
          });
          if (result == null) {
            this.isChated = false;
          } else {
            this.isChated = true;
            this.chat_id = result;
            this.chatServiceProvider.getChatMessages(this.chat_id).then((cm) => {
              // console.log(cm);
              this.chat_messages = cm;
              this.chat_messages.subscribe(data => {
                //this.messages = [];
                // console.log(data);
                data.messages.forEach(element => {
                  this.chatServiceProvider.getMessages(element).then(m => {
                    // console.log(m);
                    m.date = m.timestamp.toDate().toDateString();
                    var updated = false;
                    for (var i = 0; i < this.messages.length; i++) {
                      if (this.messages[i].id == m.id) {
                        this.messages.splice(i, 1, m);
                        updated = true;
                        break;
                      }
                    }
                    if (!updated)
                      this.messages.push(m);
                    console.log(this.messages);
                  })
                })
              })
            })

          }

        }) // end user subscribe
      });

      // this.chatServiceProvider.checkChatBefore(this.target.uid, this.authServiceProvider.getLoggedUID()).then(result => {
      //   // console.log(result);

      // });
    } catch (error) {

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');

  }

  async sendMsg() {
    this.shareServiceProvider.showToast("Sending message...");
    var user = this.authServiceProvider.userData;
    console.log(this.isChated);
    if (this.isChated == false) {

      // console.log(this.msg_content);
      var chat_id = await this.chatServiceProvider.createChat(this.target, user).then((chat_id) => {
        console.log("create_chat" , chat_id);
        return chat_id
      });
      await this.chatServiceProvider.createMessage(this.target, user, chat_id, this.msg_content).then(()=>{
        
      });
      this.chatServiceProvider.setUserChats(chat_id, this.target.uid, this.authServiceProvider.getLoggedUID()).then(() => {
        console.log("After setUserChats");
        this.msg_content = "";
      });
    } else {
      this.chatServiceProvider.createMessage(this.target, user, this.chat_id, this.msg_content);
      this.msg_content = "";
    }

  }

}
