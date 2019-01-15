// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Title, By } from '@angular/platform-browser';
// import { ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';

// import { of } from 'rxjs';

// import * as _ from 'lodash';

// import { differenceInMinutes } from 'date-fns';

// import { MockComponent, MockDirective  } from 'ng-mocks';

// import { CalendarEvent } from 'calendar-utils';

// import { EditTimesheetComponent } from './edit-timesheet.component';

// import { CalendarComponent } from 'src/app/calendar/calendar.component';

// import { Timesheet } from 'src/app/shared/timesheet.model';
// import { ModalDirective } from 'src/app/shared/style/modal.directive';
// import { SerializerService } from 'src/app/shared/serialization/serializer.service';

// import { TimesheetTokenData } from 'src/app/@types/timesheet-token-data';


// describe('EditCraComponent - ', () => {
//   let fixture: ComponentFixture<EditTimesheetComponent>,
//       component: EditTimesheetComponent,
//       route: ActivatedRoute,
//       serializer: SerializerService,
//       titleService: Title,
//       calendar: CalendarComponent;

//   const testData: TimesheetTokenData = {
//           mode: 'add',
//           timesheet: {
//             consultant: { email: 'tester@test.com', name: 'tester', },
//             mission: { client: 'Test.com', title: 'Testin' },
//             workingDays: {
//               // This is a minified timesheet it represent the working time for each days of the month and year in the key.
//               '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             },
//           },
//           invoice: null,
//         },
//         // This is the timesheet corresponding to the above minified version.
//         timesheet: CalendarEvent[] = [
//           { title: '', start: new Date(1900, 0, 1), end: new Date(1900, 0, 1, 4)},
//           { title: '', start: new Date(1900, 0, 2), end: new Date(1900, 0, 2, 8)},
//         ],
//         testEditToken: string = new SerializerService().serialize({ ...testData, mode: 'edit' }),
//         testReviewToken: string = new SerializerService().serialize({ ...testData, mode: 'review' }),
//         checkCra = (cra: Timesheet): boolean => {
//           const testTimesheet = _.isEqual(cra.workingDays, testData.timesheet.workingDays),
//                 testConsultant = _.isEqual(cra.consultant, testData.timesheet.consultant),
//                 testMission = _.isEqual(cra.mission, testData.timesheet.mission);

//           return testTimesheet && testConsultant && testMission;
//         },
//         checkToken = (token: string, mode: string): boolean => {
//           const deserializedToken: TimesheetTokenData = serializer.deserialize(token);

//           return checkCra(deserializedToken.timesheet) && deserializedToken.mode === mode;
//         };

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         RouterTestingModule,
//       ],
//       declarations: [
//         EditTimesheetComponent,
//         MockComponent(CalendarComponent),
//         MockDirective(ModalDirective)
//       ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             queryParams: of({})
//           }
//         },
//       ],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EditTimesheetComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     serializer = fixture.debugElement.injector.get(SerializerService);
//     route = fixture.debugElement.injector.get(ActivatedRoute);
//     titleService = fixture.debugElement.injector.get(Title);
//     calendar = fixture.debugElement.query(By.css('app-calendar')).componentInstance as CalendarComponent;
//     calendar.timesheet = timesheet;
//   });

//   it('it should create the component', () => {
//     expect(component).toBeTruthy('Expected edit-cra component to create but it did not worked');
//   });

//   describe('reading queryparams', () => {
//     let spySetTitle;

//     beforeEach(() => {
//       spySetTitle = spyOn(titleService, 'setTitle');
//     });

//     describe('when called in add mode:', () => {
//       beforeEach(() => {
//         route.queryParams = of({});
//         fixture.detectChanges();
//         component.ngOnInit();
//       });

//       it('it should set Acrabadabra - Saisir un compte rendu d\'activité as page title', () => {
//         expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Saisir un compte rendu d\'activité');
//       });

//       describe('it should init', () => {
//         it('mode as "add"', () => {
//           expect(component.mode).toBe(testData.mode);
//         });

//         it('with a new cra', () => {
//           expect(component.timesheet).toEqual(new Timesheet());
//         });
//       });
//     });

//     describe('when called in edit mode', () => {
//       beforeEach(() => {
//         route.queryParams = of({ data: testEditToken });
//         fixture.detectChanges();
//         component.ngOnInit();
//       });

//       it('it should init with token data', () => {
//         route.queryParams = of({ data: testEditToken });
//         fixture.detectChanges();
//         component.ngOnInit();

//         expect(checkCra(component.timesheet)).toBeTruthy('Expected component and test cra to have the same data');
//         expect(component.mode).toBe('edit');
//       });

//       it('it should set "Acrabadabra - Editer un compte rendu d\'activité as page title" as page title', () => {
//         expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Editer un compte rendu d\'activité');
//       });

//       describe('it should fill the form', () => {
//         it('consultantNameInput', () => {
//           expect(component.consultantNameInput.value).toBe(testData.timesheet.consultant.name);
//         });

//         it('consultantEmailInput', () => {
//           expect(component.consultantEmailInput.value).toBe(testData.timesheet.consultant.email);
//         });

//         it('missionTitleInput', () => {
//           expect(component.missionTitleInput.value).toBe(testData.timesheet.mission.title);
//         });

//         it('missionFinalClientInput', () => {
//           expect(component.missionFinalClientInput.value).toBe(testData.timesheet.mission.client);
//         });
//       });
//     });

//     describe('when called in review mode', () => {
//       beforeEach(() => {
//         route.queryParams = of({ data: testReviewToken });
//         fixture.detectChanges();
//         component.ngOnInit();
//       });

//       it('it should init with token data', () => {
//         route.queryParams = of({ data: testReviewToken });
//         fixture.detectChanges();
//         component.ngOnInit();

//         expect(checkCra(component.timesheet)).toBeTruthy('Expected component and test cra to have the same data');
//         expect(component.mode).toBe('review');
//       });

//       it('it should set "Acrabadabra - Consulter un compte rendu d\'activité" as page title', () => {
//         expect(spySetTitle).toHaveBeenCalledWith('Acrabadabra - Consulter un compte rendu d\'activité');
//       });

//       describe('it should fill the form', () => {
//         it('consultantNameInput', () => {
//           expect(component.consultantNameInput.value).toBe(testData.timesheet.consultant.name);
//         });

//         it('consultantEmailInput', () => {
//           expect(component.consultantEmailInput.value).toBe(testData.timesheet.consultant.email);
//         });

//         it('missionTitleInput', () => {
//           expect(component.missionTitleInput.value).toBe(testData.timesheet.mission.title);
//         });

//         it('missionFinalClientInput', () => {
//           expect(component.missionFinalClientInput.value).toBe(testData.timesheet.mission.client);
//         });
//       });

//       describe('it should disable form', () => {
//         it('consultantNameInput', () => {
//           expect(component.consultantNameInput.disabled).toBeTruthy();
//         });

//         it('consultantEmailInput', () => {
//           expect(component.consultantEmailInput.disabled).toBeTruthy();
//         });

//         it('missionTitleInput', () => {
//           expect(component.missionTitleInput.disabled).toBeTruthy();
//         });

//         it('missionFinalClientInput', () => {
//           expect(component.missionFinalClientInput.disabled).toBeTruthy();
//         });
//       });
//     });
//   });

//   describe('when submiting', () => {
//     describe('with a valid form', () => {
//       beforeEach(() => {
//         component.timesheet = testData.timesheet;
//         fixture.detectChanges();
//         component.onSubmitTimesheet();
//       });

//       it('it should enable modal', () => {
//         expect(component.showModal).toBeTruthy();
//       });

//       it('it should create edit token', () => {
//         expect(checkToken(component.editToken, 'edit')).toBeTruthy('Expected component and test edit token to have the same data');
//       });

//       it('it should create review token', () => {
//         expect(checkToken(component.reviewToken, 'review')).toBeTruthy('Expected component and test review token to have the same data');
//       });
//     });

//     describe('with an invalid form', () => {
//       let spyShowValidationMessages;
//       beforeEach(() => {
//         spyShowValidationMessages = spyOn(component, 'showValidationMessages');

//         component.timesheet = new Timesheet();
//         fixture.detectChanges();
//         component.onSubmitTimesheet();
//       });

//       it('it should enable error modal', () => {
//         expect(component.showErrorModal).toBeTruthy();
//       });

//       it('it should enable the validation message', () => {
//         expect(spyShowValidationMessages).toHaveBeenCalled();
//       });
//     });
//   });

//   describe('when closing a modal', () => {
//     it('it should reset it\'s toggle', () => {
//       component.showModal = true;

//       fixture.detectChanges();
//       component.onModalClose('showModal');

//       expect(component.showModal).toBeFalsy();
//     });
//   });

//   describe('when minifying a timesheet it should return an object of whitch the first property an array', () => {
//     let minifyedTimesheet,
//         month;

//     beforeEach(() => {
//       minifyedTimesheet = component.minifyTimesheet(timesheet);
//       month = Object.keys(minifyedTimesheet)[0];
//     });

//     it('and it\'s name is the month (starting at 0) and the year separeted by a dot', () => {
//       expect(month).toBe('0.1900');
//     });

//     it('and it\'s length is same as the month it is bound to', () => {
//       expect(minifyedTimesheet[month].length).toBe(31);
//     });

//     it('and each element contains the corresponding working day', () => {
//       timesheet.forEach((workedDay: CalendarEvent, index: number) => {
//         expect(differenceInMinutes(workedDay.end, workedDay.start) / 60 / 8).toEqual(minifyedTimesheet[month][index]);
//       });
//     });
//   });
// });
