import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export function useToastr() {
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-left';

    return toastr;
}
