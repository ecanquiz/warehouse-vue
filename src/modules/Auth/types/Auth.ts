import type { Ref, UnwrapRef } from 'vue'

export interface FormLogin {
    email: string
    password: string
}

export interface FormRegister {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface StandaloneLogin {
    sending: Ref<UnwrapRef<boolean>>
    login: (form: FormLogin) => Promise<void>
    error: Ref<UnwrapRef<null>>
}

export interface UpdateUser {
    name: string;
    email: string;
}

export interface UpdatePassword {
    current_password: string;
    password: string;
    password_confirmation: string;

}
