import Swal from "sweetalert2";
import "sweetalert2/src/scss/style.css";

export function useToastSweet() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
    return Toast;
}
