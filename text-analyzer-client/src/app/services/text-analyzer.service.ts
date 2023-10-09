import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

export enum AnalysisMode {
  Vowels = 'vowels',
  Consonants = 'consonants'
}

export enum ModeValidCharacters {
  Vowels = 'aeiou',
  Consonants = 'bcdfghjklmnpqrstvwxyz',
  Both = 'abcdefghijklmnopqrstuvwxyz'
}

@Injectable({
  providedIn: 'root'
})
export class TextAnalyzerService {
  constructor(private http: HttpClient) {
  }

  public analyzeText(text: string, mode: AnalysisMode, isOfflineModeActive: boolean) : Observable<any> {
    if(isOfflineModeActive) {
      return of(this.analyzeTextOffline(text, mode));
    }
    return this.http.post<any>(environment.apiUrl, {text, mode});
  }

  private analyzeTextOffline(text: string, mode: AnalysisMode): any {
    let result = new Map<string, number>();
    const validCharacters = mode === AnalysisMode.Vowels
      ? ModeValidCharacters.Vowels
      : mode === AnalysisMode.Consonants
        ? ModeValidCharacters.Consonants
        : ModeValidCharacters.Both;

    text.toLowerCase().split('').forEach((char, index) => {
        if(validCharacters.indexOf(char) === -1) return;
        let value = result.get(char) || 0;
        value++;
        result.set(char, value);
    });

    return Object.fromEntries(result);
  }

}
