import {Component, OnDestroy} from '@angular/core';
import {TextAnalyzerService} from "./services/text-analyzer.service";
import {catchError, of, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title: string = 'Text Analyzer';
  isOfflineModeActive: boolean = false;
  subscription: Subscription | undefined;
  analysisResult: any[] = [];

  constructor(private textAnalyzerService: TextAnalyzerService,
              private snackBar: MatSnackBar) {
  }

  toggleMode(isOfflineModeActive: boolean) {
    this.isOfflineModeActive = isOfflineModeActive;
  }

  analyzeText(data: any){
    this.subscription = this.textAnalyzerService
      .analyzeText(data.textToAnalyze, data['mode'], this.isOfflineModeActive)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = error.error?.message || error.statusText;
          this.showErrorMsg(errorMessage);
          return of(null);
        })
      )
      .subscribe(result => {
        if(result && Object.keys(result).length === 0)
          this.showErrorMsg('The searched-for characters are not available in the provided text.')
         else
          this.analysisResult.push(result);
      });
  }

  showErrorMsg(message: string) {
    const duration = 3000;
    this.snackBar.open(message, '', {duration});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
