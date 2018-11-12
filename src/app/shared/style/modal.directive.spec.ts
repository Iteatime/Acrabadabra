import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalDirective } from './modal.directive';
@Component({
  template: `<div class="modal show" aria-label="Close" [toggled]="showModal" (close)="onModalClose()">`
})
class TestModalDirectiveComponent {
}

describe('ModalDirective', () => {

  let directive: ModalDirective;
  let component: TestModalDirectiveComponent;
  let fixture: ComponentFixture<TestModalDirectiveComponent>;
  let modalElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestModalDirectiveComponent, ModalDirective]
    });
    fixture = TestBed.createComponent(TestModalDirectiveComponent);
    component = fixture.componentInstance;

    modalElement = fixture.debugElement.query(By.css('.modal'));
    directive = new ModalDirective(modalElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
