import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/dtos/register.dtos';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ApiResponse } from 'src/app/responses/api.response';

@Component({
  selector: 'app-user-signuppage',
  templateUrl: './user-signuppage.component.html',
  styleUrls: ['./user-signuppage.component.scss']
})
export class UserSignuppageComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  /* This one is for Swiper */
  currentIndex = 0;
  startX: number = 0;
  moveX: number = 0;
  dragging: boolean = false;
  slideWidth: number = window.innerWidth;
  @HostListener('window:resize')
  onWindowResize() {
    this.updateSlideWidth();
  }

  updateSlideWidth() {
    this.slideWidth = window.innerWidth;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < 4 - 1) {
      this.currentIndex++;
    }
  }

  getTransform() {
    return `translateX(-${this.currentIndex * this.slideWidth + this.moveX}px)`;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngOnInit(): void {
    this.updateSlideWidth();
    // this.openDialog();
  }

  isPhoneNumberValid: boolean | null = null;
  isEmailValid: boolean | null = null;
  isPasswordValid: boolean | null = null;

  isAtLeastLowercaseCharacter: boolean | null = null;
  isAtLeastUppercaseCharacter: boolean | null = null;
  isEnoughCharacters: boolean | null = null;
  isJustPopularCharacters: boolean | null = null;

  countdownTimer: number;

  phoneNumber: string;
  password: string;
  email: string;

  display: string = 'none';

  registerDTO: RegisterDTO = {
    phoneNumber: '',
    email: '',
    password: '',
    retypePassword: '',
    roleName: '',
    facebookAccountId: '',
    googleAccountId: ''
  }

  constructor(private router: Router, private userService: UserService) {
    this.phoneNumber = '';
    this.email = '';
    this.password = '';

    this.countdownTimer = 10;

    this.registerDTO.roleName = "USER";
    this.isPhoneNumberValid = null;
    this.isEmailValid = null;
    this.isPasswordValid = null;

    this.isAtLeastLowercaseCharacter = null;
    this.isAtLeastUppercaseCharacter = null;
    this.isEnoughCharacters = null;
    this.isJustPopularCharacters = null;
  }


  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    return phoneRegex.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    this.isAtLeastLowercaseCharacter = /[a-z]/.test(password);
    this.isAtLeastUppercaseCharacter = /[A-Z]/.test(password);
    this.isEnoughCharacters = password.length >= 8 && password.length <= 16;
    this.isJustPopularCharacters = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]+$/.test(password);

    return (
      this.isAtLeastLowercaseCharacter &&
      this.isAtLeastUppercaseCharacter &&
      this.isEnoughCharacters &&
      this.isJustPopularCharacters
    );
  }

  /* CHECK INPUT FROM FORM DATA */
  onPhoneNumberChange() {
    if (this.phoneNumber.trim() === '') {
      this.isPhoneNumberValid = null;
    } else {
      if (this.isPhoneNumberValid = this.isValidPhoneNumber(this.phoneNumber)
      ) {
        this.registerDTO.phoneNumber = this.phoneNumber;
      }
    }
    console.log(this.registerDTO);
  }

  onEmailChange() {
    if (this.email.trim() === '') {
      this.isEmailValid = null;
    } else {
      if (this.isEmailValid = this.isValidEmail(this.email)) {
        this.registerDTO.email = this.email;
      }
    }
    console.log(this.registerDTO);
  }

  onPasswordChange() {
    if (this.password.trim() === '') {
      this.isPasswordValid = null;
    } else {
      this.isPasswordValid = this.isValidPassword(this.password);
      if (this.isPasswordValid) {
        this.registerDTO.password = this.password;
        console.log(this.registerDTO);
      }
    }
    debugger
    this.register();
  }


  startCountdown(): void {
    let timer = setInterval(() => {
      this.countdownTimer--;

      if (this.countdownTimer <= 0) {
        clearInterval(timer);
        this.navigateToOtherComponent();
      }
      console.log(this.countdownTimer);
    }, 1000);
  }

  navigateToOtherComponent(): void {
    this.router.navigate(['']);
  }

  openDialog() {
    this.display = 'block';
  }

  closeDialog() {
    this.display = 'none';
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  goToNextSlide(swiperContainer: any): void {
    swiperContainer.swiper.slideNext();
  }

  goToPrevSlide(swiperContainer: any): void {
    swiperContainer.swiper.slidePrev();
  }

  register() {
    debugger
    this.userService.register(this.registerDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger
        // const confirmation = window
        //   .confirm('Đăng ký thành công, mời bạn đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
        // if (confirmation) {
        //   this.router.navigate(['/login']);
        // }
      },
      complete: () => {
        debugger
        this.startCountdown();
      },
      error: (error: HttpErrorResponse) => {
        debugger
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
