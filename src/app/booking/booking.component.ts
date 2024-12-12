import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  bookingForm: FormGroup;
 bookings: any[] =[];
  events: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      fName: ['',Validators.required],
      lName: ['',Validators.required]
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
        console.error('Error fetching events', error)
      }
    )
  }
  bookTicket(eventId: number) {
    const fName = localStorage.getItem('fName');
    const sName = localStorage.getItem('sName');
    const email = localStorage.getItem('email');

    if (!fName || !sName || !email) {
      alert('User details not found in local storage.  Please log in.');
      return;
    }

    // Get the selected event details
    const selectedEvent = this.events.find((event) => event.eId === eventId);

    if (selectedEvent) {
      const ticketDetails = {
        details: `Booking a ticket for eventID ${eventId}`,
        eventName: selectedEvent.eventName,
        eventDescription: selectedEvent.eventDescription,
        fName,
        sName,
        email,
      };

      // Send ticket details to the backend
      this.http
        .put(`http://localhost:8080/api/v1/event/bookTicket/${eventId}`, ticketDetails)
        .subscribe(
          (response) => {
            alert('Ticket booked successfully!');
            this.getAllEvents(); // Refresh events (to update ticket count)
          },
          (error) => {
            console.error('Error booking ticket', error);
            alert('Failed to book the ticket.');
          }
        );
    }
  }


}
