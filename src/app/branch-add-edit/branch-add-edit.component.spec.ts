import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddEditComponent } from './branch-add-edit.component';

describe('BranchAddEditComponent', () => {
  let component: BranchAddEditComponent;
  let fixture: ComponentFixture<BranchAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchAddEditComponent]
    });
    fixture = TestBed.createComponent(BranchAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
