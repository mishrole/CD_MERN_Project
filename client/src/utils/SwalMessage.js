import Swal from 'sweetalert2';

const errorMessage = (title, message) => {
  Swal.fire({
    title: title,
    // text: message,
    html: message,
    icon: 'error',
    confirmButtonText: 'Okay',
    confirmButtonColor: '#0B61EE'
  });
}

const warnMessage = (message, buttonMessage) => {
  return Swal.fire({
    title: message,
    icon: 'warning',
    confirmButtonText: buttonMessage,
    confirmButtonColor: '#0B61EE'
  }).then((result) => {
    if (result.isConfirmed) {
      return result.value;
    }
  });
}

const successMessage = (message) => {
  Swal.fire({
    title: 'Success!',
    // text: message,
    html: message,
    icon: 'success',
    confirmButtonText: 'Cool',
    confirmButtonColor: '#0B61EE'
  });
}

const confirmMessage = (message) => {
  return Swal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0B61EE',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      return result.value;
    }
  });
}

export { errorMessage, successMessage, confirmMessage, warnMessage };