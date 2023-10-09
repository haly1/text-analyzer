import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-analysis-result',
  templateUrl: './text-analysis-result.component.html',
  styleUrls: ['./text-analysis-result.component.scss']
})
export class TextAnalysisResultComponent {
  @Input() resultsArray: any[] = [];
}
