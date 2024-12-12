import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule, // Include this for HttpClient in standalone component
  ],
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any[] = [];
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      ticketCount: ['', [Validators.required, Validators.min(1)]],

    });
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get<any[]>('http://localhost:8080/api/v1/event/getAllEvent').subscribe(
      (response) => {
        this.events = response;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  addEvent() {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      this.http.post('http://localhost:8080/api/v1/event/addEvent',newEvent).subscribe(
        (response) => {
          alert('Event added successfully!');
          this.eventForm.reset();
          this.getAllEvents(); // Refresh the event list after adding
        },
        (error) => {
          console.error('Error adding event:', error);
          alert('Failed to add event. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
