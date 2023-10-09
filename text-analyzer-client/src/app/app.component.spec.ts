import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnalysisMode, TextAnalyzerService} from "./services/text-analyzer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {HeaderComponent} from "./components/header/header.component";
import {InputFormComponent} from "./components/input-form/input-form.component";
import {TextAnalysisResultComponent} from "./components/text-analysis-result/text-analysis-result.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let textAnalyzerService: TextAnalyzerService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        InputFormComponent,
        TextAnalysisResultComponent,
        MatToolbar,
        MatSlideToggle,
        MatFormField,
        MatLabel,
        MatRadioGroup,
        MatRadioButton
      ],
      providers: [TextAnalyzerService, MatSnackBar],
      imports: [HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    textAnalyzerService = TestBed.inject(TextAnalyzerService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.title).toBe('Text Analyzer');
    expect(component.isOfflineModeActive).toBe(false);
  });

  it('should call analyzeText with the right params', () => {
    /*** given ***/
    const textToAnalyze = 'text';
    const mode = AnalysisMode.Vowels;

    const expectedResult = { e: 1 };

    spyOn(textAnalyzerService, 'analyzeText').and.returnValue(of(expectedResult));
    spyOn(component, 'showErrorMsg');

    /*** when ***/
    component.analyzeText({ textToAnalyze, mode });

    /*** then ***/
    expect(textAnalyzerService.analyzeText).toHaveBeenCalledWith(textToAnalyze, mode, false);
    expect(component.analysisResult).toEqual([expectedResult]);
    expect(component.showErrorMsg).not.toHaveBeenCalled();
  });

  it('should handle online analysis error', () => {
    /*** given ***/
    const textToAnalyze = 'text';
    const mode = AnalysisMode.Vowels;
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

    spyOn(textAnalyzerService, 'analyzeText').and.returnValue( throwError(() => errorResponse));
    spyOn(component, 'showErrorMsg');

    /*** when ***/
    component.analyzeText({ textToAnalyze, mode });

    /*** then ***/
    expect(textAnalyzerService.analyzeText).toHaveBeenCalledWith(textToAnalyze, mode, false);
    expect(component.showErrorMsg).toHaveBeenCalledWith('Internal Server Error');
  });

  it('should handle empty analysis result', () => {
    /*** given ***/
    const textToAnalyze = 'xyz';
    const mode = AnalysisMode.Vowels;

    spyOn(textAnalyzerService, 'analyzeText').and.returnValue(of({}));
    spyOn(component, 'showErrorMsg');

    /*** when ***/
    component.analyzeText({ textToAnalyze, mode });

    /*** then ***/
    expect(textAnalyzerService.analyzeText).toHaveBeenCalledWith(textToAnalyze, mode, false);
    expect(component.analysisResult).toEqual([]);
    expect(component.showErrorMsg).toHaveBeenCalledWith('The searched-for characters are not available in the provided text.');
  });
});
