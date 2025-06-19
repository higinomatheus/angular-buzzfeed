import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quiz_question from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
	title: string = "";
	questions: any = [];
	questionSelected: any = "";
	answers: string[] = [];
	answerSelected: string = "";

	questionIndex: number = 0;
	questionMaxIndex: number = 0;

	finished: boolean = false;

	ngOnInit(): void {
		if(quiz_question){
			this.title = quiz_question.title;
			this.questions = quiz_question.questions;
			this.questionSelected = this.questions[this.questionIndex];

			this.questionIndex = 0;
			this.questionMaxIndex = this.questions.length;
		}
	}

	selectAnswer(answer: any){
		this.answers.push(answer);
	}

	async nextStep(){
		this.questionIndex++;
		if(this.questionMaxIndex > this.questionIndex){
			this.questionSelected = this.questions[this.questionIndex]
		} else {
			this.finished = true;
		}
	}
}
