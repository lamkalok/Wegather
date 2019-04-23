import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { PluginServiceProvider } from '../../providers/plugin-service/plugin-service';

/**
 * Generated class for the PluginListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plugin-list',
  templateUrl: 'plugin-list.html',
})
export class PluginListPage {

  ownedPlugins = [];
  avaliablePlugins = [];
  groupID: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,
    public pluginServiceProvider: PluginServiceProvider
    ) {
      this.groupID = this.navParams.data;
      console.log(this.groupID);
      this.pluginServiceProvider.getPlugins().then(pluginArray => {
        pluginArray.forEach(plugin => {
          console.log("plugin", plugin);
          if(plugin.purchasedGroups.includes(this.groupID)) {
            plugin.isOwned = true;
            this.ownedPlugins.push(plugin);
          } else {
            plugin.isOwned = false;
            this.avaliablePlugins.push(plugin);
          }
        })
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PluginListPage');
  }

  viewPluginDetail(plugin) {
    var data = {
      plugin: plugin,
      groupID: this.groupID
    }
    this.navCtrl.push("PluginDetailPage", data);
  }

}
