import { Directive, HostListener, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Directive({
  selector: '[appKeyup]'
})
export class KeyupDirective implements OnInit {

  @Output() debounceKeyup = new EventEmitter();
  private keyups = new Subject();
  private subscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    this.subscription = this.keyups.pipe(
      debounceTime(1000)
    ).subscribe(e => this.debounceKeyup.emit(e));
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  keyUpEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Key Up from Host Element!');
    this.keyups.next(event);
  }

}