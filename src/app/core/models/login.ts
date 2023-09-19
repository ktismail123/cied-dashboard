import { FormControl } from "@angular/forms";

export interface IMyForm {
    username: FormControl<''>;
    password: FormControl<''>;
}

export interface IFormBody {
    username: string;
    password: string;
    device_id: 'fgdg';
}
