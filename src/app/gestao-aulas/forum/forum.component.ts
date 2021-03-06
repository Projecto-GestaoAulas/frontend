import { Component, OnInit } from '@angular/core';
import { QuestionForum } from '../shared/models/question-forum/question-forum';
import { AnswerForum } from '../shared/models/answer-forum/answer-forum';
import { QuestionServiceService } from '../shared/services/forum-service/question-service.service';
import { AnswerServiceService } from '../shared/services/forum-service/answer-service.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  private question: QuestionForum = new QuestionForum();
  private questions: QuestionForum[] = [];
  private answers: any[] = [];
  public questions$: ReplaySubject<any> = new ReplaySubject(1);
  public answers$: ReplaySubject<any []>= new ReplaySubject(1);

  public validAnswers: AnswerForum[];
  public newQuestion: boolean = false;
  //public currentEdition: Edition;

  public title: string;
  public description: string;



  constructor(
    private questionsApi: QuestionServiceService,
    private answersApi: AnswerServiceService
  ) {
    this.questionsApi.getAllQuestions().subscribe(
      // this.questionsApi.getAllQuestions(this.question.editionId).subscribe(
      (quest: QuestionForum[]) => {
        this.questions$.next(quest);
        console.log(quest);

      }
    )
  }

  ngOnInit() {
  }




  public getAnswersByQuestionId(id: number, index: number) {


    //let data : any = this.answersApi.getAnswersByQuestionId(id);

    return this.answersApi.getAnswersByQuestionId(id).subscribe(
      (answ: AnswerForum[]) => {
      
      
      //  this.questions[index].answers.push(answ)

        // this.answers.forEach(el => {

        //   el.forEach(e => {


        //   });
        //   if (el.id != id) {
        //     this.answers.push(answ);
        //   }
        //   else {
        //   }
        // });



        // //index da questao

        // if (answ != null) {

        //   // this.questions$[index].validQuestion = true;

        // }
        this.answers$.next(answ);

        console.log(answ);


      }
    );
  }


  public createQuestion() {

    this.question.title = this.title;
    this.question.description = this.description;
    return this.questionsApi.createQuestion(this.question).subscribe(
      (msg: string) => {
        console.log(msg);
      }, (error: string) => {
        console.log(error);
      }
    );

  }

  public answerDisplay = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
  public userAnswer = ['João Cortes', 'Cristiano Vale', 'Tiago Preto', 'Sofia Lucas', 'Ana Cardoso']

  public getRandomUser() {
    return this.userAnswer[Math.floor(Math.random() * this.userAnswer.length)];
  }
}
