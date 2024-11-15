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
  seats: string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5']; // Example seat labels
  selectedSeats: number[] = [];
 bookings: any[] =[];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      fName: ['',Validators.required],
      lName: ['',Validators.required]
    });
  }

  // Toggle the selection of seats
  toggleSeatSelection(index: number): void {
    const seatIndex = this.selectedSeats.indexOf(index);
    if (seatIndex > -1) {
      // Deselect seat
      this.selectedSeats.splice(seatIndex, 1);
    } else {
      // Select seat
      this.selectedSeats.push(index);
    }
  }

  onSubmit() {
    console.log(this.bookingForm.value);

    const formData = {
      ...this.bookingForm.value,
      seats: this.selectedSeats.map(i => this.seats[i]) // Map selected indices to seat labels
    };

    this.http.post('http://localhost:8080/api/v1/ticket/book', formData).subscribe(
      (response) => {
        console.log("Ticket Booked");
        this.getAllTickets()
      },
      (error) => {
        console.error('Error Booking Ticket', error);
      }
    );
  }

  getAllTickets(){
    this.http.get<any[]>('http://localhost:8080/api/v1/ticket/get').subscribe(
      (response)=>{
        this.bookings=response;
        console.log(this.bookings)
      },
      (error)=>{
        console.error('Error fetching bookings',error)
      }
    )
  }

  ngOnInit(): void {
    this.getAllTickets();
  }

  deleteBooking(ticketId:any) {
    this.http.delete('http://localhost:8080/api/v1/ticket/deleteBooking/'+ticketId).subscribe(
      (response)=>{
        console.log(response)
        this.getAllTickets();
      },
      (error)=>{
        console.error('Error fetching bookings',error)
      }
    )
  }

}
