import Swal from "sweetalert2";
import "sweetalert2/src/scss/style.css";

export function useToastSweet() {
    const Toast = ({ icon, title }) => {
        const allert = Swal.mixin({
            toast: true,
            position: "top-end",
            iconColor: "white",
            customClass: {
                popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        });

        return allert.fire({
            icon: icon,
            title: title,
        });
    };

    const DeleteToast = (actionAccept, actionDeny) => {
        Swal.fire({
            title: "Do you want to delete the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Delete!", "", "success");
                actionAccept();
            } else if (result.isDenied) {
                Swal.fire("Changes are not Delete", "", "info");
                actionDeny();
            }
        });
    };
    return { Toast, DeleteToast };
}
