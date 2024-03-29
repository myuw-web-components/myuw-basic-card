import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'myuw-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BasicCardComponent {
  MAINTENANCE_LIFECYCLE = "MAINTENANCE"
  @Input() title: string; // Card title
  @Input() uid: string; // Unique name of the card frame
  @Input() faIcon: string;
  @Input() mdIcon: string;
  @Input() buttonText: string;
  @Input() url: string;

  /**
   * Set the SVG Icon URL and call the create custom icon function.
   */
  @Input("svgIcon")
  set svgIcon(url) {
    this.svgIconUrl = url;
    this.createCustomIcon(url);
  }

  public svgIconUrl;

  @Output() deleteCardNotify = new EventEmitter<string>();

  constructor(
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  /**
   * Notify the page using the web component that the user clicked the delete button.
   */
  handleCardDelete() {
    this.deleteCardNotify.emit(this.uid);
  }

  /**
   * When launch buton is clicked if external link open in new tab, if relative
   * link then open in same tab.
   */
  handleButtonClick() {
    var reg = new RegExp('^http(s)?');
    if(reg.test(this.url)) {
      window.open(this.url, "_blank");
    } else {
      this.document.location.href = this.url;
    }
  }

  /**
    * Go to given link when card is clicked. If url starts with http(s) open
    * link in new tab.
   */
  handleCardClick() {
    var reg = new RegExp('^http(s)?');
    if(reg.test(this.url)) {
      window.open(this.url, "_blank");
    } else {
      this.document.location.href = this.url;
    }
  }

  /**
   * Create a custom SVG Icon with the name "customSvgIcon".
   * @param url The relative URL to the SVG icon.
   */
  createCustomIcon(url) {
    this.matIconRegistry.addSvgIcon(
      "customSvgIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
