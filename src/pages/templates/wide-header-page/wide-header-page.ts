import { Component, Input, ViewChild } from '@angular/core';
import { Content, IonicPage, Navbar } from 'ionic-angular';
import { PlatformProvider } from '../../../providers/platform/platform';
@IonicPage()
@Component({
  selector: 'wide-header-page',
  templateUrl: 'wide-header-page.html'
})
export class WideHeaderPage {
  @Input()
  headerColor: string;

  @Input()
  title: string;

  @Input()
  hideBackButton: boolean;

  @ViewChild(Navbar)
  navBar: Navbar;

  @ViewChild(Content)
  scrollArea: Content;

  constructor(public platformProvider: PlatformProvider) {}
}
