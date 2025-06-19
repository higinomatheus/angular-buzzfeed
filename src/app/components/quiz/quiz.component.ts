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
	results: any = {};
	result: any = {};

	ngOnInit(): void {
		if(quiz_question){
			this.title = quiz_question.title;
			this.questions = quiz_question.questions;
			this.results = quiz_question.results;
			this.questionSelected = this.questions[this.questionIndex];

			this.questionIndex = 0;
			this.questionMaxIndex = this.questions.length;
		}
	}

	async selectAnswer(answer: any){
		this.answers.push(answer);
		await this.nextStep();
	}

	async nextStep(){
		this.questionIndex++;
		if(this.questionMaxIndex > this.questionIndex){
			this.questionSelected = this.questions[this.questionIndex]
		} else {
			this.finished = true;
		}

		if(this.finished){
			this.checkResult(this.answers);
		}
	}

	async checkResult(answers: any[]){
		let scores = (answers ?? []).map(answer => answer.score);

		let result = scores.reduce((acc: Record<string, number>, score) => {
			for(const key in score){
				acc[key] = (acc[key] ?? 0) + score[key];
			}
			return acc;
		}, {});

		let topHero = Object.entries(result).reduce((max, curr) => {
			return curr[1] > max[1] ? curr : max;
		})

		let heroName = topHero[0];
		this.result = this.results[heroName];
	}

	async start(){
		this.questionIndex = -1;
		this.answers = [];
		this.result = {};
		this.finished = false;

		await this.nextStep();
	}
}
