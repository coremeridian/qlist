type Access = "maintenance" | "presentation" | "open";
type AccessConstraint = {
    id: string;
    date_set: Date;
    [key: string]: Access;
};
