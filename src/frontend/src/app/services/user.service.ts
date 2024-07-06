import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
}