import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { Observable } from 'rxjs';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  chats_messages_data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public chatServiceProvider: ChatServiceProvider,
  ) {
    
    this.userServiceProvider.getUserRealTime(this.authServiceProvider.getLoggedUID()).then((user_snapshot)=>{
      user_snapshot.subscribe((user_event_data)=>{
        this.chats_messages_data = [];
        console.log(user_event_data.payload.data());
        var user_data:any = user_event_data.payload.data();
        var chats = user_data.chats;
        if (chats != undefined) {
          chats.forEach(chat_element => {
            console.log(chat_element);
            this.chatServiceProvider.getChats(chat_element.id).then((chat_snapshot) => {
              chat_snapshot.subscribe((chat_event_data) => {
                
                var char_data: any = chat_event_data.payload.data();
                console.log(char_data);
                char_data.chatUserInfo.forEach(cui => {
                  if (cui.uid != this.authServiceProvider.getLoggedUID()) {
                    var messages = char_data.messages;
                    console.log(messages.length);
                    console.log(messages[messages.length-1]);
                    this.chatServiceProvider.getMessages(messages[messages.length-1]).then(message_data=>{
                      var chats_list_data = {
                        chat_id: chat_element.id,
                        target_info: cui,
                        last_message: message_data
                      }
                      var updated = false;
                      for (var i = 0; i < this.chats_messages_data.length; i++) {
                        if (this.chats_messages_data[i].chat_id == chat_element.id) {
                          this.chats_messages_data.splice(i, 1, chats_list_data);
                          updated = true;
                          break;
                        }
                      }
                      if(!updated)
                        this.chats_messages_data.push(chats_list_data);         
                      console.log(this.chats_messages_data);
                    });
                  }
                });
              })
            });
          });
        }
      });
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  startChat(member){
    this.navCtrl.push('MessageDetailPage', member);
  }

}
