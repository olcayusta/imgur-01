import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('feedback - imgur');
    this.form = this.fb.group({
      description: ['', Validators.required]
    });
  }

}
