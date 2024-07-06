import moment from "moment";

export function formatCreatedAt(createdAt) {
    return moment(createdAt).format("DD-MM-YYYY");
}
