import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, fromEvent, take, takeWhile } from 'rxjs';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective {
  public grabber = false;
  public rectOld: any;
  public origin: any;
  public div: any;

  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    if (event.target.className !== 'cell-left-border') {
      return;
    }
    this.div = (event.target as any).parentElement;
    this.grabber = true;
    this.rectOld = this.div.getBoundingClientRect();
    this.origin = { x: event.screenX, y: event.screenY };
  }

  @HostListener('mouseup') onMouseUp() {
    this.grabber = false;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    if (!this.grabber) {
      return;
    }
    const incrTop = event.screenX - this.origin.x;
    const width = this.rectOld.width + incrTop;

    this.div.style.width = (width < 150 ? 150 : width) + 'px';
  }
}
