import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
	title: string = "";
	questions: any = [];
	questionSelected: any = "";
	answers: string[] = [];
	answerSelected: string = "";

	questionIndex: number = 0;
	questionMaxIndex: number = 0;

	finished: boolean = false;
}
