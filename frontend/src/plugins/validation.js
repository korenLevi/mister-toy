import { extend } from 'vee-validate';

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value)
    };
  },
  computesRequired: true,
  message: 'This fiels is required'
});
extend('minNumber', {
  validate(value) {
    return {
      required: true,
      valid: typeof value === 'number' && value > 0 
    };
  },
  computesRequired: true,
  message: 'Please enter valid number bigger than 0'
});
