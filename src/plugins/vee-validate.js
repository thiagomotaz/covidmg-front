import {
  required, email, max, confirmed,
} from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'Este campo é obrigatório',
});

extend('max', {
  ...max,
  message: 'Este campo deve ter {length} caracteres ou menos.',
});

extend('email', {
  ...email,
  message: 'Este campo deve ser um email válido.',
});

extend('confirmed', {
  ...confirmed,
  message: 'Senhas nao correspondem',
});
