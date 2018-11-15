import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EditCraComponent } from './edit-cra.component';

import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { formData } from 'src/app/@types/formData';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '.modal' })
class MockModalDirective {
  @Input() toggled: boolean;
}

describe('EditCraComponent', () => {
  let fixture: ComponentFixture<EditCraComponent>;
  let component: EditCraComponent;
  let compiled: any;
  let route: ActivatedRoute;
  let serializer: SerializerService;

  const testData: formData = {
    'mode': '',
    'cra': {
      'consultant': {
        'email': 'tester@test.com',
        'name': 'tester'
      },
      'mission': {
        'client': 'Test.com',
        'title': 'Testing'
      }
    }
  };

  const testEditToken = 'eyJtb2RlIjoiZWRpdCIsImNyYSI6eyJjb25zdWx0YW50Ijp7ImVtYWlsIjoidGVzdGVy' +
                        'QHRlc3QuY29tIiwibmFtZSI6InRlc3RlciJ9LCJtaXNzaW9uIjp7ImNsaWVudCI6IlRl' +
                        'c3QuY29tIiwidGl0bGUiOiJUZXN0aW5nIn19fQ==';

  const testReviewToken = 'eyJtb2RlIjoicmV2aWV3IiwiY3JhIjp7ImNvbnN1bHRhbnQiOnsiZW1haWwiOiJ0ZXN0' +
                          'ZXJAdGVzdC5jb20iLCJuYW1lIjoidGVzdGVyIn0sIm1pc3Npb24iOnsiY2xpZW50Ijoi' +
                          'VGVzdC5jb20iLCJ0aXRsZSI6IlRlc3RpbmcifX19';

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        EditCraComponent,
        MockModalDirective
      ],
      providers: [
        { provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    serializer = fixture.debugElement.injector.get(SerializerService);

    route = fixture.debugElement.injector.get(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should init the component', () => {
    component.ngOnInit();
    expect(component.mode).toBe('add');
  });

  it('should switch mode when edit QueryParams provided', async(() => {
    testData.mode = 'edit';
    const spy = spyOn(serializer, 'deserialize')
      .and.callFake(
        (data) => {
          expect(data).toBe(testEditToken);
        }
      )
      .and.returnValue(testData);
    route.queryParams = of({ data: testEditToken });
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
    });
  }));

  it('should switch mode when review QueryParams provided', async(() => {
    testData.mode = 'review';
    const spy = spyOn(serializer, 'deserialize')
      .and.callFake(
        (data) => {
          expect(data).toBe(testReviewToken);
        }
      )
      .and.returnValue(testData);
    route.queryParams = of({ data: testReviewToken });
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.mode).toBe(testData.mode);
      expect(component.cra).toBe(testData.cra);
    });
  }));

  it('should enable modal and saved text on save', () => {
    component.cra = testData.cra;
    component.onSubmitCRA();
    expect(component.saved).toBe(true);
    expect(component.showModal).toBe(true);
  });

  it('should save the token', async(() => {
    component.cra = testData.cra;
    const spy = spyOn(serializer, 'serialize')
      .and.returnValue(testEditToken);
    component.onSubmitCRA();
    fixture.whenStable().then(() => {
      expect(component.editToken).toBe(testEditToken);
    });
  }));

});
