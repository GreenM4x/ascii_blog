import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogWrapper } from './blog-wrapper';

describe('BlogWrapper', () => {
  let component: BlogWrapper;
  let fixture: ComponentFixture<BlogWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
