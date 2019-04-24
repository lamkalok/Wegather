import { Component } from '@angular/core';

import { SponserPage } from '../sponser/sponser';
import { HomePage } from '../home/home';
import { MessagesPage } from '../messages/messages';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = SponserPage;
  tab4Root = UserPage;

  constructor() {

  }
}
