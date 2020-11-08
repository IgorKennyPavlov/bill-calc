import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms'

/**
 * Интерфейс набора сообщений об ошибках
 */
export interface ErrorMessages {
  [key: string]: string | ((errorData: any) => string)
}

/**
 * Дефолтный набор сообщений об ошибках
 * @type ErrorMessages
 */
const ERROR_MESSAGES: ErrorMessages = {
  required: 'Поле должно быть заполнено',
  minlength: ({ requiredLength }) => `Должно быть не короче ${ requiredLength } символов`,
  maxlength: ({ requiredLength }) => `Не должно превышать ${ requiredLength } символов`,
  pattern: 'Недопустимый формат',
  BIKErrors: errorData => errorData,
  INNErrors: errorData => errorData,
  OGRNErrors: errorData => errorData,
  KPPErrors: errorData => errorData,
  corrAccountErrors: errorData => errorData,
  bankAccountErrors: errorData => errorData,
  incorrectFileType: 'Загруженный файл не поддерживается',
  textContainsOnlyWhitespaces: 'Поле не может быть заполнено только пробелами'
}

export const getErrorMessage = (ctrl: AbstractControl): string => {
  if (!ctrl.errors || Object.prototype.toString.call(ctrl.errors) !== '[object Object]') {
    return ''
  }

  const errorKey = Object.keys(ctrl.errors)[0]

  if (!errorKey) {
    return ''
  }

  const errorMsg = ERROR_MESSAGES[errorKey]

  if (!errorMsg) {
    return 'Поле заполнено некорректно'
  }

  return typeof errorMsg === 'function' ? errorMsg(ctrl.errors[errorKey]) : errorMsg
}


export const zeroValidator: ValidatorFn = (ctrl: FormControl) => {
  const controlValue = ctrl.value
  if (controlValue === null) {
    return { required: true }
  }
  if (typeof controlValue === 'number') {
    return controlValue !== 0
      ? null
      : { required: true }
  }
  return Number(controlValue.replace(/[^\d]/gm, '')) !== 0
    ? null
    : { required: true }
}
