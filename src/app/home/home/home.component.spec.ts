import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should render Send transaction in a h1 tag", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Send transaction"
    );
  });

  it("should render send button", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("button").textContent).toContain("Send");
  });

  it("should call sendSignedTransaction function", async(() => {
    spyOn(component, "sendSignedTransaction");
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    fixture.whenStable().then(() => {
      expect(component.sendSignedTransaction).toHaveBeenCalled();
    });
  }));

  it("should render query transaction in a h1 tag", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(
      By.css(".home__send-transaction__title")
    )[1];
    expect(compiled).toBeTruthy();
  });

  it("should render query button", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".query__button").textContent).toContain(
      "Query"
    );
  });

  it("should call querySentTransaction function", async(() => {
    spyOn(component, "querySentTransaction");
    const button = fixture.debugElement.nativeElement.querySelector(
      ".query__button"
    );
    button.click();
    fixture.whenStable().then(() => {
      expect(component.querySentTransaction).toHaveBeenCalled();
    });
  }));
});
